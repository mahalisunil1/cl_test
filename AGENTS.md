# Components Layer Agent Guide

This repo is a layered UI component registry. Follow the architecture contract:

- `tokens` has **no dependencies**.
- `utils` owns `clsx` + `tailwind-merge`.
- `animation` owns `gsap`.
- Components may only depend on `tokens`, `utils`, `animation`.
- Templates may only depend on components.
- React and Tailwind must be **peerDependencies** of component packages.
- Paid packages should use scope `@components-layer-pro/*`.

Never add `react`, `react-dom`, `tailwindcss`, `clsx`, `tailwind-merge`, or `gsap`
directly to component packages.

## Expected Workflow

1. Scaffold a component: `node scripts/create-component.mjs --name <name> --type component --variants --animation`
2. Scaffold a template (if needed): `node scripts/create-template.mjs --name <name>`
3. Start docs preview immediately after scaffolding: `pnpm dev:docs`
4. Add a changeset: `pnpm changeset`
5. Commit and push
6. Merge PR
7. Publish: `pnpm release`

## Validation

- `pnpm build:packages`
- `pnpm typecheck:packages`
- Docs preview: `pnpm dev:docs`
