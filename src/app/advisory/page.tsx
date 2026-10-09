"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  BookOpen,
  MessageSquare,
  Smartphone,
  PhoneCall,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  FileText,
  Share2,
} from "lucide-react";

export default function AdvisoryPage() {
  const { currentZone, currentCrop, assessment, calendar, lang } = useApp();
  const [copied, setCopied] = useState(false);
  const [channel, setChannel] = useState<"sms" | "ivr">("sms");

  const smsText =
    lang === "en"
      ? `[FieldShift NASA Alert] ${currentZone.nameEn}: High risk for ${currentCrop.nameEn}. Aquifer deficit -28%. Recommended: Shift to ${assessment.recommendedAlternatives[0]?.crop.nameEn} (saves 77% water). If planting rice, delay sowing by 14 days to dodge March heat.`
      : `[কৃষি পরিবর্তন নাসা বার্তা] ${currentZone.nameBn}: ${currentCrop.nameBn}-এ অতিরিক্ত পানির সংকট ও তাপদাহের ঝুঁকি। পরামর্শ: ${assessment.recommendedAlternatives[0]?.crop.nameBn} চাষ করুন (৭৭% পানি সাশ্রয়)। ধান লাগালে বীজ বপন ১৪ দিন পিছিয়ে দিন।`;

  const handleCopy = () => {
    navigator.clipboard.writeText(smsText);
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
            Target: Upazila Agriculture Officers & Smallholder Farmers
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-stone-900 mt-1 tracking-tight">
          {lang === "en" ? "Farmer Advisory & Delivery Hub" : "কৃষক পরামর্শ ও বার্তা প্রেরণ কেন্দ্র"}
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
          {lang === "en"
            ? "Converts complex satellite telemetry into plain-language directives, deliverable over 2G feature phone SMS and automated voice calls (IVR)."
            : "জটিল উপগ্রহ বিশ্লেষণকে সাধারণ ভাষায় রূপান্তর করে সাধারণ বাটান ফোনে এসএমএস এবং স্বয়ংক্রিয় ভয়েস কলের মাধ্যমে প্রান্তিক কৃষকের কাছে পৌঁছে দেওয়া।"}
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

        {/* Right (5 cols): 2G Phone Simulator & SMS Gateway */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone size={18} className="text-[#163B2A]" />
                <h3 className="text-base font-bold text-stone-900">
                  {lang === "en" ? "Last-Mile Phone Simulator" : "২জি ফোন বার্তা সিমুলেটর"}
                </h3>
              </div>

              {/* Channel Selector */}
              <div className="flex p-0.5 bg-stone-100 rounded-lg text-xs">
                <button
                  onClick={() => setChannel("sms")}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    channel === "sms" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500"
                  }`}
                >
                  SMS
                </button>
                <button
                  onClick={() => setChannel("ivr")}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                    channel === "ivr" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500"
                  }`}
                >
                  Voice (IVR)
                </button>
              </div>
            </div>

            {/* Feature Phone Screen Simulation */}
            <div className="rounded-2xl bg-stone-900 p-4 text-emerald-400 font-mono shadow-inner border-4 border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2">
                <span>DAE-NASA-ALERT</span>
                <span>10:45 AM</span>
              </div>

              <div className="text-xs leading-relaxed text-emerald-300 font-medium">
                {channel === "sms" ? (
                  <p>{smsText}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <PhoneCall size={14} className="animate-pulse" />
                      <span>Simulated Automated Voice Call...</span>
                    </div>
                    <p className="text-xs text-stone-300 italic">
                      "{lang === "en"
                        ? "Hello Farmer Rahim. This is the Department of Agricultural Extension. NASA satellites detect severe groundwater drops in Godagari. Do not sow Boro rice on your old schedule..."
                        : "আসসালামু আলাইকুম রহিম ভাই। কৃষি সম্প্রসারণ অধিদপ্তর থেকে বলছি। নাসার উপগ্রহে আপনার এলাকায় তীব্র পানির সংকট দেখা যাচ্ছে..."}"
                    </p>
                  </div>
                )}
              </div>

              <div className="text-xs text-stone-500 pt-1 border-t border-stone-800 text-right">
                Delivered via Grameenphone / Banglalink USSD
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
              <span>{copied ? "Copied Advisory Text!" : "Copy SMS Advisory for Dispatch"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
