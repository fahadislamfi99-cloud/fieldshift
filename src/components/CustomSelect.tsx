"use client";

import React, { useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder: string;
  subtextPlaceholder?: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  align?: "left" | "right";
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder,
  subtextPlaceholder,
  icon,
  isOpen,
  onToggle,
  onClose,
  align = "left",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button Card */}
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full text-left p-3.5 rounded-2xl transition-all flex flex-col justify-between min-h-[92px] group cursor-pointer ${
          isOpen
            ? "bg-white border-2 border-[#1E7B48] ring-4 ring-[#1E7B48]/10 shadow-sm"
            : value
            ? "bg-stone-50/90 hover:bg-white border border-stone-200/90 hover:border-emerald-500/80 hover:shadow-xs"
            : "bg-stone-50/60 hover:bg-white border-2 border-stone-300 border-dashed hover:border-emerald-400"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
            {icon}
            <span>{label}</span>
          </span>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-200 ${
              isOpen
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

      {/* Floating Dropdown Menu (Comfortable width & align positioning) */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute top-[calc(100%+8px)] z-50 w-72 sm:w-80 max-w-[calc(100vw-3rem)] bg-white border border-stone-200/90 shadow-[0_20px_48px_rgba(0,0,0,0.18)] rounded-2xl p-1.5 space-y-1 max-h-64 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-150 ${
            align === "right" ? "right-0" : "left-0"
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
                  onClose();
                }}
                className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 text-left group ${
                  isSelected
                    ? "bg-emerald-50/90 text-[#1E7B48] font-semibold"
                    : "hover:bg-stone-100/80 text-stone-800"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm leading-snug ${
                        isSelected ? "font-bold text-[#1E7B48]" : "font-medium group-hover:text-[#1E7B48]"
                      }`}
                    >
                      {opt.label}
                    </span>
                    {opt.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-[#15803D] shrink-0">
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
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#1E7B48] flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={2.5} />
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
