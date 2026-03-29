# Navbar

## Usage

```tsx
import { Navbar } from "@mahalisunil1/navbar"

<Navbar
  brand={{ label: "Studio", href: "/" }}
  items={[
    { label: "Home", href: "/" },
    {
      label: "Solutions",
      megaMenu: {
        columns: [
          {
            heading: "Products",
            links: [{ label: "Design System" }, { label: "Publishing" }]
          },
          {
            heading: "Use cases",
            links: [{ label: "Marketing" }, { label: "Dashboards" }]
          }
        ]
      }
    }
  ]}
  primaryCta={{ label: "Get started", href: "/start" }}
/>
```


