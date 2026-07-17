import { readFile, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pages = ["index.html", "404.html"];
const problems = [];

for (const page of pages) {
  const path = resolve(root, page);
  const html = await readFile(path, "utf8");
  if (!/<title>.+<\/title>/.test(html)) problems.push(`${page}: missing title`);
  if (page !== "404.html" && !/rel="canonical"/.test(html)) problems.push(`${page}: missing canonical`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1) problems.push(`${page}: expected exactly one h1`);
  if (/placeholder|reserved photo/i.test(html)) problems.push(`${page}: placeholder copy found`);
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const link = match[1];
    if (/^(https?:|mailto:|\/)/.test(link)) continue;
    const local = resolve(dirname(path), link.replace(/[?#].*$/, ""));
    try { await access(local); } catch { problems.push(`${page}: missing local target ${link}`); }
  }
}

if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log(`Checked ${pages.length} pages. No missing metadata, assets, or placeholders.`);
