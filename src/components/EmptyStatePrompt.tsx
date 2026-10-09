"use client";

import React from "react";
import Link from "next/link";
import {
  Sprout,
  ShieldAlert,
  ArrowRight,
  Droplets,
  Flame,
  Calendar,
  CheckCircle2,
  Clock,
  Sliders,
  MapPin,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface EmptyStatePromptProps {
  pageType: "shift" | "advisory";
  lang: "en" | "bn";
}

export const EmptyStatePrompt: React.FC<EmptyStatePromptProps> = ({ pageType, lang }) => {
  const { saveUserSelection } = useApp();

  const isShift = pageType === "shift";

  const handleQuickDemo = () => {
    saveUserSelection({
      zoneId: "barind_tanore",
      cropId: "boro_rice",
      farmerStatus: isShift ? "not_planted" : "already_planted",
      waterAccess: "Deep Tubewell",
      farmAcres: 2.0,
      hasConfigured: true,
    });
  };

  return (
    <div className="space-y-6" suppressHydrationWarning>
      {/* HERO BANNER CARD */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] min-h-[380px] sm:min-h-[420px] flex flex-col justify-between">
        {/* Full Photographic Landscape Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero_landscape.jpg')` }}
        />

        {/* Soft Gradient Overlay for Optimal Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 sm:via-white/80 to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-between h-full space-y-6 max-w-2xl">
          <div className="space-y-4">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E7B48] text-xs font-bold border border-emerald-200/80 shadow-2xs">
              {isShift ? (
                <Sprout size={14} className="text-[#1E7B48]" />
              ) : (
                <ShieldAlert size={14} className="text-amber-600" />
              )}
              <span>
                {lang === "en" ? "FIRST-TIME VISIT SETUP" : "প্রথমবার ব্যবহারের নির্দেশনা"}
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-600 font-medium">
                {lang === "en" ? "No Field Profile Active" : "কোনো তথ্য সংরক্ষিত নেই"}
              </span>
            </div>

            <h1 className="text-[28px] sm:text-[34px] font-bold text-stone-900 tracking-tight leading-tight">
              {isShift
                ? (lang === "en"
                    ? "Configure Your Field to Unlock Crop Recommendations"
                    : "বিকল্প ফসলের পরামর্শ দেখতে আপনার জমির তথ্য দিন")
                : (lang === "en"
                    ? "Configure Your Field to Unlock Live Field Directives"
                    : "জরুরি মাঠপর্যায়ের পরামর্শ দেখতে আপনার জমির তথ্য দিন")}
            </h1>

            <p className="text-sm sm:text-base font-normal text-stone-600 leading-relaxed max-w-xl">
              {isShift
                ? (lang === "en"
                    ? "You haven't set up your farm profile yet. Choose your field location, planned crop, and irrigation source on the Home portal to generate tailored NASA-backed crop shift models, water savings, and profit projections."
                    : "আপনি এখনও আপনার জমির বিবরণ সংরক্ষণ করেননি। নাসার উপগ্রহভিত্তিক লাভজনক বিকল্প ফসল, সেচ খরচ সাশ্রয় ও উৎপাদন খরচের হিসাব দেখতে অনুগ্রহ করে প্রথমে হোম পেজ থেকে আপনার এলাকা, ফসল এবং সেচ ব্যবস্থা নির্বাচন করুন।")
                : (lang === "en"
                    ? "You haven't set up your farm profile yet. Select whether you have standing crops in the field or are planning for the season on the Home portal to unlock real-time AWD irrigation cycles, anthesis heatwave cooling, and tubewell pump protection."
                    : "আপনি এখনও আপনার জমির বিবরণ সংরক্ষণ করেননি। মাঠপর্যায়ের পর্যায়ক্রমিক সেচ (AWD), তাপদাহে ফুল ঝরে পড়া রোধ এবং পাম্প সুরক্ষার জরুরি নির্দেশনা দেখতে অনুগ্রহ করে প্রথমে হোম পেজ থেকে আপনার বর্তমান অবস্থা নির্বাচন করুন।")}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1E7B48] hover:bg-[#165E36] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <span>{lang === "en" ? "Configure Field on Home Page" : "হোম পেজে যান এবং তথ্য দিন"}</span>
              <ArrowRight size={17} />
            </Link>

            <button
              type="button"
              onClick={handleQuickDemo}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 hover:bg-white text-stone-800 text-xs sm:text-sm font-semibold border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all"
            >
              <MapPin size={14} className="text-[#1E7B48]" />
              <span>{lang === "en" ? "Load Sample (Tanore, Rajshahi)" : "নমুনা তথ্য লোড করুন (তানোর)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PREVIEW CARDS (Shows exactly what will be unlocked upon configuring) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
          {lang === "en" ? "Available Insights After Setup" : "তথ্য দেওয়ার পর যা দেখতে পাবেন"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isShift ? (
            <>
              {/* Preview 1 */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#1E7B48] flex items-center justify-center shrink-0">
                  <Sprout size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {lang === "en" ? "Alternative Crop Matrix" : "বিকল্প ফসলের তালিকা"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {lang === "en"
                      ? "Compare BARI Mustard, Maize, and Wheat against heavy flooded Boro paddy."
                      : "বোরো ধানের বিপরীতে উচ্চফলনশীল সরিষা, গম ও ভুট্টার তুলনামূলক চিত্র।"}
                  </p>
                </div>
              </div>

              {/* Preview 2 */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                  <Droplets size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {lang === "en" ? "Water & Cost Savings" : "পানি ও খরচ সাশ্রয়"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {lang === "en"
                      ? "Calculate 56%–77% water reduction and ~৳14,000/acre in pumping fuel savings."
                      : "৫৬% থেকে ৭৭% পানি এবং একরে প্রায় ১৪,০০০ টাকা সেচ জ্বালানি সাশ্রয়ের নির্ভুল হিসাব।"}
                  </p>
                </div>
              </div>

              {/* Preview 3 */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Flame size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {lang === "en" ? "Heat Avoidance Score" : "তাপদাহ থেকে সুরক্ষা"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {lang === "en"
                      ? "NASA thermal index prevents reproductive heat sterility during March anthesis."
                      : "মার্চের অসহনীয় গরমে ফুল ঝরে চিটা হওয়া রোধে নাসার তাপীয় সতর্কতা।"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Advisory Preview 1 */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#1E7B48] flex items-center justify-center shrink-0">
                  <Droplets size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {lang === "en" ? "AWD Irrigation Protocol" : "পর্যায়ক্রমিক সেচ (AWD)"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {lang === "en"
                      ? "NASA SMAP root-zone soil moisture monitoring cuts tubewell pumping diesel by 28%."
                      : "মাটির আর্দ্রতার ওপর ভিত্তি করে ২৮% সেচ ডিজেল খরচ সাশ্রয়ের সুনির্দিষ্ট সময়সূচী।"}
                  </p>
                </div>
              </div>

              {/* Advisory Preview 2 */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Flame size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {lang === "en" ? "Heat Sterility Canopy Shield" : "ফুল ফোটার সময়ে তাপদাহ রক্ষা"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {lang === "en"
                      ? ">34.5°C thermal spike canopy cooling directives to safeguard grain fertility."
                      : "৩৪.৫° সে-এর বেশি তাপমাত্রায় দুপুরে পানি ধরে রেখে ফুল রক্ষা করার পদ্ধতি।"}
                  </p>
                </div>
              </div>

              {/* Advisory Preview 3 */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    {lang === "en" ? "Pre-Harvest Relay Catch Crop" : "সাথী ফসলের প্রস্তুতি"}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {lang === "en"
                      ? "60-day summer mung bean (BARI Mung-6) guidance for post-harvest revenue."
                      : "ধান কাটার পরপরই ৬০ দিনের মুগ ডাল চাষের মাধ্যমে দ্রুত বাড়তি আয়ের নির্দেশনা।"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
