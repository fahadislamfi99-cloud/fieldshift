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
} from "lucide-react";

// Safe dynamic import for WebGL Map
const FieldMap = dynamic(
  () => import("@/components/map/FieldMap").then((mod) => mod.FieldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] w-full rounded-2xl bg-stone-150 animate-pulse flex items-center justify-center text-xs font-semibold text-stone-500">
        Loading Satellite Mesh...
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
      {/* Top Hero Section: Region Context & Mission Alert */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E7F6E1] text-[#163B2A] border border-[#C4E6BB]">
              {currentZone.districtEn} District
            </span>
            <span className="text-xs text-stone-500">
              Coordinates: {currentZone.lat.toFixed(3)}°N, {currentZone.lon.toFixed(3)}°E
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-1 tracking-tight">
            {lang === "en" ? `${currentZone.nameEn} Adaptation Monitor` : `${currentZone.nameBn} জলবায়ু পর্যবেক্ষণ`}
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            {currentZone.primaryClimateVulnerability}
          </p>
        </div>

        {/* Action Link to Full Crop Shift Engine */}
        <Link
          href="/shift"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#163B2A] hover:bg-[#1F513A] text-white text-xs font-bold shadow-xs transition-all active:scale-95 flex-shrink-0"
        >
          <span>{lang === "en" ? "Explore Crop Shift Engine" : "ফসল পরিবর্তন ইঞ্জিন দেখুন"}</span>
          <ArrowRight size={14} className="text-[#65C938]" />
        </Link>
      </div>

      {/* 4 Key Agronomic Metric Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Temperature & 15-Yr Drift */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-2">
            <span>{lang === "en" ? "Thermal Drift" : "তাপমাত্রা বৃদ্ধি"}</span>
            <Thermometer size={16} className="text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
              {metrics.airTemperatureC.toFixed(1)}°C
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
              +{drift.tempDriftDeltaC}°C
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1.5">
            {lang === "en" ? "vs 15-Yr Historical Baseline" : "১৫ বছরের গড় ঐতিহাসিক মাত্রার চেয়ে"}
          </p>
        </div>

        {/* Metric 2: Root-Zone Soil Moisture */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-2">
            <span>{lang === "en" ? "Root Moisture (0–100cm)" : "মূল অঞ্চলের আর্দ্রতা"}</span>
            <Droplets size={16} className="text-sky-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
              {metrics.rootZoneSoilMoisturePercent}%
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
              {drift.rootZoneMoistureDeficitPercent}% Deficit
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1.5">
            NASA SMAP L4 Assimilation
          </p>
        </div>

        {/* Metric 3: Planned Crop Viability */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-2">
            <span>{lang === "en" ? "Crop Suitability" : "ফসলের উপযোগিতা"}</span>
            <Sprout size={16} className="text-emerald-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
              {assessment.currentSuitability.overallScore}%
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isCritical
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}
            >
              {isCritical ? "Critical Risk" : "Viable"}
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1.5 truncate">
            {currentCrop.nameEn}
          </p>
        </div>

        {/* Metric 4: Sowing Calendar Offset */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4.5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-2">
            <span>{lang === "en" ? "Sowing Shift" : "বপন সময়সূচী পরিবর্তন"}</span>
            <Calendar size={16} className="text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
              +{calendar.shiftDeltaDays}d
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {calendar.heatAvoidanceScorePercent}% Safe
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1.5">
            {lang === "en" ? "Dodges March heat waves" : "মার্চের তাপদাহ এড়াতে স্থানান্তর"}
          </p>
        </div>
      </div>

      {/* Main 2-Column Responsive Dashboard Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Crop Evaluator & Soil Metrics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Crop Switcher Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-stone-900">
                {lang === "en" ? "Select Field Crop" : "জমির ফসল নির্বাচন করুন"}
              </h2>
              <span className="text-xs text-stone-500">
                {crops.length} {lang === "en" ? "Models Available" : "টি মডেল"}
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
                        ? "bg-[#163B2A] text-white border-[#163B2A] shadow-xs"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200"
                    }`}
                  >
                    <p className="text-xs font-bold truncate">
                      {lang === "en" ? crop.nameEn.split("(")[0] : crop.nameBn.split("(")[0]}
                    </p>
                    <p className={`text-[10px] mt-0.5 ${isActive ? "text-[#65C938]" : "text-stone-500"}`}>
                      {crop.growthDays}d • {crop.waterReqMm}mm
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Crop Vulnerability Assessment */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  {lang === "en" ? "Agronomic Diagnostics" : "কৃষিগত মূল্যায়ন"}
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-0.5">
                  {currentCrop.nameEn}
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                  isCritical
                    ? "bg-red-100 text-red-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {isCritical ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                {isCritical ? "Shift Recommended" : "Suitable"}
              </span>
            </div>

            {/* Sub-Scores (Thermal, Moisture, Salinity) */}
            <div className="space-y-2.5 pt-2 border-t border-stone-100">
              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>{lang === "en" ? "Thermal Compatibility" : "তাপমাত্রা সহনশীলতা"}</span>
                  <span className="tabular-nums">{assessment.currentSuitability.thermalScore}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${assessment.currentSuitability.thermalScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>{lang === "en" ? "Root Moisture Compatibility" : "পানির সহজলভ্যতা"}</span>
                  <span className="tabular-nums">{assessment.currentSuitability.moistureScore}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${assessment.currentSuitability.moistureScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                  <span>{lang === "en" ? "Salinity Resilience" : "লবণাক্ততা সহনশীলতা"}</span>
                  <span className="tabular-nums">{assessment.currentSuitability.salinityScore}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${assessment.currentSuitability.salinityScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Primary Risk Callout */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed">
              <span className="font-bold text-stone-900">{lang === "en" ? "Agronomic Verdict: " : "সিদ্ধান্ত: "}</span>
              {assessment.currentSuitability.primaryRiskReason}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Satellite Map & Double Shift Quick Engine */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive WebGL Satellite Map */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  {lang === "en" ? "Geospatial Observation Mesh" : "উপগ্রহ ভিত্তিক ভূ-স্থানিক মানচিত্র"}
                </h3>
                <p className="text-xs text-stone-500">
                  MapLibre WebGL • {currentZone.upazilaEn}, {currentZone.districtEn}
                </p>
              </div>

              <Link
                href="/satellite"
                className="text-xs font-bold text-[#163B2A] hover:underline flex items-center gap-1"
              >
                <span>{lang === "en" ? "Full-Screen Telemetry" : "পূর্ণাঙ্গ ডেটা"}</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="rounded-xl overflow-hidden border border-stone-200">
              <FieldMap
                zone={currentZone}
                moisturePercent={metrics.rootZoneSoilMoisturePercent}
                lang={lang}
              />
            </div>
          </div>

          {/* Quick Double Shift Recommendation Teaser */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  {lang === "en" ? "Prescriptive Shift Strategy" : "নির্ধারিত স্থানান্তর কৌশল"}
                </span>
                <h3 className="text-base font-bold text-stone-900">
                  {lang === "en" ? "The Double Shift Decision" : "দ্বৈত পরিবর্তন সিদ্ধান্ত"}
                </h3>
              </div>

              <Link
                href="/shift"
                className="px-3 py-1.5 rounded-lg bg-[#E7F6E1] text-[#163B2A] hover:bg-[#D4ECCB] text-xs font-bold transition-colors"
              >
                {lang === "en" ? "Open Full Matrix" : "ম্যাট্রিক্স খুলুন"}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Option 1: The Crop Shift */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white transition-colors">
                <div className="flex items-center gap-2 text-[#163B2A] font-bold text-xs mb-1.5">
                  <Sprout size={16} />
                  <span>1. {lang === "en" ? "The Crop Shift" : "ফসল পরিবর্তন"}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {lang === "en"
                    ? `Swap out ${currentCrop.nameEn.split("(")[0]} for ${assessment.recommendedAlternatives[0]?.crop.nameEn.split("(")[0]}.`
                    : `${currentCrop.nameBn.split("(")[0]} এর বদলে ${assessment.recommendedAlternatives[0]?.crop.nameBn.split("(")[0]} চাষ করুন।`}
                </p>
                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-stone-200/80">
                  <span className="text-emerald-700">
                    +{assessment.recommendedAlternatives[0]?.crop.waterSavingsVsRicePercent}% Water Saved
                  </span>
                  <Link href="/shift" className="text-stone-900 hover:underline">
                    Details →
                  </Link>
                </div>
              </div>

              {/* Option 2: The Calendar Shift */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white transition-colors">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs mb-1.5">
                  <Calendar size={16} />
                  <span>2. {lang === "en" ? "The Calendar Shift" : "সময় পরিবর্তন"}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {lang === "en"
                    ? `If growing ${currentCrop.nameEn.split("(")[0]}, delay sowing to ${calendar.nasaAdjustedWindow}.`
                    : `একই ফসল রাখতে চাইলে বীজ বপন ${calendar.nasaAdjustedWindow} পর্যন্ত পিছিয়ে দিন।`}
                </p>
                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-stone-200/80">
                  <span className="text-indigo-700">
                    +{calendar.shiftDeltaDays} Days Offset
                  </span>
                  <Link href="/calendar" className="text-stone-900 hover:underline">
                    View Sowing →
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
