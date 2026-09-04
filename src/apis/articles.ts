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

export type ArticleResponse = MicroCMSListResponse<Article>;

/** microCMSが1回のリクエストで返せるコンテンツ数の上限 */
const LIMIT = 100;

/**
 * リスト形式のレスポンスをパースする。
 *
 * 失敗したレスポンスをそのままjson()に通すと
 * 「Unexpected end of JSON input」という原因の分からないエラーになるため、
 * ここでステータスを見て何が起きたか分かる形で投げ直す。
 */
async function parseListResponse<T>(
  res: Response,
  path: string,
): Promise<MicroCMSListResponse<T>> {
  if (!res.ok) {
    throw new Error(
      `microCMSへのリクエストに失敗しました: ${path} (${res.status} ${res.statusText})`,
    );
  }
  const data: MicroCMSListResponse<T> = await res.json();
  return data;
}

export async function getAllArticles(
  secrets: CMSSecrets,
): Promise<ArticleResponse> {
  // 1. limit=1でfetchしてtotalCountを取得
  const firstPath = "articles?limit=1&fields=id";
  const firstRes = await fetchWithAuth(firstPath, secrets);
  const firstData = await parseListResponse<{ id: string }>(
    firstRes,
    firstPath,
  );
  const totalCount = firstData.totalCount;

  // 2. totalCount/LIMITの回数分fetchする（切り上げ）
  const fetchCount = Math.ceil(totalCount / LIMIT);

  // 3. offsetを変えてLIMIT件ずつfetch
  const fetchPromises: Promise<MicroCMSListResponse<Article>>[] = [];
  for (let i = 0; i < fetchCount; i++) {
    const offset = i * LIMIT;
    const queryParams = new URLSearchParams({
      limit: LIMIT.toString(),
      offset: offset.toString(),
    });
    const path = `articles?${queryParams.toString()}`;
    fetchPromises.push(
      fetchWithAuth(path, secrets).then((res) =>
        parseListResponse<Article>(res, path),
      ),
    );
  }

  const results = await Promise.all(fetchPromises);

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
