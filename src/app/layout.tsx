import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundImage from "@/components/BackgroundImage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SenCamCong - Trois Terres, Une Voix",
  description: "Groupe musical fusionnant les sons du Sénégal, Cameroun et Congo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col relative">
        <div className="fixed inset-0 -z-10">
          <BackgroundImage section="global" overlayOpacity="bg-black/30" />
        </div>
        {children}
      </body>
    </html>
  );
}
