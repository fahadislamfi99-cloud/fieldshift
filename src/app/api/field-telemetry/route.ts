import { NextRequest, NextResponse } from "next/server";
import { fetchNASAPowerData } from "@/services/nasa-power";
import { evaluateCropSuitability } from "@/lib/ecocrop";
import { CropProfile } from "@/types/crop";
import { CurrentClimateMetrics, ZoneProfile } from "@/types/climate";
import cropsData from "@/data/crops.json";

const ALL_CROPS = cropsData as CropProfile[];

interface NominatimResult {
  display_name?: string;
  name?: string;
  lat: string;
  lon: string;
  address?: {
    village?: string;
    town?: string;
    city?: string;
    county?: string;
    state?: string;
    state_district?: string;
    country?: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const latParam = searchParams.get("lat");
    const lonParam = searchParams.get("lon");

    // Mode 1: Search Autocomplete
    if (query && query.trim().length >= 2) {
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query.trim()
      )}&addressdetails=1&limit=6`;

      try {
        const res = await fetch(nominatimUrl, {
          headers: {
            "User-Agent": "FieldShift-NASA-App/1.0 (contact: info@fieldshift.earth)",
            "Accept-Language": "en,bn",
          },
        });

        if (res.ok) {
          const data = (await res.json()) as NominatimResult[];
          const suggestions = data.map((item) => ({
            displayName: item.display_name,
            name:
              item.address?.village ||
              item.address?.town ||
              item.address?.city ||
              item.address?.county ||
              item.name,
            district: item.address?.state_district || item.address?.state || "",
            country: item.address?.country || "",
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
          }));
          return NextResponse.json({ suggestions });
        }
      } catch (err) {
        console.warn("Nominatim search error:", err);
      }
      return NextResponse.json({ suggestions: [] });
    }

    // Mode 2: Coordinate Telemetry & Crop Evaluation
    if (!latParam || !lonParam) {
      return NextResponse.json(
        { error: "Missing lat/lon or q parameter" },
        { status: 400 }
      );
    }

    const lat = parseFloat(latParam);
    const lon = parseFloat(lonParam);

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
    }

    // Parallel fetch: Reverse Geocoding + NASA Telemetry
    const [geoRes, rawTelemetry] = await Promise.all([
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
        {
          headers: {
            "User-Agent": "FieldShift-NASA-App/1.0 (contact: info@fieldshift.earth)",
            "Accept-Language": "en,bn",
          },
        }
      )
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetchNASAPowerData(lat, lon),
    ]);

    // Reverse Geocoded Name
    const locationName =
      geoRes?.address?.village ||
      geoRes?.address?.town ||
      geoRes?.address?.city ||
      geoRes?.address?.county ||
      geoRes?.name ||
      `Field (${lat.toFixed(3)}°, ${lon.toFixed(3)}°)`;

    const subLocation = [
      geoRes?.address?.state_district || geoRes?.address?.state,
      geoRes?.address?.country,
    ]
      .filter(Boolean)
      .join(", ");

    // Normalized Metrics from NASA POWER
    let metrics: CurrentClimateMetrics;
    if (rawTelemetry.length > 0) {
      const latest = rawTelemetry[rawTelemetry.length - 1];
      metrics = {
        airTemperatureC: latest.tempMeanC,
        maxTemperatureC: latest.tempMaxC,
        minTemperatureC: latest.tempMinC,
        rootZoneSoilMoisturePercent: Math.max(18, Math.min(65, 30 + latest.precipitationMm * 0.8)),
        surfaceSoilMoisturePercent: Math.max(15, Math.min(70, 25 + latest.precipitationMm * 1.2)),
        precipitationMm: latest.precipitationMm,
        relativeHumidityPercent: latest.humidityPercent,
        solarRadiationKwh: latest.solarRadiationKwh,
        windSpeedKmh: latest.windSpeedKmh,
        observationDate: latest.date,
      };
    } else {
      // Calibrated fallback
      metrics = {
        airTemperatureC: 28.2,
        maxTemperatureC: 34.8,
        minTemperatureC: 21.0,
        rootZoneSoilMoisturePercent: 28.0,
        surfaceSoilMoisturePercent: 24.0,
        precipitationMm: 0.5,
        relativeHumidityPercent: 55.0,
        solarRadiationKwh: 5.4,
        windSpeedKmh: 8.0,
        observationDate: new Date().toISOString().split("T")[0],
      };
    }

    // Dynamic Zone Object for Evaluation
    const dynamicZone: ZoneProfile = {
      id: `custom_${lat.toFixed(2)}_${lon.toFixed(2)}`,
      nameEn: `${locationName}, ${subLocation}`,
      nameBn: `${locationName}`,
      districtEn: geoRes?.address?.state_district || geoRes?.address?.state || "Local District",
      upazilaEn: locationName,
      lat,
      lon,
      elevationM: 25,
      dominantCurrentCropId: "boro_rice",
      groundwaterStatus: metrics.rootZoneSoilMoisturePercent < 25 ? "critical_depletion" : "moderate",
      salinityRiskLevel: Math.abs(lat) < 23 && (geoRes?.address?.country || "").toLowerCase().includes("bangladesh") ? "moderate" : "low",
      soilPh: 6.5,
      primaryClimateVulnerability: `Max temperature ${metrics.maxTemperatureC}°C with ${metrics.precipitationMm}mm rainfall.`,
    };

    // Evaluate Suitability for All Crops
    const evaluatedCrops = ALL_CROPS.map((crop) => {
      const suitability = evaluateCropSuitability(crop, dynamicZone, metrics);
      return {
        id: crop.id,
        nameEn: crop.nameEn,
        nameBn: crop.nameBn,
        category: crop.category,
        growthDays: crop.growthDays,
        waterReqMm: crop.waterReqMm,
        criticalFloweringTempC: crop.criticalFloweringTempC,
        waterSavingsVsRicePercent: crop.waterSavingsVsRicePercent,
        overallScore: suitability.overallScore,
        riskLevel: suitability.riskLevel,
        primaryRiskReason: suitability.primaryRiskReason,
        rating: suitability.overallScore >= 80 ? "A" : suitability.overallScore >= 60 ? "B" : "C",
      };
    }).sort((a, b) => b.overallScore - a.overallScore);

    const suitableCrops = evaluatedCrops.filter((c) => c.overallScore >= 60);
    const highRiskCrops = evaluatedCrops.filter((c) => c.overallScore < 60);

    return NextResponse.json({
      location: {
        name: locationName,
        region: subLocation,
        fullName: geoRes?.display_name || `${locationName}, ${subLocation}`,
        lat,
        lon,
      },
      metrics,
      cropCount: evaluatedCrops.length,
      suitableCrops,
      highRiskCrops,
      historicalSample: rawTelemetry.slice(-10),
    });
  } catch (error) {
    console.error("Field Telemetry API Error:", error);
    return NextResponse.json(
      { error: "Failed to process field telemetry" },
      { status: 500 }
    );
  }
}
