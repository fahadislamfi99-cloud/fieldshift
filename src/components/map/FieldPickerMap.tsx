"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe, Map as MapIcon, Maximize2, Minimize2 } from "lucide-react";
import * as maplibregl from "maplibre-gl";

export interface FieldCoordinates {
  lng: number;
  lat: number;
}

interface FieldPickerMapProps {
  onSelect: (coords: FieldCoordinates) => void;
  focus?: { lng: number; lat: number; seq: number } | null;
  lang: "en" | "bn";
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

type MLStyle = NonNullable<maplibregl.MapOptions["style"]>;

const SATELLITE_STYLE: MLStyle = {
  version: 8,
  glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
  sources: {
    esri: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
    },
    openmaptiles: {
      type: "vector",
      url: "https://tiles.openfreemap.org/planet",
    },
  },
  layers: [
    { id: "satellite", type: "raster", source: "esri" },

    // Roads
    {
      id: "road-major-casing",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["match", ["get", "class"], ["motorway", "trunk", "primary"], true, false],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "rgba(0,0,0,0.35)",
        "line-width": ["interpolate", ["linear"], ["zoom"], 5, 1.2, 12, 3.5, 18, 7],
      },
    },
    {
      id: "road-major",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["match", ["get", "class"], ["motorway", "trunk", "primary"], true, false],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": [
          "match",
          ["get", "class"],
          "motorway",
          "#FFD54F",
          "trunk",
          "#FFD54F",
          "#FFFFFF",
        ],
        "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0.8, 12, 2.4, 18, 5],
      },
    },
    {
      id: "road-medium",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["match", ["get", "class"], ["secondary", "tertiary"], true, false],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#FFFFFF",
        "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.6, 13, 1.4, 18, 2.6],
        "line-opacity": 0.9,
      },
    },
    {
      id: "road-minor",
      type: "line",
      source: "openmaptiles",
      "source-layer": "transportation",
      filter: ["match", ["get", "class"], ["minor", "service"], true, false],
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#F5F5F5",
        "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.4, 16, 1.2],
        "line-opacity": 0.7,
      },
    },

    // Road names
    {
      id: "road-labels",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "transportation_name",
      minzoom: 11,
      filter: [
        "match",
        ["get", "class"],
        ["motorway", "trunk", "primary", "secondary", "tertiary"],
        true,
        false,
      ],
      layout: {
        "symbol-placement": "line",
        "text-field": ["coalesce", ["get", "name:latin"], ["get", "name"]],
        "text-font": ["Noto Sans Regular"],
        "text-size": 11,
        "text-letter-spacing": 0.05,
      },
      paint: {
        "text-color": "#FFFFFF",
        "text-halo-color": "rgba(0,0,0,0.6)",
        "text-halo-width": 1.2,
      },
    },

    // Place names
    {
      id: "place-country",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 2,
      filter: ["==", ["get", "class"], "country"],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name:latin"], ["get", "name"]],
        "text-font": ["Noto Sans Bold"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 2, 11, 6, 15],
        "text-transform": "uppercase",
        "text-letter-spacing": 0.08,
      },
      paint: {
        "text-color": "#FFFFFF",
        "text-halo-color": "rgba(0,0,0,0.6)",
        "text-halo-width": 1.4,
      },
    },
    {
      id: "place-state",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 4,
      filter: ["==", ["get", "class"], "state"],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name:latin"], ["get", "name"]],
        "text-font": ["Noto Sans Regular"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 4, 10, 8, 13],
        "text-transform": "uppercase",
      },
      paint: {
        "text-color": "#FFFFFF",
        "text-halo-color": "rgba(0,0,0,0.55)",
        "text-halo-width": 1.3,
      },
    },
    {
      id: "place-city",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 4,
      filter: ["==", ["get", "class"], "city"],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name:latin"], ["get", "name"]],
        "text-font": ["Noto Sans Bold"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 4, 10, 8, 14, 14, 16],
      },
      paint: {
        "text-color": "#FFFFFF",
        "text-halo-color": "rgba(0,0,0,0.55)",
        "text-halo-width": 1.3,
      },
    },
    {
      id: "place-town",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 7,
      filter: ["==", ["get", "class"], "town"],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name:latin"], ["get", "name"]],
        "text-font": ["Noto Sans Regular"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 7, 10, 12, 14],
      },
      paint: {
        "text-color": "#FFFFFF",
        "text-halo-color": "rgba(0,0,0,0.55)",
        "text-halo-width": 1.2,
      },
    },
    {
      id: "place-village",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 9,
      filter: ["==", ["get", "class"], "village"],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name:latin"], ["get", "name"]],
        "text-font": ["Noto Sans Regular"],
        "text-size": ["interpolate", ["linear"], ["zoom"], 9, 9, 14, 13],
      },
      paint: {
        "text-color": "#FFFFFF",
        "text-halo-color": "rgba(0,0,0,0.5)",
        "text-halo-width": 1.1,
      },
    },
    {
      id: "place-other",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "place",
      minzoom: 11,
      filter: [
        "match",
        ["get", "class"],
        ["city", "continent", "country", "state", "town", "village"],
        false,
        true,
      ],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name:latin"], ["get", "name"]],
        "text-font": ["Noto Sans Regular"],
        "text-size": 10,
      },
      paint: {
        "text-color": "#F5F5F5",
        "text-halo-color": "rgba(0,0,0,0.5)",
        "text-halo-width": 1,
      },
    },

    // Water body names
    {
      id: "water-labels",
      type: "symbol",
      source: "openmaptiles",
      "source-layer": "water_name",
      minzoom: 6,
      filter: ["match", ["get", "class"], ["lake", "sea", "ocean", "river"], true, false],
      layout: {
        "text-field": ["coalesce", ["get", "name_en"], ["get", "name:latin"], ["get", "name"]],
        "text-font": ["Noto Sans Italic"],
        "text-size": 11,
      },
      paint: {
        "text-color": "#BFE3F7",
        "text-halo-color": "rgba(0,0,0,0.5)",
        "text-halo-width": 1,
      },
    },
  ],
};

