# Contributor Checklist

Use this as the quick path for new components.

1. Scaffold
   - `node scripts/create-component.mjs --name <kebab-name> --type component --variants --animation`
   - `node scripts/create-template.mjs --name <kebab-name>` (for templates)
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
