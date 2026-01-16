"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
// ✅ 언어 설정 가져오기 (경로 주의!)
import { useLanguage } from "../../context/LanguageContext";

type SpecRow = { label: string; value: string };

// ✅ 여기에 한국어(ko)와 영어(en) 데이터를 모두 넣습니다.
// 이렇게 하면 translations.ts를 더럽히지 않고도 완벽하게 관리할 수 있습니다.
const SPECS: Record<
  string,
  {
    image?: string;
    ko: { title: string; subtitle: string; rows: SpecRow[] };
    en: { title: string; subtitle: string; rows: SpecRow[] };
  }
> = {
  "2025": {
    image: "/awards/2025-gold.jpg",
    ko: {
      title: "DF-25",
      subtitle: "KSAE 대학생 자작자동차 대회 (2025)",
      rows: [
        { label: "전장 / 전폭 / 전고", value: "2954 / 1493 / 1040 mm" },
        { label: "축거", value: "1515 mm" },
        { label: "윤거(전/후)", value: "1280 / 1260 mm" },
        { label: "공차 무게", value: "229 kg" },
        { label: "무게 배분(전/후)", value: "49% / 51%" },
        { label: "Cell", value: "Samsung 21700 40T" },
        { label: "축전지", value: "294 V / 315 A" },
        { label: "모터 / 인버터", value: "EMRAX 228 MV / CM200DZ" },
        { label: "종 감속비", value: "3.73" },
      ],
    },
    en: {
      title: "DF-25",
      subtitle: "KSAE Formula Student Korea (2025)",
      rows: [
        { label: "L / W / H", value: "2954 / 1493 / 1040 mm" },
        { label: "Wheelbase", value: "1515 mm" },
        { label: "Track (F/R)", value: "1280 / 1260 mm" },
        { label: "Weight", value: "229 kg" },
        { label: "Weight Dist. (F/R)", value: "49% / 51%" },
        { label: "Cell", value: "Samsung 21700 40T" },
        { label: "Accumulator", value: "294 V / 315 A" },
        { label: "Motor / Inverter", value: "EMRAX 228 MV / CM200DZ" },
        { label: "Final Drive Ratio", value: "3.73" },
      ],
    },
  },

  "2024": {
    image: "/awards/2024-car.jpg",
    ko: {
      title: "DF-24",
      subtitle: "안정화 이후, 새로운 가능성을 탐색한 진화의 단계",
      rows: [
        { label: "전장 / 전폭 / 전고", value: "2954 / 1493 / 1040 mm" },
        { label: "축거", value: "1550 mm" },
        { label: "윤거", value: "1280 mm" },
        { label: "공차 무게", value: "206 kg" },
        { label: "무게 배분(전/후)", value: "50% / 50%" },
        { label: "Cell", value: "Samsung 21700 40T" },
        { label: "축전지", value: "294 V / 315 A" },
        { label: "모터 / 인버터", value: "EMRAX 228 MV / Bamocar 700/400" },
        { label: "종 감속비", value: "3.18" },
      ],
    },
    en: {
      title: "DF-24",
      subtitle: "Evolution exploring new possibilities after stabilization.",
      rows: [
        { label: "L / W / H", value: "2954 / 1493 / 1040 mm" },
        { label: "Wheelbase", value: "1550 mm" },
        { label: "Track", value: "1280 mm" },
        { label: "Weight", value: "206 kg" },
        { label: "Weight Dist. (F/R)", value: "50% / 50%" },
        { label: "Cell", value: "Samsung 21700 40T" },
        { label: "Accumulator", value: "294 V / 315 A" },
        { label: "Motor / Inverter", value: "EMRAX 228 MV / Bamocar 700/400" },
        { label: "Final Drive Ratio", value: "3.18" },
      ],
    },
  },

  "2023": {
    image: "/awards/2023-car.jpg",
    ko: {
      title: "DF-23",
      subtitle: "첫 도전 위에 쌓아 올린, 한 단계 진화한 E-Formula",
      rows: [
        { label: "전장 / 전폭 / 전고", value: "2950 / 1405 / 1140 mm" },
        { label: "축거", value: "1550 mm" },
        { label: "윤거", value: "1320 mm" },
        { label: "공차 무게", value: "210 kg" },
        { label: "무게 배분(전/후)", value: "50% / 50%" },
        { label: "Cell", value: "Samsung 21700 40T" },
        { label: "축전지", value: "294 V / 315 A" },
        { label: "모터 / 인버터", value: "EMRAX 228 MV / Bamocar 700/400" },
        { label: "종 감속비", value: "3.25" },
      ],
    },
    en: {
      title: "DF-23",
      subtitle: "E-Formula evolved one step further, built on the first challenge.",
      rows: [
        { label: "L / W / H", value: "2950 / 1405 / 1140 mm" },
        { label: "Wheelbase", value: "1550 mm" },
        { label: "Track", value: "1320 mm" },
        { label: "Weight", value: "210 kg" },
        { label: "Weight Dist. (F/R)", value: "50% / 50%" },
        { label: "Cell", value: "Samsung 21700 40T" },
        { label: "Accumulator", value: "294 V / 315 A" },
        { label: "Motor / Inverter", value: "EMRAX 228 MV / Bamocar 700/400" },
        { label: "Final Drive Ratio", value: "3.25" },
      ],
    },
  },

  "2022": {
    image: "/awards/2022-silver.jpg",
    ko: {
      title: "DF-22",
      subtitle: "첫 E-Formula, 첫 Z-Damper, 첫 Carbon Wheel 도전의 집약체",
      rows: [
        { label: "전장 / 전폭 / 전고", value: "2950 / 1405 / 1140 mm" },
        { label: "축거", value: "1600 mm" },
        { label: "윤거(전/후)", value: "1220 / 1220 mm" },
        { label: "공차 무게", value: "227.5 kg" },
        { label: "무게 배분(전/후)", value: "48% / 52%" },
        { label: "Cell", value: "Samsung 18650 25r" },
        { label: "축전지", value: "294 V / 270 A" },
        { label: "모터 / 인버터", value: "EMRAX 228 MV / Bamocar 700/400" },
        { label: "종 감속비", value: "3.09" },
      ],
    },
    en: {
      title: "DF-22",
      subtitle: "The culmination of challenges: First E-Formula, First Z-Damper, First Carbon Wheel.",
      rows: [
        { label: "L / W / H", value: "2950 / 1405 / 1140 mm" },
        { label: "Wheelbase", value: "1600 mm" },
        { label: "Track (F/R)", value: "1220 / 1220 mm" },
        { label: "Weight", value: "227.5 kg" },
        { label: "Weight Dist. (F/R)", value: "48% / 52%" },
        { label: "Cell", value: "Samsung 18650 25r" },
        { label: "Accumulator", value: "294 V / 270 A" },
        { label: "Motor / Inverter", value: "EMRAX 228 MV / Bamocar 700/400" },
        { label: "Final Drive Ratio", value: "3.09" },
      ],
    },
  },

  "2020": {
    image: "/awards/2020-silver.jpg",
    ko: {
      title: "DF-20",
      subtitle: `마지막 내연기관 차량.\nC-Formula 시대를 마무리하는 마지막 기록이자 E-Formula 도전의 시작`,
      rows: [
        { label: "전장 / 전폭 / 전고", value: "2930 / 1372 / 1195 mm" },
        { label: "축거", value: "1610 mm" },
        { label: "윤거(전/후)", value: "1200 / 1200 mm" },
        { label: "공차 무게", value: "230 kg" },
        { label: "무게 배분(전/후)", value: "48% / 52%" },
        { label: "구동계", value: "Honda CBR600rr" },
        { label: "종 감속비", value: "3.54" },
      ],
    },
    en: {
      title: "DF-20",
      subtitle: `The Last ICE Vehicle.\nThe final record concluding the C-Formula era and the beginning of the E-Formula challenge.`,
      rows: [
        { label: "L / W / H", value: "2930 / 1372 / 1195 mm" },
        { label: "Wheelbase", value: "1610 mm" },
        { label: "Track (F/R)", value: "1200 / 1200 mm" },
        { label: "Weight", value: "230 kg" },
        { label: "Weight Dist. (F/R)", value: "48% / 52%" },
        { label: "Powertrain", value: "Honda CBR600rr" },
        { label: "Final Drive Ratio", value: "3.54" },
      ],
    },
  },
};

