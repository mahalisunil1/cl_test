import * as React from "react"
import { Card } from "./component"

export function CardPreview() {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-[28px] bg-white/5 p-6">
      <Card />
    </div>
  )
}
