/**
 * タイムラインアニメーションの設定と型定義
 */

// アニメーション設定の型定義
export interface AnimationConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  ease: {
    smooth: string;
    bounce: string;
  };
  stagger: {
    items: number;
    events: number;
    eventsOut: number;
  };
  colors: {
    eventText: string;
    eventTextHover: string;
  };
}

// アニメーション設定の定数
export const ANIMATION_CONFIG: AnimationConfig = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.4,
  },
  ease: {
    smooth: "power2.out",
    bounce: "back.out(1.7)",
  },
  stagger: {
    items: 0.15,
    events: 0.1,
    eventsOut: 0.05,
  },
  colors: {
    eventText: "#303030",
    eventTextHover: "white",
  },
};
