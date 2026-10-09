"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { EmptyStatePrompt } from "@/components/EmptyStatePrompt";
import {
  MapPin,
  Sprout,
  Droplets,
  Flame,
  Clock,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  Gauge,
  Banknote,
  ArrowRight,
  Layers,
  Sliders,
} from "lucide-react";

export default function AdvisoryPage() {
  const {
    currentZone,
    currentCrop,
    assessment,
    calendar,
    lang,
    farmerStatus,
    setFarmerStatus,
    waterAccess,
    hasConfigured,
    isHydrated,
  } = useApp();

  const isPlanted = farmerStatus === "already_planted";

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
    return <EmptyStatePrompt pageType="advisory" lang={lang} />;
  }

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* =========================================================================
          HERO BANNER (Matching the premium aesthetics of Crop Shift page)
          ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] min-h-[320px] flex flex-col justify-between">
        {/* Full Photographic Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
        />

        {/* Soft Gradient Overlay for Optimal Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 sm:via-white/70 to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 h-full">
          {/* Left Title & Simple Explanations */}
          <div className="space-y-3 max-w-2xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E7B48] text-xs font-bold border border-emerald-200/80 shadow-2xs">
              <ShieldCheck size={13} className="text-[#1E7B48]" />
              <span>
                {isPlanted
                  ? (lang === "en" ? "LIVE FIELD DIRECTIVES" : "মাঠপর্যায়ের জরুরি নির্দেশনা")
                  : (lang === "en" ? "PRE-SEASON PLANNING ADVISORY" : "মৌসুমের প্রস্তুতিমূলক পরামর্শ")}
              </span>
              <span className="text-stone-300">•</span>
              <span className="font-semibold text-stone-700">
                {currentZone.nameEn.split(",")[0]}, Rajshahi
              </span>
            </div>

            <h1 className="text-[28px] sm:text-[32px] font-bold text-stone-900 tracking-tight leading-tight">
              {isPlanted
                ? (lang === "en"
                    ? "In-Season Field Guidance & Rescue"
                    : "চলতি ফসলের জরুরি মাঠ পরামর্শ ও সুরক্ষা")
                : (lang === "en"
                    ? "Pre-Season Planning & Crop Shift"
                    : "মৌসুমের প্রস্তুতি ও ফসল নির্বাচন পরামর্শ")}
            </h1>

            <p className="text-sm sm:text-base font-normal text-stone-600 leading-relaxed max-w-xl">
              {isPlanted
                ? (lang === "en"
                    ? "Directives for standing crops: AWD water-saving schedule, flower heatwave protection, and deep tubewell pump defense based on NASA Earth telemetry."
                    : "জমিতে থাকা ফসলের সরাসরি পরিচর্যা: পর্যায়ক্রমিক সেচ (AWD), তাপদাহে ফুল ঝরে পড়া রোধ এবং ভূগর্ভস্থ পানির সুরক্ষা ব্যবস্থা।")
                : (lang === "en"
                    ? "Directives before sowing: optimal planting calendar delay, high-profit crop alternatives, and pumping fuel savings based on NASA Earth telemetry."
                    : "রোপণের পূর্ববর্তী সঠিক পরিকল্পনা: লাভজনক বিকল্প ফসল, ক্যালেন্ডার স্থানান্তরের মাধ্যমে তাপদাহ এড়ানো এবং সেচ খরচ কমানোর উপায়।")}
            </p>

            {/* Field Information Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs flex items-center gap-1.5">
                <MapPin size={13} className="text-[#1E7B48]" />
                <span>{currentZone.nameEn}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs flex items-center gap-1.5">
                <Sprout size={13} className="text-[#1E7B48]" />
                <span>
                  {isPlanted
                    ? (lang === "en" ? "Standing Crop:" : "চলতি ফসল:")
                    : (lang === "en" ? "Target Crop:" : "পরিকল্পিত ফসল:")}{" "}
                  {currentCrop.nameEn}
                </span>
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

          {/* Right: Tactile Status Pill & Quick Snapshot Card */}
          <div className="w-full lg:w-84 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md space-y-3.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-800 flex items-center gap-1.5">
                <Sliders size={14} className="text-[#1E7B48]" />
                <span>{lang === "en" ? "Farmer Situation" : "কৃষকের অবস্থা"}</span>
              </span>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-semibold border font-mono shadow-2xs ${
                  isPlanted
                    ? "bg-amber-100 text-amber-900 border-amber-200"
                    : "bg-[#DCFCE7] text-[#15803D] border-emerald-200"
                }`}
              >
                {isPlanted
                  ? (lang === "en" ? "Standing Crop" : "জমিতে ফসল আছে")
                  : (lang === "en" ? "Pre-Sowing Plan" : "ফসল লাগাইনি")}
              </span>
            </div>

            {/* Quick Switcher Buttons */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 border border-stone-200/80">
              <button
                type="button"
                onClick={() => setFarmerStatus("not_planted")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                  !isPlanted
                    ? "bg-[#1E7B48] text-white shadow-2xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Sprout size={13} />
                <span>{lang === "en" ? "Not Planted" : "ফসল লাগাইনি"}</span>
              </button>
              <button
                type="button"
                onClick={() => setFarmerStatus("already_planted")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                  isPlanted
                    ? "bg-[#1E7B48] text-white shadow-2xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <CheckCircle2 size={13} />
                <span>{lang === "en" ? "Planted" : "রোপণকৃত"}</span>
              </button>
            </div>

            {/* Snapshot KPI Grid */}
            <div className="pt-1 grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <span className="text-xs text-stone-500 font-medium block">
                  {isPlanted
                    ? (lang === "en" ? "AWD Saves Fuel" : "ডিজেল সাশ্রয়")
                    : (lang === "en" ? "Calendar Shift" : "সময়সূচী স্থানান্তর")}
                </span>
                <span className="text-sm font-bold text-[#1E7B48] font-mono block mt-0.5">
                  {isPlanted ? "28% Less" : "+14 Days"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <span className="text-xs text-stone-500 font-medium block">
                  {isPlanted
                    ? (lang === "en" ? "Thermal Defense" : "তাপদাহ সুরক্ষা")
                    : (lang === "en" ? "Water Saved" : "পানি সাশ্রয়")}
                </span>
                <span className="text-sm font-bold text-amber-700 font-mono block mt-0.5">
                  {isPlanted ? ">34.5°C Guard" : "77% Less"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          KEY IMPACT METRIC STRIP (Matches the polished visual style of Crop Shift)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 border border-sky-100">
            <Droplets size={20} />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight font-mono">
              {isPlanted ? "28% Less" : "77% Less"}
            </div>
            <div className="text-sm font-bold text-stone-800 mt-0.5 leading-tight">
              {isPlanted
                ? (lang === "en" ? "Irrigation Fuel Saved" : "সেচের জ্বালানি সাশ্রয়")
                : (lang === "en" ? "Water Volume Saved" : "পানির পরিমাণ সাশ্রয়")}
            </div>
            <div className="text-xs text-stone-500 leading-tight mt-0.5">
              {isPlanted
                ? (lang === "en" ? "via AWD dry-down cycles" : "AWD পর্যায়ক্রমিক সেচের মাধ্যমে")
                : (lang === "en" ? "vs traditional flooded Boro" : "ঐতিহ্যবাহী বোরো ধানের চেয়ে")}
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-emerald-100">
            <Banknote size={20} />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight font-mono">
              ~৳8,500 – ৳14,000
            </div>
            <div className="text-sm font-bold text-stone-800 mt-0.5 leading-tight">
              {lang === "en" ? "Direct Money Saved / Acre" : "একরে নগদ টাকা সাশ্রয়"}
            </div>
            <div className="text-xs text-stone-500 leading-tight mt-0.5">
              {lang === "en" ? "Preserves farmer profit margin" : "কৃষকের উৎপাদন খরচ কমায়"}
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 border border-amber-100">
            <Flame size={20} />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight font-mono">
              85% Protection
            </div>
            <div className="text-sm font-bold text-stone-800 mt-0.5 leading-tight">
              {lang === "en" ? "Heat Sterility Evasion" : "চিটা ধান ও ফুল ঝরা রোধ"}
            </div>
            <div className="text-xs text-stone-500 leading-tight mt-0.5">
              {lang === "en" ? "Shields late March anthesis" : "মার্চের তাপদাহ থেকে ফুল রক্ষা"}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          POLISHED ACTION DIRECTIVES (With rich photography & telemetry data)
          ========================================================================= */}
      <div className="space-y-5">
        {isPlanted ? (
          /* =====================================================================
             FLOW 1: STANDING CROP DIRECTIVES (Already Planted)
             ===================================================================== */
          <>
            {/* Directive 1: AWD Intermittent Irrigation */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1E7B48] flex items-center justify-center shrink-0">
                    <Droplets size={19} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg sm:text-xl text-stone-900">
                      {lang === "en"
                        ? "Directive 1: Alternate Wetting & Drying (AWD)"
                        : "নির্দেশনা ১: পর্যায়ক্রমিক সেচ (AWD) ব্যবস্থাপনা"}
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {lang === "en"
                        ? "BRRI scientific intermittent irrigation protocol"
                        : "ব্রি (BRRI) উদ্ভাবিত আধুনিক পর্যায়ক্রমিক সেচ পদ্ধতি"}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#1E7B48] border border-emerald-200 font-mono shadow-2xs">
                  {lang === "en" ? "Saves 28% Diesel" : "২৮% জ্বালানি সাশ্রয়"}
                </span>
              </div>

              {/* Media & Descriptive Row */}
              <div className="flex flex-col md:flex-row items-start gap-5 pt-1">
                {/* Photographic Thumbnail */}
                <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0 border border-stone-200/80 bg-stone-100 shadow-2xs relative">
                  <img
                    src="/images/rice_crop.jpg"
                    alt="AWD Rice Irrigation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-medium">
                    {lang === "en" ? "Standing Paddy" : "চলতি বোরো ধান"}
                  </div>
                </div>

                {/* Explanation Content */}
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    {lang === "en"
                      ? "Do NOT keep standing water in the field 24/7! Allow water to naturally recede 15 cm below soil surface before the next pumping round. Roots aerate better, fungal rot is prevented, and deep tubewell pumping bills drop by 28% without sacrificing grain yield."
                      : "জমিতে সবসময় পানি জমিয়ে রাখবেন না! মাটির ১৫ সেমি নিচে পানি নামার পর পরবর্তী সেচ দিন। এতে ধানের শিকড় অক্সিজেন পায়, পচন রোধ হয় এবং সেচের জ্বালানি খরচ ২৮% পর্যন্ত কমে যায় কোনো ফলন ঘাটতি ছাড়াই।"}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs space-y-1">
                      <span className="text-stone-500 font-medium block">
                        {lang === "en" ? "Next Recommended Watering" : "পরবর্তী সেচের উপযুক্ত সময়"}
                      </span>
                      <span className="font-bold text-[#1E7B48] text-base font-mono block">
                        {lang === "en" ? "In 3–4 Days" : "৩-৪ দিন পর"}
                      </span>
                      <span className="text-stone-500 text-xs block">
                        {lang === "en" ? "NASA SMAP Root Deficit: -28%" : "নাসা এসএমএপি মাটির আর্দ্রতা ঘাটতি: -২৮%"}
                      </span>
                    </div>

                    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs space-y-1">
                      <span className="text-stone-500 font-medium block">
                        {lang === "en" ? "Optimal Pumping Hours" : "সেচ দেওয়ার সঠিক সময়"}
                      </span>
                      <span className="font-bold text-stone-900 text-base font-mono block">
                        9 PM – 5 AM
                      </span>
                      <span className="text-stone-500 text-xs block">
                        {lang === "en" ? "Cuts daytime evaporation by 40%" : "বাষ্পীভবন ৪০% কমিয়ে দেয়"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Directive 2: Anthesis Heat Stress Defense */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Flame size={19} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg sm:text-xl text-stone-900">
                      {lang === "en"
                        ? "Directive 2: Flowering Anthesis Heat Shield"
                        : "নির্দেশনা ২: ফুল ফোটার সময়ে তাপদাহ থেকে রক্ষা"}
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {lang === "en"
                        ? "NASA orbital thermal threshold warning (>34.5°C)"
                        : "নাসা উপগ্রহের তাপমাত্রাজনিত জরুরি সতর্কতা (>৩৪.৫° সে)"}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 font-mono shadow-2xs">
                  &gt;34.5°C Spike Defense
                </span>
              </div>

              {/* Media & Descriptive Row */}
              <div className="flex flex-col md:flex-row items-start gap-5 pt-1">
                {/* Photographic Thumbnail */}
                <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0 border border-stone-200/80 bg-stone-100 shadow-2xs relative">
                  <img
                    src="/images/wheat_crop.jpg"
                    alt="Canopy Heat Defense"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-medium">
                    {lang === "en" ? "Flowering Stage" : "ফুল ফোটার পর্যায়"}
                  </div>
                </div>

                {/* Explanation Content */}
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    {lang === "en"
                      ? "During heading and flowering (March 15 – 28), temperatures above 34.5°C dehydrate rice pollen within 2 hours, resulting in complete grain sterility (chiṭa dhan). Keep a 5–7 cm standing water layer in fields during hot afternoons to cool canopy temperatures by 2–3°C, and apply a 1% foliar spray of chelated potassium/zinc."
                      : "মার্চের ১৫-২৮ তারিখে ধানের ফুল ফোটার সময়ে তাপমাত্রা ৩৪.৫° সে ছাড়ালে মাত্র ২ ঘণ্টায় পরাগরেণু শুকিয়ে ধান চিটা হয়ে যায়। এ সময়ে দুপুরে জমিতে ৫-৭ সেমি পানি ধরে রেখে তাপমাত্রা ২-৩° সে কমিয়ে রাখুন এবং ফুল রক্ষা করতে ১% পটাশ বা চিলেটেড দস্তা স্প্রে করুন।"}
                  </p>

                  <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 flex items-center justify-between text-xs sm:text-sm text-amber-950">
                    <span className="font-semibold flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-amber-700" />
                      <span>{lang === "en" ? "Transpirational Canopy Cooling:" : "ক্যানোপি শীতলকরণে ফলন বিপর্যয় রক্ষা:"}</span>
                    </span>
                    <span className="font-bold text-amber-800 font-mono text-base">
                      85% Protection
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Directive 3: Pre-Harvest Relay Catch Crop Preparation */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Clock size={19} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg sm:text-xl text-stone-900">
                      {lang === "en"
                        ? "Directive 3: Pre-Harvest Relay Catch Crop Preparation"
                        : "নির্দেশনা ৩: ধান কাটার পরপরই সাথী ফসলের প্রস্তুতি"}
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {lang === "en"
                        ? "Post-harvest quick cash flow & residual moisture utilization"
                        : "ধান কাটার পরই বাড়তি আয় ও মাটির অবশিষ্ট আর্দ্রতার ব্যবহার"}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono shadow-2xs">
                  ~45 Days to Harvest
                </span>
              </div>

              {/* Media & Descriptive Row */}
              <div className="flex flex-col md:flex-row items-start gap-5 pt-1">
                {/* Photographic Thumbnail */}
                <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0 border border-stone-200/80 bg-stone-100 shadow-2xs relative">
                  <img
                    src="/images/lentil_crop.jpg"
                    alt="Summer Mung Bean"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-medium">
                    {lang === "en" ? "Summer Pulses" : "গ্রীষ্মকালীন ডাল"}
                  </div>
                </div>

                {/* Explanation Content */}
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    {lang === "en"
                      ? "Prepare 60-day summer mung bean (BARI Mung-6) or sesame seeds now. Sowing right after harvest takes advantage of leftover root-zone moisture, restores soil nitrogen naturally, and generates fast extra revenue (~৳25,000–35,000/acre) before the monsoon Aman planting cycle."
                      : "ধান কাটার আর প্রায় ৪৫ দিন বাকি। এখনই ৬০ দিনের গ্রীষ্মকালীন মুগ ডাল (বারি মুগ-৬) বা তিল বীজ সংগ্রহ করুন। ধান কাটার সাথে সাথেই অবশিষ্ট মাটিতে বীজ বুনলে মাটির উর্বরতা বাড়ে এবং বর্ষার আগেই বিঘাপ্রতি প্রায় ২৫,০০০–৩৫,০০০ টাকা দ্রুত বাড়তি আয় আসে।"}
                  </p>

                  <div className="p-3.5 bg-indigo-50/80 rounded-2xl border border-indigo-200/80 flex items-center justify-between text-xs sm:text-sm text-indigo-950">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Sprout size={16} className="text-indigo-700" />
                      <span>{lang === "en" ? "Recommended Relay Cultivar:" : "প্রস্তাবিত সাথী ফসল জাত:"}</span>
                    </span>
                    <span className="font-bold text-indigo-800 font-mono text-sm sm:text-base">
                      BARI Mung-6 (60 Days)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* =====================================================================
             FLOW 2: PRE-SEASON PLANNING DIRECTIVES (Not Planted Yet)
             ===================================================================== */
          <>
            {/* Directive 1: Sowing Window Shift */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Calendar size={19} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg sm:text-xl text-stone-900">
                      {lang === "en"
                        ? "Directive 1: Planting Window Calendar Shift"
                        : "নির্দেশনা ১: চারা রোপণ সময়সূচী পরিবর্তন"}
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {lang === "en"
                        ? "NASA POWER agroclimatological thermal avoidance model"
                        : "নাসা উপগ্রহ তথ্যের ভিত্তিতে তাপদাহ এড়িয়ে চলার মডেল"}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono shadow-2xs">
                  +14 Days Delay
                </span>
              </div>

              {/* Media & Descriptive Row */}
              <div className="flex flex-col md:flex-row items-start gap-5 pt-1">
                {/* Photographic Thumbnail */}
                <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0 border border-stone-200/80 bg-stone-100 shadow-2xs relative">
                  <img
                    src="/images/wheat_crop.jpg"
                    alt="Sowing Calendar Delay"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-medium">
                    {lang === "en" ? "Transplanting Window" : "রোপণ সময়সূচী"}
                  </div>
                </div>

                {/* Explanation Content */}
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    {lang === "en"
                      ? `Traditional transplanting on ${calendar.traditionalWindow} causes peak flowering to hit severe late March heat waves (>34.5°C). Farmers in ${currentZone.nameEn} are directed to delay transplanting to ${calendar.nasaAdjustedWindow}. Pushes flowering into cooler April night temperatures.`
                      : `${calendar.traditionalWindow} সময়ে ধান রোপণ করলে মার্চের চরম তাপদাহে ফুল ঝরে পড়ার মারাত্মক ঝুঁকি থাকে। ${currentZone.nameBn} এর কৃষকদের চারা রোপণ ${calendar.nasaAdjustedWindow} পর্যন্ত পিছিয়ে দেওয়ার পরামর্শ দেওয়া হচ্ছে।`}
                  </p>

                  <div className="p-3.5 bg-indigo-50/80 rounded-2xl border border-indigo-200/80 flex items-center justify-between text-xs sm:text-sm text-indigo-950">
                    <span className="font-semibold">
                      {lang === "en" ? "Sterility Avoidance Rate:" : "ফলন বিপর্যয় এড়ানোর হার:"}
                    </span>
                    <span className="font-bold text-base text-indigo-700 font-mono">
                      {calendar.heatAvoidanceScorePercent}% Safe
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Directive 2: Crop Diversification Protocol */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1E7B48] flex items-center justify-center shrink-0">
                    <Sprout size={19} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg sm:text-xl text-stone-900">
                      {lang === "en"
                        ? "Directive 2: Recommended Crop Diversification"
                        : "নির্দেশনা ২: লাভজনক বিকল্প ফসল মডেল"}
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {lang === "en"
                        ? "Low-water, high-margin alternative cultivars"
                        : "স্বল্প পানির উচ্চফলনশীল ও নিরাপদ বিকল্প ফসল"}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#1E7B48] border border-emerald-200 font-mono shadow-2xs">
                  Low-Water Crop
                </span>
              </div>

              {/* Media & Descriptive Row */}
              <div className="flex flex-col md:flex-row items-start gap-5 pt-1">
                {/* Photographic Thumbnail */}
                <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0 border border-stone-200/80 bg-stone-100 shadow-2xs relative">
                  <img
                    src="/images/mustard_crop.jpg"
                    alt="BARI Mustard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-medium">
                    {lang === "en" ? "BARI Mustard-14" : "বারি সরিষা-১৪"}
                  </div>
                </div>

                {/* Explanation Content */}
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    {lang === "en"
                      ? `Due to rapid groundwater depletion, farmers dependent on tubewells are advised to dedicate at least 50% of acreage to ${assessment.recommendedAlternatives[0]?.crop.nameEn}. Guarantees harvest in 80 days before summer heat waves and saves over ৳14,000 per acre in pumping fuel.`
                      : `ভূগর্ভস্থ পানির তীব্র সংকটের কারণে নলকূপের ওপর নির্ভরশীল কৃষকদের অন্তত ৫০% জমিতে ${assessment.recommendedAlternatives[0]?.crop.nameBn} চাষের নির্দেশ দেওয়া হচ্ছে। এটি গরমের আগেই ৮০ দিনে ফসল তোলা নিশ্চিত করে ও একরে প্রায় ১৪,০০০ টাকা সেচ খরচ বাঁচায়।`}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs">
                      <span className="text-stone-500 block font-medium">
                        {lang === "en" ? "Water Saved vs Rice" : "বোরো ধানের চেয়ে পানি সাশ্রয়"}
                      </span>
                      <span className="font-bold text-[#1E7B48] text-base font-mono block mt-0.5">
                        {assessment.recommendedAlternatives[0]?.crop.waterSavingsVsRicePercent}% Less Water
                      </span>
                    </div>
                    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs">
                      <span className="text-stone-500 block font-medium">
                        {lang === "en" ? "Pumping Fuel Cost Saved / Acre" : "একরে সেচের জ্বালানি খরচ সাশ্রয়"}
                      </span>
                      <span className="font-bold text-[#1E7B48] text-base font-mono block mt-0.5">
                        ৳{assessment.recommendedAlternatives[0]?.estimatedCostSavedBdtPerAcre.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Directive 3: Seedbed Timing Protocol */}
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                    <Clock size={19} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg sm:text-xl text-stone-900">
                      {lang === "en"
                        ? "Directive 3: Seedbed Preparation Timing"
                        : "নির্দেশনা ৩: বীজতলা তৈরির সঠিক সময়"}
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {lang === "en"
                        ? "Nursery calendar alignment for healthy seedlings"
                        : "সুস্থ চারা উৎপাদনে বীজতলার সঠিক সময়সূচী"}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 font-mono shadow-2xs">
                  Nov 28 – Dec 5
                </span>
              </div>

              {/* Media & Descriptive Row */}
              <div className="flex flex-col md:flex-row items-start gap-5 pt-1">
                {/* Photographic Thumbnail */}
                <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0 border border-stone-200/80 bg-stone-100 shadow-2xs relative">
                  <img
                    src="/images/rice_crop.jpg"
                    alt="Seedbed Preparation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-medium">
                    {lang === "en" ? "Seedbed Stage" : "বীজতলা পর্যায়"}
                  </div>
                </div>

                {/* Explanation Content */}
                <div className="flex-1 space-y-3">
                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    {lang === "en"
                      ? "Sow nursery seeds between Nov 28 – Dec 5. Delaying the seedbed stops seedlings from maturing too early and ensures 25-day old vigorous seedlings ready for December transplanting."
                      : "২৮ নভেম্বর থেকে ৫ ডিসেম্বরের মধ্যে বীজতলায় বীজ ফেলুন যাতে চারা অতিরিক্ত আগে না বাড়ে এবং ডিসেম্বরের মাঝামাঝি সুস্থ চারা জমিতে লাগানো যায়।"}
                  </p>

                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between text-xs sm:text-sm text-stone-800">
                    <span className="font-semibold">
                      {lang === "en" ? "Target Seedling Age for Transplant:" : "চারা রোপণের আদর্শ বয়স:"}
                    </span>
                    <span className="font-bold text-base font-mono text-[#1E7B48]">
                      25 Days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
