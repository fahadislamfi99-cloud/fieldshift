"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  MessageSquare,
  Smartphone,
  PhoneCall,
  CheckCircle2,
  Copy,
  Check,
  AlertTriangle,
  Radio,
  Send,
  Volume2,
  ShieldCheck,
  Cpu,
  Wifi,
  ChevronRight,
} from "lucide-react";

export default function AdvisoryPage() {
  const { currentZone, currentCrop, assessment, calendar, lang } = useApp();
  const [copied, setCopied] = useState(false);
  const [channel, setChannel] = useState<"sms" | "ivr">("sms");
  const [dispatchStatus, setDispatchStatus] = useState<"idle" | "sending" | "sent">("idle");

  const bestAlt = assessment.recommendedAlternatives[0];

  const smsText =
    lang === "en"
      ? `[FIELDSHIFT / NASA DAE ALERT] ${currentZone.nameEn.toUpperCase()}: Critical ground moisture deficit (-28%). Immediate protocol: Shift to ${bestAlt?.crop.nameEn || "Mustard"} (saves 77% water, +৳14k/acre). If planting Boro, delay sowing to ${calendar.nasaAdjustedWindow} to evade lethal March heat waves.`
      : `[ফিল্ডশিফ্ট / নাসা কৃষি বার্তা] ${currentZone.nameBn}: ভূগর্ভস্থ পানির চরম সংকট ও তাপদাহ সতর্কতা। জরুরি নির্দেশ: ${bestAlt?.crop.nameBn || "সরিষা"} চাষ করুন (৭৭% পানি সাশ্রয়, ১৪,০০০+ টাকা লাভ)। ধান রোপণ করলে বীজ বপন ${calendar.nasaAdjustedWindow} পর্যন্ত পিছিয়ে দিন।`;

  const handleCopy = () => {
    navigator.clipboard.writeText(smsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatchSimulation = () => {
    if (dispatchStatus !== "idle") return;
    setDispatchStatus("sending");
    setTimeout(() => {
      setDispatchStatus("sent");
      setTimeout(() => setDispatchStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Tactical Directive Header */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0B110F]/90 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono tracking-wider">
              <Radio size={13} className="animate-pulse" />
              <span>{lang === "en" ? "LAST-MILE ADVISORY DISPATCH" : "প্রান্তিক কৃষি বার্তা সম্প্রচার"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === "en" ? "Farmer Advisory & Delivery Hub" : "কৃষক পরামর্শ ও বার্তা প্রেরণ কেন্দ্র"}
            </h1>
            <p className="text-sm text-stone-400 max-w-2xl leading-relaxed">
              {lang === "en"
                ? "Translating NASA telemetry into deterministic agronomic directives formatted for low-bandwidth 2G feature phone SMS and automated voice broadcasts (IVR)."
                : "নাসার উপগ্রহ তথ্যকে সরাসরি নির্দেশনায় রূপান্তর করে সাধারণ বাটন ফোনে এসএমএস ও বাংলা স্বয়ংক্রিয় ভয়েস কলের মাধ্যমে সম্প্রচার।"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDispatchSimulation}
              disabled={dispatchStatus !== "idle"}
              className={`px-5 py-3 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                dispatchStatus === "sent"
                  ? "bg-emerald-500 text-stone-950 shadow-emerald-500/20"
                  : dispatchStatus === "sending"
                  ? "bg-amber-500 text-stone-950 animate-pulse"
                  : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 hover:border-emerald-500/60"
              }`}
            >
              <Send size={15} />
              {dispatchStatus === "sent"
                ? (lang === "en" ? "14,820 SMS DISPATCHED" : "১৪,৮২০টি এসএমএস প্রেরিত")
                : dispatchStatus === "sending"
                ? (lang === "en" ? "TRANSMITTING TO 2G TOWER..." : "টাওয়ারে সম্প্রচার হচ্ছে...")
                : (lang === "en" ? "SIMULATE CELL BROADCAST" : "সম্প্রচার পরীক্ষা করুন")}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Prescriptive Action Directives */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span>{lang === "en" ? "Actionable Field Protocols" : "মাঠপর্যায়ের প্রয়োগ নির্দেশিকা"}</span>
            </h2>
            <span className="text-xs font-mono text-stone-400">DAE / BARI COMPLIANT</span>
          </div>

          {/* Directive 1: Sowing Window Shift */}
          <div className="rounded-2xl bg-[#0B110F]/90 backdrop-blur-xl border border-white/[0.08] p-6 space-y-4 hover:border-emerald-500/30 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-mono text-xs">
                  01
                </div>
                <h3>{lang === "en" ? "Calendar Window Shift Protocol" : "বপন সময়সূচী পরিবর্তন প্রটোকল"}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                HEAT EVASION
              </span>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed">
              {lang === "en"
                ? `Historical sowing on traditional window (${calendar.traditionalWindow}) forces the flowering stage to intersect with severe late March thermal surges (>35°C), triggering 42% spikelet sterility. Push transplanting window to ${calendar.nasaAdjustedWindow}.`
                : `সনাতন পদ্ধতিতে (${calendar.traditionalWindow}) চারা রোপণ করলে মার্চের শেষের ভয়াবহ তাপপ্রবাহে (>৩৫°সে) ফুল বন্ধ্যা হয়ে যায়। চারা রোপণ পিছিয়ে ${calendar.nasaAdjustedWindow} করার নির্দেশ দেওয়া হলো।`}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Sterility Evasion Rate
                </span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {calendar.heatAvoidanceScorePercent}%
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Recommended Action
                </span>
                <span className="text-sm font-bold text-white">
                  +14 Day Nursery Delay
                </span>
              </div>
            </div>
          </div>

          {/* Directive 2: Crop Shift Diversification */}
          <div className="rounded-2xl bg-[#0B110F]/90 backdrop-blur-xl border border-white/[0.08] p-6 space-y-4 hover:border-emerald-500/30 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-mono text-xs">
                  02
                </div>
                <h3>{lang === "en" ? "Groundwater Relief & Crop Shift" : "ভূগর্ভস্থ পানি সুরক্ষা ও ফসল পরিবর্তন"}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                HIGH MARGIN
              </span>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed">
              {lang === "en"
                ? `NASA SMAP root-zone soil telemetry indicates deep aquifer drawdown in ${currentZone.nameEn}. Farmers dependent on diesel or electric tubewells are directed to shift 40-60% of acreage to ${bestAlt?.crop.nameEn || "Mustard"}.`
                : `নাসা স্ম্যাপ (SMAP) উপগ্রহ তথ্য অনুযায়ী ${currentZone.nameBn} অঞ্চলে মাটির গভীরে পানির তীব্র ঘাটতি বিদ্যমান। কৃষকদের অন্তত ৪০-৬০% জমিতে ধানের বদলে ${bestAlt?.crop.nameBn || "সরিষা"} চাষ করার নির্দেশ দেওয়া হলো।`}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Groundwater Saved
                </span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {bestAlt?.crop.waterSavingsVsRicePercent}%
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                  Irrigation Cost Saved
                </span>
                <span className="text-lg font-bold font-mono text-white">
                  ৳{bestAlt?.estimatedCostSavedBdtPerAcre.toLocaleString()}/acre
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 2G Feature Phone & Voice Simulator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone size={18} className="text-emerald-400" />
              <span>{lang === "en" ? "2G Feature Phone Simulator" : "২জি ফিচার ফোন সিমুলেটর"}</span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
              <Wifi size={13} className="text-emerald-400" />
              <span>GSM / 2G</span>
            </div>
          </div>

          <div className="rounded-3xl bg-[#0B110F]/95 backdrop-blur-xl border border-white/[0.1] p-6 space-y-5 shadow-2xl">
            {/* Format Selector */}
            <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-mono">
              <button
                onClick={() => setChannel("sms")}
                className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  channel === "sms"
                    ? "bg-emerald-500 text-stone-950 shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <MessageSquare size={13} />
                <span>SMS TEXT</span>
              </button>
              <button
                onClick={() => setChannel("ivr")}
                className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  channel === "ivr"
                    ? "bg-emerald-500 text-stone-950 shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                <Volume2 size={13} />
                <span>IVR VOICE</span>
              </button>
            </div>

            {/* Tactile Retro Feature Phone Display */}
            <div className="relative rounded-2xl bg-[#040807] border-2 border-stone-800 p-5 font-mono shadow-2xl overflow-hidden">
              {/* Retro scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

              <div className="relative z-10 space-y-3">
                {/* Phone Top Status */}
                <div className="flex items-center justify-between text-[11px] text-emerald-500/70 border-b border-emerald-950/80 pb-2">
                  <span className="font-bold tracking-wider">DAE-NASA-ALERT</span>
                  <div className="flex items-center gap-2">
                    <span>10:45 AM</span>
                    <span className="font-extrabold text-[10px]">■■■ 2G</span>
                  </div>
                </div>

                {/* Display Body */}
                <div className="py-2 text-xs leading-relaxed text-emerald-400 font-medium min-h-[140px] flex items-center">
                  {channel === "sms" ? (
                    <p className="whitespace-pre-wrap">{smsText}</p>
                  ) : (
                    <div className="space-y-3 w-full">
                      <div className="flex items-center gap-2.5 text-emerald-300 font-bold">
                        <PhoneCall size={16} className="animate-pulse text-emerald-400" />
                        <span className="tracking-wide">INCOMING IVR CALL...</span>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-stone-200 italic leading-relaxed">
                        "{lang === "en"
                          ? `Hello farmer brother. Upazila Agriculture Office advisory based on NASA Earth observation: High heat risk for ${currentCrop.nameEn}. Delay sowing by 14 days or plant ${bestAlt?.crop.nameEn || "Mustard"} to save water and guarantee profit.`
                          : `আসসালামু আলাইকুম। কৃষি সম্প্রসারণ অধিদপ্তর থেকে নাসার উপগ্রহ সতর্কবার্তা: আপনার এলাকায় তাপমাত্রা বৃদ্ধি ও পানির ঘাটতির কারণে চারা রোপণ ১৪ দিন পিছিয়ে দিন অথবা ${bestAlt?.crop.nameBn || "সরিষা"} চাষ করুন।`}"
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-2 border-t border-emerald-950/80">
                  <span>GP / BL / Robi Gateway</span>
                  <span>Char Count: {smsText.length}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCopy}
                className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY SMS TEXT FOR BROADCAST"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
