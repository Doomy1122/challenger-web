import type { Metadata } from "next";
// ✅ 1. localFont 불러오기
import localFont from "next/font/local"; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ 2. Coreldraw 폰트 설정 (변수명: --font-corel)
const corel = localFont({
  src: "./fonts/CorelDraw.ttf", // ⚠️ 파일 경로 정확해야 함!
  variable: "--font-corel",
  display: "swap",
});

// ... metadata 부분은 그대로 ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ✅ 3. body 태그 클래스에 corel.variable 추가 */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${corel.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}