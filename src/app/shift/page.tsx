"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { EmptyStatePrompt } from "@/components/EmptyStatePrompt";
import {
  Sprout,
  Droplets,
  Banknote,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sliders,
  Check,
  Clock,
  Flame,
  ShieldAlert,
  Calendar,
  Layers,
  ChevronRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function CropShiftPage() {
  const {
    currentZone,
    currentCrop,
    zones,
    setZoneId,
    crops,
    setCropId,
    assessment,
    lang,
    farmerStatus,
    setFarmerStatus,
    waterAccess,
    farmAcres,
    setFarmAcres,
    hasConfigured,
    isHydrated,
    saveUserSelection,
  } = useApp();

  // Pick matching photo for each crop
  const getCropImage = (cropId: string) => {
    const id = cropId.toLowerCase();
    if (id.includes("mustard")) return "/images/mustard_crop.jpg";
    if (id.includes("maize")) return "/images/maize_crop.jpg";
    if (id.includes("wheat") || id.includes("gom")) return "/images/wheat_crop.jpg";
    if (id.includes("rice")) return "/images/rice_crop.jpg";
    return "/images/mustard_crop.jpg";
  };

  // Plain-English watering counts instead of raw mm
  const getCropWateringInfo = (cropId: string) => {
    const id = cropId.toLowerCase();
    if (id.includes("mustard")) {
      return {
        rounds: lang === "en" ? "Only 2–3 Waterings" : "মাত্র ২-৩টি সেচ",
        subtext: lang === "en" ? "77% less water than rice" : "বোরো ধানের চেয়ে ৭৭% কম পানি",
      };
    }
    if (id.includes("maize")) {
      return {
        rounds: lang === "en" ? "4–5 Waterings" : "৪-৫টি সেচ",
        subtext: lang === "en" ? "56% less water than rice" : "বোরো ধানের চেয়ে ৫৬% কম পানি",
      };
    }
    if (id.includes("wheat") || id.includes("gom")) {
      return {
        rounds: lang === "en" ? "Only 3 Waterings" : "মাত্র ৩টি সেচ",
        subtext: lang === "en" ? "69% less water than rice" : "বোরো ধানের চেয়ে ৬৯% কম পানি",
      };
    }
    if (id.includes("rice")) {
      return {
        rounds: lang === "en" ? "25–30 Waterings" : "২৫-৩০টি সেচ",
        subtext: lang === "en" ? "Heavy continuous flooding" : "অবিরাম পানিতে ডোবানো মাঠ",
      };
    }
    return {
      rounds: lang === "en" ? "2–3 Waterings" : "২-৩টি সেচ",
      subtext: lang === "en" ? "Light irrigation" : "হালকা সেচ",
    };
  };

  // Plain-English salinity tolerance instead of dS/m
  const getSalinityFriendlyText = (dsM: number) => {
    if (dsM >= 6.0) {
      return {
        label: lang === "en" ? "High (Salt Safe)" : "উচ্চ সহনশীল",
        subtext: lang === "en" ? "Grows well in coastal soils" : "উপকূলীয় মাটিতেও ভালো হয়",
      };
    }
    if (dsM >= 4.5) {
      return {
        label: lang === "en" ? "Medium (Moderate)" : "মাঝারি সহনশীল",
        subtext: lang === "en" ? "Tolerates normal soil salt" : "স্বাভাবিক মাটিতে সমস্যা নেই",
      };
    }
    return {
      label: lang === "en" ? "Low (Sensitive)" : "কম সহনশীল",
      subtext: lang === "en" ? "Needs fresh water only" : "শুধুমাত্র মিঠা পানিতে ভালো হয়",
    };
  };

  const bestAlternative = assessment.recommendedAlternatives[0];
  const maxWaterSavedM3 = bestAlternative
    ? Math.round(bestAlternative.waterSavedM3PerAcre * farmAcres)
    : 0;
  const maxCostSaved = bestAlternative
    ? Math.round(bestAlternative.estimatedCostSavedBdtPerAcre * farmAcres)
    : 0;
  // Deep/shallow tubewell pump runs at approx 22 m³ per hour (22,000 L/hr)
  const maxPumpHoursSaved = Math.round(maxWaterSavedM3 / 22);
  const maxMillionLitersSaved = (maxWaterSavedM3 / 1000).toFixed(1);

  if (!isHydrated) {
    return (
      <div className="space-y-6 animate-pulse" suppressHydrationWarning>
        <div className="h-[320px] rounded-3xl bg-stone-200/70 border border-stone-200" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-28 rounded-2xl bg-stone-200/70" />
          <div className="h-28 rounded-2xl bg-stone-200/70" />
          <div className="h-28 rounded-2xl bg-stone-200/70" />
        </div>
      </div>
    );
  }

  if (!hasConfigured) {
    return <EmptyStatePrompt pageType="shift" lang={lang} />;
  }

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* =========================================================================
          HERO BANNER & LIVE FARM SCALE CONTROLLER
          ========================================================================= */}
      <div className="relative rounded-3xl border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] min-h-[320px] flex flex-col justify-between">
        {/* Full Photographic Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
        />

        {/* Soft Gradient Overlay for Easy Reading */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 sm:via-white/70 to-transparent rounded-3xl pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 p-4 sm:p-6 xl:p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 h-full">
          {/* Left Title & Simple Explanations */}
          <div className="space-y-3 max-w-2xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E7B48] text-xs font-bold border border-emerald-200/80 shadow-2xs">
              <Sprout size={13} className="text-[#1E7B48]" />
              <span>
                {lang === "en" ? "SMART CROP GUIDE" : "সহজ কৃষি পরামর্শ"}
              </span>
              <span className="text-stone-300">•</span>
              <span className="font-semibold text-stone-700">
                {currentZone.nameEn.split(",")[0]}, Rajshahi
              </span>
            </div>

            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-stone-900 tracking-tight leading-tight">
              {lang === "en" ? "Best Crops for Your Farm" : "আপনার জমির জন্য সেরা ফসল"}
            </h1>

            <p className="text-xs sm:text-sm lg:text-base font-normal text-stone-600 leading-relaxed max-w-xl">
              {lang === "en"
                ? "Find crops that need only 2 to 3 waterings, beat hot summer weather, and save you thousands of Taka on diesel and electricity bills."
                : "নাসার আবহাওয়া তথ্যের ভিত্তিতে মাত্র ২-৩ সেচে ঘরে তোলা যায় এমন লাভজনক ফসল বেছে নিন।"}
            </p>

            {/* Field Information Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs flex items-center gap-1.5">
                <MapPin size={13} className="text-[#1E7B48]" />
                <span>{currentZone.nameEn}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs flex items-center gap-1.5">
                <Sprout size={13} className="text-[#1E7B48]" />
                <span>{lang === "en" ? "Current:" : "বর্তমান ফসল:"} {currentCrop.nameEn}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs flex items-center gap-1.5">
                <Droplets size={13} className="text-[#0284C7]" />
                <span>{waterAccess}</span>
              </div>
              <Link
                href="/"
                className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs font-semibold text-[#1E7B48] border border-emerald-200 shadow-2xs flex items-center gap-1 transition-all"
              >
                <Sliders size={12} />
                <span>{lang === "en" ? "Change Field" : "তথ্য পরিবর্তন"}</span>
              </Link>
            </div>
          </div>

          {/* Right: Tactile Farm Size Controller */}
          <div className="w-full xl:w-84 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md space-y-3.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-800 flex items-center gap-1.5">
                <Sliders size={14} className="text-[#1E7B48]" />
                <span>{lang === "en" ? "Your Land Size" : "জমির পরিমাণ"}</span>
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D] border border-emerald-200 font-mono shadow-2xs">
                {farmAcres.toFixed(1)} {lang === "en" ? "Acres" : "একর"}
              </span>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min="0.5"
              max="10.0"
              step="0.5"
              value={farmAcres}
              onChange={(e) => setFarmAcres(parseFloat(e.target.value))}
              aria-label="Farm Land Size Slider"
              className="w-full accent-[#1E7B48] cursor-pointer h-2 bg-stone-200 rounded-lg appearance-none"
            />

            {/* Quick Preset Buttons */}
            <div className="flex items-center justify-between gap-1 sm:gap-1.5 pt-0.5">
              {[1.0, 2.0, 5.0, 10.0].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFarmAcres(val)}
                  className={`flex-1 py-1 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    farmAcres === val
                      ? "bg-[#1E7B48] text-white shadow-2xs"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {val} {lang === "en" ? "Ac" : "একর"}
                </button>
              ))}
            </div>

            <div className="text-xs sm:text-sm text-stone-600 font-normal text-center">
              {lang === "en"
                ? "Move slider to see how much water & diesel money you save."
                : "স্লাইডার নাড়িয়ে দেখুন কত পানি ও জ্বালানি খরচ বাঁচবে।"}
            </div>
          </div>
        </div>
      </div>

      {/* In-Season Notice if crop is already planted */}
      {farmerStatus === "already_planted" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-amber-950">
                {lang === "en"
                  ? "Standing Crop Advisory Available"
                  : "জমিতে থাকা ফসলের জরুরি পরামর্শ প্রস্তুত"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                {lang === "en"
                  ? "Your current crop is already planted. For urgent AWD irrigation schedules (28% diesel saved) and flower heatwave cooling, check your live field advisory."
                  : "আপনার জমিতে ফসল রোপণ করা আছে। জরুরি পর্যায়ক্রমিক সেচ (AWD) ও তাপদাহে ফুল রক্ষার নির্দেশনা দেখতে লাইভ পরামর্শ কেন্দ্র ব্যবহার করুন।"}
              </p>
            </div>
          </div>
          <Link
            href="/advisory"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-2xs text-center"
          >
            <span>{lang === "en" ? "Open Field Advisory" : "মাঠপর্যায়ের পরামর্শ দেখুন"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* =========================================================================
          PROBLEM VS SOLUTION (Clear terms anyone understands)
          ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        {/* Left: Problem With Current Crop */}
        <div className="rounded-3xl bg-[#FEF2F2] border border-[#FEE2E2] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert size={12} />
                <span>{lang === "en" ? "Current Crop Risk" : "বর্তমান ফসলের ঝুঁকি"}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-extrabold font-mono">
                {assessment.currentSuitability.overallScore}% {lang === "en" ? "SAFE (HIGH RISK)" : "নিরাপদ (উচ্চ ঝুঁকি)"}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-red-200 bg-red-100 shadow-2xs">
                <img
                  src={getCropImage(currentCrop.id)}
                  alt={currentCrop.nameEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-base font-extrabold text-[#991B1B] leading-tight">
                  {lang === "en"
                    ? `${currentCrop.nameEn} is at High Risk of Crop Loss`
                    : `${currentCrop.nameBn} এ ফসলহানির ঝুঁকি রয়েছে`}
                </h2>
                <p className="text-sm text-[#B91C1C] mt-1 leading-relaxed">
                  {lang === "en"
                    ? "Deep tubewells are running low. Running pumps for 25–30 waterings eats all profit, and March heat waves can kill rice flowers."
                    : "ভূগর্ভস্থ পানির তীব্র সংকট। ২৫-৩০ বার সেচ দেওয়ার জ্বালানি খরচেই লাভ শেষ হয়ে যায় এবং গরমে ধান চিটা হওয়ার আশঙ্কা থাকে।"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-red-200/70 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2 rounded-xl bg-white/80 border border-red-100">
              <span className="text-xs text-stone-600 font-medium block">
                {lang === "en" ? "Watering Needed" : "সেচ প্রয়োজন"}
              </span>
              <span className="text-sm font-extrabold text-red-700 font-mono mt-0.5 block">
                {lang === "en" ? "25–30 Times" : "২৫-৩০ বার"}
              </span>
              <span className="text-xs text-stone-500 block mt-0.5">
                {lang === "en" ? "Heavy Flooding" : "অতিরিক্ত পানি"}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white/80 border border-red-100">
              <span className="text-xs text-stone-600 font-medium block">
                {lang === "en" ? "Danger Heat" : "অতিরিক্ত তাপ"}
              </span>
              <span className="text-sm font-extrabold text-red-700 font-mono mt-0.5 block">
                {currentCrop.criticalFloweringTempC}°C
              </span>
              <span className="text-xs text-stone-500 block mt-0.5">
                {lang === "en" ? "Kills flowers" : "ফুল নষ্ট হয়"}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white/80 border border-red-100">
              <span className="text-xs text-stone-600 font-medium block">
                {lang === "en" ? "Tubewell Strain" : "নলকূপের চাপ"}
              </span>
              <span className="text-sm font-extrabold text-red-700 font-mono mt-0.5 block">
                {lang === "en" ? "Severe" : "অতিরিক্ত"}
              </span>
              <span className="text-xs text-stone-500 block mt-0.5">
                {lang === "en" ? "Runs dry in March" : "মার্চে পানি কমে"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Best Alternative Solution */}
        {bestAlternative && (
          <div className="rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#15803D] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={12} />
                  <span>{lang === "en" ? "Best Alternative Crop" : "সেরা বিকল্প ফসল"}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E7B48] text-white text-xs font-extrabold font-mono">
                  {bestAlternative.suitability.overallScore}% {lang === "en" ? `SAFE (GRADE ${bestAlternative.resilienceRating})` : `নিরাপদ`}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-emerald-200 bg-emerald-100 shadow-2xs">
                  <img
                    src={getCropImage(bestAlternative.crop.id)}
                    alt={bestAlternative.crop.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#166534] leading-tight">
                    {lang === "en"
                      ? `Switch to ${bestAlternative.crop.nameEn}`
                      : `${bestAlternative.crop.nameBn} চাষ করুন`}
                  </h2>
                  <p className="text-sm font-normal text-[#15803D] mt-1 leading-relaxed">
                    {lang === "en"
                      ? `Harvests in just ${bestAlternative.crop.growthDays} days before summer heat starts. Needs only 2–3 light waterings, cutting irrigation costs by 77%.`
                      : `মাত্র ${bestAlternative.crop.growthDays} দিনে গরম পড়ার আগেই ঘরে তোলা যায়। বোরো ধানের চেয়ে ৭৭% কম সেচ লাগে।`}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-200/70 grid grid-cols-3 gap-2 text-center text-sm">
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100 min-w-0">
                <span className="text-xs text-stone-600 font-medium block truncate">
                  {lang === "en" ? "Water Saved" : "পানি সাশ্রয়"}
                </span>
                <span className="text-xl sm:text-2xl xl:text-[28px] font-bold text-[#1E7B48] font-mono mt-0.5 block leading-tight truncate">
                  {lang === "en" ? "77% Less" : "৭৭% কম"}
                </span>
                <span className="text-xs text-stone-500 font-medium block mt-0.5 truncate">
                  {lang === "en" ? `~${maxPumpHoursSaved} pump hrs` : `~${maxPumpHoursSaved} ঘণ্টা পাম্প`}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100 min-w-0">
                <span className="text-xs text-stone-600 font-medium block truncate">
                  {lang === "en" ? "Diesel Bill Saved" : "জ্বালানি খরচ সাশ্রয়"}
                </span>
                <span className="text-xl sm:text-2xl xl:text-[28px] font-bold text-[#1E7B48] font-mono mt-0.5 block leading-tight truncate">
                  ৳{maxCostSaved.toLocaleString()}
                </span>
                <span className="text-xs text-stone-500 font-medium block mt-0.5 truncate">
                  {lang === "en" ? "In pump fuel/power" : "সেচ ও বিদ্যুৎ বিলে"}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100 min-w-0">
                <span className="text-xs text-stone-600 font-medium block truncate">
                  {lang === "en" ? "Profit Safety" : "লাভের নিশ্চয়তা"}
                </span>
                <span className="text-base sm:text-lg xl:text-xl font-bold text-[#1E7B48] font-mono mt-0.5 block truncate">
                  {lang === "en" ? "+22% High" : "+২২% বেশি"}
                </span>
                <span className="text-xs text-stone-500 font-medium block mt-0.5 truncate">
                  {lang === "en" ? "Stable dry season crop" : "নিরাপদ রবি ফসল"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          RECOMMENDED CROPS LIST
          ========================================================================= */}
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900 flex items-center gap-2">
              <Sprout size={20} className="text-[#1E7B48]" />
              <span>
                {lang === "en"
                  ? "Recommended Crops for Your Land"
                  : "আপনার জমির জন্য উপযোগী বিকল্প ফসল"}
              </span>
            </h2>
            <p className="text-sm text-stone-500 font-normal mt-0.5">
              {lang === "en"
                ? "Ranked by least water needed, heat resistance, and highest farmer profit"
                : "কম পানি, তাপ সহনশীলতা ও বেশি লাভের ভিত্তিতে সাজানো"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500">
              {lang === "en" ? "Calculated for:" : "হিসাব করা হয়েছে:"}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-stone-200 text-xs font-semibold font-mono text-stone-900 shadow-2xs">
              {farmAcres.toFixed(1)} {lang === "en" ? "Acres" : "একর"}
            </span>
          </div>
        </div>

        {/* 3 Crop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assessment.recommendedAlternatives.map((alt, idx) => {
            const isFirst = idx === 0;
            const isSelected = currentCrop.id === alt.crop.id;
            const totalWaterSavedM3 = Math.round(alt.waterSavedM3PerAcre * farmAcres);
            const totalCostSaved = Math.round(alt.estimatedCostSavedBdtPerAcre * farmAcres);
            const pumpHoursSaved = Math.round(totalWaterSavedM3 / 22);
            const millionLitersSaved = (totalWaterSavedM3 / 1000).toFixed(1);
            const cropImage = getCropImage(alt.crop.id);
            const waterInfo = getCropWateringInfo(alt.crop.id);
            const saltInfo = getSalinityFriendlyText(alt.crop.salinityToleranceDsM);

            return (
              <div
                key={alt.crop.id}
                className={`rounded-3xl bg-white border overflow-hidden transition-all flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md ${
                  isFirst
                    ? "border-emerald-300 ring-2 ring-emerald-500/15"
                    : "border-stone-200/90 hover:border-emerald-300"
                }`}
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                    <img
                      src={cropImage}
                      alt={alt.crop.nameEn}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                          isFirst
                            ? "bg-[#DCFCE7] text-[#15803D] border border-emerald-300"
                            : "bg-white/95 backdrop-blur-md text-stone-800 border border-stone-200"
                        }`}
                      >
                        {isFirst
                          ? (lang === "en" ? "#1 Best Choice" : "#১ সেরা পছন্দ")
                          : (lang === "en" ? `#${idx + 1} Good Choice` : `#${idx + 1} বিকল্প ফসল`)}
                      </span>

                      <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-white/95 backdrop-blur-md text-stone-900 border border-stone-200 shadow-sm font-mono">
                        {lang === "en" ? `Grade ${alt.resilienceRating} • ${alt.suitability.overallScore}% Safe` : `গ্রেড ${alt.resilienceRating}`}
                      </span>
                    </div>

                    {/* Crop Name & Days on Photo */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <h3 className="text-lg sm:text-[20px] font-semibold text-white leading-tight drop-shadow-sm">
                        {lang === "en" ? alt.crop.nameEn : alt.crop.nameBn}
                      </h3>
                      <div className="text-xs text-emerald-300 font-medium mt-0.5 drop-shadow-sm flex items-center gap-1.5">
                        <span>{alt.crop.growthDays} {lang === "en" ? "Days to Harvest" : "দিনে ফলন"}</span>
                        <span>•</span>
                        <span>{lang === "en" ? `Saves ${alt.crop.waterSavingsVsRicePercent}% Water` : `${alt.crop.waterSavingsVsRicePercent}% পানি সাশ্রয়`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    {/* Simple Description */}
                    <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed min-h-[40px]">
                      {lang === "en" ? alt.crop.descriptionEn : alt.crop.descriptionBn}
                    </p>

                    {/* 4 Simple Farm Specs (No confusing units!) */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-sm">
                      {/* Days to Harvest */}
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                          <Clock size={12} className="text-stone-500" />
                          <span>{lang === "en" ? "Days to Harvest" : "পাকার সময়"}</span>
                        </span>
                        <span className="text-sm font-extrabold text-stone-900 block mt-0.5 font-mono">
                          {alt.crop.growthDays} {lang === "en" ? "Days" : "দিন"}
                        </span>
                        <span className="text-xs text-stone-500 block">
                          Fast harvest
                        </span>
                      </div>

                      {/* Water Needed (In waterings, not mm!) */}
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                          <Droplets size={12} className="text-[#0284C7]" />
                          <span>{lang === "en" ? "Watering Needed" : "সেচ প্রয়োজন"}</span>
                        </span>
                        <span className="text-sm font-extrabold text-stone-900 block mt-0.5">
                          {waterInfo.rounds}
                        </span>
                        <span className="text-xs text-stone-500 block truncate">
                          {waterInfo.subtext}
                        </span>
                      </div>

                      {/* Max Safe Heat */}
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                          <Flame size={12} className="text-[#DC2626]" />
                          <span>{lang === "en" ? "Max Safe Heat" : "তাপমাত্রা সীমা"}</span>
                        </span>
                        <span className="text-sm font-extrabold text-stone-900 block mt-0.5 font-mono">
                          {alt.crop.criticalFloweringTempC}°C
                        </span>
                        <span className="text-xs text-stone-500 block">
                          Avoids heat damage
                        </span>
                      </div>

                      {/* Salt Tolerance (In plain words, not dS/m!) */}
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                          <Layers size={12} className="text-[#1E7B48]" />
                          <span>{lang === "en" ? "Salt Tolerance" : "লবণাক্ততা সীমা"}</span>
                        </span>
                        <span className="text-sm font-extrabold text-stone-900 block mt-0.5">
                          {saltInfo.label}
                        </span>
                        <span className="text-xs text-stone-500 block truncate">
                          {saltInfo.subtext}
                        </span>
                      </div>
                    </div>

                    {/* Money & Water Saved Box (Plain terms!) */}
                    <div className="rounded-2xl p-3.5 bg-[#F6FAF6] border border-emerald-100 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-600 font-medium flex items-center gap-1.5">
                          <Droplets size={14} className="text-[#0284C7]" />
                          <span>{lang === "en" ? "Water Saved:" : "পানি সাশ্রয়:"}</span>
                        </span>
                        <div className="text-right">
                          <span className="font-bold text-[#0284C7] font-mono text-base sm:text-lg block">
                            {alt.crop.waterSavingsVsRicePercent}% Less Water
                          </span>
                          <span className="text-xs text-stone-600 font-medium block">
                            {lang === "en"
                              ? `Saves ~${pumpHoursSaved} pump hrs (${millionLitersSaved}M Liters)`
                              : `~${pumpHoursSaved} ঘণ্টা কম পাম্পিং (${millionLitersSaved} লাখ লিটার)`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm pt-1 border-t border-emerald-100/60">
                        <span className="text-stone-600 font-medium flex items-center gap-1.5">
                          <Banknote size={14} className="text-[#1E7B48]" />
                          <span>{lang === "en" ? "Pump Fuel Money Saved:" : "সেচ খরচ সাশ্রয়:"}</span>
                        </span>
                        <div className="text-right">
                          <span className="font-bold text-[#1E7B48] font-mono text-base sm:text-lg block">
                            ৳{totalCostSaved.toLocaleString()} BDT
                          </span>
                          <span className="text-xs text-stone-600 font-medium block">
                            {lang === "en" ? "Saved on diesel & electricity" : "ডিজেল ও বিদ্যুৎ বিলে সাশ্রয়"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer: Single Prominent 'See Planting Dates' Button */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/calendar?crop=${alt.crop.id}`}
                    className="w-full py-3.5 rounded-2xl text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 bg-[#1E7B48] hover:bg-[#165E36] text-white shadow-xs hover:shadow-md"
                  >
                    <Calendar size={16} />
                    <span>{lang === "en" ? "See Planting Dates" : "রোপণের সময়সূচী দেখুন"}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          BOTTOM IMPACT BAR & PROCEED CTA (Clear metrics for any user)
          ========================================================================= */}
      <div className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 sm:p-6 xl:p-7 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-5 sm:gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 flex-1">
          {/* Water Saved */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <Droplets size={20} />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                {lang === "en" ? `Water Saved (${farmAcres} Acres)` : `মোট পানি সাশ্রয় (${farmAcres} একর)`}
              </div>
              <div className="text-xl sm:text-2xl lg:text-[28px] font-bold text-stone-900 font-mono leading-tight">
                {lang === "en" ? "77% Less Water" : "৭৭% কম পানি"}
              </div>
              <div className="text-xs text-stone-600 font-medium">
                {lang === "en"
                  ? `Saves ~${maxPumpHoursSaved} pump hours (${maxMillionLitersSaved}M Liters)`
                  : `প্রায় ${maxPumpHoursSaved} ঘণ্টা কম পাম্পিং (${maxMillionLitersSaved} লাখ লিটার)`}
              </div>
            </div>
          </div>

          {/* Cost Saved */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0">
              <Banknote size={20} />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                {lang === "en" ? "Diesel & Pumping Cost Saved" : "ডিজেল ও সেচ খরচ সাশ্রয়"}
              </div>
              <div className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#1E7B48] font-mono leading-tight">
                ৳{maxCostSaved.toLocaleString()} BDT
              </div>
              <div className="text-xs text-stone-600 font-medium">
                {lang === "en" ? "Cut electric & tubewell bills" : "বিদ্যুৎ ও সেচ বিলে সরাসরি সাশ্রয়"}
              </div>
            </div>
          </div>

          {/* Groundwater Saved */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                {lang === "en" ? "Tubewell Protection" : "নলকূপ রক্ষা"}
              </div>
              <div className="text-lg sm:text-xl font-bold text-stone-900 font-mono">
                {lang === "en" ? "Wells Protected" : "ভূগর্ভস্থ পানি নিরাপদ"}
              </div>
              <div className="text-xs text-stone-600 font-medium">
                {lang === "en" ? "Aquifers stay healthy for future" : "পরবর্তী মৌসুমের জন্য পানি সুরক্ষিত"}
              </div>
            </div>
          </div>
        </div>

        {/* Proceed to Dynamic Calendar CTA */}
        <Link
          href="/calendar"
          className="w-full xl:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl sm:rounded-full bg-stone-900 hover:bg-stone-800 text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all shrink-0 text-center"
        >
          <Calendar size={16} />
          <span>{lang === "en" ? "See Planting Calendar" : "রোপণের ক্যালেন্ডার দেখুন"}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
