import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Instagram, Youtube, MapPin, Mail, Phone, ArrowLeft } from "lucide-react";
// 기존에 만들어둔 갤러리 컴포넌트 재사용
import GallerySection from "../components/GallerySection";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function GalleryPage() {
  return (
    <div className={`min-h-screen bg-black text-white ${inter.className}`}>
      
      {/* 1. 네비게이션 바 (홈으로 돌아가는 링크들로 수정됨) */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="CHALLENGER Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-10 text-sm font-bold text-gray-300">
            {/* 홈의 특정 섹션으로 이동하도록 /#... 추가 */}
            <Link href="/#about" className="hover:text-[#950000] transition">
              ABOUT US
            </Link>
            <Link href="/#history" className="hover:text-[#950000] transition">
              COMPETITION
            </Link>
            <Link href="/#news" className="hover:text-[#950000] transition">
              NEWS
            </Link>
            {/* 현재 페이지 */}
            <Link href="/gallery" className="text-[#950000] transition">
              GALLERY
            </Link>
            <Link href="/#sponsors" className="hover:text-[#950000] transition">
              SPONSORS
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center bg-zinc-800 px-6 py-2 rounded-full hover:bg-[#950000] transition text-white"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. 갤러리 섹션 (상단 여백 추가) */}
      <div className="pt-20">
        <GallerySection />
      </div>

      {/* 3. 하단 홈으로 가기 버튼 */}
      <div className="py-20 flex justify-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:bg-[#950000] hover:border-[#950000] transition font-bold"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      {/* 4. Footer (홈과 동일) */}
      <section className="bg-black py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <img src="/logo.png" alt="CHALLENGER Logo" className="h-12 w-auto mb-8 object-contain" />
            <div className="space-y-6 text-gray-500 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#950000] mt-0.5 shrink-0" />
                <p>충청남도 아산시 배방읍 호서로79번길 20,<br />호서대학교 아산캠퍼스 제2공학관 B10호</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#950000] shrink-0" />
                <p>CHALLENGERFSAE@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <a href="https://instagram.com/challenger_fsae" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-full hover:bg-[#950000] transition text-white">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@CHALLENGERHOSEO" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-full hover:bg-[#950000] transition text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2 text-zinc-600 text-sm mt-10 md:mt-0">
             <p>© Formula Student Team CHALLENGER.</p>
             <p>All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}