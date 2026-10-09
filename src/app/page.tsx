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
} from "lucide-react";

export default function HomePage() {
  const { currentZone, currentCrop, zones, setZoneId, crops, setCropId } =
    useApp();

  const [activeTab, setActiveTab] = useState<"crop" | "calendar">("crop");
  const [waterAccess, setWaterAccess] = useState("Deep Tubewell");

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
            <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                  Welcome to FieldShift
                </h1>
                <p className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                  Satellite-powered insights for climate-resilient farming.
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
                        Location
                      </span>
                      <span className="text-sm font-bold text-stone-900 block mt-0.5 leading-tight whitespace-nowrap">
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

                {/* Box 2: Current Crop */}
                <div className="relative p-2.5 px-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-2xs hover:border-emerald-400 transition-all">
                  <div className="flex items-center gap-2">
                    <Sprout size={16} className="text-[#1E7B48] shrink-0" />
                    <div>
                      <span className="text-xs text-stone-500 font-medium block leading-none">
                        Current Crop
                      </span>
                      <span className="text-sm font-bold text-stone-900 block mt-0.5 leading-tight whitespace-nowrap">
                        {currentCrop.nameEn.split(" ")[0]} Rice
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
                        Water Access
                      </span>
                      <span className="text-sm font-bold text-stone-900 block mt-0.5 leading-tight whitespace-nowrap">
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

              {/* Get Recommendations CTA Button */}
              <div>
                <Link
                  href="/shift"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <span>Get Recommendations</span>
                  <ArrowRight size={15} />
                </Link>
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
          <div className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 space-y-5">
            {/* Header: Recommended Actions */}
            <div className="flex items-center gap-2">
              <Sprout size={18} className="text-[#1E7B48]" />
              <h2 className="text-lg font-extrabold text-stone-900">
                What You Can Do
              </h2>
            </div>

            {/* Toggle Tabs: Change Crop | Change Planting Date */}
            <div className="p-1 rounded-full bg-stone-100 flex items-center gap-1 text-sm font-bold">
              <button
                onClick={() => setActiveTab("crop")}
                className={`flex-1 py-2 rounded-full transition-all text-center ${
                  activeTab === "crop"
                    ? "bg-[#1E7B48] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Change Crop
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`flex-1 py-2 rounded-full transition-all text-center ${
                  activeTab === "calendar"
                    ? "bg-[#1E7B48] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Change Planting Date
              </button>
            </div>

            {/* Failure Risk Alert Banner */}
            <div className="p-3.5 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] text-sm flex items-start gap-2.5">
              <ShieldAlert size={16} className="text-[#DC2626] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#991B1B] leading-tight block">
                  Boro Rice has 65% failure risk this season.
                </span>
                <span className="text-[#B91C1C] text-xs leading-normal block mt-0.5">
                  Groundwater pumping cost will eat all profit.
                </span>
              </div>
            </div>

            {/* Recommended Alternatives List Header */}
            <div>
              <div className="text-sm font-extrabold text-stone-900">
                Better Crops for Your Field
              </div>
              <div className="text-xs text-stone-600 font-medium">
                Top 2 safer options for this land
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
                    <span className="text-sm font-bold text-stone-900 truncate">
                      BARI Mustard-14
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-[#DCFCE7] text-[#15803D] shrink-0">
                      Best Choice
                    </span>
                  </div>
                  <ul className="text-xs text-stone-600 font-medium mt-1 space-y-0.5">
                    <li>• 60% less water needed</li>
                    <li>• Harvests before hot summer</li>
                    <li>• Higher, safer profit</li>
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
                  <div className="text-sm font-bold text-stone-900 truncate">
                    Hybrid Maize
                  </div>
                  <ul className="text-xs text-stone-600 font-medium mt-1 space-y-0.5">
                    <li>• Handles drought well</li>
                    <li>• Strong against summer heat</li>
                    <li>• High demand in market</li>
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
                  <span>Water Saved</span>
                </div>
                <div className="text-sm font-extrabold text-[#0284C7] mt-0.5 font-mono">
                  60% Saved
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-stone-200/80">
                <div className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600">
                  <TrendingDown size={12} className="text-[#16A34A]" />
                  <span>Cost Saved</span>
                </div>
                <div className="text-sm font-extrabold text-[#16A34A] mt-0.5 font-mono">
                  -35%
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white border border-stone-200/80">
                <div className="flex items-center justify-center gap-1 text-xs font-medium text-stone-600">
                  <Gauge size={12} className="text-[#16A34A]" />
                  <span>Safety Score</span>
                </div>
                <div className="text-sm font-extrabold text-stone-900 mt-0.5 font-mono">
                  Safe (32/100)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
