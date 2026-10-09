"use client";

import React, { useEffect, useRef, useState } from "react";
import { ZoneProfile } from "@/types/climate";
import { Crosshair, Radar, Satellite, ExternalLink } from "lucide-react";
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

    // High-resolution satellite Earth observation imagery via Esri World Imagery
    const satelliteStyle: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        "esri-satellite": {
          type: "raster",
          tiles: [
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          ],
          tileSize: 256,
          attribution: "Esri / NASA Earth Observation",
        },
      },
      layers: [
        {
          id: "satellite-layer",
          type: "raster",
          source: "esri-satellite",
          minzoom: 0,
          maxzoom: 19,
          paint: {
            // Subtle cinematic contrast enhancement for orbital mission feel
            "raster-contrast": 0.15,
            "raster-brightness-max": 0.9,
          },
        },
      ],
    };

    try {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: satelliteStyle,
        center: [zone.lon, zone.lat],
        zoom: 13,
        attributionControl: false,
        interactive: true,
      });

      map.on("load", () => {
        setMapLoaded(true);

        // Pulsing tactical radar crosshair marker
        const el = document.createElement("div");
        el.className = "relative flex items-center justify-center cursor-pointer";

        // Outer radar pulse
        const ping = document.createElement("div");
        ping.className = "absolute w-10 h-10 rounded-full bg-emerald-400/40 animate-ping";
        el.appendChild(ping);

        // Circular reticle
        const reticle = document.createElement("div");
        reticle.className = "absolute w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 shadow-[0_0_12px_#10B981]";
        el.appendChild(reticle);

        // Target core
        const core = document.createElement("div");
        core.className = "w-3 h-3 rounded-full bg-emerald-400 border-2 border-black shadow-[0_0_10px_#34D399]";
        el.appendChild(core);

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
      console.warn("Satellite map failed to initialize", err);
    }
  }, [zone.lat, zone.lon]);

  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      mapRef.current.flyTo({
        center: [zone.lon, zone.lat],
        zoom: 13,
        essential: true,
      });
      if (markerRef.current) {
        markerRef.current.setLngLat([zone.lon, zone.lat]);
      }
    }
  }, [zone.lat, zone.lon, mapLoaded]);

  return (
    <div className="relative w-full h-[280px] rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#060908] shadow-2xl">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Orbital Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30" />

      {/* Top Left: Orbital Coordinate Telemetry Pill */}
      <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-400 flex items-center gap-2 shadow-lg">
        <Crosshair size={13} className="text-emerald-400 animate-spin-slow" />
        <span>
          {zone.lat.toFixed(4)}°N • {zone.lon.toFixed(4)}°E
        </span>
      </div>

      {/* Top Right: Sensor HUD */}
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/[0.1] text-[10px] font-mono text-stone-300 flex items-center gap-1.5 shadow-lg">
        <Satellite size={12} className="text-emerald-400 animate-pulse" />
        <span>NASA SATELLITE IMAGERY</span>
      </div>

      {/* Bottom Floating Telemetry Overlay */}
      <div className="absolute bottom-3 left-3 right-3 z-10 px-3.5 py-2.5 rounded-xl bg-black/90 backdrop-blur-md border border-emerald-500/30 flex items-center justify-between text-xs font-mono shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-stone-200 font-semibold">
            {zone.upazilaEn} Plot Cluster #12
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-stone-400">Root Moisture:</span>
          <span className="text-emerald-400 font-bold tabular-nums">
            {moisturePercent}%
          </span>
        </div>
      </div>
    </div>
  );
};
