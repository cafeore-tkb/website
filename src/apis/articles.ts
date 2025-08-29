import { fetchWithAuth } from "./api-base";

export interface Article {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  content: string;
}

export interface ArticleResponse {
  contents: Article[];
  totalCount: number;
  offset: number;
  limit: number;
}

export async function getAllArticles(): Promise<ArticleResponse> {
  const res = await fetchWithAuth("articles");
  const data: ArticleResponse = await res.json();
  return data;
}

export async function getArticleById(id: string): Promise<Article> {
  const res = await fetchWithAuth(`articles/${id}`);
  const data: Article = await res.json();
  return data;
}
