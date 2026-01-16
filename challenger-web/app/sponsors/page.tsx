"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Instagram, Youtube } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

const tiers = [
  {
    title: "Lifetime Sponsor",
    items: [
      { name: "AI4U Hoseo University", src: "/sponsors/marquee/tiers/Lifetime/hoseo.png" },
      { name: "W-WORKS KOREA", src: "/sponsors/marquee/tiers/Lifetime/works.png" },
    ],
  },
  {
    title: "Diamond Sponsor",
    items: [
      { name: "GM", src: "/sponsors/marquee/tiers/Diamond/gm.png" },
      { name: "HEARIM", src: "/sponsors/marquee/tiers/Diamond/hearim.png" },
      { name: "HYUNDAI", src: "/sponsors/marquee/tiers/Diamond/hyundai.png" },
      { name: "KATECH", src: "/sponsors/marquee/tiers/Diamond/Katech.png" },
      { name: "LLight", src: "/sponsors/marquee/tiers/Diamond/light.png" },
      { name: "Brian KIM WORKS", src: "/sponsors/marquee/tiers/Diamond/brian.png" },
    ],
  },
  {
    title: "Platinum Sponsor",
    items: [
      { name: "ALTAIR", src: "/sponsors/marquee/tiers/Platinum/altair.png" },
      { name: "ANSYS", src: "/sponsors/marquee/tiers/Platinum/ansys.png" },
      { name: "Harvestance", src: "/sponsors/marquee/tiers/Platinum/harve.png" },
      { name: "HEXAGON", src: "/sponsors/marquee/tiers/Platinum/hexagon.png" },
      { name: "IPG", src: "/sponsors/marquee/tiers/Platinum/ipg.png" },
      { name: "JLCPCB", src: "/sponsors/marquee/tiers/Platinum/jlc.png" },
      { name: "KOSTECH", src: "/sponsors/marquee/tiers/Platinum/kostech.png" },
      { name: "MathWorks", src: "/sponsors/marquee/tiers/Platinum/mathworks.png" },
      { name: "Y.S. TECH", src: "/sponsors/marquee/tiers/Platinum/ys.png" },
    ],
  },
  {
    title: "Gold Sponsor",
    items: [
      { name: "BENDER", src: "/sponsors/marquee/tiers/Gold/bender.png" },
      { name: "CAROUND", src: "/sponsors/marquee/tiers/Gold/caround.png" },
      { name: "GT2i", src: "/sponsors/marquee/tiers/Gold/gt2i.png" },
    ],
  },
  {
    title: "Silver Sponsor",
    items: [
      { name: "AIM", src: "/sponsors/marquee/tiers/Silver/aim.png" },
      { name: "Calspan", src: "/sponsors/marquee/tiers/Silver/calspan.png" },
      { name: "CASCADIA MOTION", src: "/sponsors/marquee/tiers/Silver/cascadia.png" },
      { name: "DASSAULT SYSTEMS", src: "/sponsors/marquee/tiers/Silver/das.png" },
      { name: "EMRAX", src: "/sponsors/marquee/tiers/Silver/emrax.png" },
      { name: "HOOSIER", src: "/sponsors/marquee/tiers/Silver/hoosier.png" },
      { name: "KEUNYUNG", src: "/sponsors/marquee/tiers/Silver/ken.png" },
      { name: "MKS", src: "/sponsors/marquee/tiers/Silver/mks.png" },
      { name: "tilton", src: "/sponsors/marquee/tiers/Silver/tilton.png" },
    ],
  },
];

function SponsorCard({ name, src }: { name: string; src: string }) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-8 border border-white/10 flex flex-col items-center justify-center hover:border-white/30 transition duration-300">
      <div className="h-24 md:h-32 w-full flex items-center justify-center">
        <img
          src={src}
          alt={name}
          className="max-h-full max-w-full object-contain"
          draggable={false}
        />
      </div>
      <p className="mt-4 text-sm font-bold text-gray-400">{name}</p>
    </div>
  );
}

