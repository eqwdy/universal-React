export default function normalizeProducts(products) {
  if (!products) return [];
  if (typeof products === "string") {
    try {
      const parsed = JSON.parse(products);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return Array.isArray(products) ? products : [];
}
