import { fetchWithAuth } from "./api-base";
import type { MicroCMSImage } from "./type";

export interface HistoryItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  year: number;
  theme: string;
  themeColorCode: string;
  themeColorName: string;
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
  try {
    // microCMSのAPIエンドポイント（limitは最大100）
    const res = await fetchWithAuth("history?limit=100");

    if (!res.ok) {
      const errorText = await res.text();
      console.error("APIリクエストが失敗しました:", res.status, res.statusText);
      console.error("エラー詳細:", errorText);
      return {
        contents: [],
        totalCount: 0,
        offset: 0,
        limit: 0,
      };
    }

    const data: HistoryResponse = await res.json();

    // エラーハンドリング: contentsが存在しない場合の処理
    if (!data || !data.contents) {
      console.error("APIレスポンスにcontentsが存在しません:", data);
      return {
        contents: [],
        totalCount: 0,
        offset: 0,
        limit: 0,
      };
    }

    // 年度順にソート（古い年度から新しい年度順）
    data.contents.sort((a, b) => a.year - b.year);

    return data;
  } catch (error) {
    console.error("APIリクエスト中にエラーが発生しました:", error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    };
  }
}

export async function getHistoryById(id: string): Promise<HistoryItem> {
  const res = await fetchWithAuth(`history/${id}`);
  const data: HistoryItem = await res.json();
  return data;
}
