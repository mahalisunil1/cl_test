import * as React from "react"
import { cn } from "@mahalisunil1/utils"
import { gsap, createTimeline } from "@mahalisunil1/animation"

export type CardVariant = "default" | "soft"

export type CardAction = {
  label: string
  icon: React.ReactNode
}

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
  accountLabel?: string
  accountLast4?: string
  amount?: string
  helperText?: string
  actions?: CardAction[]
}

const variantClasses: Record<CardVariant, string> = {
  default:
    "bg-[#eeeeee] text-[#1f1f1f] shadow-[0_24px_50px_rgba(0,0,0,0.18)]",
  soft:
    "bg-gradient-to-br from-[#f2f2f2] to-[#e7e7e7] text-[#1f1f1f] shadow-[0_24px_50px_rgba(0,0,0,0.12)]"
}

export function Card({
  className,
  variant = "default",
  accountLabel = "Checking",
  accountLast4 = ".... 3762",
  amount = "$1,480.24",
  helperText = "Available balance",
  actions = [
    { label: "Pay", icon: <span className="text-lg">$</span> },
    { label: "Add money", icon: <span className="text-xl">+</span> },
    { label: "Transfer", icon: <span className="text-lg">?</span> }
  ],
  ...props
}: CardProps) {
  const localRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!localRef.current) return
    gsap.set(localRef.current, { opacity: 0, y: 12 })
    createTimeline().to(localRef.current, { opacity: 1, y: 0, duration: 0.4 })
  }, [])

  return (
    <div
      ref={localRef}
      className={cn(
        "w-full max-w-[340px] rounded-[34px] p-5",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="rounded-[26px] bg-white/90 px-5 pb-5 pt-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between text-[13px] text-[#7c7c7c]">
          <span className="font-medium">{accountLabel}</span>
          <span className="tracking-[0.25em]">{accountLast4}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-[34px] font-semibold leading-none text-[#1b1b1b]">
              {amount}
            </div>
            <div className="mt-2 text-[12px] uppercase tracking-[0.2em] text-[#b4b4b4]">
              {helperText}
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f0f0] text-[#b0b0b0]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M9 7h8v8" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1 text-[#bdbdbd]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#c7c7c7]" />
        <span className="h-1.5 w-6 rounded-full bg-[#4b4b4b]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#c7c7c7]" />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        {actions.map(action => (
          <div key={action.label} className="space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#8d8d8d] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
              {action.icon}
            </div>
            <div className="text-[11px] font-medium text-[#6f6f6f]">
              {action.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
