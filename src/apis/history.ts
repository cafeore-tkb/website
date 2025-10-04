import { fetchWithAuth } from "./api-base";
import type { MicroCMSImage } from "./type";

export interface HistoryItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  year: number;
  themeColorCode: string;
  themeColorName: string;
  eventsTitle: string; // テーマ
  events: string; // HTML文字列として格納
  thumbnail: MicroCMSImage;
  images: MicroCMSImage[];
}

export interface HistoryResponse {
  contents: HistoryItem[];
  totalCount: number;
  offset: number;
  limit: number;
}

export async function getAllHistory(): Promise<HistoryResponse> {
  const res = await fetchWithAuth("history?limit=100"); // より多くのデータを取得
  const data: HistoryResponse = await res.json();
  data.contents.sort((a, b) => a.year - b.year);
  return data;
}

export async function getHistoryById(id: string): Promise<HistoryItem> {
  const res = await fetchWithAuth(`history/${id}`);
  const data: HistoryItem = await res.json();
  return data;
}
