"use client";

import React from "react";
import { Home, Sprout, Calendar, Satellite, Lightbulb } from "lucide-react";

export type NavTab = "home" | "crop_shift" | "calendar" | "nasa_data" | "advisory";

interface BottomDockProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  lang: "en" | "bn";
}

export const BottomDock: React.FC<BottomDockProps> = ({
  activeTab,
  onTabChange,
  lang,
}) => {
  const tabs = [
    {
      id: "home" as NavTab,
      labelEn: "Home",
      labelBn: "হোম",
      icon: Home,
    },
    {
      id: "crop_shift" as NavTab,
      labelEn: "Crop Shift",
      labelBn: "ফসল",
      icon: Sprout,
    },
    {
      id: "calendar" as NavTab,
      labelEn: "Calendar",
      labelBn: "সময়সূচী",
      icon: Calendar,
    },
    {
      id: "nasa_data" as NavTab,
      labelEn: "NASA Data",
      labelBn: "উপগ্রহ",
      icon: Satellite,
    },
    {
      id: "advisory" as NavTab,
      labelEn: "Advisory",
      labelBn: "পরামর্শ",
      icon: Lightbulb,
    },
  ];

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[420px] bg-white/95 backdrop-blur-lg rounded-full py-2 px-3 shadow-[0_8px_30px_rgba(18,43,30,0.12)] border border-[#E2ECE3]/90 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-0.5 px-2.5 rounded-full transition-all duration-200 active:scale-95 ${
              isActive
                ? "text-[#1F513A]"
                : "text-[#87998F] hover:text-[#576B5F]"
            }`}
          >
            <div
              className={`p-1 rounded-full transition-colors ${
                isActive ? "bg-[#E7F6E1]" : "bg-transparent"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
            </div>
            <span
              className={`text-[10px] mt-0.5 tracking-tight ${
                isActive ? "font-bold text-[#1F513A]" : "font-medium"
              }`}
            >
              {lang === "en" ? tab.labelEn : tab.labelBn}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
