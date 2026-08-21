import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import EchoTransition from "@/components/EchoTransition";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-blanka", // keeping the same variable name so we don't have to change HeroSection
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: ".hack26 | IEEE MACE SB",
  description: "Experience .hack26, the flagship hackathon by IEEE Student Branch MACE. Define, design, and deploy innovative solutions to solve real-world challenges.",
  keywords: [
    ".hack26",
    "hack26",
    "dothack26",
    "IEEE hackathon",
    "IEEE MACE SB",
    "IEEE SB MACE",
    "MACE hackathon",
    "student hackathon",
    "coding competition",
    "hackathon kerala",
    "innovation challenge",
    "technology event",
    "developer event",
    "engineering hackathon 2026",
  ],
  authors: [{ name: "IEEE Student Branch MACE" }],
  creator: "IEEE MACE SB",
  publisher: "IEEE MACE SB",
  category: "technology",
  applicationName: ".hack26",
  metadataBase: new URL("https://hack26.ieeemace.org"),
  openGraph: {
    type: "website",
    title: ".hack26 | IEEE MACE SB Flagship Hackathon 2026",
    description: "IEEE MACE SB flagship hackathon bringing together innovators and developers to define, design, and deploy impactful solutions.",
    siteName: ".hack26 IEEE MACE SB",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: ".hack26 Hackathon Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ".hack26 | IEEE MACE SB Hackathon 2026",
    description: "Define. Design. Deploy.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <EchoTransition />
        {children}
        <GoogleAnalytics gaId="G-JXCHY7NC7G" />
      </body>
    </html>
  );
}
