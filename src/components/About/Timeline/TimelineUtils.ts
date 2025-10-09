/**
 * タイムライン関連のユーティリティ関数（GSAP以外）
 */

// タイムライン要素の型定義
export interface TimelineElements {
  year: Element | null;
  content: Element | null;
  imageBg: Element | null;
  overlay: Element | null;
  themeHeader: Element | null;
  events: NodeListOf<Element>;
}

/**
 * モバイル判定
 * @returns モバイルデバイスかどうか
 */
export function isMobile(): boolean {
  return window.innerWidth <= 768;
}

// 要素キャッシュ
let cachedItems: NodeListOf<Element> | null = null;

/**
 * 画面中央のタイムラインアイテムを取得（最適化版）
 * @returns 画面中央に最も近いタイムラインアイテム
 */
export function getCenterTimelineItem(): Element | null {
  // 要素をキャッシュして再利用
  if (!cachedItems) {
    cachedItems = document.querySelectorAll(".timeline-item");
  }

  const viewportCenter = window.innerHeight / 2;
  let centerItem = null;
  let minDistance = Infinity;

  // 早期終了のための最適化
  for (let i = 0; i < cachedItems.length; i++) {
    const item = cachedItems[i];
    const rect = item.getBoundingClientRect();

    // 画面外の要素はスキップ
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      continue;
    }

    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(itemCenter - viewportCenter);

    if (distance < minDistance) {
      minDistance = distance;
      centerItem = item;
    }
  }

  return centerItem;
}

/**
 * アイテムの要素を取得するヘルパー関数
 * @param item タイムラインアイテムのDOM要素
 * @returns アイテム内の各要素の参照
 */
export function getItemElements(item: Element): TimelineElements {
  return {
    year: item.querySelector(".timeline-year"),
    content: item.querySelector(".timeline-content"),
    imageBg: item.querySelector(".timeline-image-bg"),
    overlay: item.querySelector(".timeline-image-overlay"),
    themeHeader: item.querySelector(".timeline-theme-header"),
    events: item.querySelectorAll(".timeline-events *"),
  };
}

/**
 * スクロールイベントのthrottle処理（最適化版）
 * @param callback 実行するコールバック関数
 * @returns throttle処理された関数
 */
export function createThrottledScrollHandler(callback: () => void): () => void {
  let ticking = false;
  let lastScrollTime = 0;
  const THROTTLE_DELAY = 16; // 60fps相当

  return () => {
    const now = Date.now();

    // 時間ベースのthrottle + requestAnimationFrame
    if (!ticking && now - lastScrollTime >= THROTTLE_DELAY) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
        lastScrollTime = now;
      });
      ticking = true;
    }
  };
}

/**
 * アイテムを画面中央にスクロール
 * @param item スクロール対象のタイムラインアイテム
 */
export function scrollToCenter(item: Element): void {
  const rect = item.getBoundingClientRect();
  const itemCenter = rect.top + rect.height / 2;
  const viewportCenter = window.innerHeight / 2;
  const scrollOffset = window.pageYOffset + itemCenter - viewportCenter;

  window.scrollTo({
    top: scrollOffset,
    behavior: "smooth",
  });
}
