"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
}

interface CustomSelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  subtextPlaceholder?: string;
  icon?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
  align?: "left" | "right";
  direction?: "auto" | "down" | "up";
  variant?: "card" | "compact" | "tile";
  menuWidth?: string;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  subtextPlaceholder,
  icon,
  isOpen,
  onToggle,
  onClose,
  align = "left",
  direction = "auto",
  variant = "card",
  menuWidth,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);

  const isControlled = typeof isOpen === "boolean";
  const effectiveOpen = isControlled ? isOpen : internalOpen;

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  const handleClose = () => {
    if (isControlled && onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  // Auto-detect whether to open upward or downward based on viewport space
  useEffect(() => {
    if (!effectiveOpen || !containerRef.current) return;
    if (direction === "up") {
      setOpenUpward(true);
      return;
    }
    if (direction === "down") {
      setOpenUpward(false);
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    if (spaceBelow < 250 && rect.top > 250) {
      setOpenUpward(true);
    } else {
      setOpenUpward(false);
    }
  }, [effectiveOpen, direction]);

  useEffect(() => {
    if (!effectiveOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [effectiveOpen]);

  const selectedOption = options.find((o) => o.value === value);

  const isFullWidth = className.includes("w-full") || variant !== "compact";

  return (
    <div
      ref={containerRef}
      className={`relative ${isFullWidth ? "w-full" : "inline-block"}`}
    >
      {/* =========================================================================
          VARIANT 1: CARD (For Home Page Field Configuration)
          ========================================================================= */}
      {variant === "card" && (
        <button
          type="button"
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={effectiveOpen}
          className={`w-full text-left p-3.5 rounded-2xl transition-all flex flex-col justify-between min-h-[92px] group cursor-pointer ${
            effectiveOpen
              ? "bg-white border-2 border-[#1E7B48] ring-4 ring-[#1E7B48]/10 shadow-sm"
              : value
              ? "bg-stone-50/90 hover:bg-white border border-stone-200/90 hover:border-emerald-500/80 hover:shadow-xs"
              : "bg-stone-50/60 hover:bg-white border-2 border-stone-300 border-dashed hover:border-emerald-400"
          } ${className}`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              {icon}
              {label && <span>{label}</span>}
            </span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-200 ${
                effectiveOpen
                  ? "bg-emerald-100 text-[#1E7B48] rotate-180"
                  : "bg-stone-200/70 text-stone-500 group-hover:bg-emerald-100 group-hover:text-[#1E7B48]"
              }`}
            >
              <ChevronDown size={12} />
            </div>
          </div>

          <div className="mt-1 w-full">
            <div
              className={`text-sm leading-tight truncate ${
                selectedOption
                  ? "font-bold text-stone-900 group-hover:text-[#1E7B48]"
                  : "font-semibold text-stone-400 italic"
              }`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </div>
            <div className="text-[11px] font-medium text-stone-500 mt-0.5 leading-tight truncate">
              {selectedOption?.sublabel || subtextPlaceholder || ""}
            </div>
          </div>
        </button>
      )}

      {/* =========================================================================
          VARIANT 2: COMPACT (For Navbar and Quick Switchers)
          ========================================================================= */}
      {variant === "compact" && (
        <button
          type="button"
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={effectiveOpen}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer border ${
            effectiveOpen
              ? "bg-white border-[#1E7B48] ring-3 ring-[#1E7B48]/10 shadow-xs text-stone-900"
              : "bg-stone-100 hover:bg-stone-150 border-stone-200 text-stone-800 hover:border-emerald-400/60 shadow-2xs"
          } ${className}`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {icon && <span className="shrink-0">{icon}</span>}
            <span className="text-xs sm:text-sm font-semibold truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDown
            size={13}
            className={`shrink-0 text-stone-400 transition-transform duration-200 ${
              effectiveOpen ? "rotate-180 text-[#1E7B48]" : ""
            }`}
          />
        </button>
      )}

      {/* =========================================================================
          VARIANT 3: TILE (For AppShell Sidebar Card)
          ========================================================================= */}
      {variant === "tile" && (
        <button
          type="button"
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={effectiveOpen}
          className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between cursor-pointer border ${
            effectiveOpen
              ? "bg-white border-[#1E7B48] ring-3 ring-[#1E7B48]/10 shadow-xs"
              : "bg-white hover:bg-stone-50 border-stone-200/90 shadow-2xs hover:border-emerald-300"
          } ${className}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {icon}
            <div className="min-w-0">
              <div className="text-sm font-bold text-stone-900 leading-tight truncate">
                {selectedOption ? selectedOption.label : placeholder}
              </div>
              <div className="text-xs text-stone-600 font-medium truncate mt-0.5">
                {selectedOption?.sublabel || subtextPlaceholder || ""}
              </div>
            </div>
          </div>
          <ChevronDown
            size={14}
            className={`shrink-0 text-stone-400 transition-transform duration-200 ${
              effectiveOpen ? "rotate-180 text-[#1E7B48]" : ""
            }`}
          />
        </button>
      )}

      {/* =========================================================================
          PREMIUM FLOATING POPOVER MENU (Collision-aware & Boundary-safe)
          ========================================================================= */}
      {effectiveOpen && (
        <div
          role="listbox"
          className={`absolute ${
            openUpward
              ? "bottom-[calc(100%+8px)] origin-bottom"
              : "top-[calc(100%+8px)] origin-top"
          } z-50 ${
            menuWidth === "w-full"
              ? "w-full left-0 right-0"
              : menuWidth
              ? menuWidth
              : variant === "compact"
              ? "w-64 sm:w-72"
              : "w-72 sm:w-80"
          } max-w-[calc(100vw-2rem)] bg-white/98 backdrop-blur-md border border-stone-200/90 shadow-[0_20px_48px_rgba(0,0,0,0.14),0_4px_14px_rgba(0,0,0,0.05)] rounded-2xl p-1.5 space-y-1 max-h-64 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-150 ${
            menuWidth === "w-full" ? "" : align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  handleClose();
                }}
                className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 text-left group ${
                  isSelected
                    ? "bg-[#F0FDF4] border border-emerald-200/80 text-[#15803D] font-semibold"
                    : "hover:bg-stone-50 border border-transparent text-stone-800"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm leading-snug ${
                        isSelected ? "font-bold text-[#15803D]" : "font-medium group-hover:text-[#1E7B48]"
                      }`}
                    >
                      {opt.label}
                    </span>
                    {opt.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] shrink-0 border border-emerald-200/60">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {opt.sublabel && (
                    <div className="text-[11px] text-stone-500 font-normal mt-0.5 leading-snug">
                      {opt.sublabel}
                    </div>
                  )}
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#1E7B48] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check size={11} strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
