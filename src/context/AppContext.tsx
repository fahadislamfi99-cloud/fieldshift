"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
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

const LOCAL_STORAGE_KEY = "fieldshift_user_options";

export interface SavedUserOptions {
  zoneId: string;
  cropId: string;
  farmerStatus: FarmerStatus;
  waterAccess: string;
  farmAcres?: number;
  lang?: "en" | "bn";
  hasConfigured: boolean;
}

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
  farmAcres: number;
  setFarmAcres: (acres: number) => void;
  metrics: CurrentClimateMetrics;
  drift: ClimateDriftSummary;
  assessment: CropShiftAssessment;
  calendar: CalendarShiftDetails;
  hasConfigured: boolean;
  setHasConfigured: (configured: boolean) => void;
  isHydrated: boolean;
  saveUserSelection: (options?: Partial<SavedUserOptions>) => void;
  resetUserSelection: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zoneId, setZoneId] = useState<string>("barind_tanore");
  const [cropId, setCropId] = useState<string>("boro_rice");
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [farmerStatus, setFarmerStatus] = useState<FarmerStatus>("not_planted");
  const [waterAccess, setWaterAccess] = useState<string>("Deep Tubewell");
  const [farmAcres, setFarmAcres] = useState<number>(2.0);
  const [hasConfigured, setHasConfigured] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Restore saved options from localStorage on initial load
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object") {
            if (typeof parsed.hasConfigured === "boolean") {
              setHasConfigured(parsed.hasConfigured);
            }
            if (parsed.zoneId && ZONES.some((z) => z.id === parsed.zoneId)) {
              setZoneId(parsed.zoneId);
            }
            if (parsed.cropId && CROPS.some((c) => c.id === parsed.cropId)) {
              setCropId(parsed.cropId);
            }
            if (parsed.farmerStatus === "not_planted" || parsed.farmerStatus === "already_planted") {
              setFarmerStatus(parsed.farmerStatus);
            }
            if (parsed.waterAccess && typeof parsed.waterAccess === "string") {
              setWaterAccess(parsed.waterAccess);
            }
            if (typeof parsed.farmAcres === "number" && !isNaN(parsed.farmAcres)) {
              setFarmAcres(parsed.farmAcres);
            }
            if (parsed.lang === "en" || parsed.lang === "bn") {
              setLang(parsed.lang);
            }
          }
        }
      }
    } catch (err) {
      console.error("Failed to load options from localStorage:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Automatically persist options to localStorage whenever they change (once configured)
  useEffect(() => {
    if (!isHydrated || !hasConfigured) return;
    try {
      if (typeof window !== "undefined") {
        const payload: SavedUserOptions = {
          zoneId,
          cropId,
          farmerStatus,
          waterAccess,
          farmAcres,
          lang,
          hasConfigured: true,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
      }
    } catch (err) {
      console.error("Failed to persist options to localStorage:", err);
    }
  }, [zoneId, cropId, farmerStatus, waterAccess, farmAcres, lang, hasConfigured, isHydrated]);

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

  const saveUserSelection = (options?: Partial<SavedUserOptions>) => {
    const nextZoneId = options?.zoneId ?? zoneId;
    const nextCropId = options?.cropId ?? cropId;
    const nextStatus = options?.farmerStatus ?? farmerStatus;
    const nextWater = options?.waterAccess ?? waterAccess;
    const nextAcres = options?.farmAcres ?? farmAcres;
    const nextLang = options?.lang ?? lang;
    const nextConfigured = options?.hasConfigured !== undefined ? options.hasConfigured : true;

    if (options?.zoneId) setZoneId(options.zoneId);
    if (options?.cropId) setCropId(options.cropId);
    if (options?.farmerStatus) setFarmerStatus(options.farmerStatus);
    if (options?.waterAccess) setWaterAccess(options.waterAccess);
    if (options?.farmAcres !== undefined) setFarmAcres(options.farmAcres);
    if (options?.lang) setLang(options.lang);
    setHasConfigured(nextConfigured);

    try {
      if (typeof window !== "undefined") {
        const payload: SavedUserOptions = {
          zoneId: nextZoneId,
          cropId: nextCropId,
          farmerStatus: nextStatus,
          waterAccess: nextWater,
          farmAcres: nextAcres,
          lang: nextLang,
          hasConfigured: nextConfigured,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
      }
    } catch (err) {
      console.error("Failed to save user options to localStorage:", err);
    }
  };

  const resetUserSelection = () => {
    setHasConfigured(false);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch (err) {
      console.error("Failed to clear localStorage:", err);
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
        farmAcres,
        setFarmAcres,
        metrics,
        drift,
        assessment,
        calendar,
        hasConfigured,
        setHasConfigured,
        isHydrated,
        saveUserSelection,
        resetUserSelection,
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
