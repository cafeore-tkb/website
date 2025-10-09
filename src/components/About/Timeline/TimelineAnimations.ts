import { gsap } from "gsap";
import type { TimelineElements } from "./TimelineUtils";
import { getItemElements, scrollToCenter } from "./TimelineUtils";
import { ANIMATION_CONFIG } from "./TimelineConfig";

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
 * スクロールアニメーションの初期化（最適化版）
 * Intersection Observerを使用して、画面に表示されたアイテムのみアニメーション
 */
export function initScrollAnimation(): void {
  const timelineItems = document.querySelectorAll(".timeline-item");

  // 初期表示される最初の3つのアイテムは即座にアニメーション
  const initialItems = Array.from(timelineItems).slice(0, 3);
  if (initialItems.length > 0) {
    gsap.to(initialItems, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: ANIMATION_CONFIG.stagger.items,
      ease: ANIMATION_CONFIG.ease.bounce,
    });
  }

  // 残りのアイテムはIntersection Observerで監視
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          // 一度アニメーション済みのアイテムは再度アニメーションしない
          if (item.classList.contains("animated")) return;

          gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: ANIMATION_CONFIG.ease.bounce,
          });

          item.classList.add("animated");
          // パフォーマンス向上のため、アニメーション後は監視を停止
          observer.unobserve(item);
        }
      });
    },
    {
      rootMargin: "50px", // 画面に入る少し前にアニメーション開始
      threshold: 0.1,
    },
  );

  // 初期表示以外のアイテムを監視
  Array.from(timelineItems)
    .slice(3)
    .forEach((item) => {
      observer.observe(item);
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
      minHeight: "120px", // 初期値に戻す
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
 * ホバーイベントの設定（最適化版）
 * 初期表示アイテムのみイベント設定し、残りは遅延設定
 * @param isMobile モバイル版かどうか
 * @returns ホバー状態を管理する変数
 */
export function setupHoverEvents(isMobile: boolean = false): {
  hoveredItem: Element | null;
} {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const state = { hoveredItem: null as Element | null };

  // ホバーイベントを設定する関数
  const attachHoverEvents = (item: Element) => {
    // 既にイベント設定済みの場合はスキップ
    if (item.hasAttribute("data-hover-attached")) return;

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

    item.setAttribute("data-hover-attached", "true");
  };

  // 初期表示される最初の5つのアイテムにのみイベント設定
  Array.from(timelineItems)
    .slice(0, 5)
    .forEach((item) => attachHoverEvents(item));

  // 残りのアイテムは画面に近づいたらイベント設定（遅延初期化）
  const eventObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          attachHoverEvents(entry.target);
          // イベント設定後は監視不要
          eventObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "200px", // 画面に入るかなり前にイベント設定
      threshold: 0,
    },
  );

  Array.from(timelineItems)
    .slice(5)
    .forEach((item) => {
      eventObserver.observe(item);
    });

  return state;
}

/**
 * 画像の事前読み込み（モバイル最適化版）
 */
export async function preloadHistoryImages(): Promise<void> {
  const imageElements = document.querySelectorAll(
    ".timeline-image-bg[data-bg]",
  );
  // 画像URLを抽出
  const imageUrls = Array.from(imageElements)
    .map((element) => {
      const bgImage = element.getAttribute("data-bg");
      return bgImage ? bgImage.replace(/url\(|\)/g, "") : null;
    })
    .filter((url): url is string => url !== null);
  // モバイル判定
  const isMobile = window.innerWidth <= 768;
  // モバイルの場合は画像サイズを最適化
  const optimizedUrls = imageUrls.map((url) => {
    if (isMobile) {
      // モバイル用に画像サイズを小さくする（最大幅400px）
      const urlObj = new URL(url);
      urlObj.searchParams.set("w", "400");
      urlObj.searchParams.set("q", "80"); // 品質を80%に下げてファイルサイズを削減
      return urlObj.toString();
    }
    return url;
  });
  // 画像サイズに基づいて優先度を設定（小さい画像を先に読み込み）
  const prioritizedUrls = optimizedUrls.sort((a, b) => {
    // URLから画像サイズを推測（例: ?w=300&h=200 のようなパラメータ）
    const getSizeFromUrl = (url: string) => {
      const match = url.match(/[?&]w=(\d+)/);
      return match ? parseInt(match[1]) : 1000; // デフォルトは大きいサイズとして扱う
    };
    return getSizeFromUrl(a) - getSizeFromUrl(b);
  });
  // モバイルの場合は並列読み込み数を制限（バッテリーとネットワークを考慮）
  const CONCURRENT_LIMIT = isMobile ? 6 : 100;
  const batches: string[][] = [];

  for (let i = 0; i < prioritizedUrls.length; i += CONCURRENT_LIMIT) {
    batches.push(prioritizedUrls.slice(i, i + CONCURRENT_LIMIT));
  }

  // バッチごとに順次処理
  const batchPromises = batches.map((batch, batchIndex) => {
    return new Promise<void>((resolve) => {
      // モバイルの場合はバッチ間に少し間隔を空ける
      const delay = isMobile ? batchIndex * 100 : 0;

      setTimeout(() => {
        const batchImagePromises = batch.map((url) => {
          return new Promise<void>((resolveImage) => {
            const img = new Image();

            // 画像読み込みの最適化
            img.crossOrigin = "anonymous"; // CORS対応
            img.decoding = "async"; // 非同期デコード
            img.loading = "eager"; // 優先読み込み

            // モバイルの場合はタイムアウトを短く
            const timeout = isMobile ? 3000 : 5000;
            const timeoutId = setTimeout(() => {
              resolveImage();
            }, timeout);

            img.onload = () => {
              clearTimeout(timeoutId);
              resolveImage();
            };

            img.onerror = () => {
              clearTimeout(timeoutId);
              resolveImage(); // エラーでも続行
            };

            // 画像読み込み開始
            img.src = url;
          });
        });

        Promise.all(batchImagePromises).then(() => {
          resolve();
        });
      }, delay);
    });
  });

  // 全バッチの完了を待つ
  await Promise.all(batchPromises);

  // 画像をDOMに適用
  imageElements.forEach((element) => {
    const bgImage = element.getAttribute("data-bg");
    if (bgImage) {
      (element as HTMLElement).style.backgroundImage = bgImage;
      element.removeAttribute("data-bg");
    }
  });
}

/**
 * ページ読み込み前の画像プリロード（最優先）
 * この関数はページのheadで呼び出されることを想定
 */
export function preloadCriticalImages(imageUrls: string[]): void {
  // モバイル判定
  const isMobile = window.innerWidth <= 768;

  // 重要な画像（最初の3枚）を最優先でプリロード
  const criticalUrls = imageUrls.slice(0, 3).map((url) => {
    if (isMobile) {
      const urlObj = new URL(url);
      urlObj.searchParams.set("w", "300");
      urlObj.searchParams.set("q", "75");
      return urlObj.toString();
    }
    return url;
  });

  criticalUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
}
