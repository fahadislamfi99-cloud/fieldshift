"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import {
  Sprout,
  LayoutDashboard,
  Calendar,
  Satellite,
  BookOpen,
  MapPin,
  Globe2,
  Menu,
  X,
  Radio,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentZone, zones, setZoneId, lang, setLang } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "/",
      labelEn: "Overview",
      labelBn: "ড্যাশবোর্ড",
      icon: LayoutDashboard,
    },
    {
      href: "/shift",
      labelEn: "Crop Shift",
      labelBn: "ফসল পরিবর্তন",
      icon: Sprout,
    },
    {
      href: "/calendar",
      labelEn: "Dynamic Calendar",
      labelBn: "সময়সূচী",
      icon: Calendar,
    },
    {
      href: "/satellite",
      labelEn: "Satellite Data",
      labelBn: "উপগ্রহ ডেটা",
      icon: Satellite,
    },
    {
      href: "/advisory",
      labelEn: "Advisory",
      labelBn: "পরামর্শ",
      icon: BookOpen,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#163B2A] flex items-center justify-center text-[#65C938] shadow-xs group-hover:scale-105 transition-transform">
                <Sprout size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-stone-900 tracking-tight flex items-center gap-1.5">
                  CropSafe
                  <span className="text-xs px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-600 font-semibold uppercase">
                    NASA Space Apps
                  </span>
                </span>
                <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                  Adapting Farms with NASA Data
                </span>
              </div>
            </Link>

            {/* Live Telemetry Pulse Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>NASA POWER LIVE</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#163B2A] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-[#65C938]" : "text-stone-400"} />
                  <span>{lang === "en" ? link.labelEn : link.labelBn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Controls (Region, Language) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Region Selector */}
            <CustomSelect
              variant="compact"
              align="right"
              value={currentZone.id}
              onChange={(val) => setZoneId(val)}
              options={zones.map((z) => ({
                value: z.id,
                label: lang === "en" ? z.nameEn.split(",")[0] : z.nameBn.split(",")[0],
                sublabel: lang === "en" ? `${z.districtEn} District` : `${z.districtEn} জেলা`,
                badge: z.id.includes("barind") ? (lang === "en" ? "Barind" : "বরেন্দ্র") : (lang === "en" ? "Coastal" : "উপকূলীয়"),
              }))}
              icon={<MapPin size={13} className="text-[#1E7B48]" />}
              placeholder={lang === "en" ? "Select Region" : "এলাকা নির্বাচন"}
            />

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-sm font-bold text-stone-700 transition-colors"
              title="Toggle Language"
            >
              <Globe2 size={13} className="text-stone-500" />
              <span>{lang === "en" ? "বাংলা" : "EN"}</span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive
                    ? "bg-[#163B2A] text-white"
                    : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                <Icon size={16} className={isActive ? "text-[#65C938]" : "text-stone-500"} />
                <span>{lang === "en" ? link.labelEn : link.labelBn}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
