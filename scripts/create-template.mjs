import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const name = getArg("--name");

if (!name) {
  console.error("Missing --name");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(name)) {
  console.error("Name must be kebab-case.");
  process.exit(1);
}

const root = process.cwd();
const pkgDir = path.join(root, "packages", name);

if (fs.existsSync(pkgDir)) {
  console.error(`Package already exists: ${name}`);
  process.exit(1);
}

const templatesRoot = path.join(root, "templates", "template");
if (!fs.existsSync(templatesRoot)) {
  console.error(`Templates not found: ${templatesRoot}`);
  process.exit(1);
}

fs.mkdirSync(path.join(pkgDir, "src"), { recursive: true });

const pascal = name
  .split("-")
  .filter(Boolean)
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join("");

const replacements = {
  "{{packageName}}": name,
  "{{componentNamePascal}}": pascal
};

const templateFiles = fs.readdirSync(templatesRoot).filter((file) => file.endsWith(".tpl"));

for (const file of templateFiles) {
  const templatePath = path.join(templatesRoot, file);
  let content = fs.readFileSync(templatePath, "utf8");
  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(String(value));
  }

  const targetFile = file.replace(/\.tpl$/, "");
  const isCode = targetFile.endsWith(".ts") || targetFile.endsWith(".tsx");
  const inSrc = isCode && targetFile !== "tsconfig.json" && targetFile !== "tsup.config.ts";
  const outDir = inSrc ? path.join(pkgDir, "src") : pkgDir;
  const outPath = path.join(outDir, targetFile);
  fs.writeFileSync(outPath, content, "utf8");
}

execSync(`node ${path.join("scripts", "update-registry.mjs")} --name ${name} --type template`, {
  stdio: "inherit"
});

console.log(`Created template: ${name}`);
