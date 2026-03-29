export const colors = {
  background: "#0b0b10",
  foreground: "#f5f5f7",
  primary: "#2f6bff",
  primaryForeground: "#ffffff",
  muted: "#a1a1aa",
  border: "#27272a"
} as const

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "32px"
} as const

export const radius = {
  sm: "6px",
  md: "10px",
  lg: "14px",
  xl: "18px",
  full: "9999px"
} as const

export const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.08)",
  md: "0 6px 14px rgba(0,0,0,0.18)",
  lg: "0 12px 30px rgba(0,0,0,0.25)"
} as const

export const typography = {
  fontFamily: {
    sans: "ui-sans-serif, system-ui, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, monospace"
  },
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "22px",
    "2xl": "28px"
  },
  lineHeight: {
    tight: "1.15",
    normal: "1.4",
    relaxed: "1.7"
  }
} as const

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
} as const

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  toast: 1400
} as const

export const tokens = {
  colors,
  spacing,
  radius,
  shadows,
  typography,
  breakpoints,
  zIndex
} as const

export type Tokens = typeof tokens
