"use client";

import React from "react";
import {
  MapPin,
  Thermometer,
  Droplets,
  CloudRain,
  Wind,
  Sprout,
  Flame,
  ShieldAlert,
  Navigation,
} from "lucide-react";
import { FieldTelemetryResponse } from "@/types/nasa";

interface FieldInsightsPanelProps {
  data: FieldTelemetryResponse | null;
  loading: boolean;
  error: string | null;
  lang: "en" | "bn";
}

const getCropImage = (cropId: string) => {
  const id = cropId.toLowerCase();
  if (id.includes("mustard")) return "/images/mustard_crop.jpg";
  if (id.includes("maize")) return "/images/maize_crop.jpg";
  if (id.includes("wheat") || id.includes("gom")) return "/images/wheat_crop.jpg";
  if (id.includes("lentil") || id.includes("masur")) return "/images/lentil_crop.jpg";
  if (id.includes("rice")) return "/images/rice_crop.jpg";
  return "/images/mustard_crop.jpg";
};

export const FieldInsightsPanel: React.FC<FieldInsightsPanelProps> = ({
  data,
  loading,
  error,
  lang,
}) => {
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-32 rounded-3xl bg-stone-200/60 border border-stone-200" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-48 rounded-3xl bg-stone-200/60 border border-stone-200" />
          ))}
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 flex items-center gap-3">
        <ShieldAlert size={20} className="text-amber-700 shrink-0" />
        <p className="text-sm text-amber-900 font-medium">
          {lang === "en"
            ? "Couldn't load field data. Try moving the pin or searching again."
            : "জমির তথ্য লোড করা যায়নি। পুনরায় চেষ্টা করুন।"}
        </p>
      </div>
    );
  }

  if (!data) return null;

  const { location, metrics, suitableCrops, highRiskCrops } = data;

  const metricChips = [
    {
      icon: Thermometer,
      color: "text-amber-600 bg-amber-100",
      label: lang === "en" ? "Temperature" : "তাপমাত্রা",
      value: `${Math.round(metrics.airTemperatureC)}°C`,
      sub: lang === "en" ? `Max ${Math.round(metrics.maxTemperatureC)}°C` : `সর্বোচ্চ ${Math.round(metrics.maxTemperatureC)}°`,
    },
    {
      icon: Droplets,
      color: "text-[#0284C7] bg-sky-100",
      label: lang === "en" ? "Soil Moisture" : "মাটির আর্দ্রতা",
      value: `${Math.round(metrics.rootZoneSoilMoisturePercent)}%`,
      sub: lang === "en" ? "Root zone" : "মূল স্তর",
    },
    {
      icon: CloudRain,
      color: "text-[#15803D] bg-emerald-100",
      label: lang === "en" ? "Rainfall" : "বৃষ্টিপাত",
      value: `${metrics.precipitationMm.toFixed(1)} mm`,
      sub: `${Math.round(metrics.relativeHumidityPercent)}% ${lang === "en" ? "Humidity" : "আর্দ্রতা"}`,
    },
    {
      icon: Wind,
      color: "text-stone-600 bg-stone-100",
      label: lang === "en" ? "Wind" : "বাতাস",
      value: `${Math.round(metrics.windSpeedKmh)} km/h`,
      sub: `${metrics.solarRadiationKwh.toFixed(1)} kWh/m² ${lang === "en" ? "Solar" : "সৌর"}`,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Area Overview */}
      <div className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#1E7B48] flex items-center justify-center shrink-0">
              <Navigation size={20} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                {location.name}
              </h3>
              <p className="text-xs text-stone-500 font-medium mt-0.5 flex items-center gap-1">
                <MapPin size={12} className="text-[#1E7B48]" />
                {location.region || `${location.lat.toFixed(3)}°, ${location.lon.toFixed(3)}°`}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#15803D] border border-emerald-200 text-xs font-bold font-mono shrink-0 self-start sm:self-auto">
            {location.lat.toFixed(4)}°N, {location.lon.toFixed(4)}°E
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {metricChips.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="p-3 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${m.color}`}>
                    <Icon size={13} />
                  </div>
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                    {m.label}
                  </span>
                </div>
                <div className="text-lg font-extrabold text-stone-900 font-mono leading-none pl-1">
                  {m.value}
                </div>
                <div className="text-[11px] text-stone-500 font-medium pl-1">{m.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crops that grow here */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <Sprout size={18} className="text-[#1E7B48]" />
            <span>
              {lang === "en"
                ? "Crops You Can Grow on This Land"
                : "এই জমিতে চাষযোগ্য ফসল"}
            </span>
          </h3>
          {suitableCrops.length > 0 && (
            <span className="text-xs font-medium text-stone-500">
              {suitableCrops.length} {lang === "en" ? "recommended" : "প্রস্তাবিত"}
            </span>
          )}
        </div>

        {suitableCrops.length === 0 ? (
          <div className="p-5 rounded-3xl bg-white border border-stone-200 text-center text-sm text-stone-500">
            {lang === "en"
              ? "No crops are well-suited here based on NASA telemetry."
              : "নাসার তথ্য অনুযায়ী এখানে উপযোগী ফসল পাওয়া যায়নি।"}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {suitableCrops.map((crop, idx) => (
              <div
                key={crop.id}
                className={`rounded-3xl bg-white border overflow-hidden flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-all ${
                  idx === 0 ? "border-emerald-300 ring-2 ring-emerald-500/15" : "border-stone-200/90"
                }`}
              >
                <div className="relative h-36 w-full overflow-hidden bg-stone-100">
                  <img
                    src={getCropImage(crop.id)}
                    alt={crop.nameEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                        idx === 0
                          ? "bg-[#DCFCE7] text-[#15803D] border border-emerald-300"
                          : "bg-white/90 text-stone-800 border border-stone-200"
                      }`}
                    >
                      {idx === 0 ? (lang === "en" ? "#1 Best" : "#১ সেরা") : `#${idx + 1}`}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-stone-900 text-[11px] font-extrabold font-mono">
                      Grade {crop.rating} • {crop.overallScore}%
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <div className="text-base font-semibold text-white leading-tight">
                      {lang === "en" ? crop.nameEn : crop.nameBn}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="text-[11px] text-stone-500 font-medium block">
                        {lang === "en" ? "Days to Harvest" : "পাকার সময়"}
                      </span>
                      <span className="text-sm font-extrabold text-stone-900 font-mono">
                        {crop.growthDays} {lang === "en" ? "d" : "দিন"}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="text-[11px] text-stone-500 font-medium block">
                        {lang === "en" ? "Water Saved" : "পানি সাশ্রয়"}
                      </span>
                      <span className="text-sm font-extrabold text-[#1E7B48] font-mono">
                        {crop.waterSavingsVsRicePercent}% {lang === "en" ? "less" : "কম"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-2 flex items-center gap-1.5 text-[11px] text-stone-500">
                    <Flame size={12} className="text-[#DC2626] shrink-0" />
                    <span>
                      {lang === "en" ? "Heat-safe up to" : "তাপ সহনশীল"}{" "}
                      {crop.criticalFloweringTempC}°C
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* High-risk crops to avoid */}
        {highRiskCrops.length > 0 && (
          <div className="rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <ShieldAlert size={16} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-red-900">
                {lang === "en" ? "Not recommended here" : "এখানে অনুপযোগী"}
              </div>
              <p className="text-xs text-red-700 font-medium">
                {highRiskCrops.map((c) => (lang === "en" ? c.nameEn : c.nameBn)).join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
