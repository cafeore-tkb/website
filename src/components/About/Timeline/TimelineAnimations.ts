import { gsap } from "gsap";
import { ANIMATION_CONFIG } from "./TimelineConfig";
import type { TimelineElements } from "./TimelineUtils";
import { getItemElements, scrollToCenter } from "./TimelineUtils";

/**
 * 初期状態の設定
 * @param isMobile モバイル版かどうか
 */
export function setInitialStates(isMobile: boolean = false): void {
  // 奇数番目のアイテム（左から登場）
  gsap.set(".timeline-item:nth-child(odd)", {
    opacity: 0,
    x: -100,
    y: 0,
  });

  // 偶数番目のアイテム（右から登場）
  gsap.set(".timeline-item:nth-child(even)", {
    opacity: 0,
    x: 100,
    y: 0,
  });

  // 背景画像の初期状態
  gsap.set(".timeline-image-bg", {
    opacity: isMobile ? 0.4 : 0.3, // モバイル用は少し濃く
    filter: "grayscale(100%)",
  });

  // オーバーレイの初期状態
  gsap.set(".timeline-image-overlay", {
    opacity: 0,
  });

  // イベントテキストの初期状態
  gsap.set(".timeline-events *", {
    opacity: 0.8,
    y: 5,
    color: ANIMATION_CONFIG.colors.eventText,
    textShadow: "none",
  });
}

/**
 * スクロールアニメーションの初期化
 */
export function initScrollAnimation(): void {
  gsap.to(".timeline-item", {
    opacity: 1,
    x: 0,
    duration: 0.8,
    stagger: ANIMATION_CONFIG.stagger.items,
    ease: ANIMATION_CONFIG.ease.bounce,
    scrollTrigger: {
      trigger: ".timeline",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });
}

/**
 * ホバー時のアニメーション
 * @param elements タイムライン要素
 * @returns GSAPタイムライン
 */
export function createHoverAnimation(
  elements: TimelineElements,
): gsap.core.Timeline {
  const { year, content, imageBg, overlay, themeHeader, events } = elements;
  const tl = gsap.timeline();

  // 年度数字のフォントサイズ拡大
  const yearNumber = year?.querySelector(".timeline-year-number");
  if (yearNumber) {
    tl.to(
      yearNumber,
      {
        fontSize: "1.65rem",
        duration: ANIMATION_CONFIG.duration.fast,
        ease: ANIMATION_CONFIG.ease.bounce,
      },
      0,
    );
  }

  // コンテンツエリアの高さ拡張
  tl.to(
    content,
    {
      minHeight: "300px",
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
    0,
  )

    // 背景画像の表示
    .to(
      imageBg,
      {
        opacity: 0.8,
        filter: "grayscale(0%)",
        duration: ANIMATION_CONFIG.duration.slow,
        ease: ANIMATION_CONFIG.ease.smooth,
      },
      0,
    )

    // オーバーレイの表示
    .to(
      overlay,
      {
        opacity: 1,
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.ease.smooth,
      },
      0.1,
    )

    // テーマヘッダーのフォントサイズ拡大
    .to(
      themeHeader,
      {
        fontSize: "1.7rem",
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.ease.bounce,
      },
      0.1,
    );

  // イベントテキストの表示
  if (events.length > 0) {
    tl.to(
      events,
      {
        opacity: 1,
        y: 0,
        color: ANIMATION_CONFIG.colors.eventTextHover,
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.7)",
        duration: ANIMATION_CONFIG.duration.normal,
        stagger: ANIMATION_CONFIG.stagger.events,
        ease: ANIMATION_CONFIG.ease.smooth,
      },
      0,
    );
  }

  return tl;
}

/**
 * ホバー終了時のアニメーション
 * @param elements タイムライン要素
 * @param isMobile モバイル版かどうか
 * @returns GSAPタイムライン
 */
export function createLeaveAnimation(
  elements: TimelineElements,
  isMobile: boolean = false,
): gsap.core.Timeline {
  const { year, content, imageBg, overlay, themeHeader, events } = elements;
  const tl = gsap.timeline();

  // 年度数字のフォントサイズを元に戻す
  const yearNumber = year?.querySelector(".timeline-year-number");
  if (yearNumber) {
    tl.to(
      yearNumber,
      {
        fontSize: "1.5rem",
        duration: ANIMATION_CONFIG.duration.fast,
        ease: ANIMATION_CONFIG.ease.smooth,
      },
      0,
    );
  }

  // コンテンツエリアの高さを元に戻す
  tl.to(
    content,
    {
      minHeight: "200px",
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.ease.smooth,
    },
    0,
  )

    // 背景画像を元の状態に戻す
    .to(
      imageBg,
      {
        opacity: isMobile ? 0.4 : 0.3, // モバイル用の初期値に戻す
        filter: "grayscale(100%)",
        duration: ANIMATION_CONFIG.duration.slow,
        ease: ANIMATION_CONFIG.ease.smooth,
      },
      0,
    )

    // オーバーレイを非表示にする
    .to(
      overlay,
      {
        opacity: 0,
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.ease.smooth,
      },
      0,
    )

    // テーマヘッダーのフォントサイズを元に戻す
    .to(
      themeHeader,
      {
        fontSize: "1.5rem",
        duration: ANIMATION_CONFIG.duration.normal,
        ease: ANIMATION_CONFIG.ease.smooth,
      },
      0,
    );

  // イベントテキストを元の状態に戻す
  if (events.length > 0) {
    tl.to(
      events,
      {
        opacity: 0.8,
        y: 5,
        color: ANIMATION_CONFIG.colors.eventText,
        textShadow: "none",
        duration: ANIMATION_CONFIG.duration.fast,
        stagger: ANIMATION_CONFIG.stagger.eventsOut,
        ease: ANIMATION_CONFIG.ease.smooth,
      },
      0,
    );
  }

  return tl;
}

/**
 * ホバーイベントの設定
 * @param isMobile モバイル版かどうか
 * @returns ホバー状態を管理する変数
 */
export function setupHoverEvents(isMobile: boolean = false): {
  hoveredItem: Element | null;
} {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const state = { hoveredItem: null as Element | null };

  timelineItems.forEach((item) => {
    const elements = getItemElements(item);

    // マウスホバー時のイベント
    item.addEventListener("mouseenter", () => {
      state.hoveredItem = item;
      createHoverAnimation(elements);
    });

    // マウスが離れた時のイベント
    item.addEventListener("mouseleave", () => {
      state.hoveredItem = null;
      createLeaveAnimation(elements, isMobile);
    });

    // クリック時のスクロール処理
    item.addEventListener("click", () => scrollToCenter(item));
  });

  return state;
}

/**
 * 画像の遅延読み込み
 */
export function loadImagesWhenVisible(): void {
  const imageElements = document.querySelectorAll(
    ".timeline-image-bg[data-bg]",
  );

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const bgImage = element.getAttribute("data-bg");
          if (bgImage) {
            element.style.backgroundImage = bgImage;
            element.removeAttribute("data-bg");
            imageObserver.unobserve(element);
          }
        }
      });
    },
    {
      rootMargin: "50px 0px", // 50px手前から読み込み開始
    },
  );

  imageElements.forEach((element) => {
    imageObserver.observe(element);
  });
}
