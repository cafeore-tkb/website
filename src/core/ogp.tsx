import type { Article } from "../apis/articles";
import React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "fs/promises";
import path from "path";

// プロジェクトルートからの相対パスでフォントを読み込む
const regularFontData = await readFile(
  path.join(process.cwd(), "src/assets/fonts/NotoSansJP-Regular.ttf"),
);
const boldFontData = await readFile(
  path.join(process.cwd(), "src/assets/fonts/NotoSansJP-Bold.ttf"),
);

const generateOgpImage = async (element: React.ReactNode) => {
  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Noto Sans JP",
        data: regularFontData,
        style: "normal",
        weight: 400,
      },
      {
        name: "Noto Sans JP",
        data: boldFontData,
        style: "normal",
        weight: 600,
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });
  const image = resvg.render();

  return image.asPng();
};

// 引数の型をAPIのレスポンスである `Article` 型に変更
export const generateBlogPostOgpImage = (post: Article) => {
  // `post.data.title` ではなく `post.title` を参照
  const { title } = post;

  // ここで自由にOGPのデザインをJSXで記述できます
  return generateOgpImage(
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>{title}</h1>
    </div>,
  );
};

export const generateSiteOgpImage = () => {
  return generateOgpImage(
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>My Awesome Site</h1>
    </div>,
  );
};
