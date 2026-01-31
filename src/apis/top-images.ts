import type { CMSSecrets } from "../consts";
import { fetchWithAuth } from "./api-base";
import type { MicroCMSImage } from "./type";

export interface TopImages {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  image: MicroCMSImage;
}

export async function getTopImages(secrets: CMSSecrets): Promise<TopImages> {
  const res = await fetchWithAuth("top-images", secrets);
  const data: TopImages = await res.json();
  return data;
}
