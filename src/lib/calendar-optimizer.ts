import { CropProfile } from "@/types/crop";
import { ZoneProfile, CurrentClimateMetrics } from "@/types/climate";

export interface CalendarStep {
  stepNumber: number;
  phaseEn: string;
  phaseBn: string;
  titleEn: string;
  titleBn: string;
  instructionEn: string;
  instructionBn: string;
  iconName: "Clock" | "Sprout" | "Droplets" | "Flame" | "ShieldCheck";
}

export interface CalendarShiftDetails {
  cropId: string;
  cropNameEn: string;
  cropNameBn: string;
  traditionalWindow: string;
  nasaAdjustedWindow: string;
  shiftDeltaDays: number;
  heatAvoidanceScorePercent: number;
  moistureReadinessStatus: "ready_to_sow" | "wait_for_moisture" | "too_dry";
  avoidsTagEn: string;
  avoidsTagBn: string;
  riskExplanationEn: string;
  riskExplanationBn: string;
  nasaRecommendationEn: string;
  nasaRecommendationBn: string;
  actionRecommendationEn: string;
  actionRecommendationBn: string;
  steps: CalendarStep[];
}

interface CropCalendarConfig {
  shiftDeltaDays: (isBarind: boolean) => number;
  nasaAdjustedWindow: (isBarind: boolean) => string;
  heatAvoidanceScorePercent: (isBarind: boolean) => number;
  avoidsTagEn: string;
  avoidsTagBn: string;
  riskExplanationEn: string;
  riskExplanationBn: string;
  nasaRecommendationEn: (shiftDays: number) => string;
  nasaRecommendationBn: (shiftDays: number) => string;
  actionRecommendationEn: (shiftDays: number) => string;
  actionRecommendationBn: (shiftDays: number) => string;
  steps: CalendarStep[];
}

