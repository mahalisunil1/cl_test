# Publishing Checklist

This repo uses Changesets + GitHub Actions to publish packages to npm.

## 1) One-time npm setup

1. Create an npm **Automation token** with **Read and write** access.
2. Scope should match the packages (currently `@mahalisunil1/*`).
3. Add the token to GitHub Actions secrets as `NPM_TOKEN`.

## 2) Package requirements

Each package under `packages/*` must have:

- `name`: scoped package name (e.g. `@mahalisunil1/card`)
- `version`
- `private: false`
- `publishConfig.access: "public"`
- `files: ["dist", "src"]`
- `build` script that generates `dist/`

Component packages must list:

- `react`, `react-dom`, `tailwindcss` as **peerDependencies**

Core packages:

- `tokens` has no dependencies
- `utils` owns `clsx` + `tailwind-merge`
- `animation` owns `gsap`

## 3) Release flow (Changesets)

1. `pnpm changeset`
2. Commit the changeset
3. Push/merge to `main`
4. Release workflow runs:
   - `pnpm version`
   - `pnpm release`

## 4) Verify publish

```bash
npm view @mahalisunil1/card
```

## 5) Optional local checks

```bash
pnpm release:check
```

## 6) Switching scope later

```bash
pnpm switch:scope -- --from @mahalisunil1 --to @components-layer
```

Dry run:

```bash
pnpm switch:scope -- --from @mahalisunil1 --to @components-layer --dry
```
