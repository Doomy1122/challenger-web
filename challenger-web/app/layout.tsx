import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// ✅ 1. 방금 만든 Provider 불러오기
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHALLENGER - Hoseo Univ. Formula Student Team",
  description: "호서대학교 자작자동차 동아리 CHALLENGER 공식 웹사이트입니다.",
  // ... (기타 메타데이터 그대로 유지) ...
  verification: {
    google: "ek3UK1DGh9YSFKsBX0QjxMUNq1lVzLEJtGsHF72t0jk", 
    other: {
      "naver-site-verification": "b953718b9e8c5ccbafc11ad98c8dd8009c4946d1",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ 2. 여기서 감싸주면 끝! */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}