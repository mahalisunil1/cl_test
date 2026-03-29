import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const name = getArg("--name");
const variants = args.includes("--variants");
const animation = args.includes("--animation");
const type = getArg("--type") ?? "component";

if (!name) {
  console.error("Missing --name");
  process.exit(1);
}

if (type !== "component") {
  console.error("Only type=component is supported.");
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

const templatesRoot = path.join(root, "templates", "component");
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
  "{{componentNamePascal}}": pascal,
  "{{animationImport}}": animation
    ? 'import { gsap, createTimeline } from "@sunil/animation"'
    : "",
  "{{animationBlock}}": animation
    ? `    gsap.set(localRef.current, { opacity: 0, y: 10 })
    createTimeline().to(localRef.current, { opacity: 1, y: 0, duration: 0.35 })`
    : "",
  "{{variantTypeDecl}}": variants
    ? `export type ${pascal}Variant = "default" | "outline"`
    : "",
  "{{variantProp}}": variants ? `variant?: ${pascal}Variant` : "",
  "{{variantClasses}}": variants
    ? `const variantClasses: Record<${pascal}Variant, string> = {
  default: "bg-[var(--cl-color-surface)] text-[var(--cl-color-foreground)]",
  outline: "border border-white/20 bg-transparent text-white"
}`
    : "",
  "{{variantDefaults}}": variants ? `, variant = "default"` : "",
  "{{variantClassApply}}": variants ? "variantClasses[variant]," : "",
  "{{variantTypeExport}}": variants ? `, ${pascal}Variant` : ""
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

execSync(`node ${path.join("scripts", "update-registry.mjs")} --name ${name} --type component`, {
  stdio: "inherit"
});

console.log(`Created package: ${name}`);

