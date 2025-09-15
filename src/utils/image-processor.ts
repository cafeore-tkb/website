import { getImage } from "astro:assets";
import * as parse5 from "parse5";

async function traverse(node: parse5.DefaultTreeAdapterTypes.Node) {
  if (node.nodeName !== "img") {
    if ("childNodes" in node && node.childNodes) {
      for (const child of node.childNodes) {
        await traverse(child);
      }
    }
    return;
  }

  const src = node.attrs.find((attr) => attr.name === "src")?.value;
  const width = node.attrs.find((attr) => attr.name === "width")?.value;
  const height = node.attrs.find((attr) => attr.name === "height")?.value;
  if (!src || !width || !height) return;

  const image = await getImage({
    src,
    width: Number(width),
    height: Number(height),
    format: "webp",
    quality: "mid",
  });

  node.attrs.forEach((attr) => {
    if (attr.name === "src") {
      attr.value = image.src;
    }
  });
  node.attrs.push({ name: "loading", value: "lazy" });
  node.attrs.push({ name: "decoding", value: "async" });
}

export async function optimizeImages(html: string): Promise<string> {
  const dom = parse5.parse(html);
  await traverse(dom);
  return parse5.serialize(dom);
}
