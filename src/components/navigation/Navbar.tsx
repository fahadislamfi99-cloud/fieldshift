"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
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
  Orbit,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentZone, zones, setZoneId, lang, setLang } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "/",
      labelEn: "Mission HUD",
      labelBn: "মিশন কন্ট্রোল",
      icon: LayoutDashboard,
    },
    {
      href: "/shift",
      labelEn: "The Crop Shift",
      labelBn: "ফসল রূপান্তর",
      icon: Sprout,
    },
    {
      href: "/calendar",
      labelEn: "Dynamic Calendar",
      labelBn: "সময়সূচী পরিবর্তন",
      icon: Calendar,
    },
    {
      href: "/satellite",
      labelEn: "NASA Telemetry",
      labelBn: "উপগ্রহ উপাত্ত",
      icon: Satellite,
    },
    {
      href: "/advisory",
      labelEn: "Field Directives",
      labelBn: "কৃষক বার্তা",
      icon: BookOpen,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080D0B]/85 backdrop-blur-xl border-b border-emerald-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/60 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-all">
                <Orbit size={20} className="animate-spin-slow" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  FieldShift
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold uppercase tracking-wider">
                    NASA Space Apps
                  </span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">
                  Adapting Farms with Earth Science
                </span>
              </div>
            </Link>

            {/* Live Telemetry Pulse Badge */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ORBITAL LINK ACTIVE • NASA POWER</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-900/60 p-1 rounded-xl border border-emerald-500/15">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)] font-bold"
                      : "text-stone-400 hover:text-white hover:bg-stone-800/50"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-emerald-400" : "text-stone-500"} />
                  <span>{lang === "en" ? link.labelEn : link.labelBn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Controls (Region, Language) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Region Selector */}
            <div className="relative">
              <select
                value={currentZone.id}
                onChange={(e) => setZoneId(e.target.value)}
                className="appearance-none pl-7 pr-7 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-850 border border-emerald-500/20 text-xs font-mono font-bold text-stone-200 cursor-pointer focus:outline-none focus:border-emerald-400/50 transition-all"
                title="Select Region"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id} className="bg-stone-950 text-white">
                    {lang === "en" ? z.nameEn : z.nameBn}
                  </option>
                ))}
              </select>
              <MapPin size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none" />
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-850 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400 transition-colors"
              title="Toggle Language"
            >
              <Globe2 size={13} />
              <span>{lang === "en" ? "বাংলা" : "EN"}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-500/20 bg-stone-950/95 px-4 pt-2 pb-4 space-y-1 shadow-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold ${
                  isActive
                    ? "bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold"
                    : "text-stone-300 hover:bg-stone-900"
                }`}
              >
                <Icon size={16} className={isActive ? "text-emerald-400" : "text-stone-500"} />
                <span>{lang === "en" ? link.labelEn : link.labelBn}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
