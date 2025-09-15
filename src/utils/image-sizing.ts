export interface Options {
  src: {
    width: number;
    height: number;
  };
  maxWidth?: number;
  maxHeight?: number;
}

export function getWidthHeight({
  src,
  maxWidth = 1920,
  maxHeight = 1080,
}: Options) {
  const originalAspect = src.width / src.height;
  const width = Math.min(src.width, maxWidth);
  const height = Math.min(src.height, maxHeight);
  const targetAspect = width / height;

  if (originalAspect > targetAspect) {
    return { width, height: Math.round(width / originalAspect) };
  } else {
    return { width: Math.round(height * originalAspect), height };
  }
}
