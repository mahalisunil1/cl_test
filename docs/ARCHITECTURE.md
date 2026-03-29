# Architecture & Workflow

This document describes the end‑to‑end engineering flow in this repo.

## 1) Repository Structure

- `packages/`
  - `tokens` (no deps)
  - `utils` (clsx + tailwind-merge)
  - `animation` (gsap wrapper)
  - components + templates (publishable packages)
- `apps/docs` (preview playground)
- `scripts/` (scaffold + validation)
- `templates/` (scaffold templates)
- `registry.json` (source of truth)
- `.changeset/` (versioning entries)

## 2) Dependency Rules

- `tokens` → no dependencies
- `utils` → owns clsx + tailwind-merge
- `animation` → owns gsap
- **components** → may depend only on `tokens`, `utils`, `animation`
- **templates** → may depend only on components

## 3) Create

Component:
```bash
pwsh scripts/create-component.ps1 -Name <kebab-name> -Type component -Variants -Animation
```

Template:
```bash
pwsh scripts/create-template.ps1 -Name <kebab-name>
```

## 4) Registry

Update `registry.json` metadata:
```json
"card": {
  "title": "finance-card",
  "description": "Compact budget summary card with progress and CTA.",
  "author": { "name": "sunil" },
  "tags": ["finance", "budget", "card", "progress", "cta"],
  "status": "stable",
  "kind": "component"
}
```

## 5) Preview

```bash
pnpm dev:docs
```

Open:
```
http://localhost:5173/?preview=<name>
```

Docs uses **source** via Vite alias:
```
@components-layer/* → packages/*/src
```

## 6) Versioning

```bash
pnpm changeset
```

Changesets are required whenever `packages/**` or `registry.json` changes.

## 7) Validation

```bash
pnpm release:check
```

Runs:
- build packages
- typecheck packages
- validate registry metadata

## 8) CI

On PR:
- changeset enforcement
- build + typecheck
- registry validation
- docs build
- upload `dist/registry.json` artifact

## 9) Release

On merge to `main`, Release workflow:
- `pnpm version` (bump versions)
- `pnpm release` (publish to npm)
- upload registry artifact

## 10) Consumption

Consumers install from npm:
```
npm install @components-layer/card
```

Published packages use `dist/` (via `publishConfig`).
