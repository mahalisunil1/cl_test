import * as React from "react"

export type {{componentNamePascal}}Props = {
  headline: string
  subhead?: string
  primaryCta?: string
  secondaryCta?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export function {{componentNamePascal}}({
  headline,
  subhead,
  primaryCta = "Get started",
  secondaryCta = "Learn more",
  onPrimaryClick,
  onSecondaryClick
}: {{componentNamePascal}}Props) {
  return (
    <section className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
      <div className="max-w-2xl space-y-5">
        <h1 className="text-3xl font-semibold md:text-4xl">{headline}</h1>
        {subhead ? (
          <p className="text-sm text-white/70 md:text-base">{subhead}</p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0c1214]"
          >
            {primaryCta}
          </button>
          <button
            type="button"
            onClick={onSecondaryClick}
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white/80"
          >
            {secondaryCta}
          </button>
        </div>
      </div>
    </section>
  )
}
