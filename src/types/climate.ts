import { RiskLevel } from "./crop";

export interface CurrentClimateMetrics {
  airTemperatureC: number;
  maxTemperatureC: number;
  minTemperatureC: number;
  rootZoneSoilMoisturePercent: number; // SMAP L4 0-100cm (% of field capacity)
  surfaceSoilMoisturePercent: number;
  precipitationMm: number;
  relativeHumidityPercent: number;
  solarRadiationKwh: number;
  windSpeedKmh: number;
  observationDate: string;
}

export interface ClimateDriftSummary {
  fifteenYearTempBaselineC: number; // 2010-2025 baseline
  currentFiveYearMeanTempC: number;
  tempDriftDeltaC: number; // delta e.g. +1.4°C
  rootZoneMoistureDeficitPercent: number; // e.g. -28%
  marchHeatSpikeFrequencyDays: number;
  monsoonDelayDays: number; // e.g. +14 days
  driftSeverity: RiskLevel;
  verdict: string;
}

export interface ZoneProfile {
  id: string;
  nameEn: string;
  nameBn: string;
  districtEn: string;
  upazilaEn: string;
  lat: number;
  lon: number;
  elevationM: number;
  dominantCurrentCropId: string;
  groundwaterStatus: "critical_depletion" | "moderate" | "stable";
  salinityRiskLevel: "high" | "moderate" | "low";
  soilPh: number;
  primaryClimateVulnerability: string;
}
