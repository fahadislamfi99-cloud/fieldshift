import { NextRequest, NextResponse } from "next/server";
import { performCropShiftAssessment } from "@/lib/ecocrop";
import { optimizeSowingCalendar } from "@/lib/calendar-optimizer";
import { getFallbackZoneMetrics } from "@/services/nasa-power";
import { ZoneProfile } from "@/types/climate";
import zonesData from "@/data/zones.json";
import cropsData from "@/data/crops.json";
import { CropProfile } from "@/types/crop";

const ZONES = zonesData as ZoneProfile[];
const CROPS = cropsData as CropProfile[];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cropId, zoneId } = body;

    const matchedZone = ZONES.find((z) => z.id === zoneId) || ZONES[0];
    const matchedCrop = CROPS.find((c) => c.id === cropId) || CROPS[0];

    const climate = getFallbackZoneMetrics(matchedZone.id);

    const assessment = performCropShiftAssessment(matchedCrop.id, matchedZone, climate);
    const calendar = optimizeSowingCalendar(matchedCrop, matchedZone, climate);

    return NextResponse.json(
      {
        zone: matchedZone,
        assessment,
        calendar,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/evaluate error:", error);
    return NextResponse.json({ error: "Failed to evaluate crop shift" }, { status: 500 });
  }
}
