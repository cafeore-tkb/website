import type { CMSSecrets } from "../consts";
import type { MicroCMSListResponse } from "./type";

/** microCMS が1回のリクエストで返せるコンテンツ数の上限 */
const MAX_LIMIT_PER_REQUEST = 100;

/** 総数が壊れた値だった場合に無限ループしないための保険 */
const MAX_REQUESTS = 100;

export function fetchWithAuth(path: string, secrets: CMSSecrets) {
  const url = `${secrets.MICROCMS_API_URL}${path}`;
  const headers = {
    "X-MICROCMS-API-KEY": secrets.MICROCMS_API_KEY,
  };
  return fetch(url, {
    headers,
  });
}

/**
 * リスト形式のAPIから全件取得する。
 *
 * microCMS は1回のリクエストにつき最大100件しか返さないため、
 * totalCount に達するまで offset をずらしながら繰り返し取得する。
 */
export async function fetchAllContents<T>(
  endpoint: string,
  secrets: CMSSecrets,
): Promise<MicroCMSListResponse<T>> {
  const contents: T[] = [];
  let totalCount = 0;

  for (let request = 0; request < MAX_REQUESTS; request++) {
    const query = `limit=${MAX_LIMIT_PER_REQUEST}&offset=${contents.length}`;
    const separator = endpoint.includes("?") ? "&" : "?";
    const res = await fetchWithAuth(`${endpoint}${separator}${query}`, secrets);

    if (!res.ok) {
      throw new Error(
        `microCMS へのリクエストに失敗しました: ${endpoint} (${res.status} ${res.statusText})`,
      );
    }

    const page: MicroCMSListResponse<T> = await res.json();
    contents.push(...page.contents);
    totalCount = page.totalCount;

    // 取り切った、または返ってこなくなったら終了
    if (contents.length >= totalCount || page.contents.length === 0) {
      break;
    }
  }

  return {
    contents,
    totalCount,
    offset: 0,
    limit: contents.length,
  };
}
