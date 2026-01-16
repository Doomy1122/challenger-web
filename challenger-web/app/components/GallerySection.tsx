import React from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";

// ✅ 갤러리 설정 (DF-25, DF-22 추가됨)
const GALLERY_CATEGORIES = [
  { id: "df-25", title: "DF-25", year: "2025" },
  { id: "df-22", title: "DF-22", year: "2022" }, // 👈 여기에 DF-22 추가했습니다!
  // { id: "df-26", title: "DF-26", year: "2026" }, // 나중에 주석 풀고 폴더 만들면 됨
];

// ✅ 서버에서 폴더 내 파일 목록 읽어오는 함수
function getImagesFromFolder(folderName: string) {
  try {
    const dirPath = path.join(process.cwd(), "public", "gallery", folderName);
    const files = fs.readdirSync(dirPath);
    
    // 이미지 파일만 걸러내기 (jpg, png, webp, gif 등)
    const images = files.filter((file) => 
      /\.(jpg|jpeg|png|webp|gif|heic)$/i.test(file)
    );
    
    // 전체 경로 반환 (/gallery/폴더명/파일명.jpg)
    return images.map((img) => `/gallery/${folderName}/${img}`);
  } catch (error) {
    // 폴더가 없으면 에러가 아닌 빈 배열 반환 (화면에 안 뜨게)
    return [];
  }
}

export default function GallerySection() {
  return (
    <section id="gallery" className="py-28 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* 헤더 */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.35em] font-black text-[#950000]/80 mb-3 uppercase">
            Memories
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Gallery
          </h2>
        </div>

        {/* 카테고리별 갤러리 루프 */}
        <div className="space-y-20">
          {GALLERY_CATEGORIES.map((category) => {
            const images = getImagesFromFolder(category.id);

            // 사진이 하나도 없으면 이 섹션은 아예 숨김
            if (images.length === 0) return null;

            return (
              <div key={category.id}>
                {/* 소제목 (예: DF-25 2025) */}
                <div className="flex items-end gap-4 mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-3xl font-black text-white">{category.title}</h3>
                  <span className="text-lg font-bold text-gray-500 mb-1">{category.year}</span>
                </div>

                {/* 사진 그리드 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((src, index) => (
                    <div 
                      key={index} 
                      className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900 border border-white/5 cursor-pointer"
                    >
                      <img
                        src={src}
                        alt={`${category.title} Photo ${index + 1}`}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
                        loading="lazy"
                      />
                      
                      {/* 호버 시 확대 아이콘 */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <Link 
                          href={src} 
                          target="_blank"
                          className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#950000] transition"
                        >
                          VIEW FULL
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}