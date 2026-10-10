"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { CustomSelect } from "@/components/CustomSelect";
import {
  Home,
  Calendar,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sprout,
  Leaf,
  MoreHorizontal,
  Globe,
} from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const { currentZone, zones, setZoneId, lang, setLang } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { href: "/", labelEn: "Home", labelBn: "হোম", icon: Home },
    { href: "/shift", labelEn: "Recommendations", labelBn: "পরামর্শ ও বিকল্প", icon: Sprout },
    { href: "/calendar", labelEn: "Calendar", labelBn: "ক্যালেন্ডার", icon: Calendar },
    { href: "/advisory", labelEn: "Advisory", labelBn: "পরামর্শ", icon: Bell },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle body scroll lock & Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen flex bg-[#F4F6F8] text-stone-900 font-sans antialiased">
      {/* =========================================================================
          DESKTOP SIDEBAR (Exact match to target design)
          ========================================================================= */}
      <aside className="hidden xl:flex flex-col w-64 bg-white border-r border-stone-200/90 p-5 justify-between shrink-0 sticky top-0 h-screen overflow-y-auto z-40 shadow-[1px_0_4px_rgba(0,0,0,0.02)]">
        <div className="space-y-6">
          {/* Logo & Subtitle */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#236B43] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <Leaf size={22} className="fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#163B2A] tracking-tight leading-none">
                CropSafe
              </h1>
              <p className="text-xs font-medium text-stone-600 mt-1">
                {lang === "en" ? "Smarter Farms. Stronger Futures." : "স্মার্ট কৃষি। নিরাপদ ভবিষ্যৎ।"}
              </p>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-[#E8F5E9] text-[#1B5E20] font-bold"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  <Icon
                    size={18}
                    className={active ? "text-[#2E7D32]" : "text-stone-500"}
                  />
                  <span>{lang === "en" ? item.labelEn : item.labelBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Cards */}
        <div className="space-y-3 pt-6 pb-2 border-t border-stone-100">
          {/* Bangladesh Region Selector Card */}
          <CustomSelect
            variant="tile"
            value={currentZone.id}
            onChange={(val) => setZoneId(val)}
            options={zones.map((z) => ({
              value: z.id,
              label: lang === "en" ? z.nameEn : z.nameBn,
              sublabel: lang === "en" ? `${z.districtEn} District` : `${z.districtEn} জেলা`,
              badge: z.id.includes("barind") ? (lang === "en" ? "Barind" : "বরেন্দ্র") : (lang === "en" ? "Coastal" : "উপকূলীয়"),
            }))}
            icon={
              <div className="w-7 h-5 rounded bg-[#006A4E] relative overflow-hidden flex items-center justify-center shadow-2xs shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#F42A41]" />
              </div>
            }
            placeholder={lang === "en" ? "Bangladesh" : "বাংলাদেশ"}
            subtextPlaceholder={lang === "en" ? currentZone.nameEn : currentZone.nameBn}
            menuWidth="w-full"
            direction="up"
          />

          {/* NASA Earth Data Brand Card with Arrow */}
          <Link
            href="/shift"
            className="p-3.5 rounded-2xl bg-[#F6FAF6] border border-emerald-100/80 flex items-center justify-between hover:bg-emerald-50/60 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-2xs shrink-0 border border-emerald-100">
                <Sprout size={18} />
              </div>
              <div>
                <div className="text-sm font-bold text-[#163B2A] leading-tight">
                  {lang === "en" ? "NASA Earth Data" : "নাসা উপগ্রহ ডেটা"}
                </div>
                <div className="text-xs text-stone-600 mt-0.5 font-medium">
                  {lang === "en"
                    ? "Real Climate Insights. Better Farm Decisions."
                    : "রিয়েল-টাইম তথ্য ও সঠিক কৃষি সিদ্ধান্ত।"}
                </div>
              </div>
            </div>
            <ChevronRight
              size={14}
              className="text-stone-400 group-hover:text-emerald-700 transition-colors shrink-0"
            />
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          MAIN APPLICATION VIEWPORT
          ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#F4F6F8]/95 backdrop-blur-md px-3 sm:px-6 xl:px-8 py-2.5 sm:py-3.5 flex items-center justify-between border-b border-stone-200/70">
          {/* Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
              className={`p-2 rounded-xl border text-stone-700 shadow-2xs transition-all duration-200 ${
                mobileMenuOpen
                  ? "bg-emerald-50 border-emerald-300 text-[#1E7B48] rotate-90"
                  : "bg-white border-stone-200 hover:bg-stone-50"
              }`}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#236B43] flex items-center justify-center text-white">
                <Leaf size={15} />
              </div>
              <span className="font-extrabold text-stone-900 text-base sm:text-lg tracking-tight">CropSafe</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center flex-1 max-w-md mx-2 xl:mx-0">
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "Search location, upazila, or coordinates..."
                    : "অবস্থান, উপজেলা বা এলাকা খুঁজুন..."
                }
                className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-stone-200/90 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Right Header: Language Switcher, Notification Bell & Officer Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Language Switcher Pill */}
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white border border-stone-200/90 text-[11px] sm:text-xs font-semibold text-stone-700 hover:text-stone-900 shadow-2xs transition-all hover:border-emerald-400"
              title="Toggle English / বাংলা"
            >
              <Globe size={13} className="text-[#1E7B48]" />
              <span className="font-semibold">{lang === "en" ? "বাং / BN" : "EN"}</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              aria-label="Notifications"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-stone-200/90 flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-2xs transition-colors relative"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* Field Officer Profile Card */}
            <div className="flex items-center gap-2 pl-1.5 sm:pl-2 py-1 pr-2 sm:pr-3 rounded-full bg-white border border-stone-200/90 shadow-2xs">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                <img
                  src="/images/officer_avatar.jpg"
                  alt="Farmer Support Officer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-bold text-stone-900 leading-tight">
                  {lang === "en" ? "Farmer Support" : "কৃষক সহায়তা"}
                </div>
                <div className="text-xs text-stone-600 font-medium">
                  {lang === "en" ? "Field Officer" : "মাঠ কর্মকর্তা"}
                </div>
              </div>
              <ChevronDown size={14} className="text-stone-500 hidden md:block" />
            </div>
          </div>
        </header>

        {/* =========================================================================
            MOBILE / TABLET SLIDEOUT DRAWER (Smooth, Professional & Premium)
            ========================================================================= */}
        {/* Backdrop Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
          className={`xl:hidden fixed inset-0 bg-stone-900/50 backdrop-blur-xs z-50 transition-opacity duration-300 ease-in-out ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Slideout Navigation Panel */}
        <aside
          aria-label="Mobile Navigation Drawer"
          className={`xl:hidden fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-5 space-y-6 overflow-y-auto flex-1">
            {/* Header: Logo, Tagline & Close Button */}
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#236B43] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <Leaf size={22} className="fill-white" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-[#163B2A] tracking-tight leading-none">
                    CropSafe
                  </h2>
                  <p className="text-xs font-medium text-stone-600 mt-1">
                    {lang === "en" ? "Smarter Farms. Stronger Futures." : "স্মার্ট কৃষি। নিরাপদ ভবিষ্যৎ।"}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
                className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors shadow-2xs"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-1.5 pt-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? "bg-[#E8F5E9] text-[#1B5E20] font-bold shadow-2xs"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={active ? "text-[#2E7D32]" : "text-stone-500"}
                      />
                      <span>{lang === "en" ? item.labelEn : item.labelBn}</span>
                    </div>
                    {active && (
                      <div className="w-1.5 h-4 rounded-full bg-[#2E7D32]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Region Selector */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
                {lang === "en" ? "Select Region" : "অঞ্চল নির্বাচন"}
              </div>
              <CustomSelect
                variant="tile"
                value={currentZone.id}
                onChange={(val) => {
                  setZoneId(val);
                  setMobileMenuOpen(false);
                }}
                options={zones.map((z) => ({
                  value: z.id,
                  label: lang === "en" ? z.nameEn : z.nameBn,
                  sublabel: lang === "en" ? `${z.districtEn} District` : `${z.districtEn} জেলা`,
                  badge: z.id.includes("barind")
                    ? (lang === "en" ? "Barind" : "বরেন্দ্র")
                    : (lang === "en" ? "Coastal" : "উপকূলীয়"),
                }))}
                icon={
                  <div className="w-7 h-5 rounded bg-[#006A4E] relative overflow-hidden flex items-center justify-center shadow-2xs shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#F42A41]" />
                  </div>
                }
                placeholder={lang === "en" ? "Bangladesh" : "বাংলাদেশ"}
                subtextPlaceholder={lang === "en" ? currentZone.nameEn : currentZone.nameBn}
                menuWidth="w-full"
                direction="down"
              />
            </div>

            {/* NASA Earth Data Brand Card */}
            <Link
              href="/shift"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3.5 rounded-2xl bg-[#F6FAF6] border border-emerald-100/80 flex items-center justify-between hover:bg-emerald-50/60 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-2xs shrink-0 border border-emerald-100">
                  <Sprout size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#163B2A] leading-tight">
                    {lang === "en" ? "NASA Earth Data" : "নাসা উপগ্রহ ডেটা"}
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5 font-medium">
                    {lang === "en"
                      ? "Real Climate Insights"
                      : "রিয়েল-টাইম আবহাওয়া তথ্য"}
                  </div>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-stone-400 group-hover:text-emerald-700 transition-colors shrink-0"
              />
            </Link>
          </div>

          {/* Drawer Footer: Officer info & Language toggle */}
          <div className="p-4 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                <img
                  src="/images/officer_avatar.jpg"
                  alt="Farmer Support Officer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 leading-tight">
                  {lang === "en" ? "Farmer Support" : "কৃষক সহায়তা"}
                </div>
                <div className="text-[11px] text-stone-500 font-medium">
                  {lang === "en" ? "Field Officer" : "মাঠ কর্মকর্তা"}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-900 shadow-2xs transition-all hover:border-emerald-400"
            >
              <Globe size={13} className="text-[#1E7B48]" />
              <span>{lang === "en" ? "বাং / BN" : "EN"}</span>
            </button>
          </div>
        </aside>

        {/* Page Main Content */}
        <main className="p-3.5 sm:p-5 xl:p-7 max-w-[1560px] mx-auto w-full pb-24 xl:pb-8 min-w-0">
          {children}
        </main>

        {/* =====================================================================
            MOBILE BOTTOM NAVIGATION DOCK (5-Button Thumb-Friendly Layout)
            ===================================================================== */}
        <div className="xl:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200/90 py-2 px-2 sm:px-4 flex justify-around items-center z-50 shadow-lg">
          <Link
            href="/"
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 text-[11px] font-semibold transition-all ${
              isActive("/") ? "text-[#1E7B48] font-bold" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <Home size={18} className={isActive("/") ? "text-[#1E7B48]" : "text-stone-400"} />
            <span>{lang === "en" ? "Home" : "হোম"}</span>
          </Link>

          <Link
            href="/shift"
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 text-[11px] font-semibold transition-all ${
              isActive("/shift") ? "text-[#1E7B48] font-bold" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <Sprout size={18} className={isActive("/shift") ? "text-[#1E7B48]" : "text-stone-400"} />
            <span>{lang === "en" ? "Crops" : "পরামর্শ"}</span>
          </Link>

          <Link
            href="/calendar"
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 text-[11px] font-semibold transition-all ${
              isActive("/calendar") ? "text-[#1E7B48] font-bold" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <Calendar size={18} className={isActive("/calendar") ? "text-[#1E7B48]" : "text-stone-400"} />
            <span>{lang === "en" ? "Calendar" : "সময়সূচী"}</span>
          </Link>

          <Link
            href="/advisory"
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 text-[11px] font-semibold transition-all ${
              isActive("/advisory") ? "text-[#1E7B48] font-bold" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <Bell size={18} className={isActive("/advisory") ? "text-[#1E7B48]" : "text-stone-400"} />
            <span>{lang === "en" ? "Advisory" : "পরামর্শ"}</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 text-[11px] font-semibold transition-all ${
              mobileMenuOpen ? "text-[#1E7B48] font-bold" : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <MoreHorizontal size={18} className={mobileMenuOpen ? "text-[#1E7B48]" : "text-stone-400"} />
            <span>{lang === "en" ? "More" : "আরও"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