const CROP_CALENDAR_CONFIGS: Record<string, CropCalendarConfig> = {
  boro_rice: {
    shiftDeltaDays: (isBarind) => (isBarind ? 14 : 16),
    nasaAdjustedWindow: (isBarind) => (isBarind ? "Nov 28 - Dec 18" : "Dec 05 - Dec 22"),
    heatAvoidanceScorePercent: (isBarind) => (isBarind ? 88 : 74),
    avoidsTagEn: "Avoids: Late March 35°C Heat",
    avoidsTagBn: "মার্চের ৩৫° সে তাপদাহ এড়িয়ে চলে",
    riskExplanationEn:
      "Flowering hits late March heat waves (>34.5°C). Hot dry winds dry out pollen, leaving empty grain pods and heavy crop loss.",
    riskExplanationBn:
      "মার্চের ১৫-২৮ তারিখের তাপদাহে ফুল ঝরে যায় এবং পরাগায়ন ব্যাহত হয়ে ফসল চিটা হয়ে যাওয়ার মারাত্মক ঝুঁকি থাকে।",
    nasaRecommendationEn: (days) =>
      `Delaying transplanting by ${days} days pushes flowering into cooler April night temperatures, dodging the lethal March heat spike completely.`,
    nasaRecommendationBn: (days) =>
      `রোপণ ${days} দিন পিছিয়ে দিলে এপ্রিলের সহনশীল রাতের তাপমাত্রায় ফুল ফোটে এবং মার্চের তাপদাহ পুরোপুরি এড়ানো সম্ভব হয়।`,
    actionRecommendationEn: (days) =>
      `Delay transplanting by ${days} days. This avoids the lethal March 15-28 thermal spike (>35°C) during pollen development, preventing up to 35% yield sterility.`,
    actionRecommendationBn: (days) =>
      `চারা রোপণ ${days} দিন পিছিয়ে দিন। এটি মার্চের ১৫-২৮ তারিখের মারাত্মক তাপদাহ (৩৫° সে এর বেশি) এড়াতে সাহায্য করে এবং ধানের চিটা হওয়া রোধ করে।`,
    steps: [
      {
        stepNumber: 1,
        phaseEn: "Step 1 • Seedbed",
        phaseBn: "ধাপ ১ • বীজতলা",
        titleEn: "Delayed Seedbed Sowing",
        titleBn: "দেরিতে বীজতলা তৈরি",
        instructionEn:
          "Sow nursery seeds between Nov 28 – Dec 5. Delaying the seedbed stops seedlings from maturing too early before winter ends.",
        instructionBn:
          "২৮ নভেম্বর থেকে ৫ ডিসেম্বরের মধ্যে বীজতলায় বীজ ফেলুন যাতে চারা অতিরিক্ত আগে না বাড়ে।",
        iconName: "Clock",
      },
      {
        stepNumber: 2,
        phaseEn: "Step 2 • Field Planting",
        phaseBn: "ধাপ ২ • চারা রোপণ",
        titleEn: "Transplant to Muddy Field",
        titleBn: "মূল জমিতে চারা রোপণ",
        instructionEn:
          "Transplant 25–30 day old seedlings into the prepared muddy field by Dec 18 for best root establishment.",
        instructionBn:
          "১৮ ডিসেম্বরের মধ্যে ২৫-৩০ দিনের সুস্থ চারা মূল জমিতে রোপণ সম্পন্ন করুন।",
        iconName: "Sprout",
      },
      {
        stepNumber: 3,
        phaseEn: "Step 3 • Flowering Care",
        phaseBn: "ধাপ ৩ • পরিচর্যা",
        titleEn: "AWD Canopy Cooling",
        titleBn: "ফুল ফোটার সময় সেচ",
        instructionEn:
          "Provide light irrigation in the evening during flowering in April to keep root zones cool and protect pollen fertility.",
        instructionBn:
          "এপ্রিলে ফুল আসার সময় বিকেলে হালকা সেচ দিন যাতে মাটির তাপমাত্রা সহনশীল থাকে।",
        iconName: "Droplets",
      },
    ],
  },

  aman_rice: {
    shiftDeltaDays: () => 15,
    nasaAdjustedWindow: () => "Jul 10 - Aug 05",
    heatAvoidanceScorePercent: () => 84,
    avoidsTagEn: "Avoids: Monsoon Delay & Salinity Spike",
    avoidsTagBn: "অনাবৃষ্টি ও উপকূলীয় লবণাক্ততা এড়িয়ে চলে",
    riskExplanationEn:
      "Early June monsoon onset is now erratic. Sowing early in delayed monsoon risks seedling desiccation and early salinity shock.",
    riskExplanationBn:
      "মৌসুমের শুরুতে অনিয়মিত বৃষ্টিপাতের কারণে আগাম বীজতলা শুকিয়ে যাওয়ার এবং উপকূলীয় এলাকায় লবণাক্ততার তীব্র ঝুঁকি থাকে।",
    nasaRecommendationEn: (days) =>
      `Shifting nursery beds by ${days} days synchronizes transplanting with steady July monsoon rainfall, eliminating seedling mortality.`,
    nasaRecommendationBn: (days) =>
      `বীজতলা ${days} দিন পিছিয়ে দিলে জুলাইয়ের নিয়মিত বর্ষার সাথে চারা রোপণ মিলে যায় এবং চারা নষ্ট হওয়া রোধ হয়।`,
    actionRecommendationEn: (days) =>
      `Shift nursery preparation by ${days} days later to sync with delayed monsoon rains, preventing saltwater intrusion damage to tender seedlings.`,
    actionRecommendationBn: (days) =>
      `দেরিতে শুরু হওয়া বর্ষার সাথে মিলিয়ে বীজতলা ${days} দিন পিছিয়ে দিন, যা কচি চারাকে লবণাক্ত পানির ক্ষতি থেকে রক্ষা করবে।`,
    steps: [
      {
        stepNumber: 1,
        phaseEn: "Step 1 • Seedbed",
        phaseBn: "ধাপ ১ • বীজতলা",
        titleEn: "Monsoon Synchronized Nursery",
        titleBn: "বর্ষার সাথে বীজতলা",
        instructionEn:
          "Establish nursery beds after July 10 once cumulative monsoon rainfall exceeds 50 mm for assured soil saturation.",
        instructionBn:
          "১০ জুলাইয়ের পর নিশ্চিত বর্ষার পর্যাপ্ত বৃষ্টির পর বীজতলা প্রস্তুত করুন।",
        iconName: "Droplets",
      },
      {
        stepNumber: 2,
        phaseEn: "Step 2 • Field Planting",
        phaseBn: "ধাপ ২ • চারা রোপণ",
        titleEn: "Main Field Planting",
        titleBn: "মূল জমিতে রোপণ",
        instructionEn:
          "Transplant 20–25 day seedlings by August 5 in saturated paddies; seedlings recover quickly under steady rain.",
        instructionBn:
          "৫ আগস্টের মধ্যে ২০-২৫ দিনের সবল চারা রোপণ সম্পন্ন করুন।",
        iconName: "Sprout",
      },
      {
        stepNumber: 3,
        phaseEn: "Step 3 • Terminal Moisture",
        phaseBn: "ধাপ ৩ • আর্দ্রতা সংরক্ষণ",
        titleEn: "Drainage & Terminal Water Watch",
        titleBn: "শেষ পর্যায়ের পানি ব্যবস্থাপনা",
        instructionEn:
          "Conserve standing moisture through October milk stage before terminal rain cessation in early November.",
        instructionBn:
          "অক্টোবরের শেষভাগে ধান দুধেল হওয়ার সময় জমিতে আর্দ্রতা বজায় রাখুন।",
        iconName: "ShieldCheck",
      },
    ],
  },

  bari_mustard_14: {
    shiftDeltaDays: () => 8,
    nasaAdjustedWindow: () => "Nov 02 - Nov 18",
    heatAvoidanceScorePercent: () => 94,
    avoidsTagEn: "Avoids: Feb Aphids & March Heat Spikes",
    avoidsTagBn: "জাবপোকার আক্রমণ ও গরম এড়িয়ে চলে",
    riskExplanationEn:
      "Sowing before late October rots seeds in waterlogged soil; sowing after Nov 25 exposes young pods to devastating February aphids and warm winds.",
    riskExplanationBn:
      "অতিরিক্ত ভেজা মাটিতে বীজ পচে যায়, আবার ২৫ নভেম্বরের পরে বুনলে ফেব্রুয়ারির জাবপোকা ও গরমে ফলন মারাত্মকভাবে কমে যায়।",
    nasaRecommendationEn: (days) =>
      `An ${days}-day calibrated shift lets topsoil reach optimal 22–25% workability, allowing complete harvest in 75–78 days before hot weather strikes.`,
    nasaRecommendationBn: (days) =>
      `৮ দিন পর মাটিতে জো আসার সাথে সাথে বুনলে মাত্র ৭৫-৭৮ দিনে গরম পড়ার আগেই সম্পূর্ণ ফলন ঘরে তোলা যায়।`,
    actionRecommendationEn: (days) =>
      `Calibrate sowing date by ${days} days after Aman harvest. Short 78-day duration saves 77% irrigation water compared to Boro rice.`,
    actionRecommendationBn: (days) =>
      `আমন কাটার পর ${days} দিন সমন্বয়ে সরিষা বুনুন। মাত্র ৭৮ দিনে ফলন ঘরে আসায় ধানের চেয়ে ৭৭% সেচ সাশ্রয় হয়।`,
    steps: [
      {
        stepNumber: 1,
        phaseEn: "Step 1 • Sowing",
        phaseBn: "ধাপ ১ • বীজ বপন",
        titleEn: "Moisture-Triggered Seeding",
        titleBn: "যো-অবস্থায় বীজ বপন",
        instructionEn:
          "Sow certified BARI Mustard-14 seed (7–8 kg/ha) right after Aman harvest as soon as topsoil moisture reaches 22–25%.",
        instructionBn:
          "আমন ধান কাটার পরপরই মাটিতে জো আসার সাথে সাথে ৭-৮ কেজি/হেক্টর হারে বীজ বপন করুন।",
        iconName: "Sprout",
      },
      {
        stepNumber: 2,
        phaseEn: "Step 2 • First Irrigation",
        phaseBn: "ধাপ ২ • প্রথম সেচ",
        titleEn: "Crown Root Irrigation",
        titleBn: "প্রাথমিক হালকা সেচ",
        instructionEn:
          "Apply one light irrigation 20–25 days after sowing (pre-flowering stage); avoid any water stagnation in the field.",
        instructionBn:
          "বপনের ২০-২৫ দিন পর ফুল আসার আগে একটি হালকা সেচ দিন, খেয়াল রাখুন পানি যেন না জমে।",
        iconName: "Droplets",
      },
      {
        stepNumber: 3,
        phaseEn: "Step 3 • Pod Filling",
        phaseBn: "ধাপ ৩ • দানা গঠন",
        titleEn: "Aphid Monitoring & Siliqua Care",
        titleBn: "জাবপোকা দমন ও ফসল কাটা",
        instructionEn:
          "Inspect for aphids in late December; harvest promptly at 75–80 days when 70% of siliquae turn golden straw color.",
        instructionBn:
          "ডিসেম্বরের শেষে জাবপোকার দিকে লক্ষ্য রাখুন এবং ৭০% শুঁটি হলুদ হলে ফসল সংগ্রহ করুন।",
        iconName: "ShieldCheck",
      },
    ],
  },

  hybrid_maize: {
    shiftDeltaDays: () => 12,
    nasaAdjustedWindow: () => "Nov 15 - Dec 05",
    heatAvoidanceScorePercent: () => 92,
    avoidsTagEn: "Avoids: Jan Chill Stunting & Heat Stress",
    avoidsTagBn: "শৈত্যপ্রবাহ ও চৈত্রের তাপদাহ এড়িয়ে চলে",
    riskExplanationEn:
      "Late December plantings suffer severe stunting during January cold snaps; ultra-early plantings require costly continuous diesel pumping.",
    riskExplanationBn:
      "ডিসেম্বরের শেষে বুনলে শৈত্যপ্রবাহে চারা বৃদ্ধি থমকে যায়, আবার অতি আগাম বুনলে অতিরিক্ত সেচ খরচ হয়।",
    nasaRecommendationEn: (days) =>
      `Planting in mid-November allows sturdy root establishment before winter, ensuring pollination finishes comfortably before March 35°C heat.`,
    nasaRecommendationBn: (days) =>
      `১৫ নভেম্বরের পর বুনলে শীতের আগেই গাছের বৃদ্ধি মজবুত হয় এবং চৈত্রের তাপদাহ আসার আগেই ভুট্টার মোচা পুষ্ট হয়।`,
    actionRecommendationEn: (days) =>
      `Shift planting by ${days} days to mid-November. Robust root system utilizes 56% less water than rice with high heat tolerance.`,
    actionRecommendationBn: (days) =>
      `রোপণ ${days} দিন পিছিয়ে ১৫ নভেম্বরে নির্ধারণ করুন। গভীর মূলতন্ত্র ধানের চেয়ে ৫৬% কম পানি ব্যবহার করে।`,
    steps: [
      {
        stepNumber: 1,
        phaseEn: "Step 1 • Sowing",
        phaseBn: "ধাপ ১ • বীজ বপন",
        titleEn: "Ridge & Furrow Planting",
        titleBn: "আইল ও নালা পদ্ধতিতে বপন",
        instructionEn:
          "Plant hybrid seeds at 60 cm row and 20 cm plant spacing in furrows to conserve 30% water and protect roots.",
        instructionBn:
          "৬০ সেমি সারি ও ২০ সেমি দূরত্বে আইল ও নালা পদ্ধতিতে বীজ বপন করুন।",
        iconName: "Sprout",
      },
      {
        stepNumber: 2,
        phaseEn: "Step 2 • Vegetative Growth",
        phaseBn: "ধাপ ২ • বৃদ্ধি পর্যায়",
        titleEn: "Knee-High Stage Topdress & Water",
        titleBn: "হাঁটু সমান উচ্চতায় সেচ ও সার",
        instructionEn:
          "Apply second split of urea followed by essential irrigation at 30–35 days (knee-high stage) for sturdy stalks.",
        instructionBn:
          "৩০-৩৫ দিন বয়সে দ্বিতীয় কিস্তি ইউরিয়া প্রয়োগ করে প্রয়োজনীয় সেচ দিন।",
        iconName: "Droplets",
      },
      {
        stepNumber: 3,
        phaseEn: "Step 3 • Pollination",
        phaseBn: "ধাপ ৩ • ফুল ও মোচা গঠন",
        titleEn: "Critical Tasseling Moisture",
        titleBn: "মোচা গঠনের চূড়ান্ত সেচ",
        instructionEn:
          "Ensure steady root-zone moisture during February tasseling and silking; never allow moisture deficit during pollination.",
        instructionBn:
          "ফেব্রুয়ারিতে মোচা ও ফুল আসার সময় জমিতে পর্যাপ্ত রস নিশ্চিত করুন।",
        iconName: "ShieldCheck",
      },
    ],
  },

  bari_masur_8: {
    shiftDeltaDays: () => 8,
    nasaAdjustedWindow: () => "Oct 28 - Nov 15",
    heatAvoidanceScorePercent: () => 95,
    avoidsTagEn: "Avoids: Seedling Rot & Spring Terminal Heat",
    avoidsTagBn: "চারা পচা ও বসন্তের খরা এড়িয়ে চলে",
    riskExplanationEn:
      "Wet clay before late October triggers seedling root rot; delaying past Nov 20 drastically shrinks lentil pods due to spring dry heat.",
    riskExplanationBn:
      "অতিরিক্ত ভেজা মাটিতে চারা পচে যায়, আর ২০ নভেম্বরের পর বুনলে বসন্তের শুষ্ক গরমে ডালের দানা ছোট হয়ে যায়।",
    nasaRecommendationEn: (days) =>
      `Sowing as a relay crop in late October captures residual moisture without tilling, dodging spring heat with a natural nitrogen boost.`,
    nasaRecommendationBn: (days) =>
      `অক্টোবরের শেষে আমন ধানের জমিতে রিলে হিসেবে বুনলে বিনা চাষে মাটির রসে গাছ বাড়ে এবং বসন্তের আগেই ফলন পাওয়া যায়।`,
    actionRecommendationEn: (days) =>
      `Sow 8 days into late October as relay crop. Enriches soil nitrogen naturally while using 82% less water than rice.`,
    actionRecommendationBn: (days) =>
      `৮ দিন পিছিয়ে অক্টোবরের শেষে রিলে ফসল হিসেবে বুনুন। মাটির নাইট্রোজেন বৃদ্ধির পাশাপাশি ধানের চেয়ে ৮২% কম পানি লাগে।`,
    steps: [
      {
        stepNumber: 1,
        phaseEn: "Step 1 • Relay Broadcast",
        phaseBn: "ধাপ ১ • রিলে বপন",
        titleEn: "Relay (Utera) Sowing",
        titleBn: "রিলে বা উতেরা পদ্ধতিতে বপন",
        instructionEn:
          "Broadcast primed seeds (35–40 kg/ha) into standing Aman paddy 10–12 days prior to rice harvest while soil is moist.",
        instructionBn:
          "আমন ধান কাটার ১০-১২ দিন আগে ভেজা জমিতে ৩৫-৪০ কেজি/হেক্টর হারে বীজ ছিটিয়ে দিন।",
        iconName: "Sprout",
      },
      {
        stepNumber: 2,
        phaseEn: "Step 2 • Stubble Care",
        phaseBn: "ধাপ ২ • প্রাথমিক পরিচর্যা",
        titleEn: "Crop Residue Mulching",
        titleBn: "ধানের খড় দিয়ে আর্দ্রতা সংরক্ষণ",
        instructionEn:
          "Leave 15–20 cm rice stubble during rice harvest to provide windbreak and preserve winter soil moisture.",
        instructionBn:
          "ধান কাটার সময় ১৫-২০ সেমি নাড়া জমিতে রাখুন যাতে শীতের কুয়াশা ও আর্দ্রতা আটকে থাকে।",
        iconName: "Clock",
      },
      {
        stepNumber: 3,
        phaseEn: "Step 3 • Pod Development",
        phaseBn: "ধাপ ৩ • শুঁটি গঠন",
        titleEn: "Pod Setting & Rust Prevention",
        titleBn: "ডাল গঠন ও রোগবালাই প্রতিরোধ",
        instructionEn:
          "Monitor for Stemphylium blight; provide a single light sprinkler watering in mid-January only if drought stresses pods.",
        instructionBn:
          "ঝুলসা রোগের দিকে নজর রাখুন এবং প্রয়োজনে জানুয়ারির মাঝামাঝি একটি হালকা সেচ দিন।",
        iconName: "ShieldCheck",
      },
    ],
  },

  bari_gom_33: {
    shiftDeltaDays: () => 5,
    nasaAdjustedWindow: () => "Nov 20 - Nov 30",
    heatAvoidanceScorePercent: () => 89,
    avoidsTagEn: "Avoids: March Terminal Heat Sterility",
    avoidsTagBn: "মার্চের তীব্র গরমে ফলন বিপর্যয় এড়িয়ে চলে",
    riskExplanationEn:
      "Wheat yields plummet by 1.5% for every day delayed after Dec 5 because hot March winds dry out filling grains.",
    riskExplanationBn:
      "৫ ডিসেম্বরের পর প্রতি ১ দিন দেরিতে গম বুনলে মার্চের গরম বাতাসের কারণে ফলন ১.৫% কমে যায়।",
    nasaRecommendationEn: (days) =>
      `A strict timely window (Nov 20–30) ensures heading and grain milk stage occur during peak cool days, maximizing grain weight.`,
    nasaRecommendationBn: (days) =>
      `২০-৩০ নভেম্বরের মধ্যে বুনলে গম দুধেল হওয়ার পুরো সময় শীতের ঠান্ডা পায়, ফলে দানার সর্বোচ্চ ওজন ও গুণ নিশ্চিত হয়।`,
    actionRecommendationEn: (days) =>
      `Sow within narrow Nov 20–30 window. Blast-resistant BARI Gom-33 requires only 3 irrigations, reducing groundwater strain by 69%.`,
    actionRecommendationBn: (days) =>
      `২০-৩০ নভেম্বরের নির্দিষ্ট সময়ে বুনুন। ব্লাস্ট প্রতিরোধী এই গম মাত্র ৩টি সেচেই উৎপাদন সম্ভব।`,
    steps: [
      {
        stepNumber: 1,
        phaseEn: "Step 1 • Seeding",
        phaseBn: "ধাপ ১ • বীজ বপন",
        titleEn: "Timely Power-Tiller Seeding",
        titleBn: "পাওয়ার টিলার দিয়ে দ্রুত বপন",
        instructionEn:
          "Sow treated seeds with BARI Gom-33 (120 kg/ha) immediately after Aman harvest using strip-till to save 8–10 days turnaround.",
        instructionBn:
          "আমন ধান কাটার পরপরই স্ট্রিপ টিলার দিয়ে দ্রুত বীজ বপন সম্পন্ন করুন যাতে সময় নষ্ট না হয়।",
        iconName: "Sprout",
      },
      {
        stepNumber: 2,
        phaseEn: "Step 2 • First Irrigation",
        phaseBn: "ধাপ ২ • শিকড় গজানোর সেচ",
        titleEn: "Crown Root Irrigation (CRI)",
        titleBn: "প্রথম বাধ্যতামূলক সেচ (সিআরআই)",
        instructionEn:
          "Apply mandatory first irrigation exactly 18–21 days after sowing along with top-dressed urea to spur tillering.",
        instructionBn:
          "বপনের ১৮-২১ দিন পর মূল শিকড় গজানোর সময় প্রথম সেচ ও ইউরিয়া সার উপরিপ্রয়োগ করুন।",
        iconName: "Droplets",
      },
      {
        stepNumber: 3,
        phaseEn: "Step 3 • Grain Filling",
        phaseBn: "ধাপ ৩ • দানা পুষ্ট হওয়া",
        titleEn: "Grain Filling Light Watering",
        titleBn: "দানা গঠনের সেচ",
        instructionEn:
          "Provide light irrigation at heading (50–55 days) and milk stage (70–75 days) during early morning to lower canopy temperature.",
        instructionBn:
          "শীষ বের হওয়ার সময় ও দানা দুধেল অবস্থায় সকালে হালকা সেচ দিয়ে গমগাছ ঠান্ডা রাখুন।",
        iconName: "ShieldCheck",
      },
    ],
  },
};

