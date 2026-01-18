import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://challenger-web.vercel.app/sitemap.xml', // 실제 도메인으로 변경
  };
}