$content = @'
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundImage from "@/components/BackgroundImage";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sencamcong.com"),
  title: {
    default: "SenCamCong - Trois Terres, Une Voix",
    template: "%s | SenCamCong",
  },
  description: "Groupe musical fusionnant les sons du Senegal, Cameroun et Congo. Concerts, actualites et musique afro-fusion.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SenCamCong",
  },
  openGraph: {
    title: "SenCamCong - Trois Terres, Une Voix",
    description: "Groupe musical fusionnant les sons du Senegal, Cameroun et Congo.",
    url: "https://sencamcong.com",
    siteName: "SenCamCong",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SenCamCong - Trois Terres, Une Voix",
    description: "Groupe musical fusionnant les sons du Senegal, Cameroun et Congo.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col relative z-10">
        <ServiceWorkerRegister />
        <div className="fixed inset-0 -z-10">
          <BackgroundImage section="global" overlayOpacity="bg-black/20" />
        </div>
        {children}
      </body>
    </html>
  );
}
'@

[System.IO.File]::WriteAllText("$PWD\src\app\layout.tsx", $content, [System.Text.Encoding]::UTF8)
Write-Output "Fichier layout ecrit avec succes"