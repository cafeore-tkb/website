import type { APIRoute } from "astro";
import {
  getAllArticles,
  getArticleById,
  type Article,
} from "../../../apis/articles";
import { generateBlogPostOgpImage } from "../../../core/ogp";

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return new Response("Page not found", { status: 404 });
  }

  const post = await getArticleById(id);

  if (!post) {
    return new Response("Article not found", { status: 404 });
  }

  const png = await generateBlogPostOgpImage(post);

  // `png` を `any` 型にキャストしてエラーを回避
  return new Response(png as any, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};

export async function getStaticPaths() {
  const articleResponse = await getAllArticles();
  return articleResponse.contents.map((post: Article) => {
    return {
      params: { id: post.id },
    };
  });
}
