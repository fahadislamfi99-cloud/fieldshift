"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { CustomSelect, SelectOption } from "@/components/CustomSelect";
import {
  MapPin,
  Sprout,
  Droplets,
  ArrowRight,
  CheckCircle2,
  Sliders,
} from "lucide-react";

export default function HomePage() {
  const {
    currentZone,
    zoneId,
    setZoneId,
    cropId,
    setCropId,
    zones,
    crops,
    lang,
    farmerStatus,
    setFarmerStatus,
    waterAccess,
    setWaterAccess,
    saveUserSelection,
  } = useApp();

  const [openSelect, setOpenSelect] = useState<"location" | "crop" | "water" | null>(null);

  const handleSelectZone = (id: string) => {
    setZoneId(id);
    saveUserSelection({ zoneId: id });
  };

  const handleSelectCrop = (id: string) => {
    setCropId(id);
    saveUserSelection({ cropId: id });
  };

  const handleSelectWater = (source: string) => {
    setWaterAccess(source);
    saveUserSelection({ waterAccess: source });
  };

  const handleSelectStatus = (status: "not_planted" | "already_planted") => {
    setFarmerStatus(status);
    saveUserSelection({ farmerStatus: status });
  };

  const isConfiguredReady = Boolean(farmerStatus && zoneId && cropId && waterAccess);

  const handleProceed = () => {
    saveUserSelection({
      hasConfigured: true,
      zoneId,
      cropId,
      farmerStatus,
      waterAccess,
    });
  };

  const isPlanted = farmerStatus === "already_planted";

  // Location select options
  const locationOptions: SelectOption[] = zones.map((z) => ({
    value: z.id,
    label: z.nameEn.split(",")[0],
    sublabel: `${z.districtEn} • ${z.primaryClimateVulnerability.split(".")[0]}`,
    badge: z.groundwaterStatus === "critical_depletion" ? (lang === "en" ? "Low Aquifer" : "সংকটজনক পানি") : undefined,
  }));

  // Crop select options
  const cropOptions: SelectOption[] = crops.map((c) => ({
    value: c.id,
    label: c.nameEn,
    sublabel: `${c.waterReqMm} mm water demand • ${c.growthDays} days harvest`,
    badge: c.waterSavingsVsRicePercent ? `-${c.waterSavingsVsRicePercent}% Water` : undefined,
  }));

  // Water source select options
  const waterOptions: SelectOption[] = [
    {
      value: "Deep Tubewell",
      label: "Deep Tubewell",
      sublabel: lang === "en" ? "Deep groundwater • High electricity/diesel cost" : "ভূগর্ভস্থ পানি • উচ্চ সেচ খরচ",
      badge: lang === "en" ? "Groundwater" : "ভূগর্ভস্থ",
    },
    {
      value: "Shallow Tubewell",
      label: "Shallow Tubewell",
      sublabel: lang === "en" ? "Upper aquifer • Water level drops in dry season" : "অগভীর নলকূপ • খরায় পানি কমে",
      badge: lang === "en" ? "Seasonal" : "মৌসুমি",
    },
    {
      value: "Canal / Surface",
      label: "Canal / Surface",
      sublabel: lang === "en" ? "Rivers & canals • Low pumping cost gravity flow" : "নদী ও খাল • স্বল্প সেচ খরচ",
      badge: lang === "en" ? "Surface" : "উপরিভাগ",
    },
  ];

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* HERO BANNER CARD */}
      <div className="relative rounded-3xl border border-stone-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-h-[520px] sm:min-h-[580px] pb-6 flex flex-col justify-between">
        {/* Full Photographic Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
        />

        {/* Soft Gradient Overlay for Maximum Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/92 sm:via-white/80 to-transparent rounded-3xl pointer-events-none" />

        {/* Floating Location Marker on the Landscape Photo (Desktop) */}
        <div className="hidden xl:flex absolute top-12 right-20 z-20 flex-col items-center pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 text-xs font-bold text-stone-900 shadow-md flex items-center gap-1.5">
            <MapPin size={14} className="text-[#1E7B48]" />
            <span>
              {zoneId && currentZone
                ? `${currentZone.nameEn.split(",")[0]}, Rajshahi`
                : (lang === "en" ? "Barind Tract, Rajshahi" : "বরেন্দ্র অঞ্চল, রাজশাহী")}
            </span>
          </div>
          {/* Pin Stem Line */}
          <div className="w-0.5 h-20 bg-white/90 shadow-sm" />
          {/* Target Reticle Pin */}
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute" />
            <div className="w-5 h-5 rounded-full bg-white border-2 border-[#1E7B48] shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#1E7B48]" />
            </div>
          </div>
        </div>

        {/* Hero Card Content Container */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-between h-full space-y-6 max-w-3xl">
          {/* Hero Header Text */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E7B48] text-xs font-bold border border-emerald-200/80 shadow-2xs">
              <Sprout size={13} className="text-[#1E7B48]" />
              <span>{lang === "en" ? "FieldShift • Barind Earth Observation" : "ফিল্ডশিফট • বরেন্দ্র কৃষি পর্যবেক্ষণ"}</span>
            </div>

            <h1 className="text-[28px] sm:text-[34px] font-bold text-stone-900 tracking-tight leading-tight">
              {lang === "en"
                ? "Climate-Smart Farm Planning & Crop Protection"
                : "জলবায়ু-সহনশীল ফসলের স্মার্ট পরিকল্পনা ও সুরক্ষা"}
            </h1>

            <p className="text-sm sm:text-base font-normal text-stone-600 leading-relaxed max-w-xl">
              {lang === "en"
                ? "Select your farming situation and field parameters below to calculate low-water crop shifts, AWD pumping schedules, and thermal heatwave defense using live NASA Earth data."
                : "নাসা উপগ্রহের আবহাওয়া তথ্যের ভিত্তিতে কম সেচের লাভজনক বিকল্প ফসল, পর্যায়ক্রমিক সেচ (AWD) এবং তাপদাহ থেকে সুরক্ষার নির্দেশনা পেতে নিচের তথ্যগুলো নির্ধারণ করুন।"}
            </p>
          </div>

          {/* =========================================================================
              UNIFIED OPTION SELECT CARD (With Polished Custom Dropdowns)
              ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-4">
            {/* Header: Label */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100/80 text-[#1E7B48] flex items-center justify-center">
                <Sliders size={13} />
              </div>
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                {lang === "en" ? "Field Setup & Situation" : "জমির তথ্য ও বর্তমান পরিস্থিতি"}
              </span>
            </div>

            {/* STEP 1: Farmer Situation Switcher (Unselected by default) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  {lang === "en" ? "1. Your Farming Situation:" : "১. আপনার বর্তমান পরিস্থিতি:"}
                </span>
                {!farmerStatus && (
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    {lang === "en" ? "Required" : "নির্বাচন প্রয়োজন"}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1 rounded-2xl bg-stone-100/80 border border-stone-200/70">
                <button
                  type="button"
                  onClick={() => handleSelectStatus("not_planted")}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    farmerStatus === "not_planted"
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "bg-white/80 text-stone-700 hover:text-stone-900 hover:bg-white border border-stone-200/60"
                  }`}
                >
                  <Sprout size={14} />
                  <span>{lang === "en" ? "Planning Next Crop (Not Planted)" : "ফসল লাগাইনি (পরিকল্পনা)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectStatus("already_planted")}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    farmerStatus === "already_planted"
                      ? "bg-[#1E7B48] text-white shadow-xs"
                      : "bg-white/80 text-stone-700 hover:text-stone-900 hover:bg-white border border-stone-200/60"
                  }`}
                >
                  <CheckCircle2 size={14} />
                  <span>{lang === "en" ? "Standing Crop in Field (Manage)" : "জমিতে ফসল আছে (পরিচর্যা)"}</span>
                </button>
              </div>
            </div>

            {/* STEP 2: The 3 Field Details Custom Dropdown Tiles */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {lang === "en" ? "2. Field Specifications:" : "২. জমির বিবরণ:"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Custom Tile 1: Location */}
                <CustomSelect
                  label={lang === "en" ? "Location" : "এলাকা"}
                  value={zoneId}
                  options={locationOptions}
                  onChange={handleSelectZone}
                  placeholder={lang === "en" ? "Select Location..." : "এলাকা নির্বাচন করুন..."}
                  subtextPlaceholder={lang === "en" ? "Choose Upazila/District" : "উপজেলা বা জেলা"}
                  icon={<MapPin size={13} className={zoneId ? "text-[#1E7B48]" : "text-stone-400"} />}
                  isOpen={openSelect === "location"}
                  onToggle={() => setOpenSelect(openSelect === "location" ? null : "location")}
                  onClose={() => setOpenSelect(null)}
                />

                {/* Custom Tile 2: Crop */}
                <CustomSelect
                  label={
                    farmerStatus === "already_planted"
                      ? (lang === "en" ? "Standing Crop" : "চলতি ফসল")
                      : farmerStatus === "not_planted"
                      ? (lang === "en" ? "Target Crop" : "পরিকল্পিত ফসল")
                      : (lang === "en" ? "Crop" : "ফসল")
                  }
                  value={cropId}
                  options={cropOptions}
                  onChange={handleSelectCrop}
                  placeholder={lang === "en" ? "Select Crop..." : "ফসল নির্বাচন করুন..."}
                  subtextPlaceholder={lang === "en" ? "Paddy, mustard, wheat" : "ধান, সরিষা, গম"}
                  icon={<Sprout size={13} className={cropId ? "text-[#1E7B48]" : "text-stone-400"} />}
                  isOpen={openSelect === "crop"}
                  onToggle={() => setOpenSelect(openSelect === "crop" ? null : "crop")}
                  onClose={() => setOpenSelect(null)}
                />

                {/* Custom Tile 3: Water Access */}
                <CustomSelect
                  label={lang === "en" ? "Water Source" : "পানির উৎস"}
                  value={waterAccess}
                  options={waterOptions}
                  onChange={handleSelectWater}
                  placeholder={lang === "en" ? "Select Water Source..." : "পানির উৎস নির্বাচন করুন..."}
                  subtextPlaceholder={lang === "en" ? "Tubewell or canal" : "নলকূপ বা খাল"}
                  icon={<Droplets size={13} className={waterAccess ? "text-[#0284C7]" : "text-stone-400"} />}
                  isOpen={openSelect === "water"}
                  onToggle={() => setOpenSelect(openSelect === "water" ? null : "water")}
                  onClose={() => setOpenSelect(null)}
                  align="right"
                />
              </div>
            </div>

            {/* Bottom Row inside card: Action Button & Context Note */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100">
              {isConfiguredReady ? (
                isPlanted ? (
                  <Link
                    href="/advisory"
                    onClick={handleProceed}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-2xl bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{lang === "en" ? "Open In-Season Field Advisory" : "জমির জরুরি কৃষি পরামর্শ দেখুন"}</span>
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link
                    href="/shift"
                    onClick={handleProceed}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-2xl bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{lang === "en" ? "Get Crop Shift Recommendations" : "বিকল্প ফসলের তালিকা দেখুন"}</span>
                    <ArrowRight size={16} />
                  </Link>
                )
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-stone-200/90 text-stone-400 text-sm sm:text-base font-semibold cursor-not-allowed shadow-none"
                >
                  <span>{lang === "en" ? "Select All Options to Continue" : "উপরের সবগুলো তথ্য নির্বাচন করুন"}</span>
                </button>
              )}

              <span className="text-xs text-stone-500 font-medium">
                {isConfiguredReady
                  ? (isPlanted
                      ? (lang === "en" ? "AWD water-saving schedule & flower heat guard" : "পর্যায়ক্রমিক সেচ ও ফুল ঝরা রোধের নির্দেশনা")
                      : (lang === "en" ? "High-profit alternatives & pumping fuel savings" : "কম সেচের লাভজনক বিকল্প ফসল ও সাশ্রয়"))
                  : (lang === "en" ? "Please fill the 4 parameters above" : "অনুগ্রহ করে উপরের ৪টি তথ্য দিন")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
