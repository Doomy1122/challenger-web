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

// ✅ 3. SEO 메타데이터 설정 (검색 엔진 최적화)
export const metadata: Metadata = {
  title: {
    default: "CHALLENGER | 호서대학교 자작자동차 연구회",
    template: "%s | CHALLENGER",
  },
  description: "1997년 창단된 호서대학교 자작자동차 동아리 챌린저(CHALLENGER)입니다. E-Formula 레이싱카 설계 및 제작, KSAE 대회 참가.",
  keywords: ["호서대학교", "자작자동차", "챌린저", "Challenger", "E-Formula", "FSAE", "KSAE", "전기차", "레이싱팀", "대학생 자작차"],
  icons: {
    icon: "/favicon.ico", // public 폴더에 favicon.ico 파일이 있어야 합니다.
  },
  openGraph: {
    title: "CHALLENGER | 호서대학교 자작자동차 연구회",
    description: "한계를 넘는 도전, 호서대 챌린저 공식 홈페이지입니다.",
    url: "https://www.challengerfsae.com", // 실제 배포된 도메인
    siteName: "CHALLENGER",
    images: [
      {
        url: "/logo.png", // public 폴더에 og-image.jpg (1200x630 권장) 파일이 있어야 합니다.
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ✅ 4. body 태그 클래스에 corel.variable 추가 */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${corel.variable} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}