// 2021년은 2020년 데이터 공유
SPECS["2021"] = SPECS["2020"];

export default function SpecsYearPage() {
  const params = useParams();
  const year = typeof params.year === "string" ? params.year : "2025";
  const data = SPECS[year];

  // ✅ 2. 전역 상태 사용! (useState 대신 useLanguage 사용)
  const { language, toggleLanguage } = useLanguage();

  if (!data) return null; // 데이터 없으면 로딩 안 함

  // ✅ 현재 언어(ko/en)에 맞는 데이터 선택
  const content = data[language];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.35em] font-black text-[#950000]/80 uppercase">
              Vehicle Specs
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-black">
              {year} · {content.title}
            </h1>
            <p className="mt-3 text-gray-400 max-w-2xl whitespace-pre-wrap break-keep">
              {content.subtitle}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
            {/* ✅ 언어 변경 버튼 추가 */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition text-white text-sm"
            >
              <Globe size={16} />
              <span>{language === "ko" ? "ENG" : "KOR"}</span>
            </button>

            <Link
              href="/#history"
              className="px-5 py-2 rounded-full border border-white/15 bg-white/5 text-sm font-bold hover:bg-white/10 transition"
            >
              Back
            </Link>
          </div>
        </div>

        {/* 메인 콘텐츠 (이미지 + 스펙표) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
            {data.image && <img src={data.image} alt="car" className="w-full h-auto object-contain" />}
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10">
              <div className="text-lg font-black">Vehicle Specifications</div>
            </div>
            <div className="divide-y divide-white/10">
              {content.rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[1fr_1.2fr] gap-4 px-6 py-4">
                  <div className="text-gray-300 font-bold">{r.label}</div>
                  <div className="text-white">{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 연도 이동 버튼들 */}
        <div className="mt-10 flex flex-wrap gap-3">
          {["2025", "2024", "2023", "2022", "2021", "2020"].map((y) => (
            <Link
              key={y}
              href={`/specs/${y}`}
              className={`px-5 py-2.5 rounded-full text-sm font-bold border transition
                ${
                  y === year
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                }`}
            >
              {y}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}