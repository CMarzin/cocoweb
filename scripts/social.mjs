// Usage: npm run social [-- <number | slug-or-filename-fragment>]   (defaults to latest post)
import { readdirSync, readFileSync } from "node:fs";

const dir = new URL("../src/content/blog/en/", import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith(".mdx")).sort();
const query = process.argv[2];
const index = !query ? files.length - 1
  : /^\d+$/.test(query) ? Number(query) - 1
  : files.findIndex((f) => f.includes(query));
if (!files[index]) throw new Error(`No post matching "${query}" (1-${files.length})`);

const file = files[index];
const anchors = [...readFileSync(new URL(file, dir), "utf8").matchAll(/<AnchorLink emoji="([^"]+)" text="([^"]+)"/g)]
  .map(([, emoji, text]) => `${emoji} ${text}`);
const [headline, ...items] = anchors;

console.log(`Tips of the week #${index + 1} : ${headline}

${items.join("\n")}

https://cocoweb.fr/blog/${file.replace(/\.mdx$/, "")}/`);
