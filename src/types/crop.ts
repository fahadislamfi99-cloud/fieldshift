export type CropCategory = "cereal" | "oilseed" | "pulse" | "cash";
export type RiskLevel = "optimal" | "moderate" | "critical";

export interface SowingWindow {
  startMonth: number; // 1-12
  startDay: number;
  endMonth: number;
  endDay: number;
  label: string;
}

export interface CropProfile {
  id: string;
  nameEn: string;
  nameBn: string;
  category: CropCategory;
  growthDays: number;
  waterReqMm: number; // total seasonal water demand in mm
  tempMin: number; // minimum viable temp (C)
  tempOptMin: number;
  tempOptMax: number;
  tempMax: number;
  criticalFloweringTempC: number; // sterilization threshold during pollination
  salinityToleranceDsM: number; // ECe threshold in dS/m
  typicalSowing: SowingWindow;
  waterSavingsVsRicePercent: number; // % water saved vs Boro Rice
  profitStability: "high" | "moderate" | "low";
  iconName: string;
  descriptionEn: string;
  descriptionBn: string;
}

export interface SuitabilityScore {
  cropId: string;
  overallScore: number; // 0-100
  thermalScore: number; // 0-100
  moistureScore: number; // 0-100
  salinityScore: number; // 0-100
  riskLevel: RiskLevel;
  primaryRiskReason: string;
  urgentShiftRequired: boolean;
}

export interface AlternativeCropOption {
  crop: CropProfile;
  suitability: SuitabilityScore;
  waterSavedM3PerAcre: number;
  estimatedCostSavedBdtPerAcre: number;
  resilienceRating: "A" | "B" | "C";
}

export interface CropShiftAssessment {
  currentCrop: CropProfile;
  currentSuitability: SuitabilityScore;
  shiftNeeded: boolean;
  recommendedAlternatives: AlternativeCropOption[];
  adjustedSowingDate: {
    recommendedDate: string;
    shiftedDays: number;
    reason: string;
  };
}
