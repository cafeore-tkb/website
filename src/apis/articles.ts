import type { CMSSecrets } from "../consts";
import { fetchWithAuth } from "./api-base";
import type { MicroCMSImage } from "./type";

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

export async function getAllArticles(
  secrets: CMSSecrets,
): Promise<ArticleResponse> {
  const res = await fetchWithAuth("articles", secrets);
  const data: ArticleResponse = await res.json();
  return data;
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
