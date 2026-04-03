import * as React from "react"
import { BentoGrid } from "./component"

export function BentoGridPreview() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#09090b] p-8 font-sans">
      <BentoGrid />
    </div>
  )
}
