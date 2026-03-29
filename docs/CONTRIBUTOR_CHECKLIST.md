# Contributor Checklist

Use this as the quick path for new components.

1. Scaffold
   - `pwsh scripts/create-component.ps1 -Name <kebab-name> -Type component -Variants -Animation`
   - `pwsh scripts/create-template.ps1 -Name <kebab-name>` (for templates)
2. Metadata
   - Add `registry.json` meta: `title`, `description`, `tags`, `status`, `kind`
3. Preview
   - `pnpm dev:docs`
   - open `http://localhost:5173/?preview=<name>`
4. Quality
   - `pnpm release:check`
   - `pnpm check:changeset` (CI will enforce)
5. Changeset
   - `pnpm changeset`
6. PR
   - Include preview URL + mention any new tokens