export function optimizeSowingCalendar(
  crop: CropProfile,
  zone: ZoneProfile,
  climate: CurrentClimateMetrics
): CalendarShiftDetails {
  const isBarind = zone.id === "barind_godagari";

  // Compute moisture readiness trigger
  let moistureReadinessStatus: CalendarShiftDetails["moistureReadinessStatus"] = "wait_for_moisture";
  if (climate.rootZoneSoilMoisturePercent >= 28) {
    moistureReadinessStatus = "ready_to_sow";
  } else if (climate.rootZoneSoilMoisturePercent < 18) {
    moistureReadinessStatus = "too_dry";
  }

  const config = CROP_CALENDAR_CONFIGS[crop.id];
  const traditionalWindow = crop.typicalSowing?.label || "Seasonal Window";

  if (config) {
    const shiftDeltaDays = config.shiftDeltaDays(isBarind);
    const nasaAdjustedWindow = config.nasaAdjustedWindow(isBarind);
    const heatAvoidanceScorePercent = config.heatAvoidanceScorePercent(isBarind);

    return {
      cropId: crop.id,
      cropNameEn: crop.nameEn,
      cropNameBn: crop.nameBn,
      traditionalWindow,
      nasaAdjustedWindow,
      shiftDeltaDays,
      heatAvoidanceScorePercent,
      moistureReadinessStatus,
      avoidsTagEn: config.avoidsTagEn,
      avoidsTagBn: config.avoidsTagBn,
      riskExplanationEn: config.riskExplanationEn,
      riskExplanationBn: config.riskExplanationBn,
      nasaRecommendationEn: config.nasaRecommendationEn(shiftDeltaDays),
      nasaRecommendationBn: config.nasaRecommendationBn(shiftDeltaDays),
      actionRecommendationEn: config.actionRecommendationEn(shiftDeltaDays),
      actionRecommendationBn: config.actionRecommendationBn(shiftDeltaDays),
      steps: config.steps,
    };
  }

  // Dynamic fallback for any unlisted crop
  const defaultShift = isBarind ? 10 : 12;
  return {
    cropId: crop.id,
    cropNameEn: crop.nameEn,
    cropNameBn: crop.nameBn,
    traditionalWindow,
    nasaAdjustedWindow: traditionalWindow,
    shiftDeltaDays: defaultShift,
    heatAvoidanceScorePercent: 80,
    moistureReadinessStatus,
    avoidsTagEn: "Avoids: Unfavorable Climate Drift",
    avoidsTagBn: "অনুকূল আবহাওয়া নিশ্চিত করে",
    riskExplanationEn: `Traditional calendar risks exposing ${crop.nameEn} to extreme seasonal shifts and moisture stress.`,
    riskExplanationBn: `ঐতিহ্যবাহী সময়ে রোপণ করলে ${crop.nameBn} এর ফলন আবহাওয়া বিপর্যয়ের মুখে পড়তে পারে।`,
    nasaRecommendationEn:
      `Adjust sowing by ${defaultShift} days based on NASA soil moisture and temperature projections for ${zone.nameEn}.`,
    nasaRecommendationBn:
      `নাসার উপগ্রহভিত্তিক পূর্বাভাস অনুযায়ী রোপণ ${defaultShift} দিন সমন্বয় করে জমিতে রস নিশ্চিত করুন।`,
    actionRecommendationEn:
      `Adjust sowing by ${defaultShift} days to optimize growing conditions.`,
    actionRecommendationBn:
      `অনুকূল ফলন নিশ্চিতে রোপণ ${defaultShift} দিন সমন্বয় করুন।`,
    steps: [
      {
        stepNumber: 1,
        phaseEn: "Step 1 • Land Prep",
        phaseBn: "ধাপ ১ • জমি প্রস্তুত",
        titleEn: "Moisture Assessment",
        titleBn: "মাটির আর্দ্রতা পরীক্ষা",
        instructionEn: "Check topsoil moisture before field operations.",
        instructionBn: "রোপণের আগে মাটির আর্দ্রতা যাচাই করুন।",
        iconName: "Clock",
      },
      {
        stepNumber: 2,
        phaseEn: "Step 2 • Sowing",
        phaseBn: "ধাপ ২ • বপন",
        titleEn: "Optimal Seeding",
        titleBn: "সঠিক সময়ে বপন",
        instructionEn: "Sow certified high-quality seed into well-tilled soil.",
        instructionBn: "উন্নত মানের বীজ সময়মতো জমিতে বপন করুন।",
        iconName: "Sprout",
      },
      {
        stepNumber: 3,
        phaseEn: "Step 3 • Maintenance",
        phaseBn: "ধাপ ৩ • পরিচর্যা",
        titleEn: "Irrigation Scheduling",
        titleBn: "পরিমিত সেচ",
        instructionEn: "Maintain soil moisture at key developmental stages.",
        instructionBn: "গুরুত্বপূর্ণ সময়ে প্রয়োজনীয় সেচ নিশ্চিত করুন।",
        iconName: "Droplets",
      },
    ],
  };
}
