# Components Layer Manual

This document explains how the monorepo is structured, how to develop, and how to publish.

## 1) Architecture Overview

This is a pnpm workspace monorepo that enforces a layered dependency model.

Top-level structure:

- `apps/docs`: Vite + React + Tailwind playground
- `packages/tokens`: design tokens (no dependencies)
- `packages/utils`: shared helpers (`clsx`, `tailwind-merge`)
- `packages/animation`: GSAP abstraction (components must not import `gsap` directly)
- `packages/*`: component packages (e.g. `button`, `card`)
- `packages/templates`: template layer (depends on components only) (optional)
- `.changeset/`: changesets release pipeline
- `registry.json`: component registry metadata

## 2) Dependency Governance Rules

Dependency direction is enforced. Do not violate this.

Allowed dependency rules:

- `tokens` â†’ **no dependencies**
- `utils` â†’ owns `clsx`, `tailwind-merge`
- `animation` â†’ owns `gsap`
- `components` â†’ depend only on `tokens`, `utils`, `animation`
- `templates` â†’ depend only on components

Never add these directly inside component packages:

- `react`
- `react-dom`
- `tailwindcss`
- `clsx`
- `tailwind-merge`
- `gsap`

React and Tailwind must always be **peerDependencies** in component packages.

## 3) Workspace and Package Resolution

Packages use `workspace:*` during development. `publishConfig` swaps to `dist/` outputs on publish.

If you add new packages, you must run:

```bash
pnpm install
```

This refreshes workspace links so TypeScript can resolve `@sunil/*` imports.

## 4) Docs Playground App

The docs app is in `apps/docs` and is the preview environment for components.

Run it:

```bash
pnpm dev:docs
```

Tailwind scans:

- `apps/docs/src`
- `packages/**/*.{ts,tsx}`

Config: `apps/docs/tailwind.config.ts`

## 5) Component Development Workflow

### Create a Component

```bash
node scripts/create-component.mjs --name card --type component --variants --animation
```

### Create a Template

```bash
node scripts/create-template.mjs --name hero-section
```

Then update `registry.json` metadata and start the docs app.

### Edit and Preview

```bash
pnpm dev:docs
```

### Build Packages

```bash
pnpm build:packages
```

### Typecheck

```bash
pnpm typecheck:packages
```

## 7) Tokens Package

Location:

- `packages/tokens/src/index.ts`

Exports:

- `colors`
- `spacing`
- `radius`
- `shadows`
- `typography`
- `breakpoints`
- `zIndex`
- `tokens`

Tokens are strongly typed and dependency-free.

## 8) Utils Package

Location:

- `packages/utils/src/index.ts`

Exports:

- `cn()` â€“ class merge helper using `clsx` + `tailwind-merge`
- `mergeRefs()` â€“ ref combiner
- `composeHandlers()` â€“ event handler combiner

## 9) Animation Package

Location:

- `packages/animation/src/index.ts`

Exports:

- `gsap`
- `registerScrollTrigger()`
- `createTimeline()`
- `fadeIn()`
- `fadeOut()`

Components should import from `@sunil/animation` rather than `gsap`.

## 10) Templates Package

Location:

- `packages/templates`

This layer is for composition-only templates that use components.
Templates must not depend on `tokens`, `utils`, or `animation` directly.

## 11) Release Workflow (Changesets)

### Add Changeset

```bash
pnpm changeset
```

### Version

```bash
pnpm version
```

### Publish

```bash
pnpm release
```

## 12) CI Notes

There is no CI config in this repo yet. When you add one, the minimal checks should be:

- `pnpm install`
- `pnpm build:packages`
- `pnpm typecheck:packages`
- `pnpm --filter docs build`

Optional (if added later):

- lint (`pnpm lint`)
- format (`pnpm format`)

## 13) Linting

Linting is currently configured only in the docs app via `eslint.config.js`.

Run it from `apps/docs`:

```bash
pnpm --filter docs lint
```

If you want workspace-wide linting, add a root `lint` script and configs for packages.

## 14) Release Automation

Recommended automation flow:

1. Developer creates a changeset: `pnpm changeset`
2. CI runs build + typecheck + docs build
3. On merge to `main`, a release workflow runs:
   - `pnpm version` (creates version bump PR or commit)
   - `pnpm release` (publishes to npm)

Changesets automatically converts `workspace:*` ranges to `^version` on publish.

## 11.1) Package Scope

All packages use the `@sunil/*` scope.

## 15) Contribution Guidelines

1. Use `scripts/create-component.ps1` for new components.
2. Do not add forbidden dependencies to component packages.
3. Keep component packages small and focused.
4. Add a changeset for any published package change.
5. Verify with `pnpm release:check` before opening a PR.

## 16) Branch Protection Recommendations

For the `main` branch, enable these rules:

- Require pull request before merging
- Require at least 1 approval
- Dismiss stale approvals on new commits
- Require status checks to pass (`CI / build`)
- Require branches to be up to date before merging
- Require conversation resolution before merging

Optional, but useful:

- Require signed commits
- Require linear history
- Restrict who can push to `main`

These rules keep the repo consistently releasable and prevent bypassing the
changesets workflow.

## 17) Common Errors

**Error: Cannot find module @sunil/...**

Cause: workspace links not updated after adding packages.

Fix:

```bash
pnpm install
```

**Docs build fails after adding new packages**

Fix:

```bash
pnpm install
pnpm --filter docs build
```

## 18) Required Success Criteria

When adding a new component package manually, it must:

- live under `packages/<name>`
- update `registry.json`
- be importable and renderable in the docs app

