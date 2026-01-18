import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://challenger-web.vercel.app'; // 실제 도메인으로 변경

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sponsors`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    // 필요한 페이지들 추가
  ];
}