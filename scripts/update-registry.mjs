import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const name = getArg("--name");
const type = getArg("--type") ?? "component";

if (!name) {
  console.error("Missing --name");
  process.exit(1);
}

if (!["component", "template"].includes(type)) {
  console.error("Invalid --type (component | template)");
  process.exit(1);
}

const root = process.cwd();
const registryPath = path.join(root, "registry.json");

if (!fs.existsSync(registryPath)) {
  console.error("registry.json not found");
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
registry.components ??= [];
registry.templates ??= [];
registry.meta ??= {};

const key = type === "template" ? "templates" : "components";
if (!registry[key].includes(name)) registry[key].push(name);

let authorName = "unknown";
try {
  const gitName = execSync("git config --get user.name", {
    stdio: ["ignore", "pipe", "ignore"]
  })
    .toString()
    .trim();
  if (gitName) authorName = gitName;
} catch {
  // ignore
}

if (!registry.meta[name]) {
  const title = name
    .split("-")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");

  registry.meta[name] = {
    title,
    description: "",
    author: { name: authorName },
    tags: [],
    status: "draft",
    kind: type
  };
} else if (!registry.meta[name].kind) {
  registry.meta[name].kind = type;
}

fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
console.log(`Updated registry: ${key} += ${name}`);
