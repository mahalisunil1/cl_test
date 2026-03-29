# Contributing

Thanks for helping improve Components Layer.

## Workflow

1. Scaffold a component with the script:

```bash
pwsh scripts/create-component.ps1 -Name <kebab-name> -Type component -Variants -Animation
```

2. Scaffold a template (if needed):

```bash
pwsh scripts/create-template.ps1 -Name <kebab-name>
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
- Only import animation from `@components-layer/animation`.
- React and Tailwind must remain peerDependencies in components.
- Keep packages small and focused.
- Ensure `registry.json` metadata exists (title, description, tags, status, kind).

## Need help?

Open an issue or ask in the PR.
