import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "registry.json");
const outDir = path.join(root, "dist");
const outFile = path.join(outDir, "registry.json");

if (!fs.existsSync(src)) {
  console.error("registry.json not found");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(src, outFile);

console.log(`Wrote ${outFile}`);
