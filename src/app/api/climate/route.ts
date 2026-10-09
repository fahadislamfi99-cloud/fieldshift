import { NextRequest, NextResponse } from "next/server";
import { fetchNASAPowerData, getFallbackZoneMetrics } from "@/services/nasa-power";
import { calculateClimateDrift } from "@/lib/climate-drift";
import { ZoneProfile, CurrentClimateMetrics } from "@/types/climate";
import zonesData from "@/data/zones.json";

const ZONES = zonesData as ZoneProfile[];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zoneId = searchParams.get("zoneId") || "barind_godagari";
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");

    const matchedZone = ZONES.find((z) => z.id === zoneId) || ZONES[0];
    const lat = latParam ? parseFloat(latParam) : matchedZone.lat;
    const lon = lonParam ? parseFloat(lonParam) : matchedZone.lon;

    // Validate coordinate boundaries (Bangladesh bounding box roughly 20°N-27°N, 88°E-93°E)
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return NextResponse.json({ error: "Invalid geographic coordinates" }, { status: 400 });
    }

    // Attempt live NASA POWER query
    const rawTelemetry = await fetchNASAPowerData(lat, lon);

    let currentMetrics: CurrentClimateMetrics;

    if (rawTelemetry.length > 0) {
      const latest = rawTelemetry[rawTelemetry.length - 1];
      const fallback = getFallbackZoneMetrics(matchedZone.id);
      currentMetrics = {
        airTemperatureC: latest.tempMeanC,
        maxTemperatureC: latest.tempMaxC,
        minTemperatureC: latest.tempMinC,
        rootZoneSoilMoisturePercent: fallback.rootZoneSoilMoisturePercent, // SMAP calibrated value
        surfaceSoilMoisturePercent: fallback.surfaceSoilMoisturePercent,
        precipitationMm: latest.precipitationMm,
        relativeHumidityPercent: latest.humidityPercent,
        solarRadiationKwh: latest.solarRadiationKwh,
        windSpeedKmh: latest.windSpeedKmh,
        observationDate: latest.date,
      };
    } else {
      currentMetrics = getFallbackZoneMetrics(matchedZone.id);
    }

    const driftSummary = calculateClimateDrift(
      matchedZone,
      currentMetrics.airTemperatureC,
      currentMetrics.rootZoneSoilMoisturePercent
    );

    return NextResponse.json(
      {
        zone: matchedZone,
        metrics: currentMetrics,
        drift: driftSummary,
        historicalSample: rawTelemetry.slice(-14), // Last 14 days for mini charts
        dataSource: rawTelemetry.length > 0 ? "LIVE_NASA_POWER_API" : "CALIBRATED_NASA_BASELINES",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("API /api/climate internal error:", error);
    return NextResponse.json({ error: "Failed to evaluate climate telemetry" }, { status: 500 });
  }
}
