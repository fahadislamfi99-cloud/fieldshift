"use client";

import React from "react";
import { Droplet } from "lucide-react";

interface WaterEfficiencyCardProps {
  moisturePercent: number; // e.g. 22
  deficitPercent: number; // e.g. -28
  lang: "en" | "bn";
}

export const WaterEfficiencyCard: React.FC<WaterEfficiencyCardProps> = ({
  moisturePercent,
  deficitPercent,
  lang,
}) => {
  const TOTAL_BARS = 24;
  const activeBars = Math.round((moisturePercent / 100) * TOTAL_BARS);
  const isCritical = moisturePercent < 30;

  return (
    <div className="w-full bg-white rounded-[22px] p-4 shadow-[0_4px_18px_rgba(18,43,30,0.04)] border border-[#E2ECE3]/80">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E7F6E1] flex items-center justify-center text-[#1F513A]">
            <Droplet size={15} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#14211A] leading-tight">
              {lang === "en" ? "Root-Zone Moisture" : "মূল অঞ্চলের আর্দ্রতা"}
            </h2>
            <p className="text-[11px] text-[#576B5F]">
              NASA SMAP L4 (0–100cm)
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              isCritical
                ? "bg-[#FEECEB] text-[#9E1C13]"
                : "bg-[#E2F5DC] text-[#195222]"
            }`}
          >
            {isCritical ? (lang === "en" ? "Deficit" : "ঘাটতি") : (lang === "en" ? "Optimal" : "পর্যাপ্ত")}
          </span>
          <span className="text-sm font-extrabold text-[#14211A] tabular-nums">
            {moisturePercent}%
          </span>
        </div>
      </div>

      {/* 24-Segment Vertical Capsule Pill Meter (From Reference Photo) */}
      <div className="flex items-center justify-between gap-[3px] py-1">
        {Array.from({ length: TOTAL_BARS }).map((_, idx) => {
          const isActive = idx < activeBars;
          return (
            <div
              key={idx}
              className={`h-7 w-[9px] rounded-full transition-all duration-500 ${
                isActive
                  ? isCritical
                    ? "bg-[#D97706]" // Warning amber if deficient
                    : "bg-[#1F513A]" // Deep forest green
                  : "bg-[#DCE8DE]" // Empty sage track
              }`}
            />
          );
        })}
      </div>

      {/* Subtext description */}
      <div className="flex items-center justify-between text-[11px] text-[#576B5F] mt-2 pt-2 border-t border-[#F0F4F1]">
        <span>
          {lang === "en"
            ? `Baseline Deficit: ${deficitPercent}% vs 15-Yr Average`
            : `১৫ বছরের গড়ের চেয়ে ${Math.abs(deficitPercent)}% কম`}
        </span>
        <span className="font-semibold text-[#14211A]">
          {isCritical
            ? (lang === "en" ? "Aquifer Depleting" : "ভূগর্ভস্থ পানি দ্রুত নামছে")
            : (lang === "en" ? "Field Ready" : "রোপণের উপযোগী")}
        </span>
      </div>
    </div>
  );
};
