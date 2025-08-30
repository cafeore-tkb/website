import type { APIRoute } from "astro";
import { generateSiteOgpImage } from "../core/ogp";

export const GET: APIRoute = async () => {
  const png = await generateSiteOgpImage();

  // `png` を `any` 型にキャストしてエラーを回避
  return new Response(png as any, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
