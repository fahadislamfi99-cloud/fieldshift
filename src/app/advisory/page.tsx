"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  BookOpen,
  Smartphone,
  PhoneCall,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  FileText,
  Volume2,
  Radio,
} from "lucide-react";

export default function AdvisoryPage() {
  const { currentZone, currentCrop, assessment, calendar, lang } = useApp();
  const [copied, setCopied] = useState(false);

  const advisoryScript =
    lang === "en"
      ? `[FieldShift Agriculture Advisory] ${currentZone.nameEn}: High climate risk for ${currentCrop.nameEn}. Aquifer deficit -28%. Recommended: Shift to ${assessment.recommendedAlternatives[0]?.crop.nameEn} (saves 77% water). If planting rice, delay sowing by 14 days to dodge March heat.`
      : `[কৃষি পরিবর্তন সরকারি বার্তা] ${currentZone.nameBn}: ${currentCrop.nameBn}-এ অতিরিক্ত পানির সংকট ও তাপদাহের ঝুঁকি। পরামর্শ: ${assessment.recommendedAlternatives[0]?.crop.nameBn} চাষ করুন (৭৭% পানি সাশ্রয়)। ধান চাষে বীজ বপন ১৪ দিন পিছিয়ে দিন।`;

  const handleCopy = () => {
    navigator.clipboard.writeText(advisoryScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title & Context Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E7F6E1] text-[#163B2A] border border-[#C4E6BB]">
            {lang === "en" ? "Last-Mile Delivery" : "মাঠপর্যায়ের কৃষি পরামর্শ"}
          </span>
          <span className="text-xs text-stone-500">
            {lang === "en"
              ? "Target: Upazila Agriculture Officers & Smallholder Farmers"
              : "লক্ষ্য: উপজেলা কৃষি কর্মকর্তা ও প্রান্তিক কৃষক"}
          </span>
        </div>
        <h1 className="text-[28px] sm:text-[32px] font-bold text-stone-900 mt-1 tracking-tight">
          {lang === "en" ? "Farmer Advisory & Delivery Hub" : "কৃষক পরামর্শ ও মাঠপর্যায়ের নির্দেশনাকেন্দ্র"}
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          {lang === "en"
            ? "Converts complex satellite telemetry into plain-language directives, deliverable via automated voice broadcasts (IVR) and agricultural extension bulletins."
            : "জটিল উপগ্রহ বিশ্লেষণকে সাধারণ ভাষায় রূপান্তর করে স্বয়ংক্রিয় ভয়েস কল (IVR) এবং মাঠপর্যায়ের কৃষি নির্দেশনার মাধ্যমে কৃষকের কাছে পৌঁছে দেওয়া।"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): Prescriptive Action Directives */}
        <div className="lg:col-span-7 space-y-6">
          {/* Directive 1: Sowing Window Shift Directive */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
              <CheckCircle2 size={18} />
              <h3>{lang === "en" ? "Directive 1: Planting Window Calendar Shift" : "নির্দেশনা ১: বপন সময়সূচী পরিবর্তন"}</h3>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {lang === "en"
                ? `Historical sowing on ${calendar.traditionalWindow} now results in peak flowering coinciding with severe late March thermal heat waves (>35°C). All farmers in ${currentZone.nameEn} are directed to delay transplanting to ${calendar.nasaAdjustedWindow}.`
                : `${calendar.traditionalWindow} সময়ে ধান রোপণ করলে মার্চের চরম তাপদাহে ফুল ঝরে পড়ার ঝুঁকি তৈরি হয়। ${currentZone.nameBn} এর সকল কৃষককে চারা রোপণ ${calendar.nasaAdjustedWindow} পর্যন্ত পিছিয়ে দেওয়ার পরামর্শ দেওয়া হচ্ছে।`}
            </p>
            <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200/60 text-xs text-indigo-900 font-semibold flex items-center justify-between">
              <span>{lang === "en" ? "Sterility Avoidance Rate:" : "ফলন বিপর্যয় এড়ানোর হার:"}</span>
              <span className="font-extrabold text-sm">{calendar.heatAvoidanceScorePercent}%</span>
            </div>
          </div>

          {/* Directive 2: The Crop Diversification Protocol */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#163B2A] font-bold text-sm">
              <CheckCircle2 size={18} />
              <h3>{lang === "en" ? "Directive 2: Recommended Crop Diversification" : "নির্দেশনা ২: লাভজনক বিকল্প ফসল মডেল"}</h3>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed">
              {lang === "en"
                ? `Due to rapid groundwater depletion, farmers dependent on deep tubewells are advised to dedicate at least 50% of acreage to ${assessment.recommendedAlternatives[0]?.crop.nameEn}. This guarantees harvest before heat waves and saves over ৳14,000 per acre in pumping fuel.`
                : `ভূগর্ভস্থ পানির তীব্র সংকটের কারণে গভীর নলকূপের ওপর নির্ভরশীল কৃষকদের অন্তত ৫০% জমিতে ${assessment.recommendedAlternatives[0]?.crop.nameBn} চাষের নির্দেশ দেওয়া হচ্ছে। এটি বিঘাপ্রতি হাজার হাজার টাকা সেচ খরচ বাঁচাবে।`}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                <span className="text-stone-500 block text-xs">Water Saved</span>
                <span className="font-extrabold text-[#163B2A] text-base">
                  {assessment.recommendedAlternatives[0]?.crop.waterSavingsVsRicePercent}%
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                <span className="text-stone-500 block text-xs">Cost Saved per Acre</span>
                <span className="font-extrabold text-emerald-800 text-base">
                  ৳{assessment.recommendedAlternatives[0]?.estimatedCostSavedBdtPerAcre.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Automated Voice (IVR) & Audio Broadcast Simulator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneCall size={18} className="text-[#163B2A]" />
                <h3 className="text-base font-bold text-stone-900">
                  {lang === "en" ? "Automated Voice Broadcast (IVR)" : "স্বয়ংক্রিয় ভয়েস কল (IVR) সিমুলেটর"}
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#1E7B48] border border-emerald-200 flex items-center gap-1">
                <Radio size={12} className="animate-pulse" />
                {lang === "en" ? "Live Voice Channel" : "ভয়েস চ্যানেল সক্রিয়"}
              </span>
            </div>

            {/* Feature Phone Screen Simulation */}
            <div className="rounded-2xl bg-stone-900 p-5 text-emerald-400 font-mono shadow-inner border-4 border-stone-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2.5">
                <span className="flex items-center gap-1.5 font-sans font-medium text-stone-300">
                  <PhoneCall size={13} className="text-emerald-400" />
                  DAE Agricultural Hotline (16123)
                </span>
                <span className="text-emerald-400 font-bold">00:42</span>
              </div>

              <div className="text-xs leading-relaxed text-emerald-300 font-medium space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Volume2 size={15} className="animate-pulse" />
                  <span>{lang === "en" ? "Automated Voice Guidance Playing..." : "স্বয়ংক্রিয় ভয়েস নির্দেশনা চলছে..."}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 text-xs text-stone-200 font-sans leading-relaxed">
                  "{lang === "en"
                    ? "Hello Farmer Rahim. This is the Department of Agricultural Extension. NASA satellites detect severe groundwater drops in Godagari. Do not sow Boro rice on your traditional schedule. Shift transplanting window or plant Mustard to protect your yield and save pumping costs."
                    : "আসসালামু আলাইকুম রহিম ভাই। কৃষি সম্প্রসারণ অধিদপ্তর থেকে বলছি। নাসার উপগ্রহ তথ্যে আপনার এলাকায় তীব্র পানির সংকট শনাক্ত হয়েছে। প্রচলিত সময়ে বোরো ধান লাগাবেন না। বীজ বপন ১৪ দিন পিছিয়ে দিন অথবা কম পানির সরিষা চাষ করে সেচ খরচ বাঁচান ও নিশ্চিত লাভ নিন।"}"
                </div>
              </div>

              <div className="text-xs text-stone-500 pt-1 border-t border-stone-800 flex items-center justify-between">
                <span>Direct Voice Delivery</span>
                <span>Grameenphone / Robi / Banglalink</span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
              <span>
                {copied
                  ? (lang === "en" ? "Copied Advisory Script!" : "পরামর্শের অনুলিপি কপি হয়েছে!")
                  : (lang === "en" ? "Copy Advisory Script for Field Dispatch" : "মাঠপর্যায়ের প্রচারের জন্য অনুলিপি নিন")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
