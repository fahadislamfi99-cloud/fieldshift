"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useApp } from "@/context/AppContext";
import {
  Satellite,
  Radio,
  Layers,
  Thermometer,
  Droplet,
  Sun,
  Wind,
  Info,
  Calendar,
} from "lucide-react";
import { NormalizedNASADataPoint } from "@/types/nasa";

const FieldMap = dynamic(
  () => import("@/components/map/FieldMap").then((mod) => mod.FieldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[340px] w-full rounded-2xl bg-stone-150 animate-pulse flex items-center justify-center text-xs font-semibold text-stone-500">
        Loading Satellite Mesh...
      </div>
    ),
  }
);

export default function SatellitePage() {
  const { currentZone, metrics, drift, lang } = useApp();
  const [history, setHistory] = useState<NormalizedNASADataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadTelemetry() {
      setLoading(true);
      try {
        const res = await fetch(`/api/climate?zoneId=${currentZone.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.historicalSample && Array.isArray(data.historicalSample)) {
            setHistory(data.historicalSample);
          }
        }
      } catch (e) {
        console.warn("Failed to load history", e);
      } finally {
        setLoading(false);
      }
    }
    loadTelemetry();
  }, [currentZone.id]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE TELEMETRY STREAM
            </span>
            <span className="text-xs text-stone-500">
              NASA Earth Science Division
            </span>
          </div>
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-stone-900 mt-1 tracking-tight">
            {lang === "en" ? "NASA Earth Observation Explorer" : "নাসা উপগ্রহ পর্যবেক্ষণ কেন্দ্র"}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            {lang === "en"
              ? "Live orbital measurements combining NASA POWER, SMAP L4 root-zone moisture, and MODIS 15-year thermal baselines."
              : "নাসার একাধিক উপগ্রহ মিশনের উপাত্ত সমন্বয়ে রিয়েল-টাইম কৃষি-আবহাওয়া বিশ্লেষণ।"}
          </p>
        </div>

        <div className="w-full md:w-auto flex items-center justify-center gap-2 text-xs font-bold text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
          <Satellite size={16} className="text-[#163B2A]" />
          <span>Point Target: {currentZone.lat.toFixed(4)}°N, {currentZone.lon.toFixed(4)}°E</span>
        </div>
      </div>

      {/* Large Satellite Map View */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-[#163B2A]" />
            <h2 className="text-base font-bold text-stone-900">
              {lang === "en" ? "High-Resolution Spatial Tile Mesh" : "উচ্চ ক্ষমতাসম্পন্ন স্যাটেলাইট মানচিত্র"}
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            MapLibre WebGL Engine • CartoDB Basemap
          </span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-stone-200 h-[260px] sm:h-[340px] lg:h-[400px]">
          <FieldMap
            zone={currentZone}
            moisturePercent={metrics.rootZoneSoilMoisturePercent}
            lang={lang}
          />
        </div>
      </div>

      {/* 4 NASA Sensor Architectures Lineage Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sensor 1 */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
            REST Point API
          </span>
          <h3 className="text-base font-bold text-stone-900">NASA POWER</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            {lang === "en"
              ? "Daily agroclimatology (T2M, Radiation, Rain). Zero-token open REST endpoint queried live."
              : "দৈনিক কৃষি-আবহাওয়া (তাপমাত্রা, সৌর বিকিরণ, বৃষ্টিপাত)। ওপেন এন্ডপয়েন্ট থেকে রিয়েল-টাইম ডেটা।"}
          </p>
          <div className="text-xs font-bold text-[#163B2A] pt-2 border-t border-stone-100">
            {lang === "en" ? "Resolution: 0.5° x 0.5°" : "রেজোলিউশন: ০.৫° x ০.৫°"}
          </div>
        </div>

        {/* Sensor 2 */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
            {lang === "en" ? "Microwave Radar/Radiometer" : "মাইক্রোওয়েভ রেডার"}
          </span>
          <h3 className="text-base font-bold text-stone-900">SMAP L4 (SPL4SMAU)</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            {lang === "en"
              ? "Assimilates 0–100 cm root-zone soil moisture, bypassing deceptive surface crust drying."
              : "০-১০০ সেমি মাটির মূল স্তরের আর্দ্রতা পরিমাপ করে, যা সেচ নির্ধারণে সাহায্য করে।"}
          </p>
          <div className="text-xs font-bold text-[#163B2A] pt-2 border-t border-stone-100">
            {lang === "en" ? "Resolution: 9 km Assimilated" : "রেজোলিউশন: ৯ কিমি"}
          </div>
        </div>

        {/* Sensor 3 */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
            {lang === "en" ? "ISS Thermal Infrared" : "থার্মাল ইনফ্রারেড"}
          </span>
          <h3 className="text-base font-bold text-stone-900">ECOSTRESS (ISS)</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            {lang === "en"
              ? "Measures Evapotranspiration (ET) and plant canopy stress up to 7 days before physical wilting."
              : "ফসল শুকিয়ে যাওয়ার ৭ দিন পূর্বেই পাতার তাপমাত্রা ও উদ্ভিদের পানিশূন্যতা শনাক্ত করে।"}
          </p>
          <div className="text-xs font-bold text-[#163B2A] pt-2 border-t border-stone-100">
            {lang === "en" ? "Resolution: 70m Thermal" : "রেজোলিউশন: ৭০ মিটার থার্মাল"}
          </div>
        </div>

        {/* Sensor 4 */}
        <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
            {lang === "en" ? "Spectroradiometer" : "স্পেকট্রো-রেডিওমিটার"}
          </span>
          <h3 className="text-base font-bold text-stone-900">MODIS / Landsat</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            {lang === "en"
              ? "15-year thermal baseline (2010–2025) establishing the multi-decadal Climate Drift Index."
              : "১৫ বছরের ঐতিহাসিক তাপমাত্রা বিশ্লেষণ যা দীর্ঘমেয়াদী জলবায়ু পরিবর্তনের ধারা প্রকাশ করে।"}
          </p>
          <div className="text-xs font-bold text-[#163B2A] pt-2 border-t border-stone-100">
            {lang === "en" ? "Resolution: 250m - 1km" : "রেজোলিউশন: ২৫০ মি - ১ কিমি"}
          </div>
        </div>
      </div>

      {/* Historical Telemetry Stream Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900">
            {lang === "en" ? "Daily NASA Telemetry Log (Last 14 Days)" : "সাম্প্রতিক উপগ্রহ পর্যবেক্ষণ লগ (১৪ দিন)"}
          </h3>
          <span className="text-xs text-stone-500">
            {lang === "en" ? "Filtered for NASA orbit latency" : "উপগ্রহ কক্ষপথের রিয়েল-টাইম রিডিং"}
          </span>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-stone-500 font-semibold animate-pulse">
            {lang === "en" ? "Connecting to NASA POWER Data Center..." : "নাসা ডেটা সেন্টারের সাথে সংযোগ হচ্ছে..."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">{lang === "en" ? "Date" : "তারিখ"}</th>
                  <th className="py-2.5 px-3">{lang === "en" ? "Mean Temp" : "গড় তাপমাত্রা"}</th>
                  <th className="py-2.5 px-3">{lang === "en" ? "Max Temp" : "সর্বোচ্চ তাপ"}</th>
                  <th className="py-2.5 px-3">{lang === "en" ? "Min Temp" : "সর্বনিম্ন তাপ"}</th>
                  <th className="py-2.5 px-3">{lang === "en" ? "Rain (mm)" : "বৃষ্টি (মিমি)"}</th>
                  <th className="py-2.5 px-3">{lang === "en" ? "Humidity (%)" : "আর্দ্রতা (%)"}</th>
                  <th className="py-2.5 px-3">{lang === "en" ? "Solar (kWh/m²)" : "সৌর বিকিরণ"}</th>
                  <th className="py-2.5 px-3">{lang === "en" ? "Wind (km/h)" : "বাতাস (কিমি/ঘ)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {history.map((row) => (
                  <tr key={row.date} className="hover:bg-stone-50 transition-colors">
                    <td className="py-2 px-3 font-bold text-stone-900 font-sans">{row.date}</td>
                    <td className="py-2 px-3 text-stone-800 font-semibold">{row.tempMeanC.toFixed(1)}°C</td>
                    <td className="py-2 px-3 text-amber-700 font-semibold">{row.tempMaxC.toFixed(1)}°C</td>
                    <td className="py-2 px-3 text-sky-700">{row.tempMinC.toFixed(1)}°C</td>
                    <td className="py-2 px-3">{row.precipitationMm.toFixed(2)}</td>
                    <td className="py-2 px-3">{row.humidityPercent.toFixed(1)}%</td>
                    <td className="py-2 px-3">{row.solarRadiationKwh.toFixed(2)}</td>
                    <td className="py-2 px-3">{row.windSpeedKmh.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
