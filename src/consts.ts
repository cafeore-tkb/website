export const CAFEORE_NAME = "珈琲・俺";
export const INSTAGRAM_URL = "https://www.instagram.com/cafeore_tkb";
export const X_URL = "https://x.com/cafeore_tkb";

/**
 * ビルド環境では .env から取得した値を使い
 * プレビュー環境では cloudflare secrets store から取得した値を使う
 */
export type CMSSecrets = {
  readonly MICROCMS_API_URL: string;
  readonly MICROCMS_API_KEY: string;
};

export function getCMSSecrets(): CMSSecrets {
  return {
    MICROCMS_API_URL: import.meta.env.MICROCMS_API_URL,
    MICROCMS_API_KEY: import.meta.env.MICROCMS_API_KEY,
  };
}
