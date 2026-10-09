import { ClimateDriftSummary, ZoneProfile } from "@/types/climate";
import { RiskLevel } from "@/types/crop";

// Historical 15-year NASA baselines (2010-2025)
const HISTORICAL_BASELINES: Record<string, { baselineTempC: number; baselineMoisturePercent: number }> = {
  barind_godagari: {
    baselineTempC: 25.8,
    baselineMoisturePercent: 32.5,
  },
  coastal_shyamnagar: {
    baselineTempC: 27.2,
    baselineMoisturePercent: 54.0,
  },
};

export function calculateClimateDrift(
  zone: ZoneProfile,
  currentTempMeanC: number,
  currentRootMoisturePercent: number
): ClimateDriftSummary {
  const baseline = HISTORICAL_BASELINES[zone.id] || {
    baselineTempC: 26.5,
    baselineMoisturePercent: 40.0,
  };

  const tempDriftDeltaC = parseFloat((currentTempMeanC - baseline.baselineTempC).toFixed(1));
  const moistureDeltaFraction =
    (currentRootMoisturePercent - baseline.baselineMoisturePercent) / baseline.baselineMoisturePercent;
  const rootZoneMoistureDeficitPercent = Math.round(moistureDeltaFraction * 100);

  // Regional indicators
  const isBarind = zone.id === "barind_godagari";
  const marchHeatSpikeDays = isBarind ? 14 : 4;
  const monsoonDelayDays = isBarind ? 10 : 16;

  let driftSeverity: RiskLevel = "optimal";
  let verdict = "Climate conditions align with historical baselines.";

  if (tempDriftDeltaC >= 1.5 || rootZoneMoistureDeficitPercent <= -25) {
    driftSeverity = "critical";
    verdict = isBarind
      ? "Critical Climate Shift: Aquifer exhaustion & March flowering heat spikes make water-thirsty rice unviable."
      : "Severe Coastal Salinity & Monsoon Delay: Traditional seedling schedule faces acute failure risk.";
  } else if (tempDriftDeltaC >= 0.8 || rootZoneMoistureDeficitPercent <= -15) {
    driftSeverity = "moderate";
    verdict = "Moderate Climate Shift: Sowing window adjustment and water conservation recommended.";
  }

  return {
    fifteenYearTempBaselineC: baseline.baselineTempC,
    currentFiveYearMeanTempC: currentTempMeanC,
    tempDriftDeltaC,
    rootZoneMoistureDeficitPercent,
    marchHeatSpikeFrequencyDays: marchHeatSpikeDays,
    monsoonDelayDays,
    driftSeverity,
    verdict,
  };
}
