"use client";

import React from "react";
import { ZoneProfile, CurrentClimateMetrics, ClimateDriftSummary } from "@/types/climate";
import { Settings, MapPin, Sun, Thermometer, Wind, CloudRain, RefreshCw } from "lucide-react";

interface HeroHeaderProps {
  zone: ZoneProfile;
  metrics: CurrentClimateMetrics;
  drift: ClimateDriftSummary;
  onZoneToggle: () => void;
  lang: "en" | "bn";
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  zone,
  metrics,
  drift,
  onZoneToggle,
  lang,
}) => {
  return (
    <header className="relative w-full rounded-b-[28px] overflow-hidden shadow-md bg-[#163B2A] text-white">
      {/* Background Photography with atmospheric gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80')`,
        }}
      >
        {/* Subtle Dark Vignette & Organic Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-[#163B2A]/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-5 pt-4 pb-5 flex flex-col gap-3">
        {/* Top Bar: Action Buttons & Profile */}
        <div className="flex items-center justify-between">
          <button
            aria-label="Settings"
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <Settings size={18} />
          </button>

          <button
            onClick={onZoneToggle}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white hover:bg-white/30 transition-all active:scale-95"
            title="Switch Pilot Region"
          >
            <RefreshCw size={12} className="animate-spin-slow" />
            <span>{zone.id === "barind_godagari" ? "Barind Tract" : "Coastal Belt"}</span>
          </button>

          <div className="w-9 h-9 rounded-full border-2 border-white/60 overflow-hidden shadow-sm bg-white/20">
            {/* User Avatar */}
            <div className="w-full h-full bg-[#65C938] flex items-center justify-center text-xs font-bold text-[#14211A]">
              RU
            </div>
          </div>
        </div>

        {/* Greeting & Location */}
        <div>
          <h1 className="text-white text-base font-semibold tracking-tight">
            {lang === "en" ? "Hi, Good Morning Farmer" : "শুভ সকাল, কৃষক ভাই"}
          </h1>
          <div className="flex items-center gap-1 text-white/85 text-xs mt-0.5 font-medium">
            <MapPin size={13} className="text-[#65C938]" />
            <span>{lang === "en" ? `${zone.upazilaEn}, ${zone.districtEn}` : zone.nameBn}</span>
          </div>
        </div>

        {/* Primary Weather / Thermal Headline */}
        <div className="flex items-baseline justify-between mt-1">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold tracking-tight tabular-nums">
                {Math.round(metrics.airTemperatureC)}°C
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/80 backdrop-blur-sm border border-red-300/40 font-semibold text-white">
                +{drift.tempDriftDeltaC}°C Drift
              </span>
            </div>
            <p className="text-white/70 text-[11px] mt-0.5">
              {lang === "en" ? "15-Yr NASA Trend vs Baseline" : "১৫ বছরের গড় তাপমাত্রা বৃদ্ধি"}
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-white/95">
              <Sun size={15} className="text-amber-300" />
              <span>{lang === "en" ? "Sunny Day" : "রৌদ্রোজ্জ্বল দিন"}</span>
            </div>
            <p className="text-white/70 text-[11px] mt-0.5">
              {metrics.observationDate}
            </p>
          </div>
        </div>

        {/* 3 Frosted Glass Telemetry Chips */}
        <div className="grid grid-cols-3 gap-2 mt-1">
          {/* Chip 1: Thermal Anomaly */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
            <Thermometer size={16} className="text-amber-300 mb-1" />
            <span className="text-[10px] text-white/80 font-medium">
              {lang === "en" ? "Max Temp" : "সর্বোচ্চ"}
            </span>
            <span className="text-xs font-bold text-white mt-0.5 tabular-nums">
              {metrics.maxTemperatureC}°C
            </span>
          </div>

          {/* Chip 2: Wind */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
            <Wind size={16} className="text-emerald-300 mb-1" />
            <span className="text-[10px] text-white/80 font-medium">
              {lang === "en" ? "Wind Speed" : "বাতাস"}
            </span>
            <span className="text-xs font-bold text-white mt-0.5 tabular-nums">
              {metrics.windSpeedKmh} km/h
            </span>
          </div>

          {/* Chip 3: Rain Forecast */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-2.5 flex flex-col items-center justify-center text-center">
            <CloudRain size={16} className="text-sky-300 mb-1" />
            <span className="text-[10px] text-white/80 font-medium">
              {lang === "en" ? "Precipitation" : "বৃষ্টিপাত"}
            </span>
            <span className="text-xs font-bold text-white mt-0.5 tabular-nums">
              {metrics.precipitationMm} mm
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
