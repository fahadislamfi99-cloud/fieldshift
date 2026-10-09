"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  MapPin,
  Sprout,
  Droplets,
  Thermometer,
  CloudRain,
  Leaf,
  Layers,
  Plus,
  Minus,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  TrendingDown,
  Gauge,
  CheckCircle2,
  Clock,
  Banknote,
  Flame,
  Calendar,
} from "lucide-react";

export default function HomePage() {
  const {
    currentZone,
    currentCrop,
    zones,
    setZoneId,
    crops,
    setCropId,
    lang,
    farmerStatus,
    setFarmerStatus,
    waterAccess,
    setWaterAccess,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"crop" | "calendar">("crop");
  const [inSeasonTab, setInSeasonTab] = useState<"awd" | "heat">("awd");

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* =========================================================================
          TOP SECTION: 2-COLUMN GRID (Left: Hero + KPIs + Maps, Right: Recommended Actions)
          ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* =======================================================================
            LEFT COLUMN (8 cols): Hero Banner + 4 KPIs + Satellite Field & Diagnostics
            ======================================================================= */}
        <div className="xl:col-span-8 space-y-6">
          {/* HERO BANNER CARD (Full background image spanning edge-to-edge) */}
          <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] min-h-[340px] flex flex-col justify-between">
            {/* FULL BACKGROUND PHOTOGRAPHIC LANDSCAPE */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
            />

            {/* Soft gradient fade overlay so left text and filters are 100% readable while entire scenery shows */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 sm:via-white/70 to-transparent pointer-events-none" />

            {/* Floating Location Marker on the Landscape Photo (Right side) */}
            <div className="hidden md:flex absolute top-8 right-16 z-20 flex-col items-center pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-xs font-bold text-stone-900 shadow-md flex items-center gap-1.5">
                <MapPin size={13} className="text-[#1E7B48]" />
                <span>Godagari, Rajshahi</span>
              </div>
              {/* Pin Stem Line */}
              <div className="w-0.5 h-16 bg-white/90 shadow-sm" />
              {/* Target Reticle Pin */}
              <div className="relative flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-emerald-500/30 animate-ping absolute" />
                <div className="w-4 h-4 rounded-full bg-white border-2 border-[#1E7B48] shadow-lg flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E7B48]" />
                </div>
              </div>
            </div>

            {/* Hero Card Content (Sitting over the full background image) */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full space-y-5 max-w-2xl">
              <div>
                {/* 2-Option Farmer Situation Selector Directly Inside Hero Card */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="p-1 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-2xs flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setFarmerStatus("not_planted")}
                      className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                        farmerStatus === "not_planted"
                          ? "bg-[#1E7B48] text-white shadow-xs"
                          : "text-stone-700 hover:text-stone-900 hover:bg-stone-100/70"
                      }`}
                    >
                      <Sprout size={15} />
                      <span>
                        {lang === "en" ? "Not Planted Yet (Plan)" : "ফসল লাগাইনি (পরিকল্পনা)"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFarmerStatus("already_planted")}
                      className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                        farmerStatus === "already_planted"
                          ? "bg-[#1E7B48] text-white shadow-xs"
                          : "text-stone-700 hover:text-stone-900 hover:bg-stone-100/70"
                      }`}
                    >
                      <CheckCircle2 size={15} />
                      <span>
                        {lang === "en" ? "Already Planted (Manage)" : "জমিতে ফসল আছে (পরিচর্যা)"}
                      </span>
                    </button>
                  </div>
                </div>
                <h1 className="text-[28px] sm:text-[32px] font-bold text-stone-900 tracking-tight leading-tight">
                  {farmerStatus === "already_planted"
                    ? (lang === "en"
                        ? "Manage & Rescue Your Standing Crop"
                        : "জমিতে থাকা ফসলের পরিচর্যা ও সুরক্ষা")
                    : (lang === "en"
                        ? "Plan Your Next Climate-Safe Crop"
                        : "ঝুঁকিমুক্ত ফসলের পরিকল্পনা করুন")}
                </h1>
                <p className="text-sm sm:text-base font-normal text-stone-600 mt-1.5 leading-relaxed">
                  {farmerStatus === "already_planted"
                    ? (lang === "en"
                        ? "Your crop is in the field. Avoid dry pump burnout, save tubewell diesel with AWD, and shield flowers from 35°C heat waves."
                        : "জমির ফসল সুরক্ষিত রাখতে পর্যায়ক্রমিক সেচ (AWD), তাপদাহে ফুল ঝরে পড়া রোধ এবং ভূগর্ভস্থ পানির সুরক্ষা ব্যবস্থা জানুন।")
                    : (lang === "en"
                        ? "Select your location, planned crop, and water access to find high-profit alternatives that survive drought and heat."
                        : "কম সেচ ও বেশি লাভের বিকল্প ফসল নির্বাচন এবং রোপণের সঠিক সময়সূচী জানতে তথ্য দিন।")}
                </p>
              </div>

              {/* 3 Distinct Filter Boxes (Location, Current Crop, Water Access) */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Box 1: Location */}
                <div className="relative p-2.5 px-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-2xs hover:border-emerald-400 transition-all">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#1E7B48] shrink-0" />
                    <div>
                      <span className="text-xs text-stone-500 font-medium block leading-none">
                        {lang === "en" ? "Location" : "অবস্থান"}
                      </span>
                      <span className="text-sm font-semibold text-stone-900 block mt-0.5 leading-tight whitespace-nowrap">
                        {currentZone.nameEn.split(",")[0]}, Rajshahi
                      </span>
                    </div>
                    <ChevronDown size={13} className="text-stone-400 shrink-0 pointer-events-none ml-1" />
                  </div>
                  <select
                    aria-label="Select Target Location"
                    value={currentZone.id}
                    onChange={(e) => setZoneId(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  >
                    {zones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Box 2: Current Crop / Planted Crop */}
                <div className="relative p-2.5 px-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-2xs hover:border-emerald-400 transition-all">
                  <div className="flex items-center gap-2">
                    <Sprout size={16} className="text-[#1E7B48] shrink-0" />
                    <div>
                      <span className="text-xs text-stone-500 font-medium block leading-none">
                        {farmerStatus === "already_planted"
                          ? (lang === "en" ? "Planted Crop" : "জমির ফসল")
                          : (lang === "en" ? "Target Crop" : "পরিকল্পিত ফসল")}
                      </span>
                      <span className="text-sm font-semibold text-stone-900 block mt-0.5 leading-tight whitespace-nowrap">
                        {currentCrop.nameEn.split(" ")[0]}
                      </span>
                    </div>
                    <ChevronDown size={13} className="text-stone-400 shrink-0 pointer-events-none ml-1" />
                  </div>
                  <select
                    aria-label="Select Current Crop"
                    value={currentCrop.id}
                    onChange={(e) => setCropId(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  >
                    {crops.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Box 3: Water Access */}
                <div className="relative p-2.5 px-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-2xs hover:border-emerald-400 transition-all">
                  <div className="flex items-center gap-2">
                    <Droplets size={16} className="text-[#0284C7] shrink-0" />
                    <div>
                      <span className="text-xs text-stone-500 font-medium block leading-none">
                        {lang === "en" ? "Water Source" : "পানির উৎস"}
                      </span>
                      <span className="text-sm font-semibold text-stone-900 block mt-0.5 leading-tight whitespace-nowrap">
                        {waterAccess}
                      </span>
                    </div>
                    <ChevronDown size={13} className="text-stone-400 shrink-0 pointer-events-none ml-1" />
                  </div>
                  <select
                    aria-label="Select Irrigation Water Access"
                    value={waterAccess}
                    onChange={(e) => setWaterAccess(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  >
                    <option value="Deep Tubewell">Deep Tubewell</option>
                    <option value="Shallow Tubewell">Shallow Tubewell</option>
                    <option value="Canal / Surface">Canal / Surface</option>
                  </select>
                </div>
              </div>

              {/* Dynamic CTA Button */}
              <div>
                {farmerStatus === "already_planted" ? (
                  <Link
                    href="/advisory"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{lang === "en" ? "Open In-Season Advisory & SMS" : "জরুরি কৃষক বার্তা ও এসএমএস"}</span>
                    <ArrowRight size={15} />
                  </Link>
                ) : (
                  <Link
                    href="/shift"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{lang === "en" ? "Get Crop Recommendations" : "বিকল্প ফসলের তালিকা দেখুন"}</span>
                    <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* 4 KPI METRIC CARDS (Exact match to mockup) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Card 1: Temperature Shift */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                <Thermometer size={18} />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
                  +1.4°C
                </div>
                <div className="text-sm font-bold text-stone-800 mt-0.5 leading-tight">
                  Temperature Shift
                </div>
                <div className="text-xs text-stone-500 leading-tight">
                  (15 years, LST)
                </div>
              </div>
            </div>

            {/* Card 2: Soil Moisture Decline */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                <Droplets size={18} />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
                  -28%
                </div>
                <div className="text-sm font-bold text-stone-800 mt-0.5 leading-tight">
                  Soil Moisture Decline
                </div>
                <div className="text-xs text-stone-500 leading-tight">
                  (vs 10-yr average)
                </div>
              </div>
            </div>

            {/* Card 3: Monsoon Onset Shift */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
                <CloudRain size={18} />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
                  +12 days
                </div>
                <div className="text-sm font-bold text-stone-800 mt-0.5 leading-tight">
                  Monsoon Onset Shift
                </div>
                <div className="text-xs text-stone-500 leading-tight">
                  (vs historical)
                </div>
              </div>
            </div>

            {/* Card 4: Crop Suitability */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                <Leaf size={18} />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
                  42%
                </div>
                <div className="text-sm font-bold text-stone-800 mt-0.5 leading-tight">
                  Boro Rice Suitability
                </div>
                <div className="text-xs text-stone-500 leading-tight">
                  (by 2032)
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW (Left: Selected Field Map, Right: Climate Drift Diagnostic) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Field Map Card (6 cols) */}
            <div className="md:col-span-6 rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] relative h-[340px]">
              {/* Satellite Parcel Aerial Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/images/satellite_parcel.jpg')` }}
              />

              {/* SVG Polygon Parcel Boundary Highlight */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <polygon
                  points="140,80 260,95 240,230 110,210"
                  fill="rgba(163, 230, 53, 0.22)"
                  stroke="#A3E635"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
              </svg>

              {/* Glowing Pin Marker inside the Parcel */}
              <div className="absolute top-[145px] left-[175px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-emerald-500/30 animate-ping absolute" />
                <div className="w-8 h-8 rounded-full bg-white shadow-lg border border-stone-200 flex items-center justify-center text-[#1E7B48]">
                  <MapPin size={16} />
                </div>
              </div>

              {/* Top-Left Pill: Selected Field */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <div>
                  <div className="text-sm font-extrabold text-stone-900 leading-tight">
                    Selected Field
                  </div>
                  <div className="text-xs text-stone-500 font-medium leading-tight">
                    2.0 acres
                  </div>
                </div>
              </div>

              {/* Bottom-Left Pill: NASA MODIS Land Cover */}
              <div className="absolute bottom-4 left-4 z-10 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/90 text-xs font-bold text-stone-900 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span>NASA MODIS Land Cover: Agriculture</span>
              </div>

              {/* Bottom-Right Controls: Layers Button & Zoom */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Map Layers"
                  className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200/90 text-xs font-bold text-stone-800 shadow-sm flex items-center gap-1.5 hover:bg-stone-50"
                >
                  <Layers size={13} />
                  <span>Layers</span>
                </button>
                <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-xl border border-stone-200/90 shadow-sm overflow-hidden">
                  <button
                    type="button"
                    aria-label="Zoom in"
                    className="p-1.5 hover:bg-stone-100 text-stone-700 border-b border-stone-100"
                  >
                    <Plus size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label="Zoom out"
                    className="p-1.5 hover:bg-stone-100 text-stone-700"
                  >
                    <Minus size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Climate Drift Diagnostic Card (6 cols) */}
            <div className="md:col-span-6 rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col justify-between space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0B3D91] text-white flex items-center justify-center font-black text-xs tracking-wider shrink-0 shadow-2xs">
                  NASA
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-stone-900">
                    Weather & Climate Warnings
                  </h2>
                  <p className="text-xs text-stone-600 font-medium">
                    From NASA Satellite Weather Data
                  </p>
                </div>
              </div>

              {/* 3 Telemetry List Rows */}
              <div className="space-y-2.5 divide-y divide-stone-100 text-sm">
                {/* Row 1: Temperature Rise */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
                      <Thermometer size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900">Temperature Rise</div>
                      <div className="text-xs text-stone-600">Daytime heat rising (15-yr trend)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#DC2626] font-mono">+1.4°C</span>
                    <ChevronRight size={14} className="text-stone-400" />
                  </div>
                </div>

                {/* Row 2: Dry Soil */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                      <Droplets size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900">Dry Underground Soil</div>
                      <div className="text-xs text-stone-600">Low root-zone moisture (NASA SMAP)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#7C3AED] font-mono">-28%</span>
                    <ChevronRight size={14} className="text-stone-400" />
                  </div>
                </div>

                {/* Row 3: Rain Delay */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
                      <CloudRain size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900">Rain Season Delayed</div>
                      <div className="text-xs text-stone-600">Monsoon arriving 12 days late</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#2563EB] font-mono">+12 days</span>
                    <ChevronRight size={14} className="text-stone-400" />
                  </div>
                </div>
              </div>

              {/* Status Quo Unsustainable Warning Banner */}
              <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-sm flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-[#92400E] block">
                    High Risk for Boro Rice
                  </span>
                  <span className="text-[#B45309] text-xs leading-normal block mt-0.5">
                    Rice harvest drops due to severe heat and water shortages.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================================
            RIGHT COLUMN (4 cols): Recommended Actions (Exact match to Mockup)
            ======================================================================= */}
        <div className="xl:col-span-4">
          {farmerStatus === "already_planted" ? (
            /* ===================================================================
               IN-SEASON ACTIVE FIELD MANAGEMENT (For farmers with crops in ground)
               =================================================================== */
            <div className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 space-y-5">
              {/* Header: In-Season Field Guidance */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <ShieldAlert size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
                      {lang === "en" ? "In-Season Field Guidance" : "জমির তাত্ক্ষণিক পরিচর্যা"}
                    </h2>
                    <span className="text-xs text-stone-500 font-medium block">
                      {currentCrop.nameEn} • {waterAccess}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                  {lang === "en" ? "Active Crop" : "চলতি ফসল"}
                </span>
              </div>

              {/* Sub-tabs: AWD Irrigation | Flower Heat Defense */}
              <div className="p-1 rounded-full bg-stone-100 flex items-center gap-1 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => setInSeasonTab("awd")}
                  className={`flex-1 py-2 rounded-full transition-all text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 ${
                    inSeasonTab === "awd"
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Droplets size={14} />
                  <span>{lang === "en" ? "Water-Saving (AWD)" : "পর্যায়ক্রমিক সেচ (AWD)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInSeasonTab("heat")}
                  className={`flex-1 py-2 rounded-full transition-all text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 ${
                    inSeasonTab === "heat"
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Flame size={14} />
                  <span>{lang === "en" ? "Flower Heat Shield" : "ফুলে তাপদাহ রক্ষা"}</span>
                </button>
              </div>

              {inSeasonTab === "awd" ? (
                /* TAB 1: AWD IRRIGATION RESCUE */
                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#15803D] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        <span>{lang === "en" ? "AWD Protocol Active" : "পর্যায়ক্রমিক সেচ চালু"}</span>
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-[#15803D] border border-emerald-200 font-mono">
                        {lang === "en" ? "Saves 28% Fuel" : "২৮% তেল সাশ্রয়"}
                      </span>
                    </div>
                    <p className="text-sm text-[#14532D] font-normal leading-relaxed">
                      {lang === "en"
                        ? "Do NOT keep field continuously flooded! Let water recede 15 cm below soil before next pumping round. Roots aerate better and fuel bills plunge."
                        : "জমিতে সবসময় পানি জমিয়ে রাখবেন না। মাটির ১৫ সেমি নিচে পানি নামলে তবেই সেচ দিন। এতে ধানের ফলন কমবে না, উল্টো সেচ খরচ বাঁচবে।"}
                    </p>
                  </div>

                  {/* 2 Practical Field Directives */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                      <span className="text-stone-500 font-medium flex items-center gap-1">
                        <Clock size={12} className="text-[#0284C7]" />
                        <span>{lang === "en" ? "Next Irrigation" : "পরবর্তী সেচ"}</span>
                      </span>
                      <span className="text-sm font-semibold text-stone-900 block font-mono">
                        {lang === "en" ? "In 3–4 Days" : "৩-৪ দিন পর"}
                      </span>
                      <span className="text-stone-500 font-normal block">
                        {lang === "en" ? "SMAP Deficit: -28%" : "মাটির আর্দ্রতা: -২৮%"}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                      <span className="text-stone-500 font-medium flex items-center gap-1">
                        <Droplets size={12} className="text-[#1E7B48]" />
                        <span>{lang === "en" ? "Off-Peak Timing" : "সেচের সঠিক সময়"}</span>
                      </span>
                      <span className="text-sm font-semibold text-stone-900 block font-mono">
                        9 PM – 5 AM
                      </span>
                      <span className="text-stone-500 font-normal block">
                        {lang === "en" ? "Cuts evaporation 40%" : "বাষ্পীভবন ৪০% কম"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* TAB 2: FLOWER HEAT DEFENSE */
                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#991B1B] uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle size={14} className="text-red-600" />
                        <span>{lang === "en" ? "Heat Spike Threat" : "মার্চের তাপদাহ ঝুঁকি"}</span>
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-red-700 border border-red-200 font-mono">
                        {currentCrop.criticalFloweringTempC}°C Max
                      </span>
                    </div>
                    <p className="text-sm text-[#7F1D1D] font-normal leading-relaxed">
                      {lang === "en"
                        ? "Air temps rising above 34.5°C during March anthesis dry out pollen grains, producing empty grain pods (চিটা ধান). Maintain 5–7 cm standing water during peak hot afternoons."
                        : "মার্চের মাঝামাঝি ৩৪.৫° সে তাপদাহে ধানগাছের পরাগায়ন নষ্ট হয়ে চিটা হওয়ার ঝুঁকি থাকে। তীব্র গরমের দিনে জমিতে ৫-৭ সেমি পানি ধরে রাখুন।"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                      <span className="text-stone-500 font-medium flex items-center gap-1">
                        <Droplets size={12} className="text-blue-600" />
                        <span>{lang === "en" ? "Canopy Cooling" : "জমি ঠাণ্ডা রাখা"}</span>
                      </span>
                      <span className="text-sm font-semibold text-stone-900 block">
                        {lang === "en" ? "5–7 cm Water" : "৫-৭ সেমি পানি"}
                      </span>
                      <span className="text-stone-500 font-normal block">
                        {lang === "en" ? "Cool root zone by 2°C" : "শিকড়ের তাপমাত্রা ২° কমবে"}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                      <span className="text-stone-500 font-medium flex items-center gap-1">
                        <ShieldAlert size={12} className="text-amber-600" />
                        <span>{lang === "en" ? "Foliar Nutrition" : "পাতায় স্প্রে"}</span>
                      </span>
                      <span className="text-sm font-semibold text-stone-900 block">
                        {lang === "en" ? "Zinc / Potassium" : "জিংক ও পটাশ"}
                      </span>
                      <span className="text-stone-500 font-normal block">
                        {lang === "en" ? "Strengthens pollen" : "পরাগরেণু শক্তিশালী করে"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Water Access Source Health Card */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/90 text-sm space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
                  <span className="flex items-center gap-1.5">
                    <Droplets size={13} className="text-[#0284C7]" />
                    <span>{lang === "en" ? `Water Source: ${waterAccess}` : `পানির উৎস: ${waterAccess}`}</span>
                  </span>
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {lang === "en" ? "Watch Level" : "সতর্কতা"}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-normal leading-relaxed pt-1">
                  {waterAccess === "Deep Tubewell"
                    ? (lang === "en"
                        ? "Barind tract aquifer drops 0.5m/yr. Irrigate in planned bursts to prevent pump dry-run burnout."
                        : "বরেন্দ্র এলাকায় ভূগর্ভস্থ পানির স্তর দ্রুত নামছে। মোটর রক্ষা করতে নির্দিষ্ট শিডিউল মেনে সেচ দিন।")
                    : waterAccess === "Shallow Tubewell"
                    ? (lang === "en"
                        ? "Water level drops in March causing suction loss. Check foot valve seal and avoid peak daytime draw."
                        : "মার্চে অগভীর নলকূপের পানির চাপ কমে যেতে পারে। ছোট ছোট সাইকেলে সেচ পরিচালনা করুন।")
                    : (lang === "en"
                        ? "Canal water levels evaporate quickly in dry heat. Reserve surface water specifically for flowering window."
                        : "তীব্র গরমে খালের পানি দ্রুত শুকিয়ে যাচ্ছে। শুধু শিষ আসার সময়ে ব্যবহারের জন্য পানি সংরক্ষণ করুন।")}
                </p>
              </div>

              {/* Next Crop Relay Prep */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-sm space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <Sprout size={13} className="text-[#1E7B48]" />
                    <span>{lang === "en" ? "Prepare Next Relay Crop" : "পরবর্তী ফসলের প্রস্তুতি"}</span>
                  </span>
                  <span className="font-mono text-[#15803D]">
                    {lang === "en" ? "~45 Days to Harvest" : "কাটার বাকি ~৪৫ দিন"}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-normal leading-relaxed pt-1">
                  {lang === "en"
                    ? "Prepare 60-day summer mung bean (BARI Mung-6) seeds now. Sowing right after harvest utilizes leftover soil moisture and brings quick revenue."
                    : "ফসল কাটার পরপরই ৬০ দিনের মুগ ডাল (বারি মুগ-৬) বা তিল বোনার প্রস্তুতি নিন। অবশিষ্ট মাটিতে কম খরচে দ্রুত লাভ পাওয়া যাবে।"}
                </p>
              </div>

              {/* Bottom 3 In-Season Metric Tags */}
              <div className="pt-2 grid grid-cols-3 gap-2 border-t border-stone-100 text-center">
                <div className="p-2 rounded-xl bg-white border border-stone-200/80">
                  <div className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600">
                    <Droplets size={12} className="text-[#0284C7]" />
                    <span>{lang === "en" ? "AWD Saves" : "পানি সাশ্রয়"}</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#0284C7] mt-0.5 font-mono">
                    28% Less
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-stone-200/80">
                  <div className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600">
                    <Banknote size={12} className="text-[#16A34A]" />
                    <span>{lang === "en" ? "Fuel Saved" : "খরচ সাশ্রয়"}</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#16A34A] mt-0.5 font-mono">
                    ~৳8,500
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-stone-200/80">
                  <div className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600">
                    <Gauge size={12} className="text-[#16A34A]" />
                    <span>{lang === "en" ? "Status" : "অবস্থা"}</span>
                  </div>
                  <div className="text-sm font-extrabold text-stone-900 mt-0.5 font-mono">
                    {lang === "en" ? "Monitored" : "নিরাপদ"}
                  </div>
                </div>
              </div>

              {/* Full In-Season Advisory CTA */}
              <Link
                href="/advisory"
                className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{lang === "en" ? "Open Weather & SMS Alert Hub" : "আবহাওয়া ও এসএমএস সতর্কতা কেন্দ্র"}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            /* ===================================================================
               PRE-SEASON PLANNING (For farmers who have not planted yet)
               =================================================================== */
            <div className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 space-y-5">
              {/* Header: Recommended Actions */}
              <div className="flex items-center gap-2">
                <Sprout size={18} className="text-[#1E7B48]" />
                <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
                  {lang === "en" ? "What You Can Do (Pre-Planting)" : "ফসল রোপণের পূর্বে করণীয়"}
                </h2>
              </div>

              {/* Toggle Tabs: Change Crop | Change Planting Date */}
              <div className="p-1 rounded-full bg-stone-100 flex items-center gap-1 text-sm font-semibold">
                <button
                  onClick={() => setActiveTab("crop")}
                  className={`flex-1 py-2 rounded-full transition-all text-center text-sm font-semibold ${
                    activeTab === "crop"
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {lang === "en" ? "Change Crop" : "ফসল পরিবর্তন"}
                </button>
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`flex-1 py-2 rounded-full transition-all text-center text-sm font-semibold ${
                    activeTab === "calendar"
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {lang === "en" ? "Change Planting Date" : "সময়সূচী পরিবর্তন"}
                </button>
              </div>

              {/* Failure Risk Alert Banner */}
              <div className="p-3.5 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] text-sm flex items-start gap-2.5">
                <ShieldAlert size={16} className="text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#991B1B] leading-tight block">
                    {lang === "en"
                      ? "Boro Rice has 65% failure risk this season."
                      : "বোরো ধানে এ বছর মারাত্মক ক্ষতির ঝুঁকি রয়েছে।"}
                  </span>
                  <span className="text-[#B91C1C] text-sm font-normal leading-normal block mt-0.5">
                    {lang === "en"
                      ? "Groundwater pumping cost will eat all profit."
                      : "অতিরিক্ত সেচ খরচে লাভ শূন্য হয়ে যাওয়ার আশঙ্কা।"}
                  </span>
                </div>
              </div>

              {/* Recommended Alternatives List Header */}
              <div>
                <div className="text-lg font-semibold text-stone-900">
                  {lang === "en" ? "Better Crops for Your Field" : "আপনার জমির জন্য সেরা ফসল"}
                </div>
                <div className="text-xs text-stone-600 font-medium">
                  {lang === "en" ? "Top 2 safer options for this land" : "কম পানিতে বেশি লাভের বিকল্প"}
                </div>
              </div>

              {/* Alternative 1: BARI Mustard-14 */}
              <Link
                href="/shift"
                className="group block p-3 rounded-2xl border border-stone-200/90 hover:border-emerald-500 hover:shadow-xs transition-all bg-white"
              >
                <div className="flex items-center gap-3.5">
                  {/* Photo Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                    <img
                      src="/images/mustard_crop.jpg"
                      alt="BARI Mustard-14"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-stone-900 truncate">
                        {lang === "en" ? "BARI Mustard-14" : "বারি সরিষা-১৪"}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#15803D] shrink-0">
                        {lang === "en" ? "Best Choice" : "সেরা পছন্দ"}
                      </span>
                    </div>
                    <ul className="text-sm text-stone-600 font-normal mt-1 space-y-0.5">
                      <li>• {lang === "en" ? "60% less water needed" : "৬০% কম পানি প্রয়োজন"}</li>
                      <li>• {lang === "en" ? "Harvests before hot summer" : "গরমের আগেই ফলন ঘরে ওঠে"}</li>
                      <li>• {lang === "en" ? "Higher, safer profit" : "নিরাপদ ও বেশি লাভ"}</li>
                    </ul>
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-stone-400 group-hover:text-[#1E7B48] transition-colors shrink-0"
                  />
                </div>
              </Link>

              {/* Alternative 2: Hybrid Maize */}
              <Link
                href="/shift"
                className="group block p-3 rounded-2xl border border-stone-200/90 hover:border-emerald-500 hover:shadow-xs transition-all bg-white"
              >
                <div className="flex items-center gap-3.5">
                  {/* Photo Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                    <img
                      src="/images/maize_crop.jpg"
                      alt="Hybrid Maize"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-semibold text-stone-900 truncate">
                      {lang === "en" ? "Hybrid Maize" : "হাইব্রিড ভুট্টা"}
                    </div>
                    <ul className="text-sm text-stone-600 font-normal mt-1 space-y-0.5">
                      <li>• {lang === "en" ? "Handles drought well" : "খরা ভালো সহ্য করতে পারে"}</li>
                      <li>• {lang === "en" ? "Strong against summer heat" : "তীব্র তাপেও ক্ষতি হয় না"}</li>
                      <li>• {lang === "en" ? "High demand in market" : "বাজারে ভালো চাহিদা"}</li>
                    </ul>
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-stone-400 group-hover:text-[#1E7B48] transition-colors shrink-0"
                  />
                </div>
              </Link>

              {/* Bottom 3-Metric Summary Tags */}
              <div className="pt-2 grid grid-cols-3 gap-2 border-t border-stone-100 text-center">
                <div className="p-2 rounded-xl bg-white border border-stone-200/80">
                  <div className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600">
                    <Droplets size={12} className="text-[#0284C7]" />
                    <span>{lang === "en" ? "Water Saved" : "পানি সাশ্রয়"}</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#0284C7] mt-0.5 font-mono">
                    60% Saved
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-stone-200/80">
                  <div className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600">
                    <TrendingDown size={12} className="text-[#16A34A]" />
                    <span>{lang === "en" ? "Cost Saved" : "খরচ সাশ্রয়"}</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#16A34A] mt-0.5 font-mono">
                    -35%
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-stone-200/80">
                  <div className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600">
                    <Gauge size={12} className="text-[#16A34A]" />
                    <span>{lang === "en" ? "Safety Score" : "নিরাপত্তা স্কোর"}</span>
                  </div>
                  <div className="text-sm font-extrabold text-stone-900 mt-0.5 font-mono">
                    Safe (32/100)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
