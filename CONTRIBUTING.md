# Contributing

Thanks for helping improve Components Layer.

## Workflow

1. Scaffold a component with the script:

```bash
node scripts/create-component.mjs --name <kebab-name> --type component --variants --animation
```

2. Scaffold a template (if needed):

```bash
node scripts/create-template.mjs --name <kebab-name>
```

3. Add or update `registry.json` metadata for the new package.

4. Preview in docs:

```bash
pnpm dev:docs
```

5. Run checks:

```bash
pnpm release:check
```

6. Add a changeset:

```bash
pnpm changeset
```

CI will fail if package or registry changes are made without a changeset.

7. Open a PR.

## Rules

- Do not add forbidden deps to component packages.
- Only import animation from `@mahalisunil1/animation`.
- React and Tailwind must remain peerDependencies in components.
- Keep packages small and focused.
- Ensure `registry.json` metadata exists (title, description, tags, status, kind).

## Need help?

Open an issue or ask in the PR.

