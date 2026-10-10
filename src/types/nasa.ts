export interface NASAPowerParameterMap {
  [dateString: string]: number;
}

export interface NASAPowerRawResponse {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number, number];
  };
  properties: {
    parameter: {
      T2M?: NASAPowerParameterMap;
      T2M_MAX?: NASAPowerParameterMap;
      T2M_MIN?: NASAPowerParameterMap;
      PRECTOTCORR?: NASAPowerParameterMap;
      ALLSKY_SFC_SW_DWN?: NASAPowerParameterMap;
      RH2M?: NASAPowerParameterMap;
      WS2M?: NASAPowerParameterMap;
    };
  };
  header?: {
    title: string;
    api_version: string;
  };
}

export interface NASAQueryCoordinates {
  latitude: number;
  longitude: number;
}

import { CurrentClimateMetrics } from "./climate";

export interface LocationSuggestion {
  displayName: string;
  name: string;
  district: string;
  country: string;
  lat: number;
  lon: number;
}

export interface FieldLocationInfo {
  name: string;
  region: string;
  fullName: string;
  lat: number;
  lon: number;
}

export interface EvaluatedCrop {
  id: string;
  nameEn: string;
  nameBn: string;
  category: string;
  growthDays: number;
  waterReqMm: number;
  criticalFloweringTempC: number;
  waterSavingsVsRicePercent: number;
  overallScore: number;
  riskLevel: string;
  primaryRiskReason: string;
  rating: "A" | "B" | "C";
}

export interface FieldTelemetryResponse {
  location: FieldLocationInfo;
  metrics: CurrentClimateMetrics;
  cropCount: number;
  suitableCrops: EvaluatedCrop[];
  highRiskCrops: EvaluatedCrop[];
  historicalSample: NormalizedNASADataPoint[];
}

export interface NormalizedNASADataPoint {
  date: string;
  tempMeanC: number;
  tempMaxC: number;
  tempMinC: number;
  precipitationMm: number;
  humidityPercent: number;
  solarRadiationKwh: number;
  windSpeedKmh: number;
}
