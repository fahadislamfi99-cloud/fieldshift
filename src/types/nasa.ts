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
