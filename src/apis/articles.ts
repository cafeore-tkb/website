import type { CMSSecrets } from "../consts";
import { fetchWithAuth } from "./api-base";
import type { MicroCMSImage, MicroCMSListResponse } from "./type";

export interface Article {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  thumbnail: MicroCMSImage;
  content: string;
}

export interface ArticleResponse {
  contents: Article[];
  totalCount: number;
  offset: number;
  limit: number;
}

export async function getAllArticles(): Promise<ArticleResponse> {
  const LIMIT = 100;

  // 1. limit=1でfetchしてtotalCountを取得
  const firstRes = await fetchWithAuth("articles?limit=1&fields=id");
  const firstData = (await firstRes.json()) as MicroCMSListResponse<{
    id: string;
  }>;
  const totalCount = firstData.totalCount;

  // 2. totalCount/LIMITの回数分fetchする（切り上げ）
  const fetchCount = Math.ceil(totalCount / LIMIT);
  const results: MicroCMSListResponse<Article>[] = [];

  // 3. offsetを変えてLIMIT件ずつfetch
  const fetchPromises = [];
  for (let i = 0; i < fetchCount; i++) {
    const offset = i * LIMIT;
    const queryParams = new URLSearchParams({
      limit: LIMIT.toString(),
      offset: offset.toString(),
    });
    fetchPromises.push(
      fetchWithAuth(`articles?${queryParams.toString()}`).then(
        async (res) => (await res.json()) as MicroCMSListResponse<Article>,
      ),
    );
  }

  const responses = await Promise.all(fetchPromises);
  results.push(...responses);

  // 4. contentsを結合してMicroCMSListResponse形式で返す
  const allContents = results.flatMap((data) => data.contents);
  return {
    contents: allContents,
    totalCount,
    offset: 0,
    limit: totalCount,
  };
}

export async function getArticleById(
  id: string,
  secrets: CMSSecrets,
): Promise<Article> {
  const res = await fetchWithAuth(`articles/${id}`, secrets);
  const data: Article = await res.json();
  return data;
}

export async function getArticleDraftById(
  id: string,
  draftKey: string,
  secrets: CMSSecrets,
): Promise<Article> {
  const path = `articles/${id}?draftKey=${draftKey}`;
  const res = await fetchWithAuth(path, secrets);
  const data: Article = await res.json();
  return data;
}
