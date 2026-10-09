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
  Gauge,
  Flame,
  Award,
} from "lucide-react";

export default function CropShiftPage() {
  const { currentZone, currentCrop, crops, setCropId, assessment, lang } = useApp();
  const [farmAcres, setFarmAcres] = useState<number>(2.0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title & Interactive Acreage HUD Header */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              PRESCRIPTIVE ADAPTATION ENGINE
            </span>
            <span className="text-xs font-mono text-stone-400">
              ZONE: {currentZone.nameEn.toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
            The Crop Shift Decision Engine
          </h1>
          <p className="text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Replaces climate-vulnerable staple crops with resilient, water-saving alternatives based on NASA SMAP root-zone soil moisture and NASA POWER thermal trends."
              : "নাসার উপগ্রহ উপাত্ত ও মৃত্তিকা আর্দ্রতা বিশ্লেষণের মাধ্যমে জলবায়ু ঝুঁকিপূর্ণ ফসলের বদলে অধিক লাভজনক ও পানি সাশ্রয়ী বিকল্প ফসল নির্ধারণ।"}
          </p>
        </div>

        {/* Glowing Interactive Farm Acreage Slider Pod */}
        <div className="w-full md:w-72 bg-stone-900/90 p-4 rounded-xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-200">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Sliders size={13} className="text-emerald-400" />
              <span>FARM SCALE</span>
            </span>
            <span className="text-emerald-400 text-sm font-black tabular-nums tracking-tight">
              {farmAcres} ACRES
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="10.0"
            step="0.5"
            value={farmAcres}
            onChange={(e) => setFarmAcres(parseFloat(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
          />
          <div className="flex justify-between text-[10px] font-mono text-stone-500">
            <span>0.5 Ac</span>
            <span>5.0 Ac</span>
            <span>10.0 Ac</span>
          </div>
        </div>
      </div>

      {/* Current Crop Vulnerability Warning Callout */}
      <div className="rounded-2xl p-5 border border-red-500/30 bg-red-950/30 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="text-sm font-mono font-bold text-red-300">
              STATUS QUO RISK: {currentCrop.nameEn.toUpperCase()}
            </h3>
            <p className="text-xs text-red-200/80 mt-1 max-w-2xl leading-relaxed">
              {assessment.currentSuitability.primaryRiskReason}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 bg-red-950/60 px-3 py-1.5 rounded-xl border border-red-500/40">
          <span className="text-xs font-mono text-red-300">SUITABILITY SCORE:</span>
          <span className="font-mono font-black text-sm text-red-400 tabular-nums">
            {assessment.currentSuitability.overallScore}%
          </span>
        </div>
      </div>

      {/* Alternative Crops Ranked Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award size={18} className="text-emerald-400" />
              <span>Ranked Climate-Resilient Alternatives</span>
            </h2>
            <p className="text-xs font-mono text-stone-400 mt-0.5">
              Optimized via Modified FAO EcoCrop Agronomic Envelope Engine
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessment.recommendedAlternatives.map((alt, idx) => {
            const totalWaterSaved = Math.round(alt.waterSavedM3PerAcre * farmAcres);
            const totalCostSaved = Math.round(alt.estimatedCostSavedBdtPerAcre * farmAcres);

            return (
              <div
                key={alt.crop.id}
                className="glass-panel glass-panel-hover rounded-2xl p-5 border border-emerald-500/20 flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div>
                  {/* Top Rank Badge & Fit Score */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      #{idx + 1} OPTIMAL MATCH
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-300 flex items-center gap-1.5">
                      GRADE: <span className="text-emerald-400 font-black text-sm">{alt.resilienceRating}</span>
                    </span>
                  </div>

                  {/* Crop Title */}
                  <h3 className="text-lg font-bold text-white">
                    {lang === "en" ? alt.crop.nameEn : alt.crop.nameBn}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {lang === "en" ? alt.crop.descriptionEn : alt.crop.descriptionBn}
                  </p>

                  {/* Agronomic Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-stone-800 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] text-stone-500 font-semibold block">DURATION</span>
                      <span className="font-bold text-stone-200">{alt.crop.growthDays} Days</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] text-stone-500 font-semibold block">WATER DEMAND</span>
                      <span className="font-bold text-stone-200">{alt.crop.waterReqMm} mm</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] text-stone-500 font-semibold block">HEAT THRESHOLD</span>
                      <span className="font-bold text-stone-200">{alt.crop.criticalFloweringTempC}°C</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-[10px] text-stone-500 font-semibold block">SALINITY LIMIT</span>
                      <span className="font-bold text-stone-200">{alt.crop.salinityToleranceDsM} dS/m</span>
                    </div>
                  </div>
                </div>

                {/* Savings Impact Box (Scaled to Farm Size) */}
                <div className="bg-emerald-950/40 rounded-xl p-3.5 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                      <Droplets size={14} />
                      <span>WATER SAVED:</span>
                    </span>
                    <span className="font-black text-emerald-300 tabular-nums">
                      {totalWaterSaved.toLocaleString()} m³
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-300 font-medium flex items-center gap-1.5">
                      <Banknote size={14} className="text-emerald-400" />
                      <span>IRRIGATION SAVED:</span>
                    </span>
                    <span className="font-black text-white tabular-nums">
                      ৳{totalCostSaved.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Adopt Crop Button */}
                <button
                  onClick={() => setCropId(alt.crop.id)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <Check size={14} />
                  <span>ADOPT THIS CROP MODEL</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
