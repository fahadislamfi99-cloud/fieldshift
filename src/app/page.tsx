"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  MapPin,
  Sprout,
  Droplets,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Sliders,
} from "lucide-react";

export default function HomePage() {
  const {
    currentZone,
    currentCrop,
    zones,
    setZoneId,
    crops,
    setCropId,
    lang,
    farmerStatus,
    setFarmerStatus,
    waterAccess,
    setWaterAccess,
    hasConfigured,
    saveUserSelection,
    resetUserSelection,
  } = useApp();

  const handleSelectZone = (id: string) => {
    setZoneId(id);
    saveUserSelection({ zoneId: id, hasConfigured: true });
  };

  const handleSelectCrop = (id: string) => {
    setCropId(id);
    saveUserSelection({ cropId: id, hasConfigured: true });
  };

  const handleSelectWater = (source: string) => {
    setWaterAccess(source);
    saveUserSelection({ waterAccess: source, hasConfigured: true });
  };

  const handleSelectStatus = (status: "not_planted" | "already_planted") => {
    setFarmerStatus(status);
    saveUserSelection({ farmerStatus: status, hasConfigured: true });
  };

  const handleProceed = () => {
    saveUserSelection({
      hasConfigured: true,
      zoneId: currentZone.id,
      cropId: currentCrop.id,
      farmerStatus,
      waterAccess,
    });
  };

  const isPlanted = farmerStatus === "already_planted";

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* HERO BANNER CARD (Full background image spanning edge-to-edge) */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-h-[500px] sm:min-h-[540px] flex flex-col justify-between">
        {/* FULL BACKGROUND PHOTOGRAPHIC LANDSCAPE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
        />

        {/* Soft gradient fade overlay so left text and filters are 100% readable while scenery shines */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/90 sm:via-white/80 to-transparent pointer-events-none" />

        {/* Floating Location Marker on the Landscape Photo (Desktop) */}
        <div className="hidden xl:flex absolute top-12 right-20 z-20 flex-col items-center pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-xs font-bold text-stone-900 shadow-md flex items-center gap-1.5">
            <MapPin size={14} className="text-[#1E7B48]" />
            <span>{currentZone.nameEn.split(",")[0]}, Rajshahi</span>
          </div>
          {/* Pin Stem Line */}
          <div className="w-0.5 h-20 bg-white/90 shadow-sm" />
          {/* Target Reticle Pin */}
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute" />
            <div className="w-5 h-5 rounded-full bg-white border-2 border-[#1E7B48] shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#1E7B48]" />
            </div>
          </div>
        </div>

        {/* Hero Card Content Container */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-between h-full space-y-6 max-w-3xl">
          <div className="space-y-3.5">
            {/* Top Switcher Strip: Farming Situation & LocalStorage Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-2xs flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleSelectStatus("not_planted")}
                  className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    !isPlanted
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "text-stone-700 hover:text-stone-900 hover:bg-stone-100/70"
                  }`}
                >
                  <Sprout size={15} />
                  <span>
                    {lang === "en" ? "Not Planted Yet (Plan)" : "ফসল লাগাইনি (পরিকল্পনা)"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectStatus("already_planted")}
                  className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isPlanted
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "text-stone-700 hover:text-stone-900 hover:bg-stone-100/70"
                  }`}
                >
                  <CheckCircle2 size={15} />
                  <span>
                    {lang === "en" ? "Already Planted (Manage)" : "জমিতে ফসল আছে (পরিচর্যা)"}
                  </span>
                </button>
              </div>

              {hasConfigured && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/95 backdrop-blur-md border border-emerald-200 text-xs font-semibold text-[#15803D] shadow-2xs">
                  <ShieldCheck size={13} className="text-[#1E7B48]" />
                  <span>
                    {lang === "en" ? "Saved to Browser" : "ব্রাউজারে সংরক্ষিত"}
                  </span>
                  <button
                    type="button"
                    onClick={resetUserSelection}
                    title={lang === "en" ? "Clear saved selection" : "সংরক্ষিত তথ্য মুছুন"}
                    className="ml-1 text-emerald-700 hover:text-emerald-950 p-0.5 rounded-md hover:bg-emerald-100/60 transition-colors"
                  >
                    <RotateCcw size={11} />
                  </button>
                </div>
              )}
            </div>

            {/* Main Title */}
            <h1 className="text-[28px] sm:text-[36px] font-bold text-stone-900 tracking-tight leading-tight">
              {isPlanted
                ? (lang === "en"
                    ? "Manage & Rescue Your Standing Crop"
                    : "জমিতে থাকা ফসলের পরিচর্যা ও সুরক্ষা")
                : (lang === "en"
                    ? "Plan Your Next Climate-Safe Crop"
                    : "ঝুঁকিমুক্ত ফসলের পরিকল্পনা করুন")}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-normal text-stone-600 leading-relaxed max-w-xl">
              {isPlanted
                ? (lang === "en"
                    ? "Your crop is in the field. Avoid dry pump burnout, save tubewell diesel with AWD, and shield flowers from 35°C heat waves."
                    : "জমির ফসল সুরক্ষিত রাখতে পর্যায়ক্রমিক সেচ (AWD), তাপদাহে ফুল ঝরে পড়া রোধ এবং ভূগর্ভস্থ পানির সুরক্ষা ব্যবস্থা জানুন।")
                : (lang === "en"
                    ? "Select your location, planned crop, and water access to find high-profit alternatives that survive drought and heat."
                    : "কম সেচ ও বেশি লাভের বিকল্প ফসল নির্বাচন এবং রোপণের সঠিক সময়সূচী জানতে তথ্য দিন।")}
            </p>
          </div>

          {/* =========================================================================
              UPGRADED FIELD SPECIFICATIONS CARD (Crisp Visual Hierarchy & UX)
              ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-4">
            {/* Header with clean label & live telemetry chip */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100/80 text-[#1E7B48] flex items-center justify-center">
                  <Sliders size={13} />
                </div>
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {lang === "en" ? "Field Specifications" : "জমির বিবরণ ও তথ্য"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>NASA Telemetry Active</span>
              </div>
            </div>

            {/* 3 Dedicated Interactive Tile Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Tile 1: Location */}
              <div className="group relative p-3.5 rounded-2xl bg-stone-50/90 hover:bg-white border border-stone-200/90 hover:border-emerald-500/80 hover:shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all flex flex-col justify-between min-h-[92px]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#1E7B48]" />
                    <span>{lang === "en" ? "Location" : "এলাকা"}</span>
                  </span>
                  <div className="w-5 h-5 rounded-full bg-stone-200/70 group-hover:bg-emerald-100 text-stone-500 group-hover:text-[#1E7B48] flex items-center justify-center transition-colors">
                    <ChevronDown size={12} />
                  </div>
                </div>

                <div className="mt-1.5">
                  <div className="text-sm font-bold text-stone-900 group-hover:text-[#1E7B48] transition-colors leading-tight">
                    {currentZone.nameEn.split(",")[0]}
                  </div>
                  <div className="text-[11px] font-medium text-stone-500 mt-0.5 leading-tight">
                    Rajshahi • Barind
                  </div>
                </div>

                {/* Accessible native select covering whole tile */}
                <select
                  aria-label="Select Target Location"
                  value={currentZone.id}
                  onChange={(e) => handleSelectZone(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                >
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tile 2: Crop (Contextual: Standing vs Planned) */}
              <div className="group relative p-3.5 rounded-2xl bg-stone-50/90 hover:bg-white border border-stone-200/90 hover:border-emerald-500/80 hover:shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all flex flex-col justify-between min-h-[92px]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sprout size={13} className="text-[#1E7B48]" />
                    <span>
                      {isPlanted
                        ? (lang === "en" ? "Standing Crop" : "চলতি ফসল")
                        : (lang === "en" ? "Target Crop" : "পরিকল্পিত ফসল")}
                    </span>
                  </span>
                  <div className="w-5 h-5 rounded-full bg-stone-200/70 group-hover:bg-emerald-100 text-stone-500 group-hover:text-[#1E7B48] flex items-center justify-center transition-colors">
                    <ChevronDown size={12} />
                  </div>
                </div>

                <div className="mt-1.5">
                  <div className="text-sm font-bold text-stone-900 group-hover:text-[#1E7B48] transition-colors leading-tight">
                    {currentCrop.nameEn}
                  </div>
                  <div className="text-[11px] font-medium text-stone-500 mt-0.5 leading-tight">
                    {isPlanted
                      ? (lang === "en" ? "High Water Need" : "অধিক পানির চাহিদা")
                      : (lang === "en" ? "Baseline Paddy" : "ভিত্তি ধান")}
                  </div>
                </div>

                <select
                  aria-label="Select Current Crop"
                  value={currentCrop.id}
                  onChange={(e) => handleSelectCrop(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                >
                  {crops.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tile 3: Water Access */}
              <div className="group relative p-3.5 rounded-2xl bg-stone-50/90 hover:bg-white border border-stone-200/90 hover:border-emerald-500/80 hover:shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all flex flex-col justify-between min-h-[92px]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Droplets size={13} className="text-[#0284C7]" />
                    <span>{lang === "en" ? "Water Source" : "পানির উৎস"}</span>
                  </span>
                  <div className="w-5 h-5 rounded-full bg-stone-200/70 group-hover:bg-sky-100 text-stone-500 group-hover:text-[#0284C7] flex items-center justify-center transition-colors">
                    <ChevronDown size={12} />
                  </div>
                </div>

                <div className="mt-1.5">
                  <div className="text-sm font-bold text-stone-900 group-hover:text-[#0284C7] transition-colors leading-tight">
                    {waterAccess}
                  </div>
                  <div className="text-[11px] font-medium text-stone-500 mt-0.5 leading-tight">
                    {waterAccess.includes("Deep")
                      ? (lang === "en" ? "High Pumping Cost" : "উচ্চ সেচ খরচ")
                      : waterAccess.includes("Shallow")
                      ? (lang === "en" ? "Aquifer Vulnerable" : "ঝুঁকিপূর্ণ স্তর")
                      : (lang === "en" ? "Gravity Flow" : "উপরিভাগের পানি")}
                  </div>
                </div>

                <select
                  aria-label="Select Irrigation Water Access"
                  value={waterAccess}
                  onChange={(e) => handleSelectWater(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                >
                  <option value="Deep Tubewell">Deep Tubewell</option>
                  <option value="Shallow Tubewell">Shallow Tubewell</option>
                  <option value="Canal / Surface">Canal / Surface</option>
                </select>
              </div>
            </div>

            {/* Bottom Row inside card: Action Button & Context Note */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {isPlanted ? (
                <Link
                  href="/advisory"
                  onClick={handleProceed}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-2xl bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <span>{lang === "en" ? "Open In-Season Field Advisory" : "জমির জরুরি কৃষি পরামর্শ"}</span>
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <Link
                  href="/shift"
                  onClick={handleProceed}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-2xl bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <span>{lang === "en" ? "Get Crop Recommendations" : "বিকল্প ফসলের তালিকা দেখুন"}</span>
                  <ArrowRight size={16} />
                </Link>
              )}

              <span className="text-xs text-stone-500 font-medium">
                {lang === "en"
                  ? "Instant data-backed calculations • Zero guesswork"
                  : "নাসার তথ্যের ভিত্তিতে সঠিক সিদ্ধান্ত"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
