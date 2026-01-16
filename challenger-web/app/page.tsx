"use client";

import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Instagram, Youtube, MapPin, Mail, Phone, Globe, Download, Megaphone, Users, Cpu } from "lucide-react";
import NewsSection from "./components/NewsSection";
import { translations } from "./constants/translations";
import { useLanguage } from "./context/LanguageContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

// ... (로고 데이터는 그대로 유지 - 복사해서 넣으세요) ...
const sponsorLogosRow1 = [
  { src: "/sponsors/marquee/altair.png", alt: "altair" },
  { src: "/sponsors/marquee/ansys.png", alt: "ansys" },
  { src: "/sponsors/marquee/bender.png", alt: "bender" },
  { src: "/sponsors/marquee/brian.png", alt: "brian" },
  { src: "/sponsors/marquee/calspan.png", alt: "calspan" },
  { src: "/sponsors/marquee/caround.png", alt: "caround" },
  { src: "/sponsors/marquee/das.png", alt: "das" },
  { src: "/sponsors/marquee/drexler.png", alt: "drexler" },
  { src: "/sponsors/marquee/emrax.png", alt: "emrax" },
  { src: "/sponsors/marquee/gck.png", alt: "gck" },
];
const sponsorLogosRow2 = [
  { src: "/sponsors/marquee/gm.png", alt: "gm" },
  { src: "/sponsors/marquee/gt2i.png", alt: "gt2i" },
  { src: "/sponsors/marquee/hearim.png", alt: "hearim" },
  { src: "/sponsors/marquee/hicar.png", alt: "hicar" },
  { src: "/sponsors/marquee/hoosier.png", alt: "hoosier" },
  { src: "/sponsors/marquee/hoseo.png", alt: "hoseo" },
  { src: "/sponsors/marquee/ipg.png", alt: "ipg" },
  { src: "/sponsors/marquee/jlc.png", alt: "jlc" },
  { src: "/sponsors/marquee/katech.png", alt: "katech" },
];
const sponsorLogosRow3 = [
  { src: "/sponsors/marquee/ken.png", alt: "ken" },
  { src: "/sponsors/marquee/kostech.png", alt: "kostech" },
  { src: "/sponsors/marquee/light.png", alt: "light" },
  { src: "/sponsors/marquee/redcon.png", alt: "redcon" },
  { src: "/sponsors/marquee/rincon.png", alt: "rincon" },
  { src: "/sponsors/marquee/sanyo.png", alt: "sanyo" },
  { src: "/sponsors/marquee/tilton.png", alt: "tilton" },
  { src: "/sponsors/marquee/works.png", alt: "works" },
  { src: "/sponsors/marquee/ys.png", alt: "ys" },
];

const loop = (arr: { src: string; alt: string }[]) => [...arr, ...arr];

