"use client";

import React from "react";
import { SuitabilityScore, CropProfile } from "@/types/crop";
import { AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";

interface CropViabilityGaugeProps {
  crop: CropProfile;
  suitability: SuitabilityScore;
  onExploreShift: () => void;
  lang: "en" | "bn";
}

export const CropViabilityGauge: React.FC<CropViabilityGaugeProps> = ({
  crop,
  suitability,
  onExploreShift,
  lang,
}) => {
  const isCritical = suitability.overallScore < 50;
  const isModerate = suitability.overallScore >= 50 && suitability.overallScore < 75;

  // SVG Radial Ring Calculation
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (suitability.overallScore / 100) * circumference;

  const strokeColor = isCritical ? "#DC2626" : isModerate ? "#D97706" : "#65C938";

  return (
    <div className="w-full bg-white rounded-[22px] p-4 shadow-[0_4px_18px_rgba(18,43,30,0.04)] border border-[#E2ECE3]/80">
      <div className="flex items-center gap-4">
        {/* Radial Ring SVG (From Reference Design) */}
        <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 80 80">
            {/* Background track */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="#EBF2EC"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Progress Arc */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke={strokeColor}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Centered Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-base font-extrabold text-[#14211A] tabular-nums leading-none">
              {suitability.overallScore}%
            </span>
            <span className="text-[9px] text-[#576B5F] font-semibold mt-0.5">
              Score
            </span>
          </div>
        </div>

        {/* Right Info Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#576B5F] font-semibold uppercase tracking-wider">
                {lang === "en" ? "Planned Crop" : "নির্বাচিত ফসল"}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  isCritical
                    ? "bg-[#FEECEB] text-[#9E1C13]"
                    : isModerate
                    ? "bg-[#FEF4E2] text-[#965B07]"
                    : "bg-[#E2F5DC] text-[#195222]"
                }`}
              >
                {isCritical ? <AlertTriangle size={10} /> : <ShieldCheck size={10} />}
                {isCritical
                  ? (lang === "en" ? "High Risk" : "উচ্চ ঝুঁকি")
                  : (lang === "en" ? "Viable" : "উপযোগী")}
              </span>
            </div>

            <h3 className="text-sm font-bold text-[#14211A] mt-0.5">
              {lang === "en" ? crop.nameEn : crop.nameBn}
            </h3>

            <p className="text-[11px] text-[#576B5F] line-clamp-1 mt-0.5">
              {suitability.primaryRiskReason}
            </p>
          </div>

          {/* Action Trigger Button */}
          {suitability.urgentShiftRequired && (
            <button
              onClick={onExploreShift}
              className="mt-2.5 inline-flex items-center justify-between w-full px-3 py-1.5 rounded-xl bg-[#1F513A] hover:bg-[#163B2A] text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
            >
              <span>{lang === "en" ? "View Crop Shift Options" : "বিকল্প ফসল দেখুন"}</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
