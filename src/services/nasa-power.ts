import { NASAPowerRawResponse, NormalizedNASADataPoint } from "@/types/nasa";
import { CurrentClimateMetrics } from "@/types/climate";

// Fallback telemetry when offline or when NASA API exceeds latency budget
const ZONE_FALLBACK_METRICS: Record<string, CurrentClimateMetrics> = {
  barind_tanore: {
    airTemperatureC: 28.6,
    maxTemperatureC: 36.5,
    minTemperatureC: 19.5,
    rootZoneSoilMoisturePercent: 21.0, // Critical root deficit in Tanore clay
    surfaceSoilMoisturePercent: 15.5,
    precipitationMm: 0.0,
    relativeHumidityPercent: 39.0,
    solarRadiationKwh: 5.9,
    windSpeedKmh: 6.8,
    observationDate: new Date().toISOString().split("T")[0],
  },
  barind_godagari: {
    airTemperatureC: 28.4,
    maxTemperatureC: 36.2,
    minTemperatureC: 19.8,
    rootZoneSoilMoisturePercent: 22.0, // Critical root deficit
    surfaceSoilMoisturePercent: 16.5,
    precipitationMm: 0.0,
    relativeHumidityPercent: 41.0,
    solarRadiationKwh: 5.8,
    windSpeedKmh: 6.5,
    observationDate: new Date().toISOString().split("T")[0],
  },
  coastal_shyamnagar: {
    airTemperatureC: 29.8,
    maxTemperatureC: 33.5,
    minTemperatureC: 23.1,
    rootZoneSoilMoisturePercent: 48.0,
    surfaceSoilMoisturePercent: 52.0,
    precipitationMm: 1.2,
    relativeHumidityPercent: 78.0,
    solarRadiationKwh: 5.1,
    windSpeedKmh: 14.2,
    observationDate: new Date().toISOString().split("T")[0],
  },
};

export async function fetchNASAPowerData(
  lat: number,
  lon: number,
  startDate?: string,
  endDate?: string
): Promise<NormalizedNASADataPoint[]> {
  // Format dates: YYYYMMDD
  const now = new Date();
  const defaultEnd = now.toISOString().slice(0, 10).replace(/-/g, "");
  const past30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const defaultStart = past30Days.toISOString().slice(0, 10).replace(/-/g, "");

  const start = startDate ? startDate.replace(/-/g, "") : defaultStart;
  const end = endDate ? endDate.replace(/-/g, "") : defaultEnd;

  const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,ALLSKY_SFC_SW_DWN,RH2M,WS2M&community=AG&longitude=${lon.toFixed(4)}&latitude=${lat.toFixed(4)}&start=${start}&end=${end}&format=JSON`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500); // 4.5s fail-safe timeout

    const res = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`NASA POWER API HTTP ${res.status}`);
    }

    const data: NASAPowerRawResponse = await res.json();
    const params = data.properties.parameter;

    const dates = Object.keys(params.T2M || {});
    return dates
      .filter((dateStr) => (params.T2M?.[dateStr] ?? -999) > -900)
      .map((dateStr) => ({
        date: `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`,
        tempMeanC: params.T2M?.[dateStr] ?? 26.0,
        tempMaxC: (params.T2M_MAX?.[dateStr] ?? -999) > -900 ? params.T2M_MAX![dateStr] : 32.0,
        tempMinC: (params.T2M_MIN?.[dateStr] ?? -999) > -900 ? params.T2M_MIN![dateStr] : 20.0,
        precipitationMm: Math.max(0, params.PRECTOTCORR?.[dateStr] ?? 0.0),
        humidityPercent: Math.max(0, params.RH2M?.[dateStr] ?? 60.0),
        solarRadiationKwh: Math.max(0, params.ALLSKY_SFC_SW_DWN?.[dateStr] ?? 5.0),
        windSpeedKmh: Math.max(0, (params.WS2M?.[dateStr] ?? 2.5) * 3.6),
      }));
  } catch (error) {
    console.warn("NASA POWER live query failed, utilizing calibrated fallback telemetry", error);
    return [];
  }
}

export function getFallbackZoneMetrics(zoneId: string): CurrentClimateMetrics {
  return ZONE_FALLBACK_METRICS[zoneId] || ZONE_FALLBACK_METRICS.barind_godagari;
}
