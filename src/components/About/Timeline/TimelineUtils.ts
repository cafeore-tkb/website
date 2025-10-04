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

/**
 * 画面中央のタイムラインアイテムを取得
 * @returns 画面中央に最も近いタイムラインアイテム
 */
export function getCenterTimelineItem(): Element | null {
  const items = document.querySelectorAll(".timeline-item");
  const viewportCenter = window.innerHeight / 2;
  let centerItem = null;
  let minDistance = Infinity;

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(itemCenter - viewportCenter);

    if (distance < minDistance) {
      minDistance = distance;
      centerItem = item;
    }
  });

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
 * スクロールイベントのthrottle処理
 * @param callback 実行するコールバック関数
 * @returns throttle処理された関数
 */
export function createThrottledScrollHandler(callback: () => void): () => void {
  let ticking = false;

  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
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
