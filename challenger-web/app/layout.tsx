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

// ✅ 여기를 수정하세요!
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
        url: "/vision/team.jpg", // 카톡 공유 시 나올 이미지 (기존에 있는 파일 활용)
        width: 800,
        height: 600,
      },
    ],
    type: "website",
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