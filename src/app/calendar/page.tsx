"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { optimizeSowingCalendar } from "@/lib/calendar-optimizer";
import { CustomSelect } from "@/components/CustomSelect";
import {
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Sprout,
  Check,
  ChevronRight,
  ShieldAlert,
  Info,
} from "lucide-react";

export default function CalendarPage() {
  const {
    currentZone,
    currentCrop: contextCrop,
    crops,
    setCropId,
    metrics,
    lang,
    farmerStatus,
    setFarmerStatus,
  } = useApp();

  // Read crop from URL synchronously if present to avoid any frame flicker
  const [urlCropId, setUrlCropId] = React.useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cropParam = params.get("crop");
      if (cropParam && crops.some((c) => c.id === cropParam)) {
        return cropParam;
      }
    }
    return null;
  });

  // Sync crop from URL query param if present to global context
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cropParam = params.get("crop");
      if (cropParam && crops.some((c) => c.id === cropParam)) {
        setUrlCropId(cropParam);
        setCropId(cropParam);
      }
    }
  }, [crops, setCropId]);

  const currentCrop = React.useMemo(() => {
    if (urlCropId) {
      const match = crops.find((c) => c.id === urlCropId);
      if (match) return match;
    }
    return contextCrop;
  }, [urlCropId, crops, contextCrop]);

  const calendar = React.useMemo(() => {
    return optimizeSowingCalendar(currentCrop, currentZone, metrics);
  }, [currentCrop, currentZone, metrics]);

  const handleSelectCrop = (id: string) => {
    setUrlCropId(id);
    setCropId(id);
  };

  // Helper to pick correct photographic thumbnail
  const getCropImage = (cropId: string) => {
    const id = cropId.toLowerCase();
    if (id.includes("mustard")) return "/images/mustard_crop.jpg";
    if (id.includes("maize")) return "/images/maize_crop.jpg";
    if (id.includes("wheat") || id.includes("gom")) return "/images/wheat_crop.jpg";
    if (id.includes("lentil") || id.includes("masur")) return "/images/lentil_crop.jpg";
    if (id.includes("rice")) return "/images/rice_crop.jpg";
    return "/images/mustard_crop.jpg";
  };

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* =========================================================================
          HERO BANNER (Matches Home and Crop Shift page design system)
          ========================================================================= */}
      <div className="relative rounded-3xl border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] min-h-[300px] flex flex-col justify-between">
        {/* Full Photographic Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
        />

        {/* Soft Gradient Overlay for Optimal Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 sm:via-white/70 to-transparent rounded-3xl pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 p-4 sm:p-6 xl:p-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 h-full">
          {/* Left Title & Plain Explanation */}
          <div className="space-y-3 max-w-2xl">
            {/* Tag & Farmer Status Switcher Pill */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E7B48] text-[11px] sm:text-xs font-bold border border-emerald-200/80 shadow-2xs">
                <Calendar size={13} className="text-[#1E7B48]" />
                <span>
                  {lang === "en" ? "SMART PLANTING CALENDAR" : "সহজ রোপণ ক্যালেন্ডার"}
                </span>
                <span className="text-stone-300">•</span>
                <span className="font-semibold text-stone-700">
                  {currentZone.nameEn.split(",")[0]}, Rajshahi
                </span>
              </div>

              {/* Status Switcher */}
              <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-2xs text-[11px] sm:text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFarmerStatus("not_planted")}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all flex items-center gap-1 sm:gap-1.5 ${
                    farmerStatus === "not_planted"
                      ? "bg-[#1E7B48] text-white shadow-2xs font-bold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Sprout size={12} />
                  <span>{lang === "en" ? "Not Planted (Plan)" : "ফসল লাগাইনি"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFarmerStatus("already_planted")}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all flex items-center gap-1 sm:gap-1.5 ${
                    farmerStatus === "already_planted"
                      ? "bg-[#1E7B48] text-white shadow-2xs font-bold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <CheckCircle2 size={12} />
                  <span>{lang === "en" ? "Already Planted" : "ইতিমধ্যে রোপণকৃত"}</span>
                </button>
              </div>
            </div>

            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-stone-900 tracking-tight leading-tight">
              {farmerStatus === "already_planted"
                ? (lang === "en"
                    ? "In-Season Timeline & Heatwave Watch"
                    : "মাঠপর্যায়ের সময়সূচী ও তাপদাহ ক্যালেন্ডার")
                : (lang === "en"
                    ? "When to Plant Your Crops"
                    : "ফসল রোপণের সঠিক সময়সূচী")}
            </h1>

            <p className="text-xs sm:text-sm lg:text-base font-normal text-stone-600 leading-relaxed max-w-xl">
              {farmerStatus === "already_planted"
                ? (lang === "en"
                    ? "Your crop is already planted. Track your in-season AWD irrigation cycles, March 15–28 pollination heatwave danger window, and harvest relay prep."
                    : "জমিতে ফসল রয়েছে। পর্যায়ক্রমিক সেচ শিডিউল, ১৫-২৮ মার্চ ফুল ফোটার তাপদাহ সতর্কতা ও ফসল কাটার প্রস্তুতি সময়সূচী দেখুন।")
                : (lang === "en"
                    ? "Planting on the right dates protects your flowers from hot summer heat waves and delayed monsoon rains — using NASA weather forecasts."
                    : "সঠিক সময়ে রোপণ করলে গরম বাতাসে ধান বা ফসলের ফুল ঝরে পড়া রোধ হয় এবং ফলন সুরক্ষিত থাকে।")}
            </p>

            {/* Field Information Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs flex items-center gap-1.5">
                <MapPin size={13} className="text-[#1E7B48]" />
                <span>{currentZone.nameEn}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs flex items-center gap-1.5">
                <Sprout size={13} className="text-[#1E7B48]" />
                <span>{lang === "en" ? "Selected:" : "বাছাইকৃত ফসল:"} {currentCrop.nameEn}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs flex items-center gap-1.5">
                <Flame size={13} className="text-[#DC2626]" />
                <span>
                  {lang === "en"
                    ? calendar.avoidsTagEn || "Avoids: Thermal Stress"
                    : calendar.avoidsTagBn || "তাপদাহ এড়িয়ে চলে"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Crop Switcher Widget */}
          <div className="w-full xl:w-84 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md space-y-3.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Sprout size={14} className="text-[#1E7B48]" />
                <span>{lang === "en" ? "Switch Crop Calendar" : "ফসলের ক্যালেন্ডার পরিবর্তন"}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#DCFCE7] text-[#15803D] border border-emerald-200 font-mono">
                {currentCrop.nameEn.split(" ")[0]}
              </span>
            </div>

            {/* Dropdown Selector */}
            <div className="relative">
              <CustomSelect
                variant="compact"
                className="w-full py-2 px-3 rounded-xl bg-stone-50 border-stone-200 text-xs font-bold text-stone-900 shadow-2xs"
                menuWidth="w-full"
                value={currentCrop.id}
                onChange={(val) => handleSelectCrop(val)}
                options={crops.map((c) => ({
                  value: c.id,
                  label: `${lang === "en" ? c.nameEn : c.nameBn}`,
                  sublabel: `${c.growthDays} ${lang === "en" ? "Days" : "দিন"} • ${c.waterSavingsVsRicePercent}% ${lang === "en" ? "Water Saved" : "পানি সাশ্রয়"}`,
                  badge: `${c.growthDays}d`,
                }))}
                icon={<Sprout size={14} className="text-[#1E7B48]" />}
                placeholder={lang === "en" ? "Select Target Crop" : "ফসল নির্বাচন করুন"}
              />
            </div>

            {/* Quick Pills for 4 Popular Crops */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
              {crops.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectCrop(c.id)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    currentCrop.id === c.id
                      ? "bg-[#1E7B48] text-white shadow-2xs"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {c.nameEn.split(" ")[0]}
                </button>
              ))}
            </div>

            <div className="text-xs sm:text-sm text-stone-600 font-normal text-center">
              {lang === "en"
                ? "Click any crop to see safe planting dates below."
                : "যেকোনো ফসলে ক্লিক করে নিরাপদ রোপণের সময় দেখুন।"}
            </div>
          </div>
        </div>
      </div>

      {/* In-Season Notice for Already Planted Crops */}
      {farmerStatus === "already_planted" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
              <Flame size={20} className="text-amber-700" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-amber-950">
                {lang === "en"
                  ? "Standing Crop Heatwave & Milestone Notice"
                  : "জমিতে থাকা ফসলের তাপদাহ ও সময়সূচী সতর্কতা"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5 leading-relaxed">
                {lang === "en"
                  ? "Your crop is in the field. Sowing date is locked. Critical upcoming event: March 15–28 pollination heatwave. Keep 5–7 cm water depth during >34.5°C days to cool canopy."
                  : "আপনার জমিতে ফসল রয়েছে। রোপণ সময় পরিবর্তন সম্ভব নয়। আসন্ন গুরুত্বপূর্ণ পর্যায়: ১৫-২৮ মার্চ ফুল ফোটার তাপদাহ। ৩৫° সে তাপমাত্রা উঠলে জমিতে ৫-৭ সেমি পানি ধরে রাখুন।"}
              </p>
            </div>
          </div>
          <Link
            href="/advisory"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-2xs text-center"
          >
            <span>{lang === "en" ? "Open Field Advisory" : "জরুরি পরামর্শ দেখুন"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* =========================================================================
          ACTIVE CROP EVALUATION CARD: OLD DATES VS NEW SAFE DATES
          ========================================================================= */}
      <div className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-6 sm:p-7 space-y-6">
        {/* Card Header with Active Crop Photo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100 shadow-2xs">
              <img
                src={getCropImage(currentCrop.id)}
                alt={currentCrop.nameEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  {lang === "en" ? "Active Evaluation Target" : "বর্তমান নির্বাচিত ফসল"}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs font-semibold text-[#1E7B48]">
                  {currentCrop.growthDays} {lang === "en" ? "Days to Harvest" : "দিনে ফলন"}
                </span>
              </div>
              <h2 className="text-lg sm:text-[20px] font-semibold text-stone-900 mt-0.5">
                {lang === "en" ? currentCrop.nameEn : currentCrop.nameBn}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#DCFCE7] border border-emerald-200 text-[#15803D] text-xs font-extrabold shadow-2xs">
            <CheckCircle2 size={16} />
            <span>{calendar.heatAvoidanceScorePercent}% {lang === "en" ? "Heat Stress Avoidance" : "অতিরিক্ত তাপ সুরক্ষা"}</span>
          </div>
        </div>

        {/* Visual Timeline Comparison Rows */}
        <div className="space-y-4">
          {/* Row 1: Old Traditional Planting Window (Red Alert) */}
          <div className="p-5 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-extrabold text-red-900 uppercase tracking-wider">
                  {lang === "en" ? "Old Traditional Planting Dates (High Risk)" : "পুরোনো ঐতিহ্যবাহী রোপণ সময় (উচ্চ ঝুঁকি)"}
                </span>
              </div>
              <span className="px-3 py-1 rounded-xl bg-white border border-red-200 text-xs font-extrabold font-mono text-red-700 shadow-2xs self-start sm:self-auto">
                {calendar.traditionalWindow}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="h-4 w-full bg-red-100 rounded-full overflow-hidden p-0.5">
              <div className="h-full w-2/5 bg-red-600 rounded-full" />
            </div>

            <div className="flex items-start gap-2 text-xs text-[#991B1B] font-medium leading-relaxed">
              <AlertTriangle size={15} className="shrink-0 text-red-600 mt-0.5" />
              <span>
                {lang === "en"
                  ? calendar.riskExplanationEn || "Traditional dates risk exposing flowering stage to adverse thermal spikes."
                  : calendar.riskExplanationBn || "ঐতিহ্যবাহী সময়ে রোপণ করলে প্রতিকূল তাপদাহে ফুল ঝরে যাওয়ার ঝুঁকি থাকে।"}
              </span>
            </div>
          </div>

          {/* Row 2: NASA Recommended Planting Window (Emerald Safe) */}
          <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                <span className="text-xs font-extrabold text-[#166534] uppercase tracking-wider">
                  {lang === "en"
                    ? `Recommended Planting Dates (Shifted +${calendar.shiftDeltaDays} Days)`
                    : `প্রস্তাবিত নতুন সময়সূচী (+${calendar.shiftDeltaDays} দিন স্থানান্তরিত)`}
                </span>
              </div>
              <span className="px-3 py-1 rounded-xl bg-white border border-emerald-200 text-xs font-extrabold font-mono text-[#15803D] shadow-2xs self-start sm:self-auto">
                {calendar.nasaAdjustedWindow}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="h-4 w-full bg-emerald-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full w-2/5 bg-[#16A34A] rounded-full"
                style={{ marginLeft: "22%" }}
              />
            </div>

            <div className="flex items-start gap-2 text-xs text-[#166534] font-medium leading-relaxed">
              <ShieldCheck size={15} className="shrink-0 text-[#16A34A] mt-0.5" />
              <span>
                {lang === "en"
                  ? calendar.nasaRecommendationEn || `Delaying planting by ${calendar.shiftDeltaDays} days optimizes temperature and moisture conditions.`
                  : calendar.nasaRecommendationBn || `রোপণ ${calendar.shiftDeltaDays} দিন সমন্বয় করলে ফলন ও আর্দ্রতা সুরক্ষিত থাকে।`}
              </span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Practical Field Guide */}
        <div className="pt-2 space-y-3">
          <h3 className="text-lg font-semibold text-stone-900">
            {lang === "en"
              ? `Step-by-Step Planting Instructions for ${currentCrop.nameEn}:`
              : `${currentCrop.nameBn} এর করণীয় ধাপসমূহ:`}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 text-sm">
            {(calendar.steps && calendar.steps.length > 0
              ? calendar.steps
              : [
                  {
                    stepNumber: 1,
                    phaseEn: "Step 1 • Land Prep",
                    phaseBn: "ধাপ ১ • জমি প্রস্তুত",
                    titleEn: "Field Preparation",
                    titleBn: "জমি প্রস্তুত",
                    instructionEn: "Prepare well-tilled seedbed with adequate soil moisture.",
                    instructionBn: "পর্যাপ্ত আর্দ্রতায় জমি ভালোভাবে প্রস্তুত করুন।",
                    iconName: "Clock" as const,
                  },
                  {
                    stepNumber: 2,
                    phaseEn: "Step 2 • Sowing",
                    phaseBn: "ধাপ ২ • চারা রোপণ",
                    titleEn: "Main Sowing",
                    titleBn: "মূল বপন",
                    instructionEn: "Sow certified disease-free seed at recommended spacing.",
                    instructionBn: "সঠিক দূরত্বে মানসম্মত বীজ বপন সম্পন্ন করুন।",
                    iconName: "Sprout" as const,
                  },
                  {
                    stepNumber: 3,
                    phaseEn: "Step 3 • Maintenance",
                    phaseBn: "ধাপ ৩ • পরিচর্যা",
                    titleEn: "Water & Nutrient Care",
                    titleBn: "সেচ ও যত্ন",
                    instructionEn: "Maintain soil moisture at key developmental stages.",
                    instructionBn: "গুরুত্বপূর্ণ সময়ে প্রয়োজনীয় সেচ নিশ্চিত করুন।",
                    iconName: "Droplets" as const,
                  },
                ]
            ).map((step) => {
              const IconComp =
                step.iconName === "Droplets"
                  ? Droplets
                  : step.iconName === "Clock"
                  ? Clock
                  : step.iconName === "ShieldCheck"
                  ? ShieldCheck
                  : Sprout;

              return (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1E7B48] uppercase tracking-wider">
                      {lang === "en" ? step.phaseEn : step.phaseBn}
                    </span>
                    <IconComp
                      size={14}
                      className={
                        step.iconName === "Droplets"
                          ? "text-[#0284C7]"
                          : step.iconName === "ShieldCheck"
                          ? "text-[#16A34A]"
                          : "text-stone-400"
                      }
                    />
                  </div>
                  <div className="text-sm font-semibold text-stone-900">
                    {lang === "en" ? step.titleEn : step.titleBn}
                  </div>
                  <p className="text-stone-600 text-sm font-normal leading-relaxed">
                    {lang === "en" ? step.instructionEn : step.instructionBn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          ALL CROPS SEASONAL REFERENCE MATRIX (Interactive Cards with Real Photos)
          ========================================================================= */}
      <div className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-stone-900 flex items-center gap-2">
              <Calendar size={18} className="text-[#1E7B48]" />
              <span>{lang === "en" ? "Planting Dates for All Major Crops" : "সকল প্রধান ফসলের রোপণ সময়সূচী"}</span>
            </h3>
            <p className="text-sm text-stone-500 font-normal mt-0.5">
              {lang === "en"
                ? "Click any crop below to load its safe dates into the timeline above"
                : "যেকোনো ফসলে ক্লিক করে উপরের টাইমলাইনে বিস্তারিত দেখুন"}
            </p>
          </div>
        </div>

        {/* 6 Crops Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {crops.map((c) => {
            const isSelected = currentCrop.id === c.id;
            const cropCalendar = optimizeSowingCalendar(c, currentZone, metrics);
            const safeDates = cropCalendar.nasaAdjustedWindow;
            const image = getCropImage(c.id);

            return (
              <div
                key={c.id}
                onClick={() => handleSelectCrop(c.id)}
                className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-[#1E7B48] bg-[#F6FAF6] ring-2 ring-[#1E7B48]/15 shadow-sm"
                    : "border-stone-200/80 hover:border-emerald-300 hover:shadow-xs bg-white"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-100 bg-stone-100">
                      <img
                        src={image}
                        alt={c.nameEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-stone-900 truncate">
                          {lang === "en" ? c.nameEn : c.nameBn}
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D]">
                            {lang === "en" ? "Active" : "সক্রিয়"}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-600 font-medium block mt-0.5">
                        {c.growthDays} {lang === "en" ? "Days to Harvest" : "দিন"}
                      </span>
                    </div>
                  </div>

                  {/* Dates Box */}
                  <div className="p-2.5 rounded-xl bg-white border border-stone-100 text-sm space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">
                        {lang === "en" ? "Recommended:" : "উপযুক্ত সময়:"}
                      </span>
                      <span className="font-bold text-[#1E7B48] font-mono">
                        {safeDates}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                      <span>{lang === "en" ? "Old Window:" : "পূর্ববর্তী সময়:"}</span>
                      <span className="line-through font-mono">{c.typicalSowing.label}</span>
                    </div>
                  </div>

                  <p className="text-sm font-normal text-stone-600 line-clamp-2 leading-relaxed">
                    {lang === "en" ? c.descriptionEn : c.descriptionBn}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className={`font-semibold text-xs ${isSelected ? "text-[#1E7B48]" : "text-stone-600"}`}>
                    {isSelected
                      ? (lang === "en" ? "Currently Viewing" : "বর্তমানে প্রদর্শিত")
                      : (lang === "en" ? "Click to View Calendar" : "ক্যালেন্ডার দেখতে ক্লিক করুন")}
                  </span>
                  <ChevronRight size={14} className={isSelected ? "text-[#1E7B48]" : "text-stone-400"} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          BOTTOM NAVIGATION & NEXT STEP CTA
          ========================================================================= */}
      <div className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 sm:p-6 lg:p-7 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
        <Link
          href="/shift"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm sm:text-base font-semibold transition-all text-center"
        >
          <ArrowLeft size={16} />
          <span>{lang === "en" ? "Back to Crop Recommendations" : "বিকল্প ফসলের তালিকায় ফিরুন"}</span>
        </Link>

        <div className="text-center md:text-right space-y-0.5">
          <div className="text-sm sm:text-base font-semibold text-stone-900">
            {lang === "en" ? `Calendar Ready for ${currentCrop.nameEn}` : `${currentCrop.nameBn} এর সময়সূচী প্রস্তুত`}
          </div>
          <div className="text-xs text-stone-600 font-medium">
            {lang === "en" ? "Access timely alerts and weather advisories" : "সঠিক সময়ে আবহাওয়া ও কৃষি পরামর্শ দেখুন"}
          </div>
        </div>

        <Link
          href="/advisory"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all shrink-0 text-center"
        >
          <span>{lang === "en" ? "See Weather & Climate Alerts" : "আবহাওয়া ও জলবায়ু সতর্কতা"}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
