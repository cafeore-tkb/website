import { getImage } from "astro:assets";
import * as parse5 from "parse5";
import { getWidthHeight } from "./image-sizing";
import { getWebpLosslessSrc } from "./imgix";

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
  const srcWidth = node.attrs.find((attr) => attr.name === "width")?.value;
  const srcHeight = node.attrs.find((attr) => attr.name === "height")?.value;
  if (!src || !srcWidth || !srcHeight) return;

  const imageSize = getWidthHeight({
    src: { width: Number(srcWidth), height: Number(srcHeight) },
    maxWidth: 1200,
  });

  const image = await getImage({
    src: getWebpLosslessSrc(src),
    quality: "mid",
    ...imageSize,
  });

  for (const attr of node.attrs) {
    if (attr.name === "src") {
      attr.value = image.src;
    }
    if (attr.name === "width") {
      attr.value = String(imageSize.width);
    }
    if (attr.name === "height") {
      attr.value = String(imageSize.height);
    }
  }
  node.attrs.push({ name: "loading", value: "lazy" });
  node.attrs.push({ name: "decoding", value: "async" });
}

export async function optimizeImages(html: string): Promise<string> {
  const dom = parse5.parse(html);
  await traverse(dom);
  return parse5.serialize(dom);
}
