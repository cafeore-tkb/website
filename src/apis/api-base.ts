import type { CMSSecrets } from "../consts";

export function fetchWithAuth(path: string, secrets: CMSSecrets) {
  const url = `${secrets.MICROCMS_API_URL}${path}`;
  const headers = {
    "X-MICROCMS-API-KEY": secrets.MICROCMS_API_KEY,
  };
  return fetch(url, {
    headers,
  });
}
