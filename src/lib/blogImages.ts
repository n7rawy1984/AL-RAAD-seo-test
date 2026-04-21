// Auto-import all blog images via Vite's import.meta.glob
// Returns a map: { "diesel-supply-dubai-24-7": "/assets/diesel-supply-dubai-24-7-HASH.webp", ... }
const modules = import.meta.glob("@/assets/blog/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageMap: Record<string, string> = {};
for (const path in modules) {
  // path looks like "/src/assets/blog/diesel-supply-dubai-24-7.webp"
  const match = path.match(/\/([^/]+)\.webp$/);
  if (match) {
    imageMap[match[1]] = modules[path];
  }
}

export function getBlogImage(slug: string): string {
  return imageMap[slug] || imageMap["default"] || "";
}

export { imageMap };
