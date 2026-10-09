"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ThermometerSnowflake,
  Sun,
  ShieldCheck,
  Info,
} from "lucide-react";

export default function CalendarPage() {
  const { currentZone, currentCrop, crops, calendar, metrics, lang } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title & Context Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            {lang === "en" ? "Dynamic Phenology" : "গতিশীল রোপণ সময়সূচী"}
          </span>
          <span className="text-xs text-stone-500">
            Region: {currentZone.nameEn}
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-stone-900 mt-1 tracking-tight">
          {lang === "en" ? "NASA-Adjusted Sowing Calendar" : "নাসা উপাত্তভিত্তিক বপন সময়সূচী"}
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          {lang === "en"
            ? "Adapts ancestral planting windows to match shifting monsoon onsets and dodge fatal late March heat waves that sterilize flowering crops."
            : "ঋতু পরিবর্তনের কারণে সৃষ্ট চরম তাপদাহ ও দেরিতে আসা বর্ষার সাথে মিল রেখে বপন ও রোপণের সময়সূচী পুর্ননির্ধারণ।"}
        </p>
      </div>

      {/* Sowing Timeline Comparison Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {lang === "en" ? "Active Evaluation Target" : "বর্তমান নির্বাচিত ফসল"}
            </span>
            <h2 className="text-lg font-extrabold text-stone-900 mt-0.5">
              {currentCrop.nameEn}
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <CheckCircle2 size={16} />
            <span>{calendar.heatAvoidanceScorePercent}% Heat Stress Avoidance</span>
          </div>
        </div>

        {/* Visual Comparison Gantt Bars */}
        <div className="space-y-4">
          {/* Timeline 1: Ancestral Window */}
          <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
            <div className="flex items-center justify-between text-xs font-bold text-red-900 mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                {lang === "en" ? "Ancestral Planting Window (Fails Under Current Climate)" : "ঐতিহ্যবাহী বপন সময়সূচী (বর্তমানে ঝুঁকিপূর্ণ)"}
              </span>
              <span className="text-sm font-extrabold tabular-nums">{calendar.traditionalWindow}</span>
            </div>
            <div className="h-4 w-full bg-red-200/60 rounded-full overflow-hidden relative">
              <div className="h-full w-2/5 bg-red-600 rounded-full" />
            </div>
            <p className="text-xs text-red-700 mt-2 flex items-center gap-1">
              <AlertTriangle size={13} />
              {lang === "en"
                ? "Flowering coincides with March 15-28 heat spike (>35°C), causing severe pollen abortion."
                : "মার্চের ১৫-২৮ তারিখের তাপদাহে পরাগায়ন ব্যাহত হয় এবং ধানে চিটা দেখা দেয়।"}
            </p>
          </div>

          {/* Timeline 2: NASA Climate Shifted Window */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                {lang === "en" ? `NASA Optimized Window (+${calendar.shiftDeltaDays} Days Offset)` : `উপগ্রহ নির্ধারিত সময়সূচী (+${calendar.shiftDeltaDays} দিন স্থানান্তরিত)`}
              </span>
              <span className="text-sm font-extrabold tabular-nums text-emerald-950">
                {calendar.nasaAdjustedWindow}
              </span>
            </div>
            <div className="h-4 w-full bg-emerald-200/60 rounded-full overflow-hidden relative">
              <div className="h-full w-2/5 bg-emerald-600 rounded-full ml-1/4" style={{ marginLeft: "22%" }} />
            </div>
            <p className="text-xs text-emerald-800 mt-2 flex items-center gap-1">
              <ShieldCheck size={13} />
              {lang === "en"
                ? "Pushes reproductive flowering into early April nights, dodging the March heat pocket completely."
                : "চরম তাপদাহের সময় পার করে এপ্রিলের সহনশীল তাপমাত্রায় ফুল ফোটা নিশ্চিত করে।"}
            </p>
          </div>
        </div>

        {/* Detailed Agronomic Recommendation Box */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed">
          <span className="font-bold text-stone-900 block mb-1">
            {lang === "en" ? "Actionable Extension Directive:" : "কৃষি কর্মকর্তার নির্দেশনা:"}
          </span>
          {lang === "en" ? calendar.actionRecommendationEn : calendar.actionRecommendationBn}
        </div>
      </div>

      {/* Multi-Crop Seasonal Calendar Overview Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-stone-900">
          {lang === "en" ? "Comprehensive Seasonal Calendar Reference" : "সকল ফসলের পরিবর্তিত সময়সূচী সারসংক্ষেপ"}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Crop Name</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Traditional Window</th>
                <th className="py-2.5 px-3">NASA Shifted Window</th>
                <th className="py-2.5 px-3">Climate Adaptation Goal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {crops.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-stone-900">{c.nameEn}</td>
                  <td className="py-3 px-3 font-semibold text-stone-700">{c.growthDays} Days</td>
                  <td className="py-3 px-3 text-stone-600">{c.typicalSowing.label}</td>
                  <td className="py-3 px-3 font-bold text-emerald-800">
                    {c.id === "boro_rice" ? "Nov 28 - Dec 18" : c.typicalSowing.label}
                  </td>
                  <td className="py-3 px-3 text-stone-600">
                    {c.id === "boro_rice" ? "Dodge March 35°C flowering spike" : "Early harvest before dry season"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
