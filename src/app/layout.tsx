import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import EchoTransition from "@/components/EchoTransition";

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
  description: "Experience .hack26, the flagship hackathon by IEEE Student Branch MACE. Build innovative solutions, solve real-world challenges, and shape the future with technology.",
  keywords: [
    ".hack26",
    "hack26",
    "dothack26",
    "IEEE hackathon",
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
  creator: "IEEE SB MACE",
  publisher: "IEEE SB MACE",
  category: "technology",
  applicationName: ".hack26",
  metadataBase: new URL("https://hack26.ieeemace.org"),
  openGraph: {
    type: "website",
    title: ".hack26 | IEEE SB MACE Flagship Hackathon 2026",
    description: "IEEE SB MACE flagship hackathon bringing together innovators and developers to build impactful solutions.",
    siteName: ".hack26 IEEE SB MACE",
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
    title: ".hack26 | IEEE SB MACE Hackathon 2026",
    description: "Build. Innovate. Change the future.",
    images: ["/og-image.png"],
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
      </body>
    </html>
  );
}
