export function getWebpLosslessSrc(imageUrl: string): string {
  const url = new URL(imageUrl);

  url.searchParams.set("fm", "webp");
  url.searchParams.set("lossless", "true");

  return url.toString();
}
