import * as React from "react"
import { Navbar } from "./component"

export function NavbarPreview() {
  return (
    <div className="flex justify-center">
      <Navbar
        brand={{ label: "Studio", href: "#" }}
        items={[
          { label: "Home", href: "#" },
          {
            label: "Solutions",
            megaMenu: {
              columns: [
                {
                  heading: "Products",
                  links: [
                    { label: "Design System", description: "Tokens and components." },
                    { label: "Publishing", description: "Ship versioned UI." }
                  ]
                },
                {
                  heading: "Use cases",
                  links: [
                    { label: "Marketing", description: "Launch faster." },
                    { label: "Dashboards", description: "Operational UIs." }
                  ]
                }
              ],
              featured: {
                title: "Component Marketplace",
                description: "Discover, test, and publish reusable UI kits.",
                ctaLabel: "Browse"
              }
            }
          },
          { label: "Pricing", href: "#" },
          { label: "Docs", href: "#" }
        ]}
        secondaryCta={{ label: "Log in", href: "#" }}
        primaryCta={{ label: "Get started", href: "#" }}
      />
    </div>
  )
}

