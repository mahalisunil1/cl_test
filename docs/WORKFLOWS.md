# Composable Workflows (Manual)

This repo uses a minimal script-based scaffolder. Use these workflows + scripts.

## 1) Create a Component Package (Manual Workflow)

**Inputs**
- `name`: kebab-case (e.g., `card`)
- `type`: `component` | `template`
- `tier`: `free` | `pro`
- `variants`: `true` | `false`
- `animation`: `true` | `false`

**Steps**
1. Run the scaffold script:

```bash
node scripts/create-component.mjs --name card --type component --variants --animation
```

2. Install package deps (if needed):

```bash
pnpm install
```

3. Update `registry.json` metadata for the new package.
4. Preview the component:

```bash
pnpm dev:docs
# open http://localhost:5173/?preview=card
```

## 2) Update Registry (Manual)

If you need to fix registry manually:

```bash
pwsh scripts/update-registry.ps1 -Name card -Type component -Tier free
```

## 3) Preview Flow

The docs app uses `registry.json` to build the component list.

Open:
```
http://localhost:5173/?preview=<name>
```

## 4) Notes

- Template files live in `templates/component` and `templates/template`.

## 5) Create a Template Package

```bash
node scripts/create-template.mjs --name hero-section
```
