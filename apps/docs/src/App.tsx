import * as React from "react"
import type { ComponentType } from "react"
import { cn } from "@components-layer/utils"
import { getRegistry } from "./registry"

type RegistryItem = {
  name: string
  type: "component" | "template"
}

const registry = getRegistry()
const metaMap = registry.meta

const modules = import.meta.glob("../../../packages/*/src/index.ts")

function toPascalCase(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map(segment => segment[0].toUpperCase() + segment.slice(1))
    .join("")
}

export default function App() {
  const items = React.useMemo<RegistryItem[]>(
    () => [
      ...registry.components.map(name => ({
        name,
        type: "component" as const
      })),
      ...registry.templates.map(name => ({
        name,
        type: "template" as const
      }))
    ],
    []
  )

  const [selected, setSelected] = React.useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get("preview") ?? items[0]?.name ?? ""
  })

  React.useEffect(() => {
    const handler = () => {
      const params = new URLSearchParams(window.location.search)
      setSelected(params.get("preview") ?? items[0]?.name ?? "")
    }
    window.addEventListener("popstate", handler)
    return () => window.removeEventListener("popstate", handler)
  }, [items])

  const selectedItem = items.find(item => item.name === selected)
  const selectedMeta = selectedItem ? metaMap[selectedItem.name] : undefined
  const [Preview, setPreview] = React.useState<ComponentType<any> | null>(null)
  const [missingModule, setMissingModule] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    async function load() {
      if (!selectedItem) {
        setPreview(null)
        return
      }
      const modulePath = Object.keys(modules).find(key =>
        key.replace(/\\/g, "/").includes(`/packages/${selectedItem.name}/src/index.ts`)
      )
      if (!modulePath) {
        try {
          const fallback = await import(
            /* @vite-ignore */ `@components-layer/${selectedItem.name}`
          )
          const mod = fallback as Record<string, ComponentType<any>>
          const base = toPascalCase(selectedItem.name)
          const candidate =
            mod[`${base}Preview`] ??
            mod[base] ??
            mod[`${base}Pack`]
          if (!cancelled) {
            setPreview(() => candidate ?? null)
            setMissingModule(false)
          }
          return
        } catch (error) {
          const normalized = Object.keys(modules).map(key => key.replace(/\\/g, "/"))
          console.warn("[preview] Missing module for", selectedItem.name, normalized)
          setPreview(null)
          setMissingModule(true)
          return
        }
      }
      setMissingModule(false)
      const mod = (await modules[modulePath]()) as Record<string, ComponentType<any>>
      const base = toPascalCase(selectedItem.name)
      const candidate =
        mod[`${base}Preview`] ??
        mod[base] ??
        mod[`${base}Pack`]
      if (!cancelled) {
        setPreview(() => candidate ?? null)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [selectedItem])

  const selectItem = (name: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set("preview", name)
    window.history.pushState(null, "", `?${params.toString()}`)
    setSelected(name)
  }

  return (
    <div className="min-h-screen bg-[var(--cl-color-background)] p-10 text-[var(--cl-color-foreground)]">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-3">
          <div className="text-sm uppercase tracking-widest text-white/60">
            Components Layer
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <h1 className="text-3xl font-semibold text-white">
              Live Preview
            </h1>
            {selectedMeta?.status ? (
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
                {selectedMeta.status}
              </span>
            ) : null}
          </div>
          {selectedMeta ? (
            <div className="space-y-3 text-sm text-white/70">
              <div className="text-lg font-semibold text-white">
                {selectedMeta.title}
              </div>
              <div>{selectedMeta.description}</div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-white/50">
                  By {selectedMeta.author.name}
                  {selectedMeta.author.handle
                    ? ` (@${selectedMeta.author.handle})`
                    : ""}
                </span>
                {selectedMeta.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm text-white/60">
              Add metadata in registry.json to display title, description, and tags.
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">
              Library
            </div>
            <div className="space-y-3">
              {items.map(item => {
                const meta = metaMap[item.name]
                const isActive = item.name === selected
                return (
                  <button
                    key={item.name}
                    onClick={() => selectItem(item.name)}
                    className={cn(
                      "w-full rounded-2xl border px-4 py-4 text-left transition",
                      isActive
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-white">
                        {meta?.title ?? item.name}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/50">
                        {meta?.status ?? "draft"}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-white/60">
                      {meta?.description ?? "Add a description in registry.json."}
                    </div>
                    {meta?.tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {meta.tags.map(tag => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80">
            {Preview ? (
              <Preview>{selectedItem?.name}</Preview>
            ) : (
              <div className="space-y-2">
                <div>No preview found for {selectedItem?.name}</div>
                {missingModule ? (
                  <div className="text-xs text-white/60">
                    New package detected. Restart `pnpm dev:docs` to pick up new files.
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
