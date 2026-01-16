"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Heart, MessageCircle, Instagram } from "lucide-react";

// ✅ JSON 데이터 구조에 맞게 수정됨 (CamelCase 적용)
interface InstaPost {
  id: string;
  mediaUrl: string;       // JSON에서 mediaUrl로 옴
  permalink: string;
  caption?: string;
  thumbnailUrl?: string;  // 동영상 썸네일
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"; // JSON에서 mediaType으로 옴
}

export default function NewsSection() {
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(true);

  const INSTAGRAM_FEED_URL = "https://feeds.behold.so/OW7qH8D0M6gQwvkQAiFw"; 

  useEffect(() => {
    async function fetchInstagram() {
      try {
        const res = await fetch(INSTAGRAM_FEED_URL);
        const data = await res.json();
        
        // ✅ 중요: JSON 구조가 { posts: [...] } 형태이므로 data.posts를 가져와야 함
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts.slice(0, 7));
        } else {
          // 만약 구조가 다르다면 그냥 data 자체가 배열일 수도 있음 (안전장치)
          setPosts(Array.isArray(data) ? data.slice(0, 7) : []);
        }

      } catch (error) {
        console.error("Instagram fetch error:", error);
        // 에러 시 빈 배열 (혹은 더미 데이터 유지 가능)
        setPosts([]); 
      } finally {
        setLoading(false);
      }
    }

    fetchInstagram();
  }, []);

  // 로딩 중이거나 게시물이 없을 때 아무것도 안 보이게 처리 (깔끔하게)
  if (!loading && posts.length === 0) return null;

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

        {/* 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
          {posts.map((post, idx) => {
            // 첫 번째 게시물은 가로세로 2칸 차지 (Big Card)
            const isFirst = idx === 0;
            const spanClass = isFirst ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1";

            // ✅ 변수명 수정: mediaType, thumbnailUrl, mediaUrl
            const imageSrc = post.mediaType === "VIDEO" && post.thumbnailUrl 
              ? post.thumbnailUrl 
              : post.mediaUrl;

            return (
              <Link
                href={post.permalink}
                key={post.id}
                target="_blank"
                className={`group relative block overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 ${spanClass}`}
              >
                {/* 이미지 */}
                <img
                  src={imageSrc}
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