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
  Orbit,
  Crosshair,
} from "lucide-react";
import { NormalizedNASADataPoint } from "@/types/nasa";

const FieldMap = dynamic(
  () => import("@/components/map/FieldMap").then((mod) => mod.FieldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[340px] w-full rounded-2xl bg-stone-900/60 border border-emerald-500/20 animate-pulse flex items-center justify-center text-xs font-mono text-emerald-400">
        INITIALIZING ORBITAL RADAR MESH...
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ORBITAL TELEMETRY STREAM
            </span>
            <span className="text-xs font-mono text-stone-400">
              NASA Earth Science Division
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
            NASA Earth Observation Explorer
          </h1>
          <p className="text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
            {lang === "en"
              ? "Live orbital measurements combining NASA POWER, SMAP L4 root-zone moisture, and MODIS 15-year thermal baselines."
              : "নাসার একাধিক উপগ্রহ মিশনের উপাত্ত সমন্বয়ে রিয়েল-টাইম কৃষি-আবহাওয়া বিশ্লেষণ।"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-black/60 p-3 rounded-xl border border-emerald-500/30">
          <Crosshair size={16} className="text-emerald-400 animate-spin-slow" />
          <span>TARGET: {currentZone.lat.toFixed(4)}°N, {currentZone.lon.toFixed(4)}°E</span>
        </div>
      </div>

      {/* Large Satellite Map View */}
      <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-emerald-400" />
            <h2 className="text-base font-bold text-white font-mono">
              GEOSPATIAL ORBITAL RADAR MESH
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-400">
            MapLibre GL • Earth Observation Satellite Mesh
          </span>
        </div>

        <div className="rounded-xl overflow-hidden border border-emerald-500/30 h-[340px]">
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
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 space-y-2">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-900 text-emerald-400 border border-emerald-500/30">
            REST POINT API
          </span>
          <h3 className="text-sm font-bold text-white">NASA POWER</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Daily agroclimatology (T2M, Radiation, Rain). Live point query without API token limits.
          </p>
          <div className="text-[11px] font-mono font-bold text-emerald-400 pt-2 border-t border-stone-800">
            Resolution: 0.5° x 0.5°
          </div>
        </div>

        {/* Sensor 2 */}
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 space-y-2">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-900 text-sky-400 border border-sky-500/30">
            MICROWAVE RADAR
          </span>
          <h3 className="text-sm font-bold text-white">SMAP L4 (SPL4SMAU)</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Root-zone soil moisture (0–100 cm depth) measuring actual water availability for crop roots.
          </p>
          <div className="text-[11px] font-mono font-bold text-sky-400 pt-2 border-t border-stone-800">
            Resolution: 9 km Assimilated
          </div>
        </div>

        {/* Sensor 3 */}
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 space-y-2">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-900 text-amber-400 border border-amber-500/30">
            ISS THERMAL INFRARED
          </span>
          <h3 className="text-sm font-bold text-white">ECOSTRESS (ISS)</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Evaporative Stress Index (ESI) capturing plant dehydration days before visible leaf yellowing.
          </p>
          <div className="text-[11px] font-mono font-bold text-amber-400 pt-2 border-t border-stone-800">
            Resolution: 70m Thermal
          </div>
        </div>

        {/* Sensor 4 */}
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 space-y-2">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-900 text-indigo-400 border border-indigo-500/30">
            SPECTRORADIOMETER
          </span>
          <h3 className="text-sm font-bold text-white">MODIS / Landsat</h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            15-year thermal baseline (2010–2025) establishing historical climate drift divergence ($\Delta T$).
          </p>
          <div className="text-[11px] font-mono font-bold text-indigo-400 pt-2 border-t border-stone-800">
            Resolution: 250m - 1km
          </div>
        </div>
      </div>

      {/* Historical Telemetry Stream Table */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Radio size={16} className="text-emerald-400 animate-pulse" />
            <span>DAILY NASA TELEMETRY LOG (LAST 14 OBSERVATIONS)</span>
          </h3>
          <span className="text-xs font-mono text-stone-400">
            Scrubbed of NASA -999 orbit latency gaps
          </span>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs font-mono text-emerald-400 animate-pulse">
            QUERYING NASA POWER DATA CENTER...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-mono">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Mean Temp</th>
                  <th className="py-2.5 px-3">Max Temp</th>
                  <th className="py-2.5 px-3">Min Temp</th>
                  <th className="py-2.5 px-3">Rain (mm)</th>
                  <th className="py-2.5 px-3">Humidity (%)</th>
                  <th className="py-2.5 px-3">Solar (kWh/m²)</th>
                  <th className="py-2.5 px-3">Wind (km/h)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80">
                {history.map((row) => (
                  <tr key={row.date} className="hover:bg-stone-900/60 transition-colors">
                    <td className="py-2 px-3 font-bold text-emerald-400">{row.date}</td>
                    <td className="py-2 px-3 text-white font-semibold">{row.tempMeanC.toFixed(1)}°C</td>
                    <td className="py-2 px-3 text-amber-400 font-semibold">{row.tempMaxC.toFixed(1)}°C</td>
                    <td className="py-2 px-3 text-sky-400">{row.tempMinC.toFixed(1)}°C</td>
                    <td className="py-2 px-3 text-stone-300">{row.precipitationMm.toFixed(2)}</td>
                    <td className="py-2 px-3 text-stone-300">{row.humidityPercent.toFixed(1)}%</td>
                    <td className="py-2 px-3 text-stone-300">{row.solarRadiationKwh.toFixed(2)}</td>
                    <td className="py-2 px-3 text-stone-300">{row.windSpeedKmh.toFixed(1)}</td>
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
