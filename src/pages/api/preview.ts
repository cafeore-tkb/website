import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const contentId = url.searchParams.get("contentId");
  const draftKey = url.searchParams.get("draftKey");

  if (!contentId || !draftKey) {
    return new Response(
      JSON.stringify({
        message:
          "Missing query parameters. Expected: contentId and draftKey (microCMS preview).",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      },
    );
  }

  const apiBase = import.meta.env.MICROCMS_API_URL;
  const apiKey = import.meta.env.MICROCMS_API_KEY;

  if (!apiBase || !apiKey) {
    return new Response(
      JSON.stringify({
        message:
          "Server is missing MICROCMS_API_URL / MICROCMS_API_KEY env vars.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      },
    );
  }

  const endpoint = new URL(
    `articles/${encodeURIComponent(contentId)}`,
    apiBase,
  );
  endpoint.searchParams.set("draftKey", draftKey);

  const res = await fetch(endpoint.toString(), {
    headers: { "X-MICROCMS-API-KEY": apiKey },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return new Response(body || res.statusText, {
      status: res.status,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const json = await res.json();
  return new Response(JSON.stringify(json), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