function MarqueeRow({ logos, direction = "left", speedSec = 38 }: { logos: { src: string; alt: string }[]; direction?: "left" | "right"; speedSec?: number; }) {
  const cls = direction === "left" ? "marquee-track-left" : "marquee-track-right";
  return (
    <div className="marquee">
      <div className={`${cls}`} style={{ animationDuration: `${speedSec}s` }}>
        {loop(logos).map((l, idx) => (
          <div key={`${l.alt}-${idx}`} className="marquee-item" title={l.alt}>
            <img src={l.src} alt={l.alt} className="h-12 md:h-14 w-auto max-w-[180px] object-contain opacity-80 hover:opacity-100 transition" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div className={`min-h-screen bg-black text-white ${inter.className}`}>
      
      {/* 1. 네비게이션 바 */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="CHALLENGER Logo" className="h-12 md:h-14 w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-300">
            <a href="#about" className="hover:text-[#950000] transition">{t.nav.about}</a>
            <a href="#history" className="hover:text-[#950000] transition">{t.nav.competition}</a>
            <a href="#news" className="hover:text-[#950000] transition">{t.nav.news}</a>
            <Link href="/gallery" className="hover:text-[#950000] transition">{t.nav.gallery}</Link>
            <a href="#sponsors" className="hover:text-[#950000] transition">{t.nav.sponsors}</a>
            <a href="#contact" className="hover:text-[#950000] transition">{t.nav.contact}</a>

            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition text-white text-xs"
            >
              <Globe size={14} />
              <span>{language === "ko" ? "ENG" : "KOR"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. 히어로 섹션 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {(() => {
          const videoId = "8ErcU7HjICU";
          const startSec = 37;
          const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&start=${startSec}`;
          return (
            <div className="absolute inset-0 z-0">
              <iframe className="absolute inset-0 w-full h-full pointer-events-none" src={src} title="CHALLENGER Hero Video" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              <div className="absolute inset-0 bg-black/60 z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-20" />
            </div>
          );
        })()}
        <div className="relative z-30 text-center px-4 flex flex-col items-center">
          <p className="text-xl md:text-2xl font-bold text-[#950000] mb-4 tracking-[0.5em] uppercase animate-pulse font-corel">
            {t.hero.spirit}
          </p>
          <img src="/logo.png" alt="CHALLENGER Main Logo" className="w-[80vw] max-w-4xl h-auto object-contain drop-shadow-2xl mb-8" />
          <p className="text-lg md:text-xl font-medium text-gray-200/90 border-t border-gray-500/60 pt-6 px-10 leading-relaxed whitespace-pre-wrap">
            {t.hero.desc}
          </p>
        </div>
      </section>

      {/* 3. About */}
      <section id="about" className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="rounded-3xl bg-zinc-950 border border-white/10 p-10 flex flex-col justify-center">
              <p className="text-sm font-bold text-white/80 mb-3">About Us</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight break-keep">
                {t.about.title_1}
                <br />
                {t.about.title_2} <span className="text-[#950000] font-corel">CHALLENGER</span> spirit
              </h2>
              {/* ✅ 왼쪽 정렬 복구 */}
              <p className="mt-6 text-gray-400 text-lg leading-loose whitespace-pre-line break-keep text-left">
                {t.about.desc}
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 h-full min-h-[320px]">
              <img src="/vision/spirit.jpg" alt="Challenger Car Side" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="rounded-3xl overflow-hidden bg-zinc-950 border border-white/10">
              <img src="/vision/sex.jpg" alt="Night Shot" className="w-full h-[320px] object-cover" />
            </div>
            <div className="rounded-3xl bg-zinc-950 border border-white/10 p-10">
              <h3 className="text-3xl md:text-4xl font-black mb-4">{t.about.spirit_title}</h3>
              <p className="text-gray-400 text-lg leading-loose whitespace-pre-line break-keep text-left">
                {t.about.spirit_desc}
              </p>
            </div>
            <div className="rounded-3xl bg-zinc-950 border border-white/10 p-10">
              <h3 className="text-3xl md:text-4xl font-black mb-4">{t.about.vision_title}</h3>
              <p className="text-gray-400 text-lg leading-loose whitespace-pre-line break-keep text-left">
                {t.about.vision_desc}
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden bg-zinc-950 border border-white/10">
              <img src="/vision/team.jpg" alt="Team Shot" className="w-full h-[320px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. History */}
      <section id="history" className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs tracking-[0.35em] font-black text-[#950000]/80 mb-3 uppercase">
              {t.history.label}
            </p>
            <h2 className="text-4xl md:text-5xl font-black">
              {t.history.title}
            </h2>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_30px_80px_rgba(0,0,0,0.65)] overflow-hidden">
            <ul className="divide-y divide-white/10">
              {/* History Items (동일) */}
              <li className="group px-6 md:px-12 py-8 flex items-center gap-5 md:gap-7">
                <Link href="/specs/2025" className="hidden sm:block w-56 h-36 md:w-64 md:h-40 rounded-3xl overflow-hidden border border-white/15 bg-black/40 shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer">
                  <img src="/awards/2025-gold.jpg" alt="2025 Car" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </Link>
                <div className="w-14 md:w-20 shrink-0 text-white/70 font-corel text-xl md:text-2xl">2025</div>
                <div className="flex-1"><div className="text-xl md:text-2xl font-black">{t.awards.gold25_title}</div><div className="mt-2 text-sm md:text-base text-gray-400">{t.awards.gold25_desc}</div></div>
                <span className="shrink-0 px-4 py-2 rounded-full text-xs font-black border border-[#950000]/40 bg-[#950000]/15 text-white">GOLD</span>
              </li>
              <li className="group px-6 md:px-12 py-8 flex items-center gap-5 md:gap-7">
                <Link href="/specs/2025" className="hidden sm:block w-56 h-36 md:w-64 md:h-40 rounded-3xl overflow-hidden border border-white/15 bg-black/40 shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer">
                  <img src="/awards/2025-accel.png" alt="2025 Car" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </Link>
                <div className="w-14 md:w-20 shrink-0 text-white/70 font-corel text-xl md:text-2xl">2025</div>
                <div className="flex-1"><div className="text-xl md:text-2xl font-black">{t.awards.accel25_title}</div><div className="mt-2 text-sm md:text-base text-gray-400">{t.awards.accel25_desc}</div></div>
                <span className="shrink-0 px-4 py-2 rounded-full text-xs font-black border border-[#950000]/40 bg-[#950000]/15 text-white">1st Place</span>
              </li>
              <li className="group px-6 md:px-12 py-8 flex items-center gap-5 md:gap-7">
                <Link href="/specs/2022" className="hidden sm:block w-56 h-36 md:w-64 md:h-40 rounded-3xl overflow-hidden border border-white/15 bg-black/40 shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer">
                  <img src="/awards/2022-silver.jpg" alt="2022 Car" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </Link>
                <div className="w-14 md:w-20 shrink-0 text-white/70 font-corel text-xl md:text-2xl">2022</div>
                <div className="flex-1"><div className="text-xl md:text-2xl font-black">{t.awards.silver22_title}</div><div className="mt-2 text-sm md:text-base text-gray-400">{t.awards.silver22_desc}</div></div>
                <span className="shrink-0 px-4 py-2 rounded-full text-xs font-black border border-white/15 bg-white/5 text-white/80">SILVER</span>
              </li>
              <li className="group px-6 md:px-12 py-8 flex items-center gap-5 md:gap-7">
                <Link href="/specs/2020" className="hidden sm:block w-56 h-36 md:w-64 md:h-40 rounded-3xl overflow-hidden border border-white/15 bg-black/40 shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer">
                  <img src="/awards/2020-silver.jpg" alt="2020 Car" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </Link>
                <div className="w-14 md:w-20 shrink-0 text-white/70 font-corel text-xl md:text-2xl">2020</div>
                <div className="flex-1"><div className="text-xl md:text-2xl font-black">{t.awards.silver20_title}</div><div className="mt-2 text-sm md:text-base text-gray-400">{t.awards.silver20_desc}</div></div>
                <span className="shrink-0 px-4 py-2 rounded-full text-xs font-black border border-white/15 bg-white/5 text-white/80">SILVER</span>
              </li>
            </ul>
            <div className="px-6 md:px-12 py-5 text-xs md:text-sm text-gray-400 border-t border-white/10"><span className="text-white font-bold"> </span></div>
          </div>
        </div>
      </section>

      {/* 5. News Section */}
      <NewsSection />

      {/* 6. Sponsors */}
      <section id="sponsors" className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* 상단: 혜택 및 설명 (깔끔한 왼쪽 정렬) */}
          <div className="mb-12">
            <p className="text-xs tracking-[0.35em] font-black text-[#950000]/80 mb-3 uppercase">
              {t.sponsors.label}
            </p>
            <h2 className="text-4xl md:text-5xl font-black whitespace-pre-wrap leading-tight">
              {t.sponsors.main_copy}
            </h2>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed whitespace-pre-line">
              {t.sponsors.sub_copy}
            </p>
            {/* 혜택 아이콘 3개 나열 (간결하게) */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-white font-bold text-lg"><Megaphone className="text-[#950000]" size={20} /> {t.sponsors.benefits[0].title}</div>
                <p className="text-sm text-gray-400">{t.sponsors.benefits[0].desc}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-white font-bold text-lg"><Users className="text-[#950000]" size={20} /> {t.sponsors.benefits[1].title}</div>
                <p className="text-sm text-gray-400">{t.sponsors.benefits[1].desc}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-white font-bold text-lg"><Cpu className="text-[#950000]" size={20} /> {t.sponsors.benefits[2].title}</div>
                <p className="text-sm text-gray-400">{t.sponsors.benefits[2].desc}</p>
              </div>
            </div>
          </div>

          {/* ✅ 하단: 예전의 멋진 배너 디자인 복구! (Marquee + Overlay) */}
          <div className="relative rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.65)] h-[400px]">
            {/* Marquee (배경) */}
            <div className="absolute inset-0 flex flex-col justify-center opacity-40">
              <MarqueeRow logos={sponsorLogosRow1} direction="left" speedSec={44} />
              <MarqueeRow logos={sponsorLogosRow2} direction="right" speedSec={48} />
              <MarqueeRow logos={sponsorLogosRow3} direction="left" speedSec={52} />
            </div>
            
            {/* Overlay (검은색 딤처리 + 텍스트 + 버튼) */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="relative z-10 text-center px-6">
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  {t.sponsors.banner_title}
                </h2>
                <p className="text-gray-300/90 text-lg mb-8">
                  {t.sponsors.banner_desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* 스폰서 목록 버튼 */}
                  <Link href="/sponsors" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black font-black hover:bg-[#950000] hover:text-white transition">
                    {t.sponsors.list_btn}
                  </Link>
                  {/* 제안서 다운로드 버튼 (배너 안으로 쏙!) */}
                  <a 
                    href="/Challenger_Sponsorship_Proposal.pdf" 
                    download
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white font-bold hover:bg-white/10 transition"
                  >
                    <Download size={18} />
                    {t.sponsors.download_btn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer + Contact */}
      <section id="contact" className="bg-black py-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <img src="/logo.png" alt="CHALLENGER Logo" className="h-12 w-auto mb-8 object-contain" />
            <div className="space-y-6 text-gray-500 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#950000] mt-0.5 shrink-0" />
                <p className="whitespace-pre-wrap leading-relaxed">{t.contact.address}</p>
              </div>
              <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#950000] shrink-0" /><p>CHALLENGERFSAE@gmail.com</p></div>
              <div className="border-t border-zinc-800 my-4" />
              <div>
                <p className="text-white font-bold mb-2">{t.contact.chairman}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#950000]" />
                    <p>{t.contact.name_chair} +82) 10 4561 8947</p>
                  </div>
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#950000]" /><p>20212241@vision.hoseo.edu</p></div>
                </div>
              </div>
              <div>
                <p className="text-white font-bold mb-2">{t.contact.pm}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#950000]" />
                    <p>{t.contact.name_pm} +82) 10 4705 3671</p>
                  </div>
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#950000]" /><p>20212192@vision.hoseo.edu</p></div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <a href="https://instagram.com/challenger_fsae" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-full hover:bg-[#950000] transition text-white"><Instagram size={20} /></a>
              <a href="https://youtube.com/@CHALLENGERHOSEO" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900 rounded-full hover:bg-[#950000] transition text-white"><Youtube size={20} /></a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-96 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800"><iframe title="Hoseo University Asan Campus" className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%ED%98%B8%EC%84%9C%EB%8C%80%ED%95%99%EA%B5%90%20%EC%95%84%EC%82%B0%EC%BA%A0%ED%8D%BC%EC%8A%A4%20%EC%A0%9C2%EA%B3%B5%ED%95%99%EA%B4%80%20B10%ED%98%B8&output=embed" /></div>
            <div className="flex justify-end"><a href="https://www.google.com/maps?q=%ED%98%B8%EC%84%9C%EB%8C%80%ED%95%99%EA%B5%90%20%EC%95%84%EC%82%B0%EC%BA%A0%ED%8D%BC%EC%8A%A4%20%EC%A0%9C2%EA%B3%B5%ED%95%99%EA%B4%80%20B10%ED%98%B8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-sm font-bold text-white hover:bg-[#950000] hover:border-[#950000] transition">Open in Google Maps</a></div>
          </div>
        </div>
        <div className="text-center text-zinc-700 text-xs mt-16 border-t border-zinc-900 pt-8">© Formula Student Team CHALLENGER. All rights reserved.</div>
      </section>
    </div>
  );
}