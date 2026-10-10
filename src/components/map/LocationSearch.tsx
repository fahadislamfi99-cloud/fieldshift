"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { LocationSuggestion } from "@/types/nasa";

interface LocationSearchProps {
  lang: "en" | "bn";
  onPick: (suggestion: LocationSuggestion) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ lang, onPick }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 2) {
      setSuggestions([]);
      setLoading(false);
      setOpen(false);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;

    let cancelled = false;

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/field-telemetry?q=${encodeURIComponent(trimmed)}`
        );
        if (cancelled) return;
        if (!res.ok) {
          setSuggestions([]);
          setOpen(false);
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setSuggestions(data.suggestions || []);
        setOpen(true);
      } catch {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePick = (s: LocationSuggestion) => {
    setOpen(false);
    setQuery(s.displayName);
    onPick(s);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={
            lang === "en"
              ? "Search any place on Earth..."
              : "যেকোনো স্থান খুঁজুন..."
          }
          className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-[0_8px_30px_rgba(18,43,30,0.12)] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1E7B48] focus:border-transparent transition-all"
        />
        {loading && (
          <Loader2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1E7B48] animate-spin" />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-white/98 backdrop-blur-md border border-stone-200/90 shadow-[0_20px_48px_rgba(0,0,0,0.16)] rounded-2xl p-1.5 max-h-64 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-150">
          {suggestions.map((s, i) => (
            <button
              key={`${s.lat}-${s.lon}-${i}`}
              type="button"
              onClick={() => handlePick(s)}
              className="w-full text-left p-2.5 rounded-xl flex items-center gap-2.5 hover:bg-stone-50 transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#1E7B48] flex items-center justify-center shrink-0">
                <MapPin size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-stone-900 truncate group-hover:text-[#1E7B48] transition-colors">
                  {s.name || s.displayName}
                </div>
                <div className="text-[11px] text-stone-500 truncate">
                  {[s.district, s.country].filter(Boolean).join(", ")}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
