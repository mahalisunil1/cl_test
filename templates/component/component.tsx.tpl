import * as React from "react"
import { cn } from "@mahalisunil1/utils"
{{animationImport}}

{{variantTypeDecl}}

export type {{componentNamePascal}}Props = React.HTMLAttributes<HTMLDivElement> & {
  {{variantProp}}
}

{{variantClasses}}

export function {{componentNamePascal}}({
  className{{variantDefaults}},
  ...props
}: {{componentNamePascal}}Props) {
  const localRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!localRef.current) return
{{animationBlock}}
  }, [])

  return (
    <div
      ref={localRef}
      className={cn(
        "rounded-3xl border border-white/10 bg-[var(--cl-color-surface)] p-6 text-left text-[var(--cl-color-foreground)] shadow-[0_24px_50px_rgba(0,0,0,0.2)]",
        {{variantClassApply}}
        className
      )}
      {...props}
    />
  )
}
