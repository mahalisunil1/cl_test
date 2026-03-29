import * as React from "react"
import { cn } from "@mahalisunil1/utils"
import { gsap, createTimeline } from "@mahalisunil1/animation"

export type CardVariant = "default" | "glass"

export type CardStat = {
  label: string
  value: string
  icon?: React.ReactNode
}

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
  name?: string
  role?: string
  avatarUrl?: string
  tags?: string[]
  stats?: CardStat[]
  ctaLabel?: string
}

const variantClasses: Record<CardVariant, string> = {
  default:
    "bg-gradient-to-br from-[#f6f6f6] via-[#eef6f7] to-[#d7eff4] text-[#1b1b1b]",
  glass:
    "bg-gradient-to-br from-[#f3f7f8] via-[#eaf4f6] to-[#cfe7ef] text-[#1b1b1b]"
}

export function Card({
  className,
  variant = "default",
  name = "Chloe Harrison",
  role = "Product designer",
  avatarUrl = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=facearea&facepad=2&h=200",
  tags = ["Figma", "UX Design"],
  stats = [
    { label: "Rating", value: "4.5", icon: "?" },
    { label: "Earned", value: "$15K+" },
    { label: "Rate", value: "$80/hr" }
  ],
  ctaLabel = "Get in touch",
  ...props
}: CardProps) {
  const localRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!localRef.current) return
    gsap.set(localRef.current, { opacity: 0, y: 14 })
    createTimeline().to(localRef.current, { opacity: 1, y: 0, duration: 0.45 })
  }, [])

  return (
    <div
      ref={localRef}
      className={cn(
        "w-full max-w-[360px] rounded-[32px] border border-white/70 p-6 shadow-[0_28px_60px_rgba(10,25,35,0.18)]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt={name}
            className="h-14 w-14 rounded-full border border-white/70 object-cover"
          />
          <div>
            <div className="text-lg font-semibold text-[#202020]">
              {name}
            </div>
            <div className="text-sm text-[#6b6f73]">
              {role}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-[#1b1b1b] shadow-[0_6px_14px_rgba(0,0,0,0.1)]"
          aria-label="Share"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 16V4" />
            <path d="M8 8l4-4 4 4" />
            <path d="M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs text-[#5a6064]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        {stats.map(stat => (
          <div key={stat.label} className="space-y-1">
            <div className="flex items-center justify-center gap-1 text-sm font-semibold text-[#202020]">
              {stat.icon ? (
                <span className="text-base text-[#1b1b1b]">{stat.icon}</span>
              ) : null}
              <span>{stat.value}</span>
            </div>
            <div className="text-xs text-[#7b8084]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          className="flex-1 rounded-full border border-white/80 bg-white/75 py-3 text-sm font-semibold text-[#1b1b1b] shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
        >
          {ctaLabel}
        </button>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#1b1b1b] shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
          aria-label="Bookmark"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
