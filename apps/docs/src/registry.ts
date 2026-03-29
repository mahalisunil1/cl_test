import rawRegistry from "../../../registry.json"

export type RegistryMeta = {
  title: string
  description: string
  author: {
    name: string
    handle?: string
  }
  tags: string[]
  status: "draft" | "stable" | "deprecated"
  kind?: "component" | "template"
}

export type RegistryData = {
  components: string[]
  templates: string[]
  meta?: Record<string, RegistryMeta | undefined>
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string")
}

function isRegistryMeta(value: unknown): value is RegistryMeta {
  if (!value || typeof value !== "object") return false
  const meta = value as RegistryMeta
  return (
    typeof meta.title === "string" &&
    typeof meta.description === "string" &&
    !!meta.author &&
    typeof meta.author.name === "string" &&
    Array.isArray(meta.tags) &&
    meta.tags.every(tag => typeof tag === "string") &&
    (meta.status === "draft" ||
      meta.status === "stable" ||
      meta.status === "deprecated") &&
    (!meta.kind || meta.kind === "component" || meta.kind === "template")
  )
}

function normalizeMetaMap(meta: RegistryData["meta"]) {
  const output: Record<string, RegistryMeta> = {}
  if (!meta) return output
  for (const [key, value] of Object.entries(meta)) {
    if (isRegistryMeta(value)) {
      output[key] = value
    } else if (value !== undefined) {
      console.warn(
        `[registry] Invalid meta entry for "${key}" - expected { title, description, author, tags, status }.`
      )
    }
  }
  return output
}

export function getRegistry(): RegistryData & { meta: Record<string, RegistryMeta> } {
  const registry = rawRegistry as RegistryData
  if (!isStringArray(registry.components)) registry.components = []
  if (!isStringArray(registry.templates)) registry.templates = []

  return {
    ...registry,
    meta: normalizeMetaMap(registry.meta)
  }
}
