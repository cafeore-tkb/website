import type { ImageMetadata } from "astro";

// 画像のインポート
import image2013 from "../assets/timeline/2013.jpg";
import image2014 from "../assets/timeline/2014.jpg";
import image2015 from "../assets/timeline/2015.jpeg";

export interface TimelineItem {
  year: number;
  events: string[];
  image?: ImageMetadata; // 画像メタデータ（オプショナル）
  theme?: string; // その年のテーマ（オプショナル）
  themeColor?: string; // テーマカラー（オプショナル）
}

export const timelineData: TimelineItem[] = [
  {
    year: 2000,
    events: [
      "初代ORE三田耕生が学園祭に企画名「珈琲・俺」で出店する",
      "当時の珈琲・員は７人",
      "体芸エリアの休憩所横",
    ],
    image: image2013,
    theme: "始まり",
    themeColor: "#8B4513",
  },
  {
    year: 2001,
    events: ["本年より図書館南で開店", "黒字転換"],
    image: image2014,
    theme: "成長",
    themeColor: "#228B22",
  },
  {
    year: 2002,
    events: ["自家製クッキー600枚の販売", "初代珈琲・俺ブレンド"],
    image: image2015,
    theme: "ブレンド",
    themeColor: "#D2691E",
  },
  {
    year: 2003,
    events: ["テイクアウトカップ導入", "ガトーショコラ初登場"],
    image: image2013,
    theme: "カップ",
    themeColor: "#FF6347",
  },
  {
    year: 2004,
    events: ["ウィンナーコーヒー開発に失敗(ウィンナー=コーヒーゼリーの腸詰め)"],
    image: image2014,
    theme: "失敗",
    themeColor: "#DC143C",
  },
  {
    year: 2005,
    events: ["創業メンバー全員卒業「第二の創業」へ", "モバイルサイト開設"],
    image: image2015,
    theme: "第二の創業",
    themeColor: "#FF6347",
  },
  {
    year: 2006,
    events: [
      "コーヒーアロマワインを入荷するも、学園祭当日前に全て飲み切る",
      "マグカップ、エプロンの販売",
    ],
    image: image2013,
    theme: "ワイン",
    themeColor: "#8B0000",
  },
  {
    year: 2007,
    events: ["ドリップ試験制度が確立"],
    image: image2014,
    theme: "ドリップ",
    themeColor: "#4B0082",
  },
  {
    year: 2008,
    events: ["大学図書館にスターバックス襲来。対策のため、経営戦略部設立"],
    image: image2015,
    theme: "スタバ対策",
    themeColor: "#006400",
  },
  {
    year: 2009,
    events: ["３日間で約1200杯の売り上げ"],
    image: image2013,
    theme: "1200杯",
    themeColor: "#FF8C00",
  },
  {
    year: 2010,
    events: ["2010年の出来事"],
    image: image2014,
    theme: "2010",
    themeColor: "#2F4F4F",
  },
  {
    year: 2011,
    events: ["2011年の出来事"],
    image: image2015,
    theme: "ハードボイルド＋紳士淑女",
    themeColor: "#8A3D43",
  },
  {
    year: 2012,
    events: ["10周年記念誌刊行"],
    image: image2013,
    theme: "深みにはまりましょう",
    themeColor: "#4169E1",
  },
  {
    year: 2013,
    events: ["雙峰祭グランプリ最優秀賞", "カップケーキ開発"],
    image: image2014,
    theme: "最優秀賞",
    themeColor: "#FFD700",
  },
  {
    year: 2014,
    events: ["中指を立てながら集合写真を撮ったことで話題"],
    image: image2015,
    theme: "中指",
    themeColor: "#FF1493",
  },
  {
    year: 2015,
    events: ["スタバハロウィンカフェ開催", "おもちゃストア開発"],
    image: image2013,
    theme: "ハロウィン",
    themeColor: "#FF4500",
  },
  {
    year: 2016,
    events: ["2016年の出来事"],
    image: image2014,
    theme: "2016",
    themeColor: "#32CD32",
  },
  {
    year: 2017,
    events: ["2017年の出来事"],
    image: image2015,
    theme: "2017",
    themeColor: "#FF69B4",
  },
  {
    year: 2018,
    events: ["slackの運用スタート"],
    image: image2013,
    theme: "Slack",
    themeColor: "#4A90E2",
  },
  {
    year: 2019,
    events: ["2019年の出来事"],
    image: image2014,
    theme: "2019",
    themeColor: "#9B59B6",
  },
  {
    year: 2020,
    events: ["2020年の出来事"],
    image: image2015,
    theme: "コロナ",
    themeColor: "#E74C3C",
  },
  {
    year: 2021,
    events: ["2021年の出来事"],
    image: image2013,
    theme: "2021",
    themeColor: "#F39C12",
  },
  {
    year: 2022,
    events: ["雙峰祭グランプリ優秀賞"],
    image: image2014,
    theme: "優秀賞",
    themeColor: "#27AE60",
  },
  {
    year: 2023,
    events: ["雙峰祭グランプリ優秀賞"],
    image: image2015,
    theme: "優秀賞2",
    themeColor: "#8E44AD",
  },
  {
    year: 2024,
    events: ["20周年記念誌刊行", "雙峰祭グランプリ最優秀賞", "内製POS"],
    image: image2013,
    theme: "一杯のコーヒーと、いっぱいの想い出を。",
    themeColor: "#DC143C",
  },
  {
    year: 2025,
    events: ["常設サイトcafeore.cafe開設"],
    image: image2014,
    theme: "一口に伝統と誇りをこめて。",
    themeColor: "#006763",
  },
];
