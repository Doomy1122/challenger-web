import React from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";

// ✅ 갤러리 설정
const GALLERY_CATEGORIES = [
  { id: "df-25", title: "DF-25", year: "2025" },
  { id: "df-24", title: "DF-24", year: "2024" },
  { id: "df-23", title: "DF-23", year: "2023" },
  { id: "df-22", title: "DF-22", year: "2022" },
];

function getImagesFromFolder(folderName: string) {
  try {
    const dirPath = path.join(process.cwd(), "public", "gallery", folderName);
    const files = fs.readdirSync(dirPath);
    
    const images = files.filter((file) => 
      /\.(jpg|jpeg|png|webp|gif|heic)$/i.test(file)
    );
    
    return images.map((img) => `/gallery/${folderName}/${img}`);
  } catch (error) {
    return [];
  }
}

export default function GallerySection() {
  return (
    <section id="gallery" className="py-28 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs tracking-[0.35em] font-black text-[#950000]/80 mb-3 uppercase">
            Memories
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Gallery
          </h2>
        </div>

        <div className="space-y-20">
          {GALLERY_CATEGORIES.map((category) => {
            const images = getImagesFromFolder(category.id);

            if (images.length === 0) return null;

            return (
              <div key={category.id}>
                <div className="flex items-end gap-4 mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-3xl font-black text-white">{category.title}</h3>
                  <span className="text-lg font-bold text-gray-500 mb-1">{category.year}</span>
                </div>

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