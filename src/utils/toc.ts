import * as parse5 from "parse5";

type Node = parse5.DefaultTreeAdapterTypes.Node;
type Element = parse5.DefaultTreeAdapterTypes.Element;
type TextNode = parse5.DefaultTreeAdapterTypes.TextNode;

/** 目次に載せる見出し。h4以降は細かすぎるので拾わない */
const HEADING_LEVELS = new Map<string, number>([
  ["h2", 2],
  ["h3", 3],
]);

export interface TocItem {
  /** 見出しに振ったid。リンク先のアンカーになる */
  id: string;
  text: string;
  /** 2 か 3。目次のインデントに使う */
  level: number;
}

function isElement(node: Node): node is Element {
  return "tagName" in node;
}

/** 要素配下のテキストを連結して取り出す（strong などで分割されていても拾える） */
function textContent(node: Node): string {
  if (node.nodeName === "#text") {
    return (node as TextNode).value;
  }
  if ("childNodes" in node) {
    return node.childNodes.map(textContent).join("");
  }
  return "";
}

/**
 * 見出しテキストをid用の文字列にする。
 * 日本語はそのまま残す（リンク時にURLエンコードされる）。
 */
function toSlug(text: string): string {
  const slug = text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/["#&'/<>?]/g, "");
  return slug === "" ? "section" : slug;
}

/**
 * 記事HTMLから目次を組み立てる。
 *
 * microCMSのリッチエディタは見出しにidを振らないため、
 * ここで採番しつつ、同じ見出しが複数あっても衝突しないようにする。
 * 戻り値のhtmlはidが付与された状態になっている。
 */
export function extractToc(html: string): { html: string; items: TocItem[] } {
  const fragment = parse5.parseFragment(html);
  const items: TocItem[] = [];
  const usedIds = new Set<string>();

  const walk = (node: Node) => {
    if (isElement(node)) {
      const level = HEADING_LEVELS.get(node.tagName);
      if (level !== undefined) {
        const text = textContent(node).trim();
        if (text !== "") {
          const existingId = node.attrs.find((attr) => attr.name === "id");
          let id = existingId?.value ?? toSlug(text);

          // 同名の見出しがあった場合は連番を足して一意にする
          let suffix = 2;
          while (usedIds.has(id)) {
            id = `${toSlug(text)}-${suffix}`;
            suffix++;
          }
          usedIds.add(id);

          if (existingId === undefined) {
            node.attrs.push({ name: "id", value: id });
          } else {
            existingId.value = id;
          }

          items.push({ id, text, level });
        }
      }
    }

    if ("childNodes" in node) {
      for (const child of node.childNodes) {
        walk(child);
      }
    }
  };

  walk(fragment);

  return { html: parse5.serialize(fragment), items };
}
