"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useApp } from "@/context/AppContext";
import {
  Thermometer,
  Droplets,
  AlertTriangle,
  Calendar,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Sprout,
  CheckCircle2,
  Wind,
  Sun,
  Layers,
  Crosshair,
  Sparkles,
  Radar,
  Radio,
} from "lucide-react";

// Safe dynamic import for WebGL Map
const FieldMap = dynamic(
  () => import("@/components/map/FieldMap").then((mod) => mod.FieldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] w-full rounded-2xl bg-stone-900/60 border border-emerald-500/20 animate-pulse flex items-center justify-center text-xs font-mono text-emerald-400">
        INITIALIZING ORBITAL SATELLITE MESH...
      </div>
    ),
  }
);

export default function DashboardOverview() {
  const { currentZone, currentCrop, crops, setCropId, metrics, drift, assessment, calendar, lang } =
    useApp();

  const isCritical = assessment.currentSuitability.overallScore < 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Mission Context Header Banner */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Subtle Background Glow Mesh */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              TARGET REGION: {currentZone.districtEn.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-stone-400">
              COORDINATES: {currentZone.lat.toFixed(3)}°N, {currentZone.lon.toFixed(3)}°E
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight flex items-center gap-2">
            <span>{lang === "en" ? `${currentZone.nameEn}` : currentZone.nameBn}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-stone-800 text-stone-300 font-mono font-bold">
              MONITOR HUD
            </span>
          </h1>
          <p className="text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
            {currentZone.primaryClimateVulnerability}
          </p>
        </div>

        {/* Action Link to Full Crop Shift Engine */}
        <Link
          href="/shift"
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all active:scale-95 flex-shrink-0 border border-emerald-400/40"
        >
          <span>{lang === "en" ? "ACTIVATE CROP SHIFT ENGINE" : "ফসল পরিবর্তন ইঞ্জিন চালু করুন"}</span>
          <ArrowRight size={14} className="text-white" />
        </Link>
      </div>

      {/* 4 Luminous Telemetry HUD Pods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pod 1: Thermal Anomaly */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 font-semibold">
            <span>THERMAL DRIFT</span>
            <Thermometer size={16} className="text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-white tabular-nums tracking-tight">
              {metrics.airTemperatureC.toFixed(1)}°C
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
              +{drift.tempDriftDeltaC}°C
            </span>
          </div>
          <p className="text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-800/80">
            NASA POWER 15-Yr Delta
          </p>
        </div>

        {/* Pod 2: Root-Zone Soil Moisture */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 font-semibold">
            <span>ROOT MOISTURE (0–100cm)</span>
            <Droplets size={16} className="text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-white tabular-nums tracking-tight">
              {metrics.rootZoneSoilMoisturePercent}%
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
              {drift.rootZoneMoistureDeficitPercent}% DEFICIT
            </span>
          </div>
          <p className="text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-800/80">
            SMAP L4 Assimilation
          </p>
        </div>

        {/* Pod 3: Planned Crop Suitability */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 font-semibold">
            <span>CROP SUITABILITY</span>
            <Sprout size={16} className="text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-white tabular-nums tracking-tight">
              {assessment.currentSuitability.overallScore}%
            </span>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                isCritical
                  ? "bg-red-500/20 text-red-400 border border-red-500/40"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              }`}
            >
              {isCritical ? "CRITICAL RISK" : "VIABLE"}
            </span>
          </div>
          <p className="text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-800/80 truncate">
            {currentCrop.nameEn}
          </p>
        </div>

        {/* Pod 4: Sowing Calendar Offset */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400 font-semibold">
            <span>SOWING WINDOW SHIFT</span>
            <Calendar size={16} className="text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-mono font-black text-white tabular-nums tracking-tight">
              +{calendar.shiftDeltaDays}d
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              {calendar.heatAvoidanceScorePercent}% SAFE
            </span>
          </div>
          <p className="text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-800/80">
            Flowering Heat Avoidance
          </p>
        </div>
      </div>

      {/* Main 2-Column Responsive Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Model Selector & Diagnostic HUD */}
        <div className="lg:col-span-5 space-y-6">
          {/* Crop Selector Matrix */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold text-white flex items-center gap-1.5">
                <Radar size={15} className="text-emerald-400" />
                <span>ACTIVE CROP MODEL</span>
              </h2>
              <span className="text-[11px] font-mono text-stone-400">
                {crops.length} ENVELOPES
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {crops.map((crop) => {
                const isActive = crop.id === currentCrop.id;
                return (
                  <button
                    key={crop.id}
                    onClick={() => setCropId(crop.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all active:scale-95 ${
                      isActive
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] font-bold"
                        : "bg-stone-900/40 hover:bg-stone-850 text-stone-300 border-stone-800/80"
                    }`}
                  >
                    <p className="text-xs font-bold truncate">
                      {lang === "en" ? crop.nameEn.split("(")[0] : crop.nameBn.split("(")[0]}
                    </p>
                    <p className={`text-[10px] font-mono mt-0.5 ${isActive ? "text-emerald-400" : "text-stone-500"}`}>
                      {crop.growthDays}d • {crop.waterReqMm}mm
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Envelope Pod */}
          <div className="glass-panel rounded-2xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  AGRONOMIC STRESS TELEMETRY
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {currentCrop.nameEn}
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 ${
                  isCritical
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {isCritical ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                {isCritical ? "SHIFT REQUIRED" : "VIABLE"}
              </span>
            </div>

            {/* Glowing Compatibility Meters */}
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <div>
                <div className="flex justify-between text-xs font-mono font-semibold text-stone-300 mb-1">
                  <span>THERMAL ENVELOPE</span>
                  <span className="text-amber-400 tabular-nums">{assessment.currentSuitability.thermalScore}%</span>
                </div>
                <div className="h-2 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    style={{ width: `${assessment.currentSuitability.thermalScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono font-semibold text-stone-300 mb-1">
                  <span>ROOT AQUIFER CAPACITY</span>
                  <span className="text-sky-400 tabular-nums">{assessment.currentSuitability.moistureScore}%</span>
                </div>
                <div className="h-2 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                    style={{ width: `${assessment.currentSuitability.moistureScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono font-semibold text-stone-300 mb-1">
                  <span>SALINITY RESILIENCE</span>
                  <span className="text-emerald-400 tabular-nums">{assessment.currentSuitability.salinityScore}%</span>
                </div>
                <div className="h-2 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={{ width: `${assessment.currentSuitability.salinityScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Directive Callout */}
            <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-xs text-stone-300 leading-relaxed font-mono">
              <span className="font-bold text-emerald-400">DECISION DIRECTIVE: </span>
              {assessment.currentSuitability.primaryRiskReason}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): WebGL Satellite Radar & Double Shift Decision */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive WebGL Satellite Radar */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-mono font-bold text-white flex items-center gap-1.5">
                  <Crosshair size={15} className="text-emerald-400" />
                  <span>GEOSPATIAL ORBITAL MESH</span>
                </h3>
                <p className="text-xs font-mono text-stone-400">
                  MapLibre WebGL • High-Res Earth Observation Mesh
                </p>
              </div>

              <Link
                href="/satellite"
                className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
              >
                <span>OPEN RADAR TERMINAL</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="rounded-xl overflow-hidden border border-emerald-500/20">
              <FieldMap
                zone={currentZone}
                moisturePercent={metrics.rootZoneSoilMoisturePercent}
                lang={lang}
              />
            </div>
          </div>

          {/* Prescriptive Double Shift Execution Pod */}
          <div className="glass-panel rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  PRESCRIPTIVE ADAPTATION ENGINE
                </span>
                <h3 className="text-base font-bold text-white">
                  The Double Shift Decision
                </h3>
              </div>

              <Link
                href="/shift"
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-mono font-bold transition-all"
              >
                OPEN MATRIX
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Shift 1: Crop Shift */}
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-stone-900/60 hover:bg-stone-850/80 transition-all space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs">
                  <Sprout size={16} />
                  <span>1. THE CROP SHIFT</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Swap out {currentCrop.nameEn.split("(")[0]} for{" "}
                  <span className="text-white font-bold">
                    {assessment.recommendedAlternatives[0]?.crop.nameEn.split("(")[0]}
                  </span>.
                </p>
                <div className="flex items-center justify-between text-xs font-mono font-bold pt-2 border-t border-stone-800">
                  <span className="text-emerald-400">
                    +{assessment.recommendedAlternatives[0]?.crop.waterSavingsVsRicePercent}% Water Saved
                  </span>
                  <Link href="/shift" className="text-stone-400 hover:text-white transition-colors">
                    Details →
                  </Link>
                </div>
              </div>

              {/* Shift 2: Calendar Shift */}
              <div className="p-4 rounded-xl border border-indigo-500/20 bg-stone-900/60 hover:bg-stone-850/80 transition-all space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-mono font-bold text-xs">
                  <Calendar size={16} />
                  <span>2. THE CALENDAR SHIFT</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  If growing {currentCrop.nameEn.split("(")[0]}, delay sowing to{" "}
                  <span className="text-white font-bold">{calendar.nasaAdjustedWindow}</span>.
                </p>
                <div className="flex items-center justify-between text-xs font-mono font-bold pt-2 border-t border-stone-800">
                  <span className="text-indigo-400">
                    +{calendar.shiftDeltaDays} Days Offset
                  </span>
                  <Link href="/calendar" className="text-stone-400 hover:text-white transition-colors">
                    Sowing →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
