"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Sprout,
  ShieldAlert,
  Flame,
  Droplets,
  Clock,
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
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
  } = useApp();

  const [copied, setCopied] = useState(false);

  const isPlanted = farmerStatus === "already_planted";

  // Dynamic official bulletin text based on farmer status
  const advisoryText = isPlanted
    ? (lang === "en"
        ? `[FieldShift Official In-Season Advisory] Region: ${currentZone.nameEn} | Crop: ${currentCrop.nameEn} | Water: ${waterAccess}\n` +
          `• In-Season Alert: Groundwater drawdown (-28%) and >34.5°C flowering thermal spike expected.\n` +
          `• Directive 1 (AWD Irrigation): Do NOT keep field continuously flooded. Let water drop 15 cm below soil before next pumping. Next round in 3-4 days. Saves 28% pump fuel.\n` +
          `• Directive 2 (Flowering Heat Shield): During March flowering afternoons, maintain 5-7 cm standing water layer to cool canopy 2-3°C. Apply 1% chelated zinc/potassium foliar spray to prevent empty grains.\n` +
          `• Directive 3 (Relay Prep): Harvest in ~45 days. Prepare summer mung bean (BARI Mung-6) seeds now for immediate post-harvest sowing.`
        : `[কৃষি পরিবর্তন সরকারি মাঠপর্যায়ের নির্দেশনা - চলতি ফসল] অঞ্চল: ${currentZone.nameBn} | ফসল: ${currentCrop.nameBn} | পানির উৎস: ${waterAccess}\n` +
          `• চলতি মাঠ সতর্কতা: ভূগর্ভস্থ পানির ঘাটতি -২৮% এবং ফুল ফোটার সময় ৩৫° সে এর বেশি তাপদাহের আশঙ্কা।\n` +
          `• নির্দেশনা ১ (পর্যায়ক্রমিক সেচ): জমিতে সবসময় পানি জমিয়ে রাখবেন না। মাটির ১৫ সেমি নিচে নামলে সেচ দিন (৩-৪ দিন পর)। ২৮% জ্বালানি খরচ বাঁচবে।\n` +
          `• নির্দেশনা ২ (ফুল রক্ষা ও চিটা ধান রোধ): ফুল ফোটার সময়ে দুপুরে জমিতে ৫-৭ সেমি পানি ধরে রেখে তাপমাত্রা ২-৩° সে কমিয়ে রাখুন। ফুল রক্ষায় ১% পটাশ বা দস্তা স্প্রে করুন।\n` +
          `• নির্দেশনা ৩ (পরবর্তী ফসল): আর ~৪৫ দিন পর ধান কাটা হবে। কাটার পরপরই বোনার জন্য এখনই গ্রীষ্মকালীন মুগ ডাল (বারি মুগ-৬) বীজ প্রস্তুত রাখুন।`)
    : (lang === "en"
        ? `[FieldShift Official Pre-Season Planning Directive] Region: ${currentZone.nameEn} | Planned: ${currentCrop.nameEn} | Water: ${waterAccess}\n` +
          `• Planning Alert: Boro rice has 65% failure risk this season due to deep tubewell depletion and late March heatwaves.\n` +
          `• Directive 1 (Window Shift): Delay transplanting by 14 days to ${calendar.nasaAdjustedWindow} to push flowering into cooler April nights (88% sterility avoidance).\n` +
          `• Directive 2 (Crop Shift): Dedicate at least 50% acreage to ${assessment.recommendedAlternatives[0]?.crop.nameEn} to save ${assessment.recommendedAlternatives[0]?.crop.waterSavingsVsRicePercent}% water and ৳${assessment.recommendedAlternatives[0]?.estimatedCostSavedBdtPerAcre.toLocaleString()} per acre.\n` +
          `• Directive 3 (Nursery Prep): Sow seedbed between Nov 28 - Dec 5 to prevent seedlings from maturing too early.`
        : `[কৃষি পরিবর্তন সরকারি মাঠপর্যায়ের নির্দেশনা - মৌসুম পরিকল্পনা] অঞ্চল: ${currentZone.nameBn} | ফসল: ${currentCrop.nameBn} | পানির উৎস: ${waterAccess}\n` +
          `• পরিকল্পনা সতর্কতা: তীব্র পানির সংকট ও মার্চের গরমের কারণে বোরো ধানে এবার ৬৫% পর্যন্ত ক্ষতির ঝুঁকি রয়েছে।\n` +
          `• নির্দেশনা ১ (সময়সূচী পরিবর্তন): চারা রোপণ ১৪ দিন পিছিয়ে ${calendar.nasaAdjustedWindow} এ সম্পন্ন করুন যাতে মার্চের তাপদাহে ফুল রক্ষা পায় (৮৮% ফলন সুরক্ষা)।\n` +
          `• নির্দেশনা ২ (বিকল্প ফসল): অন্তত ৫০% জমিতে ${assessment.recommendedAlternatives[0]?.crop.nameBn} চাষ করুন। এতে ${assessment.recommendedAlternatives[0]?.crop.waterSavingsVsRicePercent}% পানি এবং একরে ৳${assessment.recommendedAlternatives[0]?.estimatedCostSavedBdtPerAcre.toLocaleString()} সেচ খরচ বাঁচবে।\n` +
          `• নির্দেশনা ৩ (বীজতলা): ২৮ নভেম্বর থেকে ৫ ডিসেম্বরের মধ্যে বীজতলায় বীজ ফেলুন যাতে চারা অতিরিক্ত আগে না বাড়ে।`);

  const handleCopy = () => {
    navigator.clipboard.writeText(advisoryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title & Context Header with In-Place Situation Toggle */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isPlanted
                  ? "bg-amber-100 text-amber-900 border-amber-200"
                  : "bg-emerald-100 text-[#15803D] border border-emerald-200"
              }`}
            >
              {isPlanted
                ? (lang === "en" ? "In-Season Field Management" : "জমিতে থাকা চলতি ফসলের পরিচর্যা")
                : (lang === "en" ? "Pre-Season Planning Mode" : "মৌসুমের প্রস্তুতিমূলক পরিকল্পনা")}
            </span>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              {currentZone.nameEn.split(",")[0]}, Rajshahi
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[32px] font-bold text-stone-900 tracking-tight">
            {isPlanted
              ? (lang === "en" ? "In-Season Field Guidance & Rescue" : "চলতি ফসলের জরুরি মাঠ পরামর্শ ও সুরক্ষা")
              : (lang === "en" ? "Pre-Season Planning & Crop Shift" : "মৌসুমের প্রস্তুতি ও ফসল নির্বাচন পরামর্শ")}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-2xl leading-relaxed font-normal">
            {isPlanted
              ? (lang === "en"
                  ? "Directives for standing crops: AWD water-saving schedule, flower heatwave protection, and pump burnout defense based on NASA Earth telemetry."
                  : "জমিতে থাকা ফসলের সরাসরি পরিচর্যা: পর্যায়ক্রমিক সেচ (AWD), তাপদাহে ফুল ঝরে পড়া রোধ এবং ভূগর্ভস্থ পানির সুরক্ষা ব্যবস্থা।")
              : (lang === "en"
                  ? "Directives before sowing: optimal planting calendar delay, high-profit crop alternatives, and pumping fuel savings based on NASA Earth telemetry."
                  : "রোপণের পূর্ববর্তী সঠিক পরিকল্পনা: লাভজনক বিকল্প ফসল, ক্যালেন্ডার স্থানান্তরের মাধ্যমে তাপদাহ এড়ানো এবং সেচ খরচ কমানোর উপায়।")}
          </p>
        </div>

        {/* Situation Switcher directly on Advisory Page */}
        <div className="p-1.5 rounded-2xl bg-stone-100 border border-stone-200/80 flex items-center gap-1.5 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={() => setFarmerStatus("not_planted")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              !isPlanted
                ? "bg-[#1E7B48] text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900 hover:bg-white/60"
            }`}
          >
            <Sprout size={15} />
            <span>{lang === "en" ? "Not Planted (Plan)" : "ফসল লাগাইনি"}</span>
          </button>
          <button
            type="button"
            onClick={() => setFarmerStatus("already_planted")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              isPlanted
                ? "bg-[#1E7B48] text-white shadow-xs"
                : "text-stone-700 hover:text-stone-900 hover:bg-white/60"
            }`}
          >
            <CheckCircle2 size={15} />
            <span>{lang === "en" ? "Already Planted" : "জমিতে ফসল আছে"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Directives + Right Emergency Alert Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =====================================================================
            LEFT COLUMN (7 cols): Specialized Action Directives
            ===================================================================== */}
        <div className="lg:col-span-7 space-y-5">
          {isPlanted ? (
            /* ===================================================================
               FLOW 1: ALREADY PLANTED DIRECTIVES (AWD, Flower Heat, Relay Prep)
               =================================================================== */
            <>
              {/* Directive 1: AWD Irrigation Schedule */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#1E7B48] font-semibold text-sm">
                    <Droplets size={18} />
                    <h3 className="font-semibold text-base sm:text-lg text-stone-900">
                      {lang === "en"
                        ? "Directive 1: Alternate Wetting & Drying (AWD)"
                        : "নির্দেশনা ১: পর্যায়ক্রমিক সেচ (AWD) ব্যবস্থাপনা"}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#1E7B48] border border-emerald-200 font-mono">
                    {lang === "en" ? "Saves 28% Diesel" : "২৮% জ্বালানি সাশ্রয়"}
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {lang === "en"
                    ? "Do NOT keep standing water in the field 24/7! Allow water to naturally recede 15 cm below soil surface before the next pumping round. Roots aerate better, fungal rot is prevented, and diesel pumping bills drop by 28%."
                    : "জমিতে সবসময় পানি জমিয়ে রাখবেন না! মাটির ১৫ সেমি নিচে পানি নামার পর পরবর্তী সেচ দিন। এতে ধানের শিকড়ে অক্সিজেন পায়, পচন রোধ হয় এবং সেচের জ্বালানি খরচ ২৮% পর্যন্ত কমে যায়।"}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                    <span className="text-stone-500 block text-xs font-medium">
                      {lang === "en" ? "Next Recommended Watering" : "পরবর্তী সেচের উপযুক্ত সময়"}
                    </span>
                    <span className="font-bold text-[#1E7B48] text-base sm:text-lg font-mono block mt-0.5">
                      {lang === "en" ? "In 3–4 Days" : "৩-৪ দিন পর"}
                    </span>
                    <span className="text-stone-500 text-xs block mt-0.5">
                      {lang === "en" ? "SMAP Root-Zone Deficit: -28%" : "মাটির আর্দ্রতা ঘাটতি: -২৮%"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                    <span className="text-stone-500 block text-xs font-medium">
                      {lang === "en" ? "Optimal Pumping Hours" : "সেচ দেওয়ার সঠিক সময়"}
                    </span>
                    <span className="font-bold text-stone-900 text-base sm:text-lg font-mono block mt-0.5">
                      9 PM – 5 AM
                    </span>
                    <span className="text-stone-500 text-xs block mt-0.5">
                      {lang === "en" ? "Cuts evaporation by 40%" : "বাষ্পীভবন ৪০% কমে"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Directive 2: Anthesis Heat Stress Defense */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                    <Flame size={18} />
                    <h3 className="font-semibold text-base sm:text-lg text-stone-900">
                      {lang === "en"
                        ? "Directive 2: Flowering Anthesis Heat Shield"
                        : "নির্দেশনা ২: ফুল ফোটার সময়ে তাপদাহ থেকে রক্ষা"}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                    &gt;34.5°C Spike Defense
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {lang === "en"
                    ? "During flowering (March 15 – 28), ambient temperatures above 34.5°C dry out pollen within 2 hours, resulting in severe grain sterility (chiṭa dhan). Keep a 5–7 cm standing water layer in fields during hot afternoons to cool canopy temperatures by 2–3°C, and apply a 1% foliar spray of chelated potassium/zinc."
                    : "মার্চের ১৫-২৮ তারিখে ধানের ফুল ফোটার সময়ে তাপমাত্রা ৩৪.৫° সে ছাড়ালে মাত্র ২ ঘণ্টায় পরাগরেণু শুকিয়ে ধান চিটা হয়ে যায়। এ সময়ে দুপুরে জমিতে ৫-৭ সেমি পানি ধরে রেখে তাপমাত্রা ২-৩° সে কমিয়ে রাখুন এবং ফুল রক্ষা করতে ১% পটাশ বা চিলেটেড দস্তা স্প্রে করুন।"}
                </p>

                <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/70 text-xs sm:text-sm text-amber-900 flex items-center justify-between">
                  <span className="font-medium">
                    {lang === "en" ? "Sterility Avoidance through Canopy Cooling:" : "ক্যানোপি শীতলকরণে ফলন বিপর্যয় রক্ষা:"}
                  </span>
                  <span className="font-bold text-amber-800 font-mono text-base">85% Protection</span>
                </div>
              </div>

              {/* Directive 3: Pre-Harvest Relay Catch Crop Preparation */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
                    <Clock size={18} />
                    <h3 className="font-semibold text-base sm:text-lg text-stone-900">
                      {lang === "en"
                        ? "Directive 3: Pre-Harvest Relay Crop Preparation"
                        : "নির্দেশনা ৩: ধান কাটার পরপরই সাথী ফসলের প্রস্তুতি"}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                    ~45 Days to Harvest
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {lang === "en"
                    ? "Prepare 60-day summer mung bean (BARI Mung-6) or sesame seeds now. Sowing right after harvest takes advantage of leftover root-zone moisture, restores soil nitrogen naturally, and generates fast extra revenue before monsoon."
                    : "ধান কাটার আর প্রায় ৪৫ দিন বাকি। এখনই ৬০ দিনের গ্রীষ্মকালীন মুগ ডাল (বারি মুগ-৬) বা তিল বীজ সংগ্রহ করুন। ধান কাটার সাথে সাথেই অবশিষ্ট মাটিতে বীজ বুনলে মাটির উর্বরতা বাড়ে এবং বর্ষার আগেই দ্রুত বাড়তি আয় আসে।"}
                </p>
              </div>
            </>
          ) : (
            /* ===================================================================
               FLOW 2: NOT PLANTED YET DIRECTIVES (Window Shift, Crop Shift)
               =================================================================== */
            <>
              {/* Directive 1: Sowing Window Shift */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
                    <Calendar size={18} />
                    <h3 className="font-semibold text-base sm:text-lg text-stone-900">
                      {lang === "en"
                        ? "Directive 1: Planting Window Calendar Shift"
                        : "নির্দেশনা ১: চারা রোপণ সময়সূচী পরিবর্তন"}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                    +14 Days Delay
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {lang === "en"
                    ? `Traditional transplanting on ${calendar.traditionalWindow} causes peak flowering to hit severe late March heat waves (>34.5°C). Farmers in ${currentZone.nameEn} are directed to delay transplanting to ${calendar.nasaAdjustedWindow}. Pushes flowering into cooler April night temperatures.`
                    : `${calendar.traditionalWindow} সময়ে ধান রোপণ করলে মার্চের চরম তাপদাহে ফুল ঝরে পড়ার মারাত্মক ঝুঁকি থাকে। ${currentZone.nameBn} এর কৃষকদের চারা রোপণ ${calendar.nasaAdjustedWindow} পর্যন্ত পিছিয়ে দেওয়ার পরামর্শ দেওয়া হচ্ছে।`}
                </p>

                <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200/60 text-xs sm:text-sm text-indigo-900 font-semibold flex items-center justify-between">
                  <span>{lang === "en" ? "Sterility Avoidance Rate:" : "ফলন বিপর্যয় এড়ানোর হার:"}</span>
                  <span className="font-bold text-base text-indigo-700 font-mono">
                    {calendar.heatAvoidanceScorePercent}%
                  </span>
                </div>
              </div>

              {/* Directive 2: Crop Diversification Protocol */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#1E7B48] font-semibold text-sm">
                    <Sprout size={18} />
                    <h3 className="font-semibold text-base sm:text-lg text-stone-900">
                      {lang === "en"
                        ? "Directive 2: Recommended Crop Diversification"
                        : "নির্দেশনা ২: লাভজনক বিকল্প ফসল মডেল"}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#1E7B48] border border-emerald-200 font-mono">
                    Low-Water Crop
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {lang === "en"
                    ? `Due to rapid groundwater depletion, farmers dependent on tubewells are advised to dedicate at least 50% of acreage to ${assessment.recommendedAlternatives[0]?.crop.nameEn}. Guarantees harvest before summer heat waves and saves over ৳14,000 per acre in pumping fuel.`
                    : `ভূগর্ভস্থ পানির তীব্র সংকটের কারণে নলকূপের ওপর নির্ভরশীল কৃষকদের অন্তত ৫০% জমিতে ${assessment.recommendedAlternatives[0]?.crop.nameBn} চাষের নির্দেশ দেওয়া হচ্ছে। এটি গরমের আগেই ফসল তোলা নিশ্চিত করে ও বিঘাপ্রতি হাজার হাজার টাকা সেচ খরচ বাঁচায়।`}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                    <span className="text-stone-500 block text-xs font-medium">
                      {lang === "en" ? "Water Saved" : "পানি সাশ্রয়"}
                    </span>
                    <span className="font-bold text-[#1E7B48] text-lg font-mono block mt-0.5">
                      {assessment.recommendedAlternatives[0]?.crop.waterSavingsVsRicePercent}%
                    </span>
                  </div>
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                    <span className="text-stone-500 block text-xs font-medium">
                      {lang === "en" ? "Pumping Cost Saved / Acre" : "সেচ খরচ সাশ্রয় / একর"}
                    </span>
                    <span className="font-bold text-[#1E7B48] text-lg font-mono block mt-0.5">
                      ৳{assessment.recommendedAlternatives[0]?.estimatedCostSavedBdtPerAcre.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Directive 3: Seedbed Timing Protocol */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-800 font-semibold text-sm">
                    <Clock size={18} />
                    <h3 className="font-semibold text-base sm:text-lg text-stone-900">
                      {lang === "en"
                        ? "Directive 3: Seedbed Preparation Timing"
                        : "নির্দেশনা ৩: বীজতলা তৈরির সঠিক সময়"}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 font-mono">
                    Nov 28 – Dec 5
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {lang === "en"
                    ? "Sow nursery seeds between Nov 28 – Dec 5. Delaying the seedbed stops seedlings from maturing too early and ensures 25-day old vigorous seedlings ready for December transplanting."
                    : "২৮ নভেম্বর থেকে ৫ ডিসেম্বরের মধ্যে বীজতলায় বীজ ফেলুন যাতে চারা অতিরিক্ত আগে না বাড়ে এবং ডিসেম্বরের মাঝামাঝি সুস্থ চারা জমিতে লাগানো যায়।"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* =====================================================================
            RIGHT COLUMN (5 cols): Contextual Emergency Alert Card + Checklist
            ===================================================================== */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert size={20} className="text-red-600" />
                <h2 className="text-lg font-semibold text-stone-900">
                  {isPlanted
                    ? (lang === "en" ? "Standing Crop Alert" : "জমির জরুরি মাঠ সতর্কতা")
                    : (lang === "en" ? "Pre-Season Risk Warning" : "মৌসুমের ঝুঁকি সতর্কতা")}
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 animate-pulse">
                {lang === "en" ? "HIGH RISK" : "উচ্চ ঝুঁকি"}
              </span>
            </div>

            {/* Warning Message Box */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200/80 space-y-2">
              <div className="text-sm font-semibold text-red-900">
                {isPlanted
                  ? (lang === "en" ? "Aquifer Drawdown & Anthesis Heat Spike" : "ভূগর্ভস্থ পানির সংকট ও তাপদাহের পূর্বভাস")
                  : (lang === "en" ? "Boro Rice 65% Failure Risk This Season" : "বোরো ধানে ৬৫% ক্ষতির ঝুঁকি")}
              </div>
              <p className="text-xs text-red-700 leading-relaxed font-normal">
                {isPlanted
                  ? (lang === "en"
                      ? "Barind tract aquifer drops 0.5m/yr. Irrigate in scheduled bursts to stop deep tubewell motor burnout, and keep water standing during hot afternoons to stop flower sterility."
                      : "বরেন্দ্র এলাকায় ভূগর্ভস্থ পানির স্তর দ্রুত নামছে। নলকূপের মোটর পুড়ে যাওয়া ঠেকাতে নির্দিষ্ট শিডিউলে সেচ দিন এবং দুপুরের গরমে ধান চিটা হওয়া ঠেকাতে জমিতে পানি ধরে রাখুন।")
                  : (lang === "en"
                      ? "Running pumps for 25–30 waterings eats all profit, and March heat waves (>34.5°C) kill pollen. Shift to mustard or maize, or delay sowing date."
                      : "২৫-৩০ বার সেচ দেওয়ার জ্বালানি খরচে লাভ শূন্য হয়ে যাওয়ার ঝুঁকি এবং মার্চের তাপদাহে ফুল নষ্ট হয়ে যাওয়ার মারাত্মক আশঙ্কা রয়েছে।")}
              </p>
            </div>

            {/* Immediate Action Checklist for Farmers */}
            <div className="space-y-2.5 pt-1">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                {lang === "en" ? "Immediate Action Checklist:" : "তাৎক্ষণিক করণীয় তালিকা:"}
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-stone-700">
                {isPlanted ? (
                  <>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <CheckCircle2 size={16} className="text-[#1E7B48] shrink-0 mt-0.5" />
                      <span>
                        {lang === "en"
                          ? "Switch to AWD intermittent irrigation to save 28% diesel."
                          : "পর্যায়ক্রমিক সেচ (AWD) মেনে ২৮% জ্বালানি খরচ বাঁচান।"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <CheckCircle2 size={16} className="text-[#1E7B48] shrink-0 mt-0.5" />
                      <span>
                        {lang === "en"
                          ? "Maintain 5–7 cm water during hot afternoons to cool canopy."
                          : "দুপুরে জমিতে ৫-৭ সেমি পানি রেখে ধান চিটা হওয়া ঠেকান।"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <CheckCircle2 size={16} className="text-[#1E7B48] shrink-0 mt-0.5" />
                      <span>
                        {lang === "en"
                          ? "Spray foliar zinc/potassium to protect flowering pollen."
                          : "ফুল রক্ষায় ১% চিলেটেড দস্তা বা পটাশ স্প্রে করুন।"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <CheckCircle2 size={16} className="text-[#1E7B48] shrink-0 mt-0.5" />
                      <span>
                        {lang === "en"
                          ? "Procure BARI Mung-6 seeds for immediate relay planting."
                          : "ধান কাটার পরই বোনার জন্য বারি মুগ-৬ বীজ সংগ্রহ করুন।"}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <CheckCircle2 size={16} className="text-[#1E7B48] shrink-0 mt-0.5" />
                      <span>
                        {lang === "en"
                          ? "Delay seedbed sowing by 14 days to dodge March heat."
                          : "মার্চের গরম এড়াতে বীজতলায় বীজ বপন ১৪ দিন পিছিয়ে দিন।"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <CheckCircle2 size={16} className="text-[#1E7B48] shrink-0 mt-0.5" />
                      <span>
                        {lang === "en"
                          ? "Dedicate 50% land to mustard or maize for safe profit."
                          : "কম সেচ ও বেশি লাভে অন্তত ৫০% জমিতে সরিষা বা ভুট্টা চাষ করুন।"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                      <CheckCircle2 size={16} className="text-[#1E7B48] shrink-0 mt-0.5" />
                      <span>
                        {lang === "en"
                          ? "Check NASA planting calendar dates before purchasing seeds."
                          : "বীজ কেনার আগে নাসার প্রস্তাবিত নতুন সময়সূচী দেখুন।"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Copy Official Bulletin Button */}
            <div className="pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                <span>
                  {copied
                    ? (lang === "en" ? "Copied Official Directive Bulletin!" : "সরকারি নির্দেশনার অনুলিপি কপি হয়েছে!")
                    : (lang === "en" ? "Copy Official Directive Bulletin" : "মাঠ নির্দেশনার অনুলিপি সংগ্রহ করুন")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
