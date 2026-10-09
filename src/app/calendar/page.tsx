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
  Flame,
  Info,
} from "lucide-react";

export default function CalendarPage() {
  const { currentZone, currentCrop, crops, calendar, metrics, lang } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title & Context Header */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            DYNAMIC SOWING PHENOLOGY
          </span>
          <span className="text-xs font-mono text-stone-400">
            REGION: {currentZone.nameEn.toUpperCase()}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
          NASA-Adjusted Sowing Calendar
        </h1>
        <p className="text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
          {lang === "en"
            ? "Adapts ancestral planting windows to match shifting monsoon onsets and dodge fatal late March heat waves that sterilize flowering crops."
            : "ঋতু পরিবর্তনের কারণে সৃষ্ট চরম তাপদাহ ও দেরিতে আসা বর্ষার সাথে মিল রেখে বপন ও রোপণের সময়সূচী পুর্ননির্ধারণ।"}
        </p>
      </div>

      {/* Sowing Timeline Comparison Cockpit */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400">
              TARGET EVALUATION MODEL
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">
              {currentCrop.nameEn}
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <CheckCircle2 size={16} />
            <span>{calendar.heatAvoidanceScorePercent}% HEAT STRESS AVOIDANCE</span>
          </div>
        </div>

        {/* Visual Comparison Gantt Bars */}
        <div className="space-y-4">
          {/* Timeline 1: Ancestral Window */}
          <div className="p-4.5 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-red-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>ANCESTRAL SOWING WINDOW (OBSOLETE & LETHAL)</span>
              </span>
              <span className="text-sm font-black tabular-nums text-white">{calendar.traditionalWindow}</span>
            </div>
            <div className="h-4 w-full bg-stone-900 rounded-full overflow-hidden relative border border-stone-800">
              <div className="h-full w-2/5 bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.5)]" />
            </div>
            <p className="text-xs text-red-300/90 flex items-center gap-1.5 font-mono">
              <AlertTriangle size={14} className="flex-shrink-0" />
              <span>Flowering coincides with March 15-28 heat spike (&gt;35°C), causing irreversible pollen abortion.</span>
            </p>
          </div>

          {/* Timeline 2: NASA Climate Shifted Window */}
          <div className="p-4.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2.5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                <span>NASA OPTIMIZED SOWING WINDOW (+{calendar.shiftDeltaDays} DAYS OFFSET)</span>
              </span>
              <span className="text-sm font-black tabular-nums text-white">
                {calendar.nasaAdjustedWindow}
              </span>
            </div>
            <div className="h-4 w-full bg-stone-900 rounded-full overflow-hidden relative border border-stone-800">
              <div
                className="h-full w-2/5 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                style={{ marginLeft: "24%" }}
              />
            </div>
            <p className="text-xs text-emerald-300/90 flex items-center gap-1.5 font-mono">
              <ShieldCheck size={14} className="flex-shrink-0" />
              <span>Flowering aligns with cooler April nocturnal temperatures, dodging the thermal danger window.</span>
            </p>
          </div>
        </div>

        {/* Detailed Agronomic Recommendation Box */}
        <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800 text-xs text-stone-300 leading-relaxed font-mono">
          <span className="font-bold text-emerald-400 block mb-1">
            EXTENSION OFFICER DIRECTIVE:
          </span>
          {calendar.actionRecommendationEn}
        </div>
      </div>

      {/* Multi-Crop Seasonal Calendar Overview Table */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Calendar size={18} className="text-emerald-400" />
          <span>Regional Multi-Crop Phenology Schedule</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left font-mono">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Crop Name</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Ancestral Window</th>
                <th className="py-2.5 px-3">NASA Shifted Window</th>
                <th className="py-2.5 px-3">Phenology Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {crops.map((c) => (
                <tr key={c.id} className="hover:bg-stone-900/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{c.nameEn}</td>
                  <td className="py-3 px-3 text-stone-300">{c.growthDays} Days</td>
                  <td className="py-3 px-3 text-stone-400">{c.typicalSowing.label}</td>
                  <td className="py-3 px-3 font-bold text-emerald-400">
                    {c.id === "boro_rice" ? "Nov 28 - Dec 18" : c.typicalSowing.label}
                  </td>
                  <td className="py-3 px-3 text-stone-400">
                    {c.id === "boro_rice" ? "Dodge March 35°C flowering spike" : "Early harvest before dry spell"}
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
