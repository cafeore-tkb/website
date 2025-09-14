export const formatDate = (date: Date) => {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
};
