import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/navigation/Navbar";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "FieldShift | Adapting Farms with NASA Data",
  description:
    "Orbital agro-command platform translating NASA Earth Observation telemetry into prescriptive crop and calendar shifts for smallholder farmers.",
  keywords: [
    "NASA Space Apps 2026",
    "Field Shift",
    "Climate Adaptation",
    "Bangladesh Agriculture",
    "SMAP",
    "NASA POWER",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060908",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-[#060908] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black"
        suppressHydrationWarning
      >
        <AppProvider>
          <Navbar />
          <main className="flex-1 w-full pb-16">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
