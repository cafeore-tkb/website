import type { CMSSecrets } from "../consts";
import { fetchAllContents, fetchWithAuth } from "./api-base";
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

export type ArticleResponse = MicroCMSListResponse<Article>;

export async function getAllArticles(
  secrets: CMSSecrets,
): Promise<ArticleResponse> {
  return fetchAllContents<Article>("articles", secrets);
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
