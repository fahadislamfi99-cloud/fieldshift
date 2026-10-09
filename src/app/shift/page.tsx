"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
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
  Sparkles,
  ChevronRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function CropShiftPage() {
  const { currentZone, currentCrop, zones, setZoneId, crops, setCropId, assessment, lang } =
    useApp();
  const [farmAcres, setFarmAcres] = useState<number>(2.0);

  // Pick matching photo for each crop
  const getCropImage = (cropId: string) => {
    const id = cropId.toLowerCase();
    if (id.includes("mustard")) return "/images/mustard_crop.jpg";
    if (id.includes("maize")) return "/images/maize_crop.jpg";
    if (id.includes("wheat") || id.includes("gom")) return "/images/wheat_crop.jpg";
    if (id.includes("rice")) return "/images/rice_crop.jpg";
    return "/images/mustard_crop.jpg";
  };

  const bestAlternative = assessment.recommendedAlternatives[0];
  const maxWaterSaved = bestAlternative
    ? Math.round(bestAlternative.waterSavedM3PerAcre * farmAcres)
    : 0;
  const maxCostSaved = bestAlternative
    ? Math.round(bestAlternative.estimatedCostSavedBdtPerAcre * farmAcres)
    : 0;

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* =========================================================================
          HERO BANNER & LIVE FARM SCALE CONTROLLER
          ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] min-h-[320px] flex flex-col justify-between">
        {/* Full Photographic Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
        />

        {/* Soft Gradient Overlay for Easy Reading */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 sm:via-white/70 to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 h-full">
          {/* Left Title & Simple Explanations */}
          <div className="space-y-3 max-w-2xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E7B48] text-xs font-bold border border-emerald-200/80 shadow-2xs">
              <Sparkles size={13} className="text-[#1E7B48]" />
              <span>
                {lang === "en" ? "SMART CROP GUIDE" : "সহজ কৃষি পরামর্শ"}
              </span>
              <span className="text-stone-300">•</span>
              <span className="font-semibold text-stone-700">
                {currentZone.nameEn.split(",")[0]}, Rajshahi
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {lang === "en" ? "Best Crops for Your Farm" : "আপনার জমির জন্য সেরা ফসল"}
            </h1>

            <p className="text-xs sm:text-sm font-medium text-stone-600 leading-relaxed max-w-xl">
              {lang === "en"
                ? "Find crops that need less water, beat hot summer heat, and save you money on diesel and irrigation — using NASA weather data."
                : "নাসার আবহাওয়া তথ্যের ভিত্তিতে কম পানি ও কম খরচে বেশি লাভজনক সেরা বিকল্প ফসল খুঁজে নিন।"}
            </p>

            {/* Field Information Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs flex items-center gap-1.5">
                <MapPin size={13} className="text-[#1E7B48]" />
                <span>{currentZone.nameEn}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs flex items-center gap-1.5">
                <Sprout size={13} className="text-[#1E7B48]" />
                <span>{lang === "en" ? "Current:" : "বর্তমান ফসল:"} {currentCrop.nameEn}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs flex items-center gap-1.5">
                <Droplets size={13} className="text-[#0284C7]" />
                <span>{lang === "en" ? "Groundwater: Very Low" : "ভূগর্ভস্থ পানি: সংকটজনক"}</span>
              </div>
            </div>
          </div>

          {/* Right: Tactile Farm Size Controller */}
          <div className="w-full lg:w-84 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md space-y-3.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Sliders size={14} className="text-[#1E7B48]" />
                <span>{lang === "en" ? "Your Land Size" : "জমির পরিমাণ"}</span>
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#DCFCE7] text-[#15803D] border border-emerald-200 font-mono shadow-2xs">
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
            <div className="flex items-center justify-between gap-1.5 pt-0.5">
              {[1.0, 2.0, 5.0, 10.0].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFarmAcres(val)}
                  className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    farmAcres === val
                      ? "bg-[#1E7B48] text-white shadow-2xs"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {val} {lang === "en" ? "Ac" : "একর"}
                </button>
              ))}
            </div>

            <div className="text-[10px] text-stone-500 font-medium text-center">
              {lang === "en"
                ? "Move slider to see how much water & money you save."
                : "স্লাইডার নাড়িয়ে দেখুন কত পানি ও টাকা সাশ্রয় হবে।"}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PROBLEM VS SOLUTION (Simple terms for farmers)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left: Problem With Current Crop */}
        <div className="md:col-span-6 rounded-3xl bg-[#FEF2F2] border border-[#FEE2E2] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                <ShieldAlert size={12} />
                <span>{lang === "en" ? "Current Crop Risk" : "বর্তমান ফসলের ঝুঁকি"}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold font-mono">
                {assessment.currentSuitability.overallScore}% {lang === "en" ? "HEALTH SCORE (HIGH RISK)" : "স্কোর (উচ্চ ঝুঁকি)"}
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
                <p className="text-xs text-[#B91C1C] mt-1 leading-relaxed">
                  {lang === "en"
                    ? "Low underground water and high summer heat during flowering can cause empty grain pods and high pumping costs."
                    : "ভূগর্ভস্থ পানির তীব্র সংকট ও ফুল ফোটার সময় অতিরিক্ত গরমে ধান চিটা হয়ে যাওয়ার আশঙ্কা থাকে।"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-red-200/70 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-white/80 border border-red-100">
              <span className="text-[10px] text-stone-500 font-medium block">
                {lang === "en" ? "Water Needed" : "পানি প্রয়োজন"}
              </span>
              <span className="font-extrabold text-red-700 font-mono mt-0.5 block">
                {currentCrop.waterReqMm} mm
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white/80 border border-red-100">
              <span className="text-[10px] text-stone-500 font-medium block">
                {lang === "en" ? "Danger Heat" : "অতিরিক্ত তাপ"}
              </span>
              <span className="font-extrabold text-red-700 font-mono mt-0.5 block">
                {currentCrop.criticalFloweringTempC}°C
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white/80 border border-red-100">
              <span className="text-[10px] text-stone-500 font-medium block">
                {lang === "en" ? "Water Well Risk" : "নলকূপের ঝুঁকি"}
              </span>
              <span className="font-extrabold text-red-700 font-mono mt-0.5 block">
                {lang === "en" ? "Very High" : "খুব বেশি"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Best Alternative Solution */}
        {bestAlternative && (
          <div className="md:col-span-6 rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#15803D] text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 size={12} />
                  <span>{lang === "en" ? "Best Alternative Crop" : "সেরা বিকল্প ফসল"}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E7B48] text-white text-[10px] font-extrabold font-mono">
                  {bestAlternative.suitability.overallScore}% {lang === "en" ? `SCORE (TOP CHOICE)` : "স্কোর (সেরা পছন্দ)"}
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
                  <h2 className="text-base font-extrabold text-[#166534] leading-tight">
                    {lang === "en"
                      ? `Switch to ${bestAlternative.crop.nameEn}`
                      : `${bestAlternative.crop.nameBn} চাষ করুন`}
                  </h2>
                  <p className="text-xs text-[#15803D] mt-1 leading-relaxed">
                    {lang === "en"
                      ? `Harvests in just ${bestAlternative.crop.growthDays} days before summer heat starts. Uses ${bestAlternative.crop.waterSavingsVsRicePercent}% less water than rice.`
                      : `মাত্র ${bestAlternative.crop.growthDays} দিনে গরম পড়ার আগেই ঘরে তোলা যায়। বোরো ধানের চেয়ে ${bestAlternative.crop.waterSavingsVsRicePercent}% কম সেচ লাগে।`}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-200/70 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100">
                <span className="text-[10px] text-stone-500 font-medium block">
                  {lang === "en" ? "Water Saved" : "পানি সাশ্রয়"}
                </span>
                <span className="font-extrabold text-[#1E7B48] font-mono mt-0.5 block">
                  {maxWaterSaved.toLocaleString()} m³
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100">
                <span className="text-[10px] text-stone-500 font-medium block">
                  {lang === "en" ? "Money Saved" : "টাকা সাশ্রয়"}
                </span>
                <span className="font-extrabold text-[#1E7B48] font-mono mt-0.5 block">
                  ৳{maxCostSaved.toLocaleString()}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/80 border border-emerald-100">
                <span className="text-[10px] text-stone-500 font-medium block">
                  {lang === "en" ? "Profit Safety" : "লাভের নিশ্চয়তা"}
                </span>
                <span className="font-extrabold text-[#1E7B48] font-mono mt-0.5 block">
                  {lang === "en" ? "+22% High" : "+২২% বেশি"}
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
            <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 flex items-center gap-2">
              <Sprout size={20} className="text-[#1E7B48]" />
              <span>
                {lang === "en"
                  ? "Recommended Crops for Your Land"
                  : "আপনার জমির জন্য উপযোগী বিকল্প ফসল"}
              </span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {lang === "en"
                ? "Ranked by lowest water use, heat tolerance, and farmer profit"
                : "কম পানি, তাপ সহনশীলতা ও বেশি লাভের ভিত্তিতে সাজানো"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500">
              {lang === "en" ? "Calculated for:" : "হিসাব করা হয়েছে:"}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-stone-200 text-xs font-extrabold font-mono text-stone-900 shadow-2xs">
              {farmAcres.toFixed(1)} {lang === "en" ? "Acres" : "একর"}
            </span>
          </div>
        </div>

        {/* 3 Crop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessment.recommendedAlternatives.map((alt, idx) => {
            const isFirst = idx === 0;
            const isSelected = currentCrop.id === alt.crop.id;
            const totalWaterSaved = Math.round(alt.waterSavedM3PerAcre * farmAcres);
            const totalCostSaved = Math.round(alt.estimatedCostSavedBdtPerAcre * farmAcres);
            const cropImage = getCropImage(alt.crop.id);

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
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${
                          isFirst
                            ? "bg-[#DCFCE7] text-[#15803D] border border-emerald-300"
                            : "bg-white/95 backdrop-blur-md text-stone-800 border border-stone-200"
                        }`}
                      >
                        {isFirst
                          ? (lang === "en" ? "★ #1 Best Choice" : "★ সেরা পছন্দ")
                          : (lang === "en" ? `#${idx + 1} Good Choice` : `#${idx + 1} বিকল্প ফসল`)}
                      </span>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-white/95 backdrop-blur-md text-stone-900 border border-stone-200 shadow-sm font-mono">
                        {lang === "en" ? `Grade ${alt.resilienceRating} • ${alt.suitability.overallScore}% Safe` : `গ্রেড ${alt.resilienceRating}`}
                      </span>
                    </div>

                    {/* Crop Name & Days on Photo */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight drop-shadow-sm">
                        {lang === "en" ? alt.crop.nameEn : alt.crop.nameBn}
                      </h3>
                      <div className="text-[11px] text-emerald-300 font-semibold mt-0.5 drop-shadow-sm flex items-center gap-1.5">
                        <span>{alt.crop.growthDays} {lang === "en" ? "Days to Harvest" : "দিনে ফলন"}</span>
                        <span>•</span>
                        <span>{lang === "en" ? `Saves ${alt.crop.waterSavingsVsRicePercent}% Water` : `${alt.crop.waterSavingsVsRicePercent}% পানি সাশ্রয়`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    {/* Simple Description */}
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed min-h-[36px]">
                      {lang === "en" ? alt.crop.descriptionEn : alt.crop.descriptionBn}
                    </p>

                    {/* 4 Simple Farm Specs */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs">
                      {/* Days to Harvest */}
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                          <Clock size={11} className="text-stone-500" />
                          <span>{lang === "en" ? "Days to Harvest" : "পাকার সময়"}</span>
                        </span>
                        <span className="font-extrabold text-stone-900 block mt-0.5 font-mono">
                          {alt.crop.growthDays} {lang === "en" ? "Days" : "দিন"}
                        </span>
                      </div>

                      {/* Water Needed */}
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                          <Droplets size={11} className="text-[#0284C7]" />
                          <span>{lang === "en" ? "Water Needed" : "পানি প্রয়োজন"}</span>
                        </span>
                        <span className="font-extrabold text-stone-900 block mt-0.5 font-mono">
                          {alt.crop.waterReqMm} mm
                        </span>
                      </div>

                      {/* Max Safe Heat */}
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                          <Flame size={11} className="text-[#DC2626]" />
                          <span>{lang === "en" ? "Max Safe Heat" : "তাপমাত্রা সীমা"}</span>
                        </span>
                        <span className="font-extrabold text-stone-900 block mt-0.5 font-mono">
                          {alt.crop.criticalFloweringTempC}°C
                        </span>
                      </div>

                      {/* Salt Tolerance */}
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                        <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                          <Layers size={11} className="text-[#1E7B48]" />
                          <span>{lang === "en" ? "Salt Tolerance" : "লবণাক্ততা সীমা"}</span>
                        </span>
                        <span className="font-extrabold text-stone-900 block mt-0.5 font-mono">
                          {alt.crop.salinityToleranceDsM} dS/m
                        </span>
                      </div>
                    </div>

                    {/* Money & Water Saved Box */}
                    <div className="rounded-2xl p-3.5 bg-[#F6FAF6] border border-emerald-100 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-600 font-medium flex items-center gap-1.5">
                          <Droplets size={13} className="text-[#0284C7]" />
                          <span>{lang === "en" ? "Water Saved:" : "পানি সাশ্রয়:"}</span>
                        </span>
                        <span className="font-extrabold text-stone-900 font-mono">
                          {totalWaterSaved.toLocaleString()} m³
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-600 font-medium flex items-center gap-1.5">
                          <Banknote size={13} className="text-[#1E7B48]" />
                          <span>{lang === "en" ? "Pumping Money Saved:" : "সেচ খরচ সাশ্রয়:"}</span>
                        </span>
                        <span className="font-extrabold text-[#1E7B48] font-mono text-sm">
                          ৳{totalCostSaved.toLocaleString()} BDT
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => setCropId(alt.crop.id)}
                    className={`w-full py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-[#1E7B48] text-white shadow-sm"
                        : "bg-stone-100 hover:bg-[#1E7B48] hover:text-white text-stone-800"
                    }`}
                  >
                    <Check size={14} />
                    <span>
                      {isSelected
                        ? (lang === "en" ? "Selected Crop" : "বাছাই করা ফসল")
                        : (lang === "en" ? "Choose This Crop" : "এই ফসল বেছে নিন")}
                    </span>
                  </button>

                  <Link
                    href="/calendar"
                    onClick={() => setCropId(alt.crop.id)}
                    className="w-full py-2 rounded-xl text-[11px] font-bold text-stone-500 hover:text-stone-900 flex items-center justify-center gap-1 hover:bg-stone-50 transition-colors"
                  >
                    <span>{lang === "en" ? "See Planting Dates" : "রোপণের সময়সূচী দেখুন"}</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          BOTTOM IMPACT BAR & PROCEED CTA
          ========================================================================= */}
      <div className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          {/* Water Saved */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <Droplets size={20} />
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">
                {lang === "en" ? `Total Water Saved (${farmAcres} Acres)` : `মোট পানি সাশ্রয় (${farmAcres} একর)`}
              </div>
              <div className="text-lg font-extrabold text-stone-900 font-mono">
                {maxWaterSaved.toLocaleString()} m³
              </div>
            </div>
          </div>

          <div className="h-10 w-px bg-stone-200 hidden sm:block" />

          {/* Cost Saved */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0">
              <Banknote size={20} />
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">
                {lang === "en" ? "Diesel & Pumping Cost Saved" : "ডিজেল ও সেচ খরচ সাশ্রয়"}
              </div>
              <div className="text-lg font-extrabold text-[#1E7B48] font-mono">
                ৳{maxCostSaved.toLocaleString()} BDT
              </div>
            </div>
          </div>

          <div className="h-10 w-px bg-stone-200 hidden sm:block" />

          {/* Groundwater Saved */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">
                {lang === "en" ? "Groundwater Saved" : "ভূগর্ভস্থ পানি সাশ্রয়"}
              </div>
              <div className="text-lg font-extrabold text-stone-900 font-mono">
                {lang === "en" ? "77% Less Pumped" : "৭৭% কম পাম্পিং"}
              </div>
            </div>
          </div>
        </div>

        {/* Proceed to Dynamic Calendar CTA */}
        <Link
          href="/calendar"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all shrink-0"
        >
          <Calendar size={15} />
          <span>{lang === "en" ? "See Planting Calendar" : "রোপণের ক্যালেন্ডার দেখুন"}</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
