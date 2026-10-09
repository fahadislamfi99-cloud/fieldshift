import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/navigation/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "FieldShift | Adapting Farms with NASA Data",
  description:
    "Prescriptive climate adaptation platform translating NASA Earth Science telemetry into actionable crop and calendar shifts for smallholder farmers.",
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
  themeColor: "#163B2A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-stone-50/60 text-stone-900 font-sans">
        <AppProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
