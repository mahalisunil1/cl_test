import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

type RefCallback<T> = (value: T | null) => void
type RefObject<T> = { current: T | null }
type PossibleRef<T> = RefCallback<T> | RefObject<T> | null | undefined

export function cn(...inputs: Array<unknown>) {
  return twMerge(clsx(inputs))
}

export function mergeRefs<T>(...refs: Array<PossibleRef<T>>) {
  return (value: T | null) => {
    refs.forEach(ref => {
      if (!ref) return
      if (typeof ref === "function") {
        ref(value)
        return
      }
      try {
        ;(ref as RefObject<T>).current = value
      } catch {
        // Ignore readonly refs
      }
    })
  }
}

export function composeHandlers<E>(
  ...handlers: Array<((event: E) => void) | undefined>
) {
  return (event: E) => {
    handlers.forEach(handler => handler?.(event))
  }
}
