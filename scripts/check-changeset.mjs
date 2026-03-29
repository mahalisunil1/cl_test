import { execSync } from "node:child_process";

function run(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] })
    .toString()
    .trim();
}

function isGitRepo() {
  try {
    const result = run("git rev-parse --is-inside-work-tree");
    return result === "true";
  } catch {
    return false;
  }
}

function getBaseRef() {
  const baseRef = process.env.GITHUB_BASE_REF;
  if (baseRef) return `origin/${baseRef}`;
  try {
    return run("git rev-parse HEAD~1");
  } catch {
    return "HEAD~1";
  }
}

function listChangedFiles(baseRef) {
  const diffCmd = `git diff --name-only ${baseRef}...HEAD`;
  const output = run(diffCmd);
  return output ? output.split("\n") : [];
}

function hasChangeset(changed) {
  return changed.some((file) => file.startsWith(".changeset/") && file.endsWith(".md"));
}

function needsChangeset(changed) {
  return changed.some((file) => {
    if (file.startsWith("packages/")) return true;
    if (file === "registry.json") return true;
    return false;
  });
}

try {
  if (!isGitRepo()) {
    console.warn("Changeset check skipped: not a git repository.");
    process.exit(0);
  }
  const baseRef = getBaseRef();
  const changed = listChangedFiles(baseRef);
  if (!changed.length) {
    console.log("No changes detected.");
    process.exit(0);
  }

  const requires = needsChangeset(changed);
  const has = hasChangeset(changed);

  if (requires && !has) {
    console.error("Changeset required: changes detected in packages/ or registry.json.");
    console.error("Add one with: pnpm changeset");
    process.exit(1);
  }

  console.log("Changeset check passed.");
} catch (error) {
  console.error("Changeset check failed:", error?.message ?? error);
  process.exit(1);
}
