"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Heart, MessageCircle, Instagram } from "lucide-react";

// ✅ 인스타그램 데이터 타입 정의
interface InstaPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  thumbnail_url?: string; // 동영상일 경우 썸네일
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

export default function NewsSection() {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ 나중에 여기에 'Behold.so' 같은 곳에서 받은 JSON URL을 넣으면 됩니다.
  // 지금은 비워두면 아래 '더미 데이터'가 나옵니다.
  const INSTAGRAM_FEED_URL = "https://feeds.behold.so/OW7qH8D0M6gQwvkQAiFw"; 

  useEffect(() => {
    async function fetchInstagram() {
      try {
        if (!INSTAGRAM_FEED_URL) throw new Error("No URL");
        
        const res = await fetch(INSTAGRAM_FEED_URL);
        const data = await res.json();
        // 최신 7개만 자르기
        setPosts(data.slice(0, 7));
      } catch (error) {
        console.log("Using fallback data (Instagram API not connected)");
        // ❌ API 연결 전까지 보여줄 임시 데이터 (더미)
        setPosts([
          { id: "1", media_type: "IMAGE", media_url: "/vision/spirit.jpg", permalink: "https://instagram.com", caption: "2025 Season Start! 🔥 #CHALLENGER" },
          { id: "2", media_type: "IMAGE", media_url: "/vision/team.jpg", permalink: "https://instagram.com", caption: "Team Workshop Day 🛠️" },
          { id: "3", media_type: "IMAGE", media_url: "/vision/sex.jpg", permalink: "https://instagram.com", caption: "Night testing runs 🏎️💨" },
          { id: "4", media_type: "IMAGE", media_url: "/vision/good.jpg", permalink: "https://instagram.com", caption: "Engineering Design Finals" },
          { id: "5", media_type: "IMAGE", media_url: "/vision/spirit.jpg", permalink: "https://instagram.com", caption: "New Chassis Welding" },
          { id: "6", media_type: "IMAGE", media_url: "/vision/team.jpg", permalink: "https://instagram.com", caption: "Sponsorship meeting success" },
          { id: "7", media_type: "IMAGE", media_url: "/vision/sex.jpg", permalink: "https://instagram.com", caption: "Ready for KSAE 2025" },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagram();
  }, []);

  return (
    <section id="news" className="py-28 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-[0.35em] font-black text-[#950000]/80 mb-3 uppercase">
              Social Media
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Latest News
            </h2>
          </div>
          
          <a
            href="https://instagram.com/challenger_fsae"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#950000] transition"
          >
            <Instagram size={18} />
            @challenger_fsae
            <ExternalLink size={14} />
          </a>
        </div>

        {/* 그리드 레이아웃 (1번 게시물은 크게, 나머지는 작게) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
          {posts.map((post, idx) => {
            // 첫 번째 게시물은 가로세로 2칸 차지 (Big Card)
            const isFirst = idx === 0;
            const spanClass = isFirst ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1";

            return (
              <Link
                href={post.permalink}
                key={post.id}
                target="_blank"
                className={`group relative block overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 ${spanClass}`}
              >
                {/* 이미지 */}
                <img
                  src={post.media_type === "VIDEO" && post.thumbnail_url ? post.thumbnail_url : post.media_url}
                  alt={post.caption || "Instagram Post"}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-60"
                />

                {/* 오버레이 (호버 시 등장) */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {post.caption}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-4 text-[#950000]">
                    <span className="flex items-center gap-1.5 text-xs font-bold">
                      <Heart size={14} fill="currentColor" /> Like
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold">
                      <MessageCircle size={14} fill="currentColor" /> Comment
                    </span>
                  </div>
                </div>

                {/* 인스타 아이콘 (우상단) */}
                <div className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/80 group-hover:bg-[#950000] group-hover:text-white transition">
                  <Instagram size={isFirst ? 24 : 16} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}