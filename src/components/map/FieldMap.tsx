"use client";

import React, { useEffect, useRef, useState } from "react";
import { ZoneProfile } from "@/types/climate";
import { MapPin, Plus } from "lucide-react";
import * as maplibregl from "maplibre-gl";

interface FieldMapProps {
  zone: ZoneProfile;
  moisturePercent: number;
  onOpenFullMap?: () => void;
  lang: "en" | "bn";
}

export const FieldMap: React.FC<FieldMapProps> = ({
  zone,
  moisturePercent,
  onOpenFullMap,
  lang,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // CartoDB Positron Free Tile Style (Clean, high-performance, zero API keys)
    const styleUrl = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

    try {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: styleUrl,
        center: [zone.lon, zone.lat],
        zoom: 12.5,
        attributionControl: false,
        interactive: true,
      });

      map.on("load", () => {
        setMapLoaded(true);

        // Add circular pulse marker
        const el = document.createElement("div");
        el.className =
          "w-5 h-5 rounded-full bg-[#1F513A] border-2 border-white shadow-lg animate-pulse flex items-center justify-center";
        const inner = document.createElement("div");
        inner.className = "w-2 h-2 rounded-full bg-[#65C938]";
        el.appendChild(inner);

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([zone.lon, zone.lat])
          .addTo(map);

        markerRef.current = marker;
      });

      mapRef.current = map;

      return () => {
        map.remove();
        mapRef.current = null;
      };
    } catch (err) {
      console.warn("MapLibre GL failed to initialize in container", err);
    }
  }, [zone.lat, zone.lon]);

  // Update center when zone changes
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      mapRef.current.flyTo({
        center: [zone.lon, zone.lat],
        zoom: 12.5,
        essential: true,
      });
      if (markerRef.current) {
        markerRef.current.setLngLat([zone.lon, zone.lat]);
      }
    }
  }, [zone.lat, zone.lon, mapLoaded]);

  return (
    <div className="relative w-full h-[185px] rounded-[22px] overflow-hidden shadow-[0_4px_18px_rgba(18,43,30,0.04)] border border-[#E2ECE3]/80 bg-[#E8F0E9]">
      {/* MapLibre WebGL Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Floating Action Pill: "See Maps" */}
      <button
        onClick={onOpenFullMap}
        className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E2ECE3] shadow-sm text-xs font-bold text-[#14211A] flex items-center gap-1.5 hover:bg-white transition-all active:scale-95"
      >
        <MapPin size={12} className="text-[#1F513A]" />
        <span>{lang === "en" ? "Satellite Map" : "স্যাটেলাইট মানচিত্র"}</span>
      </button>

      {/* Top Floating Plus Inspect Button */}
      <button
        aria-label="Inspect Plot"
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md border border-[#E2ECE3] shadow-sm flex items-center justify-center text-[#14211A] hover:bg-white transition-all active:scale-95"
      >
        <Plus size={14} />
      </button>

      {/* Floating Center Plot Tooltip Badge (Direct from Reference Design) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 max-w-[90%] px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2ECE3] shadow-md text-center pointer-events-none">
        <p className="text-[11px] font-bold text-[#14211A] whitespace-nowrap">
          {lang === "en"
            ? `Plot #12: Root Moisture ${moisturePercent}% | Shift Recommended`
            : `প্লট #১২: আর্দ্রতা ${moisturePercent}% | ফসল পরিবর্তন আবশ্যক`}
        </p>
      </div>
    </div>
  );
};
