"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Sprout,
  Droplets,
  Banknote,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sliders,
  Check,
} from "lucide-react";

export default function CropShiftPage() {
  const { currentZone, currentCrop, crops, setCropId, assessment, lang } = useApp();
  const [farmAcres, setFarmAcres] = useState<number>(2.0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Title & Context Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E7F6E1] text-[#163B2A] border border-[#C4E6BB]">
              {lang === "en" ? "Prescriptive Adaptation" : "বাস্তবমুখী কৃষি রূপান্তর"}
            </span>
            <span className="text-xs text-stone-500">
              Zone: {currentZone.nameEn}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-stone-900 mt-1 tracking-tight">
            {lang === "en" ? "The Crop Shift Decision Engine" : "ফসল পরিবর্তন সিদ্ধান্ত ইঞ্জিন"}
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            {lang === "en"
              ? "Replaces climate-vulnerable staple crops with resilient, water-saving alternatives based on NASA SMAP root-zone soil moisture and NASA POWER thermal trends."
              : "নাসার উপগ্রহ উপাত্ত ও মৃত্তিকা আর্দ্রতা বিশ্লেষণের মাধ্যমে জলবায়ু ঝুঁকিপূর্ণ ফসলের বদলে অধিক লাভজনক ও পানি সাশ্রয়ী বিকল্প ফসল নির্ধারণ।"}
          </p>
        </div>

        {/* Interactive Farm Area Slider */}
        <div className="w-full md:w-64 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1.5">
            <span className="flex items-center gap-1">
              <Sliders size={13} />
              {lang === "en" ? "Farm Size" : "জমির পরিমাণ"}
            </span>
            <span className="text-emerald-800 tabular-nums font-extrabold">
              {farmAcres} {lang === "en" ? "Acres" : "একর"}
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="10.0"
            step="0.5"
            value={farmAcres}
            onChange={(e) => setFarmAcres(parseFloat(e.target.value))}
            className="w-full accent-[#163B2A] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-500 mt-0.5">
            <span>0.5 Ac</span>
            <span>5.0 Ac</span>
            <span>10.0 Ac</span>
          </div>
        </div>
      </div>

      {/* Current Crop Vulnerability Warning Callout */}
      <div className="bg-red-50/80 border border-red-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-red-900">
              {lang === "en" ? `Status Quo Risk: ${currentCrop.nameEn}` : `বর্তমান ফসলের ঝুঁকি: ${currentCrop.nameBn}`}
            </h3>
            <p className="text-xs text-red-700 mt-0.5 max-w-2xl leading-relaxed">
              {assessment.currentSuitability.primaryRiskReason}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-red-800 font-bold">Suitability Score:</span>
          <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-extrabold text-sm tabular-nums">
            {assessment.currentSuitability.overallScore}%
          </span>
        </div>
      </div>

      {/* Alternative Crops Ranked Comparison Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900">
            {lang === "en" ? "Ranked Climate-Resilient Alternatives" : "উপযোগী বিকল্প ফসলের তালিকা"}
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            {lang === "en" ? "Ranked by NASA EcoCrop Suitability Index" : "উপযোগিতার ভিত্তিতে ক্রমানুসারে সাজানো"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessment.recommendedAlternatives.map((alt, idx) => {
            const totalWaterSaved = Math.round(alt.waterSavedM3PerAcre * farmAcres);
            const totalCostSaved = Math.round(alt.estimatedCostSavedBdtPerAcre * farmAcres);

            return (
              <div
                key={alt.crop.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-[#163B2A]/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top Rank Badge & Fit Score */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                      #{idx + 1} Best Match
                    </span>
                    <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                      Grade: <span className="text-emerald-700 font-extrabold text-sm">{alt.resilienceRating}</span>
                    </span>
                  </div>

                  {/* Crop Title */}
                  <h3 className="text-base font-extrabold text-stone-900">
                    {lang === "en" ? alt.crop.nameEn : alt.crop.nameBn}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {lang === "en" ? alt.crop.descriptionEn : alt.crop.descriptionBn}
                  </p>

                  {/* Agronomic Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-stone-100 text-xs">
                    <div className="p-2 rounded-lg bg-stone-50">
                      <span className="text-[10px] text-stone-500 font-semibold block">Duration</span>
                      <span className="font-bold text-stone-800">{alt.crop.growthDays} Days</span>
                    </div>
                    <div className="p-2 rounded-lg bg-stone-50">
                      <span className="text-[10px] text-stone-500 font-semibold block">Water Demand</span>
                      <span className="font-bold text-stone-800">{alt.crop.waterReqMm} mm</span>
                    </div>
                    <div className="p-2 rounded-lg bg-stone-50">
                      <span className="text-[10px] text-stone-500 font-semibold block">Heat Limit</span>
                      <span className="font-bold text-stone-800">{alt.crop.criticalFloweringTempC}°C</span>
                    </div>
                    <div className="p-2 rounded-lg bg-stone-50">
                      <span className="text-[10px] text-stone-500 font-semibold block">Salinity Limit</span>
                      <span className="font-bold text-stone-800">{alt.crop.salinityToleranceDsM} dS/m</span>
                    </div>
                  </div>
                </div>

                {/* Savings Impact Box (Scaled to Farm Size) */}
                <div className="bg-[#E7F6E1]/60 rounded-xl p-3 border border-[#C4E6BB]/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#163B2A] font-medium flex items-center gap-1">
                      <Droplets size={13} />
                      {lang === "en" ? "Water Saved:" : "পানি সাশ্রয়:"}
                    </span>
                    <span className="font-extrabold text-[#163B2A] tabular-nums">
                      {totalWaterSaved.toLocaleString()} m³
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-900 font-medium flex items-center gap-1">
                      <Banknote size={13} />
                      {lang === "en" ? "Irrigation Cost Saved:" : "সেচ খরচ সাশ্রয়:"}
                    </span>
                    <span className="font-extrabold text-emerald-900 tabular-nums">
                      ৳{totalCostSaved.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Make Primary Button */}
                <button
                  onClick={() => setCropId(alt.crop.id)}
                  className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-[#163B2A] hover:text-white text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <Check size={14} />
                  <span>{lang === "en" ? "Adopt This Crop Model" : "এই ফসল মডেল গ্রহণ করুন"}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
