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

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* HERO BANNER CARD (Full background image spanning edge-to-edge) */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] min-h-[460px] sm:min-h-[520px] flex flex-col justify-between">
        {/* FULL BACKGROUND PHOTOGRAPHIC LANDSCAPE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
        />

        {/* Soft gradient fade overlay so left text and filters are 100% readable while entire scenery shows */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 sm:via-white/75 to-transparent pointer-events-none" />

        {/* Floating Location Marker on the Landscape Photo (Right side) */}
        <div className="hidden lg:flex absolute top-12 right-20 z-20 flex-col items-center pointer-events-none">
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

        {/* Hero Card Content */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-between h-full space-y-6 max-w-2xl">
          <div>
            {/* Farmer Situation Selector & LocalStorage Status Pill */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-2xs flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleSelectStatus("not_planted")}
                  className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    farmerStatus === "not_planted"
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
                    farmerStatus === "already_planted"
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/90 backdrop-blur-md border border-emerald-200 text-xs font-semibold text-[#15803D] shadow-2xs">
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

            <h1 className="text-[28px] sm:text-[36px] font-bold text-stone-900 tracking-tight leading-tight">
              {farmerStatus === "already_planted"
                ? (lang === "en"
                    ? "Manage & Rescue Your Standing Crop"
                    : "জমিতে থাকা ফসলের পরিচর্যা ও সুরক্ষা")
                : (lang === "en"
                    ? "Plan Your Next Climate-Safe Crop"
                    : "ঝুঁকিমুক্ত ফসলের পরিকল্পনা করুন")}
            </h1>

            <p className="text-sm sm:text-base font-normal text-stone-600 mt-2 leading-relaxed">
              {farmerStatus === "already_planted"
                ? (lang === "en"
                    ? "Your crop is in the field. Avoid dry pump burnout, save tubewell diesel with AWD, and shield flowers from 35°C heat waves."
                    : "জমির ফসল সুরক্ষিত রাখতে পর্যায়ক্রমিক সেচ (AWD), তাপদাহে ফুল ঝরে পড়া রোধ এবং ভূগর্ভস্থ পানির সুরক্ষা ব্যবস্থা জানুন।")
                : (lang === "en"
                    ? "Select your location, planned crop, and water access to find high-profit alternatives that survive drought and heat."
                    : "কম সেচ ও বেশি লাভের বিকল্প ফসল নির্বাচন এবং রোপণের সঠিক সময়সূচী জানতে তথ্য দিন।")}
            </p>
          </div>

          {/* 3 Distinct Filter Boxes (Location, Current Crop, Water Access) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Box 1: Location */}
            <div className="relative p-2.5 px-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-2xs hover:border-emerald-400 transition-all">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#1E7B48] shrink-0" />
                <div>
                  <span className="text-xs text-stone-500 font-medium block leading-none">
                    {lang === "en" ? "Location" : "অবস্থান"}
                  </span>
                  <span className="text-sm font-semibold text-stone-900 block mt-0.5 leading-tight whitespace-nowrap">
                    {currentZone.nameEn.split(",")[0]}, Rajshahi
                  </span>
                </div>
                <ChevronDown size={13} className="text-stone-400 shrink-0 pointer-events-none ml-1" />
              </div>
              <select
                aria-label="Select Target Location"
                value={currentZone.id}
                onChange={(e) => handleSelectZone(e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Box 2: Current Crop / Planted Crop */}
            <div className="relative p-2.5 px-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-2xs hover:border-emerald-400 transition-all">
              <div className="flex items-center gap-2">
                <Sprout size={16} className="text-[#1E7B48] shrink-0" />
                <div>
                  <span className="text-xs text-stone-500 font-medium block leading-none">
                    {farmerStatus === "already_planted"
                      ? (lang === "en" ? "Planted Crop" : "জমির ফসল")
                      : (lang === "en" ? "Target Crop" : "পরিকল্পিত ফসল")}
                  </span>
                  <span className="text-sm font-semibold text-stone-900 block mt-0.5 leading-tight whitespace-nowrap">
                    {currentCrop.nameEn.split(" ")[0]}
                  </span>
                </div>
                <ChevronDown size={13} className="text-stone-400 shrink-0 pointer-events-none ml-1" />
              </div>
              <select
                aria-label="Select Current Crop"
                value={currentCrop.id}
                onChange={(e) => handleSelectCrop(e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              >
                {crops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Box 3: Water Access */}
            <div className="relative p-2.5 px-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-2xs hover:border-emerald-400 transition-all">
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-[#0284C7] shrink-0" />
                <div>
                  <span className="text-xs text-stone-500 font-medium block leading-none">
                    {lang === "en" ? "Water Source" : "পানির উৎস"}
                  </span>
                  <span className="text-sm font-semibold text-stone-900 block mt-0.5 leading-tight whitespace-nowrap">
                    {waterAccess}
                  </span>
                </div>
                <ChevronDown size={13} className="text-stone-400 shrink-0 pointer-events-none ml-1" />
              </div>
              <select
                aria-label="Select Irrigation Water Access"
                value={waterAccess}
                onChange={(e) => handleSelectWater(e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              >
                <option value="Deep Tubewell">Deep Tubewell</option>
                <option value="Shallow Tubewell">Shallow Tubewell</option>
                <option value="Canal / Surface">Canal / Surface</option>
              </select>
            </div>
          </div>

          {/* Dynamic CTA Button */}
          <div className="pt-2">
            {farmerStatus === "already_planted" ? (
              <Link
                href="/advisory"
                onClick={handleProceed}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <span>{lang === "en" ? "Open In-Season Field Advisory" : "জমির জরুরি কৃষি পরামর্শ"}</span>
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                href="/shift"
                onClick={handleProceed}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <span>{lang === "en" ? "Get Crop Recommendations" : "বিকল্প ফসলের তালিকা দেখুন"}</span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
