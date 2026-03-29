import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "registry.json");

if (!fs.existsSync(registryPath)) {
  console.error("registry.json not found");
  process.exit(1);
}

let raw = fs.readFileSync(registryPath, "utf8");
if (raw.charCodeAt(0) === 0xfeff) {
  raw = raw.slice(1);
}
const registry = JSON.parse(raw);
const meta = registry.meta ?? {};

const missing = [];

function hasMeta(name) {
  return Object.prototype.hasOwnProperty.call(meta, name);
}

for (const name of registry.components ?? []) {
  if (!hasMeta(name)) missing.push(name);
}
for (const name of registry.templates ?? []) {
  if (!hasMeta(name)) missing.push(name);
}

if (missing.length) {
  console.error("Missing registry metadata for:");
  for (const name of missing) {
    console.error(` - ${name}`);
  }
  process.exit(1);
}

console.log("Registry metadata OK.");
