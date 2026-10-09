import { CropProfile, SuitabilityScore, AlternativeCropOption, CropShiftAssessment } from "@/types/crop";
import { ZoneProfile, CurrentClimateMetrics } from "@/types/climate";
import cropsData from "@/data/crops.json";

const ALL_CROPS = cropsData as CropProfile[];

// Boro Rice irrigation benchmark (m³ water per acre)
const RICE_WATER_USAGE_M3_PER_ACRE = 5050;
const DIESEL_IRRIGATION_COST_PER_M3_BDT = 3.6; // ~18,000 BDT/acre for Boro

export function evaluateCropSuitability(
  crop: CropProfile,
  zone: ZoneProfile,
  climate: CurrentClimateMetrics
): SuitabilityScore {
  // 1. Thermal Suitability (Weight: 40%)
  let thermalScore = 100;
  const temp = climate.airTemperatureC;
  const maxTemp = climate.maxTemperatureC;

  if (temp < crop.tempMin || temp > crop.tempMax) {
    thermalScore = 15;
  } else if (temp >= crop.tempOptMin && temp <= crop.tempOptMax) {
    thermalScore = 95;
  } else if (temp < crop.tempOptMin) {
    thermalScore = Math.max(30, 95 - ((crop.tempOptMin - temp) / (crop.tempOptMin - crop.tempMin)) * 65);
  } else {
    thermalScore = Math.max(30, 95 - ((temp - crop.tempOptMax) / (crop.tempMax - crop.tempOptMax)) * 65);
  }

  // Penalize critical flowering heat spikes (> critical threshold during pollination)
  if (maxTemp >= crop.criticalFloweringTempC) {
    thermalScore = Math.max(10, thermalScore - 40);
  }

  // 2. Moisture / Groundwater Suitability (Weight: 40%)
  let moistureScore = 100;
  const rootMoisture = climate.rootZoneSoilMoisturePercent;

  if (crop.waterReqMm > 1000) {
    // Water-thirsty crop (e.g., Boro Rice)
    if (zone.groundwaterStatus === "critical_depletion") {
      moistureScore = Math.min(30, rootMoisture * 1.1);
    } else {
      moistureScore = Math.min(85, rootMoisture * 1.5);
    }
  } else if (crop.waterReqMm > 500) {
    // Moderate crop (Maize)
    moistureScore = Math.min(90, rootMoisture * 2.2);
  } else {
    // Low-water crop (Mustard, Lentil)
    moistureScore = Math.min(98, 40 + rootMoisture * 2.0);
  }

  // 3. Salinity Suitability (Weight: 20%)
  let salinityScore = 95;
  if (zone.salinityRiskLevel === "high") {
    const soilSalinityEstimateDsM = 6.2;
    if (soilSalinityEstimateDsM > crop.salinityToleranceDsM) {
      salinityScore = Math.max(10, 95 - (soilSalinityEstimateDsM - crop.salinityToleranceDsM) * 28);
    }
  }

  // Calculate Weighted Overall Suitability
  const overallScore = Math.round(thermalScore * 0.4 + moistureScore * 0.4 + salinityScore * 0.2);

  let riskLevel: SuitabilityScore["riskLevel"] = "optimal";
  let primaryRiskReason = "Agronomic conditions optimal for normal yields.";
  let urgentShiftRequired = false;

  if (overallScore < 50) {
    riskLevel = "critical";
    urgentShiftRequired = true;
    if (moistureScore < 40) {
      primaryRiskReason = "Severe root-zone moisture deficit & falling aquifer make crop unviable.";
    } else if (thermalScore < 40) {
      primaryRiskReason = `Thermal heat spikes (>${crop.criticalFloweringTempC}°C) cause flower sterility.`;
    } else {
      primaryRiskReason = "Salinity levels exceed crop root tolerance threshold.";
    }
  } else if (overallScore < 75) {
    riskLevel = "moderate";
    primaryRiskReason = "Elevated climatic stress. Sowing window adjustment recommended.";
  }

  return {
    cropId: crop.id,
    overallScore,
    thermalScore: Math.round(thermalScore),
    moistureScore: Math.round(moistureScore),
    salinityScore: Math.round(salinityScore),
    riskLevel,
    primaryRiskReason,
    urgentShiftRequired,
  };
}

export function performCropShiftAssessment(
  currentCropId: string,
  zone: ZoneProfile,
  climate: CurrentClimateMetrics
): CropShiftAssessment {
  const currentCrop = ALL_CROPS.find((c) => c.id === currentCropId) || ALL_CROPS[0];
  const currentSuitability = evaluateCropSuitability(currentCrop, zone, climate);

  // Evaluate all other crops as alternatives
  const alternatives: AlternativeCropOption[] = ALL_CROPS.filter((c) => c.id !== currentCrop.id)
    .map((candidate) => {
      const suitability = evaluateCropSuitability(candidate, zone, climate);
      const waterRatio = candidate.waterReqMm / 1250;
      const candidateWaterUsageM3 = RICE_WATER_USAGE_M3_PER_ACRE * waterRatio;
      const waterSavedM3 = Math.max(0, Math.round(RICE_WATER_USAGE_M3_PER_ACRE - candidateWaterUsageM3));
      const costSavedBdt = Math.round(waterSavedM3 * DIESEL_IRRIGATION_COST_PER_M3_BDT);

      const rating: "A" | "B" | "C" = suitability.overallScore >= 80 ? "A" : suitability.overallScore >= 65 ? "B" : "C";

      return {
        crop: candidate,
        suitability,
        waterSavedM3PerAcre: waterSavedM3,
        estimatedCostSavedBdtPerAcre: costSavedBdt,
        resilienceRating: rating,
      };
    })
    .sort((a, b) => b.suitability.overallScore - a.suitability.overallScore);

  // Calculate Calendar Shift for current crop
  const isDelayedMonsoon = zone.salinityRiskLevel === "high";
  const shiftedDays = isDelayedMonsoon ? 16 : 14;
  const reason = isDelayedMonsoon
    ? "Delayed monsoon rain onset requires shifting seedling nursery by +16 days to avoid salinity spike."
    : "Late March heat spikes sterilize rice flowers. Delaying transplanting by +14 days aligns flowering with cooler night temperatures.";

  return {
    currentCrop,
    currentSuitability,
    shiftNeeded: currentSuitability.urgentShiftRequired,
    recommendedAlternatives: alternatives.slice(0, 3), // Top 3 alternatives
    adjustedSowingDate: {
      recommendedDate: "Nov 28 - Dec 18",
      shiftedDays,
      reason,
    },
  };
}
