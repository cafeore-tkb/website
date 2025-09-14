import { fetchWithAuth } from "./api-base";
import type { MicroCMSImage } from "./type";

export interface TopImages {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  image: MicroCMSImage;
}

export async function getTopImages(): Promise<TopImages> {
  const res = await fetchWithAuth("top-images");
  const data: TopImages = await res.json();
  return data;
}
