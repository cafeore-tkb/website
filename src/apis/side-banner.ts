import { fetchWithAuth } from "./api-base";
import type { MicroCMSImage } from "./type";

export interface Banner {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  image: MicroCMSImage;
  alt: string;
  href?: string;
  externalLink: boolean;
}

export interface SideBanner {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  banners: Banner[];
}

export async function getSideBanner(): Promise<SideBanner> {
  const res = await fetchWithAuth("side-banner");
  const data: SideBanner = await res.json();
  return data;
}
