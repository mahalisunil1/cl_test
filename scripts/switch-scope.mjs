import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const idx = args.indexOf(name);
  if (idx === -1) return fallback;
  const val = args[idx + 1];
  return val ?? fallback;
};

const fromScope = getArg("--from", "@sunil");
const toScope = getArg("--to", "@components-layer");
const dryRun = args.includes("--dry");

if (!fromScope.startsWith("@") || !toScope.startsWith("@")) {
  console.error("Scopes must start with '@'. Example: --from @sunil --to @components-layer");
  process.exit(1);
}

const exts = new Set([
  ".json",
  ".ts",
  ".tsx",
  ".js",
  ".cjs",
  ".mjs",
  ".md",
  ".yml",
  ".yaml",
  ".css",
  ".scss",
  ".txt",
]);

const skipDirs = new Set(["node_modules", "dist", ".git", ".turbo"]);

let changedFiles = 0;
let changedOccurrences = 0;

const replaceInFile = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(fromScope)) return;
  const next = content.split(fromScope).join(toScope);
  const diff = (content.length - next.length) / (fromScope.length - toScope.length);
  if (!dryRun) fs.writeFileSync(filePath, next, "utf8");
  changedFiles += 1;
  changedOccurrences += Number.isFinite(diff) ? Math.abs(diff) : 0;
};

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      walk(full);
      continue;
    }
    const ext = path.extname(entry.name);
    if (!exts.has(ext)) continue;
    replaceInFile(full);
  }
};

walk(process.cwd());

console.log(
  dryRun
    ? `Dry run: would update ${changedFiles} files, ${changedOccurrences} occurrences.`
    : `Updated ${changedFiles} files, ${changedOccurrences} occurrences.`
);
