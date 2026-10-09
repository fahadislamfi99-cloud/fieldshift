"use client";

import React from "react";
import { ZoneProfile } from "@/types/climate";
import { Layers } from "lucide-react";

interface ConditionStatusCardProps {
  zone: ZoneProfile;
  lang: "en" | "bn";
}

export const ConditionStatusCard: React.FC<ConditionStatusCardProps> = ({ zone, lang }) => {
  const isBarind = zone.id === "barind_godagari";

  const groundwaterLevel = isBarind ? "Critical" : "Moderate";
  const heatStressLevel = isBarind ? "Elevated" : "Moderate";
  const salinityLevel = zone.salinityRiskLevel === "high" ? "High" : "Low";

  return (
    <div className="w-full bg-white rounded-[22px] p-4 shadow-[0_4px_18px_rgba(18,43,30,0.04)] border border-[#E2ECE3]/80">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E7F6E1] flex items-center justify-center text-[#1F513A]">
            <Layers size={15} />
          </div>
          <h2 className="text-base font-bold text-[#14211A]">
            {lang === "en" ? "Soil & Stress Status" : "মাটি ও পরিবেশগত অবস্থা"}
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#576B5F]">
          {lang === "en" ? "Real-Time Ingest" : "সরাসরি উপগ্রহ ডেটা"}
        </span>
      </div>

      {/* 3 Pillar Status Capsules (From Reference Photo) */}
      <div className="grid grid-cols-3 gap-2">
        {/* Capsule 1: Groundwater */}
        <div className="bg-[#F8FAF8] rounded-xl p-2.5 border border-[#E2ECE3] flex flex-col justify-between">
          <span className="text-xs text-[#576B5F] font-semibold">
            {lang === "en" ? "Groundwater" : "ভূগর্ভস্থ পানি"}
          </span>
          <div className="my-1.5 h-1 w-full bg-[#E2ECE3] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                groundwaterLevel === "Critical" ? "w-1/4 bg-[#DC2626]" : "w-2/3 bg-[#D97706]"
              }`}
            />
          </div>
          <span
            className={`text-xs font-bold ${
              groundwaterLevel === "Critical" ? "text-[#DC2626]" : "text-[#D97706]"
            }`}
          >
            {groundwaterLevel}
          </span>
        </div>

        {/* Capsule 2: Heat Wave */}
        <div className="bg-[#F8FAF8] rounded-xl p-2.5 border border-[#E2ECE3] flex flex-col justify-between">
          <span className="text-xs text-[#576B5F] font-semibold">
            {lang === "en" ? "Heat Stress" : "তাপদাহ"}
          </span>
          <div className="my-1.5 h-1 w-full bg-[#E2ECE3] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                heatStressLevel === "Elevated" ? "w-4/5 bg-[#D97706]" : "w-1/3 bg-[#65C938]"
              }`}
            />
          </div>
          <span
            className={`text-xs font-bold ${
              heatStressLevel === "Elevated" ? "text-[#D97706]" : "text-[#163B2A]"
            }`}
          >
            {heatStressLevel}
          </span>
        </div>

        {/* Capsule 3: Salinity */}
        <div className="bg-[#F8FAF8] rounded-xl p-2.5 border border-[#E2ECE3] flex flex-col justify-between">
          <span className="text-xs text-[#576B5F] font-semibold">
            {lang === "en" ? "Salinity" : "লবণাক্ততা"}
          </span>
          <div className="my-1.5 h-1 w-full bg-[#E2ECE3] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                salinityLevel === "High" ? "w-5/6 bg-[#DC2626]" : "w-1/5 bg-[#65C938]"
              }`}
            />
          </div>
          <span
            className={`text-xs font-bold ${
              salinityLevel === "High" ? "text-[#DC2626]" : "text-[#163B2A]"
            }`}
          >
            {salinityLevel}
          </span>
        </div>
      </div>

      {/* Soil pH Track Underneath */}
      <div className="mt-3 pt-2.5 border-t border-[#F0F4F1] flex items-center justify-between text-xs">
        <span className="text-[#576B5F] font-medium">
          {lang === "en" ? "Soil pH Index" : "মাটির পিএইচ মান"}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 bg-[#E2ECE3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1F513A] rounded-full"
              style={{ width: `${(zone.soilPh / 14) * 100}%` }}
            />
          </div>
          <span className="font-extrabold text-[#14211A] tabular-nums">
            {zone.soilPh} {zone.soilPh >= 6.0 && zone.soilPh <= 7.2 ? "Neutral" : "Alkaline"}
          </span>
        </div>
      </div>
    </div>
  );
};
