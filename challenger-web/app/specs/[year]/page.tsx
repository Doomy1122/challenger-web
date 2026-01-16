import React from "react";
import Link from "next/link";

type SpecRow = { label: string; value: string };

// ✅ 2020년, 2021년 공통 데이터 (재사용)
const DF20_DATA = {
  title: "DF-20",
  // 백틱(`)을 사용해 줄바꿈이 반영된 텍스트
  subtitle: `마지막 내연기관 차량.
C-Formula 시대를 마무리하는 마지막 기록이자 E-Formula 도전의 시작`,

  image: "/awards/2020-silver.jpg",
  rows: [
    { label: "전장 / 전폭 / 전고", value: "2850 / 1430 / 1010 mm" },
    { label: "축거", value: "1480 mm" },
    { label: "윤거(전/후)", value: "1250 / 1230 mm" },
    { label: "공차 무게", value: "245 kg" },
    { label: "무게 배분(전/후)", value: "48% / 52%" },
    { label: "구동계", value: "Honda CBR600RR" },
    { label: "종 감속비", value: "3.80" },
  ],
};

const SPECS: Record<
  string,
  { title: string; subtitle: string; image?: string; rows: SpecRow[] }
> = {
  "2025": {
    title: "DF-25",
    subtitle: "KSAE Formula Student Korea (2025)",
    image: "/awards/2025-gold.jpg",
    rows: [
      { label: "전장 / 전폭 / 전고", value: "2954 / 1493 / 1040 mm" },
      { label: "축거", value: "1515 mm" },
      { label: "윤거(전/후)", value: "1280 / 1260 mm" },
      { label: "공차 무게", value: "229 kg" },
      { label: "무게 배분(전/후)", value: "49% / 51%" },
      { label: "배터리", value: "Samsung 21700 40T" },
      { label: "축전지", value: "294 V / 245 A" },
      { label: "모터 / 인버터", value: "EMRAX 228 MV / CM200DZ" },
      { label: "종 감속비", value: "3.73" },
    ],
  },
  
  // ✅ 2024년 데이터 추가 (내용을 실제 제원으로 수정해주세요)
  "2024": {
    title: "DF-24",
    subtitle: "안정화 이후, 새로운 가능성을 탐색한 진화의 단계",
    image: "/awards/2024-car.jpg", // ⚠️ 이미지 파일명 확인 필요
    rows: [
      { label: "전장 / 전폭 / 전고", value: "0000 / 0000 / 0000 mm" },
      { label: "축거", value: "0000 mm" },
      { label: "윤거(전/후)", value: "0000 / 0000 mm" },
      { label: "공차 무게", value: "000 kg" },
      { label: "무게 배분(전/후)", value: "00% / 00%" },
      { label: "배터리", value: "Samsung 21700 40T" },
      { label: "축전지", value: "000 V / 000 A" },
      { label: "모터 / 인버터", value: "EMRAX 228 MV / Bamocar 700/400" },
      { label: "종 감속비", value: "0.00" },
    ],
  },

  // ✅ 2023년 데이터 추가 (내용을 실제 제원으로 수정해주세요)
  "2023": {
    title: "DF-23",
    subtitle: "첫 도전 위에 쌓아 올린, 한 단계 진화한 E-Formula",
    image: "/awards/2023-car.jpg", // ⚠️ 이미지 파일명 확인 필요
    rows: [
      { label: "전장 / 전폭 / 전고", value: "0000 / 0000 / 0000 mm" },
      { label: "축거", value: "0000 mm" },
      { label: "윤거(전/후)", value: "0000 / 0000 mm" },
      { label: "공차 무게", value: "000 kg" },
      { label: "무게 배분(전/후)", value: "00% / 00%" },
      { label: "배터리", value: "Samsung 21700 40T" },
      { label: "축전지", value: "000 V / 000 A" },
      { label: "모터 / 인버터", value: "EMRAX 228 MV / Bamocar 700/400" },
      { label: "종 감속비", value: "0.00" },
    ],
  },

  "2022": {
    title: "DF-22",
    subtitle: "첫 E-Formula, 첫 Z-Damper, 첫 Carbon Wheel 도전의 집약체",
    image: "/awards/2022-silver.jpg",
    rows: [
      { label: "전장 / 전폭 / 전고", value: "2870 / 1460 / 1030 mm" },
      { label: "축거", value: "1490 mm" },
      { label: "윤거(전/후)", value: "1260 / 1240 mm" },
      { label: "공차 무게", value: "238 kg" },
      { label: "무게 배분(전/후)", value: "48% / 52%" },
      { label: "배터리", value: "Samsung 18650 25r)" },
      { label: "축전지", value: "280 V / 220 A" },
      { label: "모터 / 인버터", value: "EMRAX 228 MV / Bamocar 700/400" },
      { label: "종 감속비", value: "3.60" },
    ],
  },
  
  // ✅ 2021년과 2020년 연결
  "2021": DF20_DATA,
  "2020": DF20_DATA,
};

type Props = {
  params: Promise<{ year: string }>;
};

export default async function SpecsYearPage({ params }: Props) {
  const resolvedParams = await params;
  const year = resolvedParams.year;
  const data = SPECS[year];

  // 없는 연도 처리
  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-3xl font-black">Specs not found</h1>
          <p className="mt-4 text-gray-400">해당 연도({year}) 제원이 없습니다.</p>
          <Link
            href="/#history"
            className="inline-flex mt-8 px-6 py-3 rounded-full bg-white text-black font-black hover:bg-[#950000] hover:text-white transition"
          >
            Back to Awards
          </Link>
        </div>
      </div>
    );
  }

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
              {year} · {data.title}
            </h1>
            {/* ✅ whitespace-pre-wrap 추가: 엔터 줄바꿈 반영 */}
            <p className="mt-3 text-gray-400 max-w-2xl whitespace-pre-wrap break-keep">
              {data.subtitle}
            </p>
          </div>

          <Link
            href="/#history"
            className="shrink-0 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-sm font-bold hover:bg-white/10 transition"
          >
            Back
          </Link>
        </div>

        {/* 메인 콘텐츠 (이미지 + 스펙표) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          {/* 왼쪽: 차량 이미지 */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
            {data.image ? (
              <img
                src={data.image}
                alt={`${data.title} image`}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                (차량 이미지 준비중)
              </div>
            )}
          </div>

          {/* 오른쪽: 스펙 리스트 */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10">
              <div className="text-lg font-black">Vehicle Specifications</div>
            </div>

            <div className="divide-y divide-white/10">
              {data.rows.map((r) => (
                <div
                  key={r.label}
                  className="grid grid-cols-[1fr_1.2fr] gap-4 px-6 py-4"
                >
                  <div className="text-gray-300 font-bold">{r.label}</div>
                  <div className="text-white">{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단: 연도 이동 버튼들 (2025 ~ 2020) */}
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