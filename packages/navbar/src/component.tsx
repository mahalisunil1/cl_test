import * as React from "react"
import { cn } from "@sunil/utils"
import { gsap, createTimeline } from "@sunil/animation"

export type MegaMenuLink = {
  label: string
  href?: string
  description?: string
}

export type MegaMenuColumn = {
  heading: string
  links: MegaMenuLink[]
}

export type MegaMenuConfig = {
  columns: MegaMenuColumn[]
  featured?: {
    title: string
    description: string
    href?: string
    ctaLabel?: string
  }
}

export type NavItem = {
  label: string
  href?: string
  megaMenu?: MegaMenuConfig
}

export type NavbarProps = React.HTMLAttributes<HTMLElement> & {
  brand: {
    label: string
    href?: string
  }
  items: NavItem[]
  primaryCta?: {
    label: string
    href?: string
  }
  secondaryCta?: {
    label: string
    href?: string
  }
}

export function Navbar({
  className,
  brand,
  items,
  primaryCta,
  secondaryCta,
  ...props
}: NavbarProps) {
  const localRef = React.useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!localRef.current) return
    gsap.set(localRef.current, { opacity: 0, y: 10 })
    createTimeline().to(localRef.current, { opacity: 1, y: 0, duration: 0.35 })
  }, [])

  return (
    <header
      ref={localRef}
      className={cn(
        "relative w-full rounded-3xl border border-white/10 bg-[var(--cl-color-surface)]/80 px-6 py-4 text-[var(--cl-color-foreground)] shadow-[0_24px_50px_rgba(0,0,0,0.2)] backdrop-blur",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-6">
        <a
          href={brand.href ?? "#"}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80"
        >
          {brand.label}
        </a>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {items.map(item => {
            const hasMega = Boolean(item.megaMenu)
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasMega && setOpen(item.label)}
                onMouseLeave={() => hasMega && setOpen(null)}
              >
                <a
                  href={item.href ?? "#"}
                  className="flex items-center gap-2 rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                  {hasMega ? (
                    <span className="inline-block h-2 w-2 border-b border-r border-white/60 rotate-45" />
                  ) : null}
                </a>

                {hasMega && open === item.label ? (
                  <div className="absolute left-1/2 top-full z-20 mt-4 w-[640px] -translate-x-1/2 rounded-3xl border border-white/10 bg-[#141417] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
                      <div className="grid gap-6 md:grid-cols-2">
                        {item.megaMenu?.columns.map(column => (
                          <div key={column.heading} className="space-y-3">
                            <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                              {column.heading}
                            </div>
                            <div className="space-y-3 text-sm">
                              {column.links.map(link => (
                                <a
                                  key={link.label}
                                  href={link.href ?? "#"}
                                  className="block rounded-2xl border border-white/5 bg-white/5 px-3 py-2 transition hover:border-white/20 hover:bg-white/10"
                                >
                                  <div className="text-white">{link.label}</div>
                                  {link.description ? (
                                    <div className="text-xs text-white/60">
                                      {link.description}
                                    </div>
                                  ) : null}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {item.megaMenu?.featured ? (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                          <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                            Featured
                          </div>
                          <div className="mt-3 text-lg font-semibold text-white">
                            {item.megaMenu.featured.title}
                          </div>
                          <div className="mt-2 text-sm text-white/70">
                            {item.megaMenu.featured.description}
                          </div>
                          <a
                            href={item.megaMenu.featured.href ?? "#"}
                            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:border-white/40"
                          >
                            {item.megaMenu.featured.ctaLabel ?? "Explore"}
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {secondaryCta ? (
            <a
              href={secondaryCta.href ?? "#"}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:border-white/40"
            >
              {secondaryCta.label}
            </a>
          ) : null}
          {primaryCta ? (
            <a
              href={primaryCta.href ?? "#"}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0c1214]"
            >
              {primaryCta.label}
            </a>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/60 md:hidden"
        >
          Menu
        </button>
      </div>
    </header>
  )
}

