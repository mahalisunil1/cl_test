import * as React from "react"
import { {{componentNamePascal}} } from "./component"

export function {{componentNamePascal}}Preview() {
  return (
    <div className="flex justify-center">
      <{{componentNamePascal}}>
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">
            {{componentNamePascal}}
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Fresh start
          </h2>
          <p className="text-sm text-white/70">
            Replace this preview with real content for your component.
          </p>
        </div>
      </{{componentNamePascal}}>
    </div>
  )
}
