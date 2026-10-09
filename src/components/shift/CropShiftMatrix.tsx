"use client";

import React, { useState } from "react";
import { CropShiftAssessment } from "@/types/crop";
import { CalendarShiftDetails } from "@/lib/calendar-optimizer";
import { Sprout, Calendar, Droplets, Banknote, ShieldAlert, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

interface CropShiftMatrixProps {
  assessment: CropShiftAssessment;
  calendar: CalendarShiftDetails;
  lang: "en" | "bn";
}

export const CropShiftMatrix: React.FC<CropShiftMatrixProps> = ({
  assessment,
  calendar,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<"crop_shift" | "calendar_shift">("crop_shift");
  const [selectedCropId, setSelectedCropId] = useState<string>(
    assessment.recommendedAlternatives[0]?.crop.id || ""
  );

  return (
    <div className="w-full bg-white rounded-[22px] p-4 shadow-[0_4px_18px_rgba(18,43,30,0.04)] border border-[#E2ECE3]/80">
      {/* Module Title */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E7F6E1] flex items-center justify-center text-[#1F513A]">
            <Sparkles size={15} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#14211A]">
              {lang === "en" ? "The Double Shift Engine" : "দ্বৈত পরিবর্তন ইঞ্জিন"}
            </h2>
            <p className="text-[11px] text-[#576B5F]">
              {lang === "en" ? "Prescriptive Climate Adaptation" : "উপগ্রহভিত্তিক বাস্তবসম্মত সিদ্ধান্ত"}
            </p>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex p-0.5 bg-[#EFF4EF] rounded-xl border border-[#E2ECE3]">
          <button
            onClick={() => setActiveTab("crop_shift")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
              activeTab === "crop_shift"
                ? "bg-white text-[#1F513A] shadow-sm"
                : "text-[#576B5F] hover:text-[#14211A]"
            }`}
          >
            {lang === "en" ? "Crop Shift" : "ফসল"}
          </button>
          <button
            onClick={() => setActiveTab("calendar_shift")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
              activeTab === "calendar_shift"
                ? "bg-white text-[#1F513A] shadow-sm"
                : "text-[#576B5F] hover:text-[#14211A]"
            }`}
          >
            {lang === "en" ? "Calendar Shift" : "ক্যালেন্ডার"}
          </button>
        </div>
      </div>

      {/* TAB 1: CROP SHIFT */}
      {activeTab === "crop_shift" && (
        <div className="flex flex-col gap-3">
          {/* Urgent Warning Banner */}
          {assessment.shiftNeeded && (
            <div className="bg-[#FEECEB] border border-[#FCA5A5] rounded-xl p-2.5 flex items-start gap-2 text-xs text-[#9E1C13]">
              <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">
                  {lang === "en" ? "Status Quo Warning: " : "জরুরি সতর্কতা: "}
                </span>
                <span>{assessment.currentSuitability.primaryRiskReason}</span>
              </div>
            </div>
          )}

          {/* Recommended Crop Cards */}
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-[11px] font-bold text-[#576B5F] uppercase tracking-wider">
              {lang === "en" ? "Ranked Climate-Resilient Alternatives" : "বিকল্প উপযোগী ফসলসমূহ"}
            </span>

            {assessment.recommendedAlternatives.map((alt, index) => {
              const isSelected = selectedCropId === alt.crop.id;
              return (
                <div
                  key={alt.crop.id}
                  onClick={() => setSelectedCropId(alt.crop.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#1F513A] bg-[#F8FAF8] shadow-sm"
                      : "border-[#E2ECE3] bg-white hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#E2F5DC] text-[#195222] font-bold text-xs flex items-center justify-center">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#14211A]">
                          {lang === "en" ? alt.crop.nameEn : alt.crop.nameBn}
                        </h4>
                        <span className="text-[10px] text-[#576B5F]">
                          {alt.crop.growthDays} {lang === "en" ? "Days Duration" : "দিনের ফসল"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#E2F5DC] text-[#195222] text-[10px] font-bold">
                        {alt.suitability.overallScore}% Fit
                      </span>
                      <ChevronRight size={14} className="text-[#94A3B8]" />
                    </div>
                  </div>

                  {/* Benefit Chips */}
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#E2ECE3]/60">
                    <div className="flex items-center gap-1 text-[11px] text-[#1F513A] font-semibold">
                      <Droplets size={12} />
                      <span>
                        {lang === "en" ? `Save ${alt.crop.waterSavingsVsRicePercent}% Water` : `${alt.crop.waterSavingsVsRicePercent}% কম পানি`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-[#163B2A] font-semibold justify-end">
                      <Banknote size={12} />
                      <span>
                        {lang === "en"
                          ? `Save ৳${alt.estimatedCostSavedBdtPerAcre.toLocaleString()}/acre`
                          : `৳${alt.estimatedCostSavedBdtPerAcre.toLocaleString()} সাশ্রয়`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CALENDAR SHIFT */}
      {activeTab === "calendar_shift" && (
        <div className="flex flex-col gap-3">
          {/* Heat Avoidance Metric */}
          <div className="bg-[#E7F6E1] border border-[#C4E6BB] rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#1F513A]" />
              <div>
                <p className="text-xs font-bold text-[#14211A]">
                  {lang === "en" ? "Heat Avoidance Score" : "তাপদাহ এড়ানোর হার"}
                </p>
                <p className="text-[11px] text-[#576B5F]">
                  {lang === "en" ? "Dodges March 15-28 thermal spike" : "মার্চের চরম তাপদাহ থেকে রক্ষা"}
                </p>
              </div>
            </div>
            <span className="text-base font-extrabold text-[#1F513A] tabular-nums">
              {calendar.heatAvoidanceScorePercent}%
            </span>
          </div>

          {/* Timeline Comparison Card */}
          <div className="p-3 bg-[#F8FAF8] rounded-xl border border-[#E2ECE3] flex flex-col gap-2.5">
            {/* Historical Window */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[#9E1C13] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                  {lang === "en" ? "Ancestral Calendar (Obsolete)" : "পূর্বপুরুষের ক্যালেন্ডার"}
                </span>
                <span className="font-semibold text-[#576B5F] text-[11px]">
                  {calendar.traditionalWindow}
                </span>
              </div>
              <div className="h-2 w-full bg-[#FEECEB] rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-[#DC2626] rounded-full" />
              </div>
              <p className="text-[10px] text-[#9E1C13] mt-0.5">
                {lang === "en" ? "Flowers directly during 36°C heat wave" : "৩৬° সে তাপদাহে ফুল ঝরে পড়ার ঝুঁকি"}
              </p>
            </div>

            {/* NASA Adjusted Window */}
            <div className="pt-2 border-t border-[#E2ECE3]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[#195222] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  {lang === "en" ? `NASA Shifted (+${calendar.shiftDeltaDays} Days)` : `উপগ্রহ নির্ধারিত (+${calendar.shiftDeltaDays} দিন)`}
                </span>
                <span className="font-semibold text-[#14211A] text-[11px]">
                  {calendar.nasaAdjustedWindow}
                </span>
              </div>
              <div className="h-2 w-full bg-[#E2F5DC] rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-[#16A34A] rounded-full ml-auto" />
              </div>
              <p className="text-[10px] text-[#195222] mt-0.5">
                {lang === "en" ? "Flowering aligns with cooler night temps" : "অনুকূল তাপমাত্রায় সর্বোচ্চ ফলন নিশ্চিত"}
              </p>
            </div>
          </div>

          {/* Plain Language Action Advice */}
          <p className="text-xs text-[#14211A] leading-relaxed p-2.5 rounded-xl bg-[#EFF4EF] border border-[#E2ECE3]">
            {lang === "en" ? calendar.actionRecommendationEn : calendar.actionRecommendationBn}
          </p>
        </div>
      )}
    </div>
  );
};
