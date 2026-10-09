import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FieldShift | Adapting Farms with NASA Data",
  description:
    "Prescriptive climate adaptation engine turning NASA Earth Observation data into actionable crop and calendar shifts for smallholder farmers.",
  keywords: [
    "NASA Space Apps",
    "Field Shift",
    "Smart Farming",
    "Climate Adaptation",
    "Bangladesh Agriculture",
    "SMAP",
    "NASA POWER",
  ],
  authors: [{ name: "FieldShift Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#163B2A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased bg-[#DDE6DE]">{children}</body>
    </html>
  );
}
