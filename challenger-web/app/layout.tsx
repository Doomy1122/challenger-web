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

// ✅ 2. Coreldraw 폰트 설정
const corel = localFont({
  src: "./fonts/CorelDraw.ttf", 
  variable: "--font-corel",
  display: "swap",
});

// ✅ 3. SEO 메타데이터 설정 (네이버 인증 수정됨)
export const metadata: Metadata = {
  title: {
    default: "CHALLENGER | 호서대학교 자작자동차 연구회",
    template: "%s | CHALLENGER",
  },
  description: "1997년 창단된 호서대학교 자작자동차 동아리 챌린저(CHALLENGER)입니다. E-Formula 레이싱카 설계 및 제작, KSAE 대회 참가.",
  keywords: ["호서대학교", "자작자동차", "챌린저", "Challenger", "E-Formula", "FSAE", "KSAE", "전기차", "레이싱팀", "대학생 자작차"],
  icons: {
    icon: "/favicon.ico", 
  },
  openGraph: {
    title: "CHALLENGER | 호서대학교 자작자동차 연구회",
    description: "한계를 넘는 도전, 호서대 챌린저 공식 홈페이지입니다.",
    url: "https://www.challengerfsae.com", 
    siteName: "CHALLENGER",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "CHALLENGER Team Logo",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  // ⭐ [수정된 부분] 태그 전체가 아니라 '코드값'만 넣어야 합니다!
  verification: {
    other: {
      "naver-site-verification": "cc1b5f9d0d17aa3573dacaf988122ecd817d19d4", 
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${corel.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}