const DEFAULT_CENTER: [number, number] = [89.5, 23.0];

export const FieldPickerMap: React.FC<FieldPickerMapProps> = ({
  onSelect,
  focus,
  lang,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const onSelectRef = useRef(onSelect);
  const [projection, setProjection] = useState<"globe" | "mercator">("globe");

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!containerRef.current) return;

    maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: SATELLITE_STYLE,
      center: DEFAULT_CENTER,
      zoom: 1.8,
      attributionControl: false,
    });

    map.on("load", () => {
      map.setProjection({ type: "globe" });
      const pulse = document.createElement("div");
      pulse.className = "w-6 h-6 rounded-full bg-[#1E7B48]/25 animate-ping absolute inset-0";
      const pin = document.createElement("div");
      pin.className =
        "relative w-6 h-6 rounded-full bg-[#1E7B48] border-[3px] border-white shadow-lg cursor-grab flex items-center justify-center";
      pin.appendChild(pulse);
      const inner = document.createElement("div");
      inner.className = "w-2 h-2 rounded-full bg-[#65C938]";
      pin.appendChild(inner);

      const marker = new maplibregl.Marker({
        element: pin,
        draggable: true,
        anchor: "center",
      });
      marker.on("dragend", () => {
        const ll = marker.getLngLat();
        onSelectRef.current({ lng: ll.lng, lat: ll.lat });
      });
      markerRef.current = marker;
    });

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      markerRef.current?.setLngLat([lng, lat]);
      onSelectRef.current({ lng, lat });
    });

    mapRef.current = map;

    const ro = new ResizeObserver(() => map.resize());
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // React to search selection (external focus) by flying + dropping the pin
  useEffect(() => {
    if (!focus || !mapRef.current) return;
    const map = mapRef.current;
    markerRef.current?.setLngLat([focus.lng, focus.lat]);
    map.flyTo({
      center: [focus.lng, focus.lat],
      zoom: Math.max(map.getZoom(), 11),
      essential: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.seq]);

  const toggleProjection = () => {
    const next = projection === "globe" ? "mercator" : "globe";
    setProjection(next);
    mapRef.current?.setProjection({ type: next });
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Bottom-right controls: fullscreen + projection toggle */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
        <button
          type="button"
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-sm flex items-center justify-center text-stone-700 hover:bg-white transition-all active:scale-95"
        >
          {isFullscreen ? (
            <Minimize2 size={14} className="text-[#1E7B48]" />
          ) : (
            <Maximize2 size={14} className="text-[#1E7B48]" />
          )}
        </button>

        <button
          type="button"
          onClick={toggleProjection}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-sm text-xs font-bold text-stone-800 hover:bg-white transition-all active:scale-95"
          title={projection === "globe" ? "Switch to flat map" : "Switch to globe"}
        >
          {projection === "globe" ? (
            <MapIcon size={13} className="text-[#1E7B48]" />
          ) : (
            <Globe size={13} className="text-[#1E7B48]" />
          )}
          <span>
            {projection === "globe"
              ? lang === "en" ? "Flat Map" : "সমতল মানচিত্র"
              : lang === "en" ? "Globe" : "গ্লোব"}
          </span>
        </button>
      </div>

      <div className="absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-[10px] font-medium text-white/80 pointer-events-none">
        Imagery © Esri, Maxar, Earthstar Geographics
      </div>
    </div>
  );
};
