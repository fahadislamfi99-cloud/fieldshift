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
  Sliders,
} from "lucide-react";

export default function HomePage() {
  const {
    currentZone,
    zoneId,
    setZoneId,
    currentCrop,
    cropId,
    setCropId,
    zones,
    crops,
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
    saveUserSelection({ zoneId: id });
  };

  const handleSelectCrop = (id: string) => {
    setCropId(id);
    saveUserSelection({ cropId: id });
  };

  const handleSelectWater = (source: string) => {
    setWaterAccess(source);
    saveUserSelection({ waterAccess: source });
  };

  const handleSelectStatus = (status: "not_planted" | "already_planted") => {
    setFarmerStatus(status);
    saveUserSelection({ farmerStatus: status });
  };

  const isConfiguredReady = Boolean(farmerStatus && zoneId && cropId && waterAccess);

  const handleProceed = () => {
    saveUserSelection({
      hasConfigured: true,
      zoneId,
      cropId,
      farmerStatus,
      waterAccess,
    });
  };

  const isPlanted = farmerStatus === "already_planted";

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* HERO BANNER CARD */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-h-[500px] sm:min-h-[560px] flex flex-col justify-between">
        {/* Full Photographic Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
        />

        {/* Soft Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/92 sm:via-white/80 to-transparent pointer-events-none" />

        {/* Floating Location Marker on the Landscape Photo (Desktop) */}
        <div className="hidden xl:flex absolute top-12 right-20 z-20 flex-col items-center pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-xs font-bold text-stone-900 shadow-md flex items-center gap-1.5">
            <MapPin size={14} className="text-[#1E7B48]" />
            <span>
              {currentZone
                ? `${currentZone.nameEn.split(",")[0]}, Rajshahi`
                : (lang === "en" ? "Barind Tract, Rajshahi" : "বরেন্দ্র অঞ্চল, রাজশাহী")}
            </span>
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
          {/* Hero Header Text */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E7B48] text-xs font-bold border border-emerald-200/80 shadow-2xs">
              <Sprout size={13} className="text-[#1E7B48]" />
              <span>{lang === "en" ? "FieldShift • Barind Earth Observation" : "ফিল্ডশিফট • বরেন্দ্র কৃষি পর্যবেক্ষণ"}</span>
            </div>

            <h1 className="text-[28px] sm:text-[34px] font-bold text-stone-900 tracking-tight leading-tight">
              {lang === "en"
                ? "Climate-Smart Farm Planning & Crop Protection"
                : "জলবায়ু-সহনশীল ফসলের স্মার্ট পরিকল্পনা ও সুরক্ষা"}
            </h1>

            <p className="text-sm sm:text-base font-normal text-stone-600 leading-relaxed max-w-xl">
              {lang === "en"
                ? "Select your farming situation and field parameters below to calculate low-water crop shifts, AWD pumping schedules, and thermal heatwave defense using live NASA Earth data."
                : "নাসা উপগ্রহের আবহাওয়া তথ্যের ভিত্তিতে কম সেচের লাভজনক বিকল্প ফসল, পর্যায়ক্রমিক সেচ (AWD) এবং তাপদাহ থেকে সুরক্ষার নির্দেশনা পেতে নিচের তথ্যগুলো নির্ধারণ করুন।"}
            </p>
          </div>

          {/* =========================================================================
              UNIFIED OPTION SELECT CARD (Nothing selected by default)
              ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-4">
            {/* Header: Label */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100/80 text-[#1E7B48] flex items-center justify-center">
                <Sliders size={13} />
              </div>
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                {lang === "en" ? "Field Setup & Situation" : "জমির তথ্য ও বর্তমান পরিস্থিতি"}
              </span>
            </div>

            {/* STEP 1: Farmer Situation Switcher (Unselected by default) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  {lang === "en" ? "1. Your Farming Situation:" : "১. আপনার বর্তমান পরিস্থিতি:"}
                </span>
                {!farmerStatus && (
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    {lang === "en" ? "Required" : "নির্বাচন প্রয়োজন"}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1 rounded-2xl bg-stone-100/80 border border-stone-200/70">
                <button
                  type="button"
                  onClick={() => handleSelectStatus("not_planted")}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    farmerStatus === "not_planted"
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "bg-white/80 text-stone-700 hover:text-stone-900 hover:bg-white border border-stone-200/60"
                  }`}
                >
                  <Sprout size={14} />
                  <span>{lang === "en" ? "Planning Next Crop (Not Planted)" : "ফসল লাগাইনি (পরিকল্পনা)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectStatus("already_planted")}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    farmerStatus === "already_planted"
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "bg-white/80 text-stone-700 hover:text-stone-900 hover:bg-white border border-stone-200/60"
                  }`}
                >
                  <CheckCircle2 size={14} />
                  <span>{lang === "en" ? "Standing Crop in Field (Manage)" : "জমিতে ফসল আছে (পরিচর্যা)"}</span>
                </button>
              </div>
            </div>

            {/* STEP 2: The 3 Field Details Tiles (Unselected by default) */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {lang === "en" ? "2. Field Specifications:" : "২. জমির বিবরণ:"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Tile 1: Location */}
                <div
                  className={`group relative p-3 rounded-2xl bg-stone-50/90 hover:bg-white border transition-all flex flex-col justify-between min-h-[88px] ${
                    zoneId
                      ? "border-stone-200/90 hover:border-emerald-500/80 hover:shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20"
                      : "border-stone-300 border-dashed hover:border-emerald-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin size={13} className={zoneId ? "text-[#1E7B48]" : "text-stone-400"} />
                      <span>{lang === "en" ? "Location" : "এলাকা"}</span>
                    </span>
                    <div className="w-5 h-5 rounded-full bg-stone-200/70 group-hover:bg-emerald-100 text-stone-500 group-hover:text-[#1E7B48] flex items-center justify-center transition-colors">
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div className="mt-1">
                    <div
                      className={`text-sm leading-tight ${
                        currentZone
                          ? "font-bold text-stone-900 group-hover:text-[#1E7B48]"
                          : "font-semibold text-stone-400 italic"
                      }`}
                    >
                      {currentZone
                        ? currentZone.nameEn.split(",")[0]
                        : (lang === "en" ? "Select Location..." : "এলাকা নির্বাচন করুন...")}
                    </div>
                    <div className="text-[11px] font-medium text-stone-500 mt-0.5 leading-tight">
                      {currentZone
                        ? `${currentZone.districtEn} • Barind`
                        : (lang === "en" ? "Choose Upazila/District" : "উপজেলা বা জেলা")}
                    </div>
                  </div>

                  <select
                    aria-label="Select Target Location"
                    value={zoneId}
                    onChange={(e) => handleSelectZone(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                  >
                    <option value="" disabled>
                      {lang === "en" ? "-- Choose Location --" : "-- এলাকা নির্বাচন করুন --"}
                    </option>
                    {zones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tile 2: Crop */}
                <div
                  className={`group relative p-3 rounded-2xl bg-stone-50/90 hover:bg-white border transition-all flex flex-col justify-between min-h-[88px] ${
                    cropId
                      ? "border-stone-200/90 hover:border-emerald-500/80 hover:shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20"
                      : "border-stone-300 border-dashed hover:border-emerald-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Sprout size={13} className={cropId ? "text-[#1E7B48]" : "text-stone-400"} />
                      <span>
                        {farmerStatus === "already_planted"
                          ? (lang === "en" ? "Standing Crop" : "চলতি ফসল")
                          : farmerStatus === "not_planted"
                          ? (lang === "en" ? "Target Crop" : "পরিকল্পিত ফসল")
                          : (lang === "en" ? "Crop" : "ফসল")}
                      </span>
                    </span>
                    <div className="w-5 h-5 rounded-full bg-stone-200/70 group-hover:bg-emerald-100 text-stone-500 group-hover:text-[#1E7B48] flex items-center justify-center transition-colors">
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div className="mt-1">
                    <div
                      className={`text-sm leading-tight ${
                        currentCrop
                          ? "font-bold text-stone-900 group-hover:text-[#1E7B48]"
                          : "font-semibold text-stone-400 italic"
                      }`}
                    >
                      {currentCrop
                        ? currentCrop.nameEn
                        : (lang === "en" ? "Select Crop..." : "ফসল নির্বাচন করুন...")}
                    </div>
                    <div className="text-[11px] font-medium text-stone-500 mt-0.5 leading-tight">
                      {currentCrop
                        ? (farmerStatus === "already_planted"
                            ? (lang === "en" ? "High Water Need" : "অধিক পানির চাহিদা")
                            : (lang === "en" ? "Baseline Paddy" : "ভিত্তি ধান"))
                        : (lang === "en" ? "Paddy, mustard, wheat" : "ধান, সরিষা, গম")}
                    </div>
                  </div>

                  <select
                    aria-label="Select Current Crop"
                    value={cropId}
                    onChange={(e) => handleSelectCrop(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                  >
                    <option value="" disabled>
                      {lang === "en" ? "-- Choose Crop --" : "-- ফসল নির্বাচন করুন --"}
                    </option>
                    {crops.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tile 3: Water Access */}
                <div
                  className={`group relative p-3 rounded-2xl bg-stone-50/90 hover:bg-white border transition-all flex flex-col justify-between min-h-[88px] ${
                    waterAccess
                      ? "border-stone-200/90 hover:border-emerald-500/80 hover:shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20"
                      : "border-stone-300 border-dashed hover:border-emerald-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Droplets size={13} className={waterAccess ? "text-[#0284C7]" : "text-stone-400"} />
                      <span>{lang === "en" ? "Water Source" : "পানির উৎস"}</span>
                    </span>
                    <div className="w-5 h-5 rounded-full bg-stone-200/70 group-hover:bg-sky-100 text-stone-500 group-hover:text-[#0284C7] flex items-center justify-center transition-colors">
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div className="mt-1">
                    <div
                      className={`text-sm leading-tight ${
                        waterAccess
                          ? "font-bold text-stone-900 group-hover:text-[#0284C7]"
                          : "font-semibold text-stone-400 italic"
                      }`}
                    >
                      {waterAccess || (lang === "en" ? "Select Water Source..." : "পানির উৎস নির্বাচন করুন...")}
                    </div>
                    <div className="text-[11px] font-medium text-stone-500 mt-0.5 leading-tight">
                      {waterAccess
                        ? (waterAccess.includes("Deep")
                            ? (lang === "en" ? "High Pumping Cost" : "উচ্চ সেচ খরচ")
                            : waterAccess.includes("Shallow")
                            ? (lang === "en" ? "Aquifer Vulnerable" : "ঝুঁকিপূর্ণ স্তর")
                            : (lang === "en" ? "Gravity Flow" : "উপরিভাগের পানি"))
                        : (lang === "en" ? "Tubewell or canal" : "নলকূপ বা খাল")}
                    </div>
                  </div>

                  <select
                    aria-label="Select Irrigation Water Access"
                    value={waterAccess}
                    onChange={(e) => handleSelectWater(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                  >
                    <option value="" disabled>
                      {lang === "en" ? "-- Choose Water Source --" : "-- পানির উৎস নির্বাচন করুন --"}
                    </option>
                    <option value="Deep Tubewell">Deep Tubewell</option>
                    <option value="Shallow Tubewell">Shallow Tubewell</option>
                    <option value="Canal / Surface">Canal / Surface</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Row inside card: Action Button & Context Note */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100">
              {isConfiguredReady ? (
                isPlanted ? (
                  <Link
                    href="/advisory"
                    onClick={handleProceed}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-2xl bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{lang === "en" ? "Open In-Season Field Advisory" : "জমির জরুরি কৃষি পরামর্শ দেখুন"}</span>
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link
                    href="/shift"
                    onClick={handleProceed}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-2xl bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{lang === "en" ? "Get Crop Shift Recommendations" : "বিকল্প ফসলের তালিকা দেখুন"}</span>
                    <ArrowRight size={16} />
                  </Link>
                )
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-stone-200/90 text-stone-400 text-sm sm:text-base font-semibold cursor-not-allowed shadow-none"
                >
                  <span>{lang === "en" ? "Select All Options to Continue" : "উপরের সবগুলো তথ্য নির্বাচন করুন"}</span>
                </button>
              )}

              <span className="text-xs text-stone-500 font-medium">
                {isConfiguredReady
                  ? (isPlanted
                      ? (lang === "en" ? "AWD water-saving schedule & flower heat guard" : "পর্যায়ক্রমিক সেচ ও ফুল ঝরা রোধের নির্দেশনা")
                      : (lang === "en" ? "High-profit alternatives & pumping fuel savings" : "কম সেচের লাভজনক বিকল্প ফসল ও সাশ্রয়"))
                  : (lang === "en" ? "Please fill the 4 parameters above" : "অনুগ্রহ করে উপরের ৪টি তথ্য দিন")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
