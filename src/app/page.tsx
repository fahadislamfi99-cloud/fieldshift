"use client";

import React, { useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { HeroHeader } from "@/components/header/HeroHeader";
import { WaterEfficiencyCard } from "@/components/metrics/WaterEfficiencyCard";
import { CropViabilityGauge } from "@/components/metrics/CropViabilityGauge";
import { ConditionStatusCard } from "@/components/metrics/ConditionStatusCard";
import { CropShiftMatrix } from "@/components/shift/CropShiftMatrix";
import { BottomDock, NavTab } from "@/components/navigation/BottomDock";

import zonesData from "@/data/zones.json";
import cropsData from "@/data/crops.json";
import { ZoneProfile } from "@/types/climate";
import { CropProfile } from "@/types/crop";
import { calculateClimateDrift } from "@/lib/climate-drift";
import { performCropShiftAssessment } from "@/lib/ecocrop";
import { optimizeSowingCalendar } from "@/lib/calendar-optimizer";
import { getFallbackZoneMetrics } from "@/services/nasa-power";
import { Globe2, Sparkles, Satellite, Info } from "lucide-react";

// Safe dynamic import for WebGL Map
const FieldMap = dynamic(
  () => import("@/components/map/FieldMap").then((mod) => mod.FieldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[185px] w-full rounded-[22px] bg-[#E8F0E9] animate-pulse flex items-center justify-center text-xs font-semibold text-[#576B5F]">
        Loading Satellite Mesh...
      </div>
    ),
  }
);

const ZONES = zonesData as ZoneProfile[];
const CROPS = cropsData as CropProfile[];

export default function Home() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [activeZoneId, setActiveZoneId] = useState<string>("barind_godagari");
  const [activeCropId, setActiveCropId] = useState<string>("boro_rice");
  const [activeTab, setActiveTab] = useState<NavTab>("home");

  const shiftSectionRef = useRef<HTMLDivElement>(null);

  // Active Zone & Crop
  const currentZone = useMemo(() => {
    return ZONES.find((z) => z.id === activeZoneId) || ZONES[0];
  }, [activeZoneId]);

  const currentCrop = useMemo(() => {
    return CROPS.find((c) => c.id === activeCropId) || CROPS[0];
  }, [activeCropId]);

  // Reactive NASA Climate Telemetry
  const climateMetrics = useMemo(() => {
    return getFallbackZoneMetrics(currentZone.id);
  }, [currentZone.id]);

  // Reactive Climate Drift Summary
  const driftSummary = useMemo(() => {
    return calculateClimateDrift(
      currentZone,
      climateMetrics.airTemperatureC,
      climateMetrics.rootZoneSoilMoisturePercent
    );
  }, [currentZone, climateMetrics]);

  // Reactive Modified EcoCrop Suitability Assessment
  const assessment = useMemo(() => {
    return performCropShiftAssessment(currentCrop.id, currentZone, climateMetrics);
  }, [currentCrop.id, currentZone, climateMetrics]);

  // Reactive Sowing Calendar Optimization
  const calendarDetails = useMemo(() => {
    return optimizeSowingCalendar(currentCrop, currentZone, climateMetrics);
  }, [currentCrop, currentZone, climateMetrics]);

  // Toggle between Barind Tract and Coastal Belt
  const handleToggleZone = () => {
    const nextZoneId = activeZoneId === "barind_godagari" ? "coastal_shyamnagar" : "barind_godagari";
    setActiveZoneId(nextZoneId);
    // Auto-select dominant crop for that region
    const nextZone = ZONES.find((z) => z.id === nextZoneId);
    if (nextZone) {
      setActiveCropId(nextZone.dominantCurrentCropId);
    }
  };

  const handleScrollToShift = () => {
    shiftSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#DDE6DE] flex justify-center items-start sm:py-6 selection:bg-[#65C938] selection:text-[#14211A]">
      {/* Mobile-First Frame Container (Max 440px width matching iPhone / Android viewport) */}
      <main className="w-full max-w-[440px] min-h-screen sm:min-h-[880px] bg-[#EFF4EF] sm:rounded-[36px] shadow-[0_20px_60px_rgba(18,43,30,0.18)] overflow-hidden flex flex-col relative border border-[#E2ECE3]/80">
        
        {/* Floating Language Switcher Pill (Top Right on Header) */}
        <div className="absolute top-4 right-16 z-30">
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="px-2.5 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-[11px] font-bold text-white hover:bg-white/35 transition-all flex items-center gap-1 shadow-sm active:scale-95"
            title="Toggle Language"
          >
            <Globe2 size={12} />
            <span>{lang === "en" ? "বাংলা" : "EN"}</span>
          </button>
        </div>

        {/* 1. Photographic Hero Header */}
        <HeroHeader
          zone={currentZone}
          metrics={climateMetrics}
          drift={driftSummary}
          onZoneToggle={handleToggleZone}
          lang={lang}
        />

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 px-4 py-3 flex flex-col gap-3 pb-24 overflow-y-auto">
          
          {/* Quick Crop Selector Pill Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-bold text-[#576B5F] flex-shrink-0 mr-1">
              {lang === "en" ? "Crop:" : "ফসল:"}
            </span>
            {CROPS.map((crop) => {
              const isActive = crop.id === currentCrop.id;
              return (
                <button
                  key={crop.id}
                  onClick={() => setActiveCropId(crop.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 flex-shrink-0 ${
                    isActive
                      ? "bg-[#1F513A] text-white shadow-sm"
                      : "bg-white text-[#576B5F] hover:bg-[#F6F9F6] border border-[#E2ECE3]"
                  }`}
                >
                  {lang === "en" ? crop.nameEn.split(" ")[0] : crop.nameBn.split(" ")[0]}
                </button>
              );
            })}
          </div>

          {/* 2. Water Efficiency Segmented Pill Meter Card */}
          <WaterEfficiencyCard
            moisturePercent={climateMetrics.rootZoneSoilMoisturePercent}
            deficitPercent={driftSummary.rootZoneMoistureDeficitPercent}
            lang={lang}
          />

          {/* 3. Crop Viability Gauge Card */}
          <CropViabilityGauge
            crop={currentCrop}
            suitability={assessment.currentSuitability}
            onExploreShift={handleScrollToShift}
            lang={lang}
          />

          {/* 4. Soil & Stress 3-Pillar Status Card */}
          <ConditionStatusCard zone={currentZone} lang={lang} />

          {/* 5. Embedded Interactive WebGL Micro-Map */}
          <FieldMap
            zone={currentZone}
            moisturePercent={climateMetrics.rootZoneSoilMoisturePercent}
            onOpenFullMap={handleScrollToShift}
            lang={lang}
          />

          {/* 6. The Prescriptive Double Shift Engine */}
          <div ref={shiftSectionRef}>
            <CropShiftMatrix
              assessment={assessment}
              calendar={calendarDetails}
              lang={lang}
            />
          </div>

          {/* NASA Data Attribution Card */}
          <div className="w-full bg-white/70 rounded-2xl p-3 border border-[#E2ECE3] flex items-center justify-between text-[11px] text-[#576B5F]">
            <div className="flex items-center gap-2">
              <Satellite size={16} className="text-[#1F513A]" />
              <span>NASA POWER • SMAP L4 • ECOSTRESS</span>
            </div>
            <span className="font-semibold text-[#1F513A]">
              Space Apps 2026
            </span>
          </div>

        </div>

        {/* 7. Floating Bottom Navigation Dock */}
        <BottomDock
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === "crop_shift" || tab === "calendar") {
              handleScrollToShift();
            }
          }}
          lang={lang}
        />

      </main>
    </div>
  );
}
