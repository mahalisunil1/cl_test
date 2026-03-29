import * as React from "react"
import { cn } from "@mahalisunil1/utils"
import { gsap, createTimeline } from "@mahalisunil1/animation"

export type CardVariant = "default" | "outline"

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
  period?: string
  title?: string
  amount?: string
  limitLabel?: string
  progress?: number
  spentLabel?: string
  spentAmount?: string
  remainingLabel?: string
  remainingAmount?: string
  actionLabel?: string
  onActionClick?: () => void
}

const variantClasses: Record<CardVariant, string> = {
  default:
    "bg-gradient-to-b from-[#232323] to-[#1a1a1a] text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)]",
  outline: "border border-white/20 bg-transparent text-white"
}

export function Card({
  className,
  variant = "default",
  period = "SEP",
  title = "Monthly Budget",
  amount = "$8,000",
  limitLabel = "Monthly Spending Limit",
  progress = 0.62,
  spentLabel = "Spent",
  spentAmount = "$2,886",
  remainingLabel = "Budget Remaining",
  remainingAmount = "$5,114",
  actionLabel = "View More",
  onActionClick,
  ...props
}: CardProps) {
  const localRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!localRef.current) return
    gsap.set(localRef.current, { opacity: 0, y: 10 })
    createTimeline().to(localRef.current, { opacity: 1, y: 0, duration: 0.35 })
  }, [])

  return (
    <div
      ref={localRef}
      className={cn(
        "rounded-[22px] border border-white/5 px-5 py-4 text-left",
        "shadow-[0_10px_22px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[12px] text-white/70">{title}</div>
          <div className="text-[30px] font-semibold leading-none tracking-tight">
            {amount}
          </div>
          <div className="text-[12px] text-white/55">{limitLabel}</div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f1f1f1] px-3 py-1 text-[11px] font-semibold text-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
        >
          {period}
          <svg viewBox="0 0 12 8" className="h-2.5 w-2.5" aria-hidden="true">
            <path d="M1 1.5 6 6.5 11 1.5" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="mt-3">
        <div className="h-[6px] w-full rounded-full bg-white/10">
          <div
            className="h-[6px] rounded-full bg-[#39e7f0]"
            style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-4 text-[12px]">
        <div>
          <div className="text-white/55">{spentLabel}</div>
          <div className="text-[13px] font-semibold">{spentAmount}</div>
        </div>
        <div className="text-right">
          <div className="text-white/55">{remainingLabel}</div>
          <div className="text-[13px] font-semibold">{remainingAmount}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={onActionClick}
        className="mt-4 w-full rounded-full bg-[#f1f1f1] py-2 text-sm font-semibold text-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
      >
        {actionLabel}
      </button>
    </div>
  )
}


