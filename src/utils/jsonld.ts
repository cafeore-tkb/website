import { CAFEORE_NAME, INSTAGRAM_URL, X_URL } from "../consts";

/** JSON-LD の1ノード。schema.org の型は広いのでここでは緩く扱う */
export type JsonLdNode = Record<string, unknown>;

/** サイト全体で使い回す @id。@graph 内から参照して実体の重複を避ける */
const ORGANIZATION_ID = "#organization";
const WEBSITE_ID = "#website";

const absolute = (path: string, site: URL) => new URL(path, site).toString();

/** 団体そのものを表すノード */
export function organizationNode(site: URL): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": absolute(ORGANIZATION_ID, site),
    name: CAFEORE_NAME,
    url: site.toString(),
    logo: {
      "@type": "ImageObject",
      url: absolute("/favicon.svg", site),
    },
    sameAs: [INSTAGRAM_URL, X_URL],
  };
}

/** サイトそのものを表すノード */
export function webSiteNode(site: URL): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": absolute(WEBSITE_ID, site),
    name: CAFEORE_NAME,
    url: site.toString(),
    inLanguage: "ja",
    publisher: { "@id": absolute(ORGANIZATION_ID, site) },
  };
}

export interface ArticleNodeParams {
  site: URL;
  /** 記事ページ自身のURL */
  url: URL;
  title: string;
  /** OGP用に生成した画像の絶対URL */
  imageUrl?: string;
  /** ISO 8601 の日時文字列 */
  publishedAt: string;
  /** 未指定なら publishedAt を使う */
  modifiedAt?: string;
}

/** 個別記事を表すノード */
export function articleNode({
  site,
  url,
  title,
  imageUrl,
  publishedAt,
  modifiedAt,
}: ArticleNodeParams): JsonLdNode {
  const organization = { "@id": absolute(ORGANIZATION_ID, site) };
  return {
    "@type": "BlogPosting",
    "@id": url.toString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url.toString() },
    headline: title,
    ...(imageUrl === undefined ? {} : { image: imageUrl }),
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    author: organization,
    publisher: organization,
    isPartOf: { "@id": absolute(WEBSITE_ID, site) },
    inLanguage: "ja",
  };
}

/**
 * <script type="application/ld+json"> に埋め込める文字列にする。
 *
 * 記事タイトルなどCMS由来の文字列に "</script>" が含まれると
 * script要素が途中で閉じてしまうため、"<" をエスケープしておく。
 */
export function serializeJsonLd(nodes: JsonLdNode[]): string {
  const graph = {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
  return JSON.stringify(graph).replaceAll("<", "\\u003c");
}
