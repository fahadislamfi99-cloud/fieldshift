"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import zonesData from "@/data/zones.json";
import cropsData from "@/data/crops.json";
import { ZoneProfile, CurrentClimateMetrics, ClimateDriftSummary } from "@/types/climate";
import { CropProfile, CropShiftAssessment } from "@/types/crop";
import { calculateClimateDrift } from "@/lib/climate-drift";
import { performCropShiftAssessment } from "@/lib/ecocrop";
import { optimizeSowingCalendar, CalendarShiftDetails } from "@/lib/calendar-optimizer";
import { getFallbackZoneMetrics } from "@/services/nasa-power";

const ZONES = zonesData as ZoneProfile[];
const CROPS = cropsData as CropProfile[];

export type FarmerStatus = "not_planted" | "already_planted";

interface AppContextType {
  zones: ZoneProfile[];
  crops: CropProfile[];
  currentZone: ZoneProfile;
  setZoneId: (id: string) => void;
  currentCrop: CropProfile;
  setCropId: (id: string) => void;
  lang: "en" | "bn";
  setLang: (lang: "en" | "bn") => void;
  farmerStatus: FarmerStatus;
  setFarmerStatus: (status: FarmerStatus) => void;
  waterAccess: string;
  setWaterAccess: (access: string) => void;
  metrics: CurrentClimateMetrics;
  drift: ClimateDriftSummary;
  assessment: CropShiftAssessment;
  calendar: CalendarShiftDetails;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zoneId, setZoneId] = useState<string>("barind_godagari");
  const [cropId, setCropId] = useState<string>("boro_rice");
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [farmerStatus, setFarmerStatus] = useState<FarmerStatus>("not_planted");
  const [waterAccess, setWaterAccess] = useState<string>("Deep Tubewell");

  const currentZone = useMemo(() => {
    return ZONES.find((z) => z.id === zoneId) || ZONES[0];
  }, [zoneId]);

  const currentCrop = useMemo(() => {
    return CROPS.find((c) => c.id === cropId) || CROPS[0];
  }, [cropId]);

  const metrics = useMemo(() => {
    return getFallbackZoneMetrics(currentZone.id);
  }, [currentZone.id]);

  const drift = useMemo(() => {
    return calculateClimateDrift(currentZone, metrics.airTemperatureC, metrics.rootZoneSoilMoisturePercent);
  }, [currentZone, metrics]);

  const assessment = useMemo(() => {
    return performCropShiftAssessment(currentCrop.id, currentZone, metrics);
  }, [currentCrop.id, currentZone, metrics]);

  const calendar = useMemo(() => {
    return optimizeSowingCalendar(currentCrop, currentZone, metrics);
  }, [currentCrop, currentZone, metrics]);

  const handleSetZoneId = (id: string) => {
    setZoneId(id);
    const matchedZone = ZONES.find((z) => z.id === id);
    if (matchedZone) {
      setCropId(matchedZone.dominantCurrentCropId);
    }
  };

  return (
    <AppContext.Provider
      value={{
        zones: ZONES,
        crops: CROPS,
        currentZone,
        setZoneId: handleSetZoneId,
        currentCrop,
        setCropId,
        lang,
        setLang,
        farmerStatus,
        setFarmerStatus,
        waterAccess,
        setWaterAccess,
        metrics,
        drift,
        assessment,
        calendar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
