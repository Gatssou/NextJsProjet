// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://next-js-projet-three.vercel.app/"; // Remplace par ton vrai domaine

  return [
    {
      url: baseUrl,
      lastModified: new Date(), // date de dernière modification
    },
  ];
}
