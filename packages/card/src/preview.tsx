import * as React from "react"
import { Card } from "./component"

export function CardPreview() {
  return (
    <div className="flex justify-center">
      <Card
        className="w-[300px]"
        title="Monthly Budget"
        amount="$8,000"
        limitLabel="Monthly Spending Limit"
        period="SEP"
        progress={0.62}
        spentLabel="Spent"
        spentAmount="$2,886"
        remainingLabel="Budget Remaining"
        remainingAmount="$5,114"
        actionLabel="View More"
        onActionClick={() => {}}
      />
    </div>
  )
}

