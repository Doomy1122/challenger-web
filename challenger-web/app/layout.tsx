import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ 하나로 깔끔하게 합쳤습니다!
export const metadata: Metadata = {
  title: "CHALLENGER - Hoseo Univ. Formula Student Team",
  description: "호서대학교 자작자동차 동아리 CHALLENGER 공식 웹사이트입니다.",
  keywords: ["호서대", "자작자동차", "CHALLENGER", "Formula Student", "FSAE", "대학생", "자동차"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CHALLENGER - Hoseo Univ.",
    description: "Challenger Spirit! 호서대학교 자작자동차 동아리 챌린저입니다.",
    url: "https://challenger-web.vercel.app",
    siteName: "CHALLENGER",
    images: [
      {
        url: "/vision/team.jpg",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  // ✅ 검증 코드는 여기에 넣으세요 (주의: 파일 이름 아님!)
  verification: {
    google: "ek3UK1DGh9YSFKsBX0QjxMUNq1lVzLEJtGsHF72t0jk", 
    other: {
      "naver-site-verification": "",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}