export default function SponsorsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    supportType: "Financial Sponsorship",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, supportType, subject, message } = formData;
    const mailTo = "20212241@vision.hoseo.edu";
    const body = `Name: ${name}
Email: ${email}
Support Type: ${supportType}
--------------------------------
${message}`;

    window.location.href = `mailto:${mailTo}?subject=[Sponsorship Inquiry] ${subject}&body=${encodeURIComponent(
      body
    )}`;
  };

  // ✅ 공통 스타일 변수 (본문 텍스트 통일용)
  const contentClass = "text-gray-300 text-base leading-relaxed";

  return (
    <div className={`min-h-screen bg-black text-white ${inter.className}`}>
      {/* 1. 상단 네비게이션 바 */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-black tracking-tight text-xl">Sponsors</div>

          <div className="flex gap-4">
            <Link
              href="#join"
              className="hidden md:inline-flex items-center px-6 py-2 rounded-full border border-white/20 bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition"
            >
              Join Us
            </Link>

            <Link
              href="/#sponsors"
              className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-[#950000] hover:text-white transition"
            >
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* 2. 타이틀 섹션 */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Sponsors
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Thank you for supporting{" "}
            <span className="text-[#950000] font-bold">CHALLENGER</span>.
          </p>

          <Link
            href="#join"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#950000] text-white font-bold hover:bg-[#b00000] transition shadow-[0_10px_30px_rgba(149,0,0,0.3)]"
          >
            Become a Sponsor
          </Link>
        </div>

        {/* 3. 스폰서 리스트 */}
        <div className="space-y-24">
          {tiers.map((tier) => (
            <section key={tier.title}>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  {tier.title}
                </h2>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              {tier.items.length === 0 ? (
                <div className="text-center py-10 rounded-2xl border border-dashed border-zinc-800 text-zinc-600">
                  (Add sponsors here)
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tier.items.map((it, idx) => (
                    <SponsorCard
                      key={`${it.name}-${idx}`}
                      name={it.name}
                      src={it.src}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* 4. 구분선 */}
        <div className="h-px w-full bg-zinc-800 my-32" />

        {/* 5. Join Us (Contact Form) 섹션 */}
        <section id="join" className="scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* 왼쪽: 회사/팀 정보 (Company Info) */}
            <div>
              <h2 className="text-2xl font-bold border-b-2 border-white pb-3 mb-8 inline-block">
                SPONSORSHIP INQUIRY
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-white text-lg font-bold mb-2">
                    Team Address:
                  </h3>
                  {/* ✅ 모든 본문 텍스트 스타일 통일 */}
                  <p className={contentClass}>
                    충청남도 아산시 배방읍 호서로79번길 20, <br />
                    호서대학교 아산캠퍼스 제2공학관 B10호 <br />
                    (Formula Student Team CHALLENGER)
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-lg font-bold mb-2">E-mail:</h3>
                  <a
                    href="mailto:CHALLENGERFSAE@gmail.com"
                    className={`${contentClass} hover:text-white transition underline decoration-1 underline-offset-4`}
                  >
                    CHALLENGERFSAE@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-white text-lg font-bold mb-2">Phone:</h3>
                  
                  {/* 회장 정보 */}
                  <p className={contentClass}>회장 (Chairman):</p>
                  {/* ✅ 이름/번호 부분만 볼드체 적용 */}
                  <p className={`${contentClass} font-bold mt-1`}>
                    전진우 +82) 10 4561 8947
                  </p>
                  <a
                    href="mailto:20212241@vision.hoseo.edu"
                    className={`${contentClass} block hover:text-white mt-1 transition`}
                  >
                    20212241@vision.hoseo.edu
                  </a>

                  {/* 팀장 정보 */}
                  <p className={`${contentClass} mt-6`}>팀장 (Project Manager):</p>
                  {/* ✅ 이름/번호 부분만 볼드체 적용 */}
                  <p className={`${contentClass} font-bold mt-1`}>
                    박민수 +82) 10 4705 3671
                  </p>
                  <a
                    href="mailto:20212192@vision.hoseo.edu"
                    className={`${contentClass} block hover:text-white mt-1 transition`}
                  >
                    20212192@vision.hoseo.edu
                  </a>
                </div>

                <div>
                  <h3 className="text-white text-lg font-bold mb-2">Social:</h3>
                  <div className={`flex gap-4 ${contentClass}`}>
                    <a
                      href="https://www.instagram.com/challenger_fsae"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition flex items-center gap-2"
                    >
                      <Instagram size={20} /> Instagram
                    </a>
                    <a
                      href="https://www.youtube.com/@CHALLENGERHOSEO"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition flex items-center gap-2"
                    >
                      <Youtube size={20} /> Youtube
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 입력 폼 (Contact Us) */}
            <div className="bg-zinc-900/50 p-8 md:p-10 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold border-b-2 border-white pb-3 mb-8 inline-block">
                CONTACT US
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#950000] transition"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#950000] transition"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">
                    Type of support *
                  </label>
                  <div className="relative">
                    <select
                      name="supportType"
                      value={formData.supportType}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#950000] transition"
                    >
                      <option>Financial Sponsorship</option>
                      <option>Technical / Material Support</option>
                      <option>Software / License</option>
                      <option>Other Inquiry</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#950000] transition"
                    placeholder="Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#950000] transition resize-none"
                    placeholder="How can we work together?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-3 bg-[#950000] text-white font-bold rounded-lg hover:bg-[#b00000] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}