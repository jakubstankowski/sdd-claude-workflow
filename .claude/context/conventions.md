# React + TypeScript Conventions

Conventions used in this project (Vite + React 18 + TypeScript + Tailwind + shadcn-ui).

---

## File & folder naming

| What                | Convention                       | Example                     |
| ------------------- | -------------------------------- | --------------------------- |
| Components          | PascalCase `.tsx`                | `HeroSection.tsx`           |
| Hooks               | `use-` prefix, kebab-case `.tsx` | `use-mobile.tsx`            |
| Utilities / lib     | kebab-case `.ts`                 | `utils.ts`                  |
| Pages               | PascalCase `.tsx`                | `Index.tsx`, `NotFound.tsx` |
| Integration folders | kebab-case                       | `supabase/`                 |

---

## Component structure

Use function declarations for components, default-exported at the bottom.

```tsx
// 1. Imports — third-party first, then internal via @/
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 2. Module-level constants (data arrays, configs)
const ITEMS = [...];

// 3. Types / interfaces (local to this file)
type Props = { label: string };

// 4. Component — named const, no React.FC annotation
const MyComponent = ({ label }: Props) => {
  // state
  const [open, setOpen] = useState(false);

  // derived values / handlers
  const handleClick = () => setOpen(true);

  // JSX
  return <div>{label}</div>;
};

export default MyComponent;
```

**Rules:**

- One component per file.
- No `React.FC<Props>` — annotate the destructured props directly.
- Inline handlers only when they are one-liners; extract to a named function otherwise.
- Module-level constants (static data, config objects) live above the component, not inside it.

---

## TypeScript

- Use `type` for object shapes; reserve `interface` for extension/augmentation scenarios.
- Prefer inferred types — only annotate when the inference is wrong or unclear.
- Avoid `any`; use `unknown` when the type is truly unknown and narrow it before use.
- Use optional chaining (`?.`) and nullish coalescing (`??`) instead of defensive `if` chains.
- Event handlers: annotate the event parameter (`e: React.FormEvent`, `e: React.ChangeEvent<HTMLInputElement>`).

```tsx
// Good
const [value, setValue] = useState("");
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setValue(e.target.value);

// Avoid
const handleChange = (e: any) => setValue(e.target.value);
```

---

## Imports

- Always use the `@/` path alias — never relative `../` paths.
- Group imports: (1) React/external libs, (2) internal `@/components`, (3) internal `@/hooks`, `@/lib`, `@/integrations`, (4) assets.
- Named imports for utilities and hooks; default imports for components.

```tsx
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero.webp";
```

---

## Styling (Tailwind CSS)

- Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) whenever classes are conditional.
- Keep Tailwind class strings in JSX — no separate CSS files for component styles.
- Responsive prefix order: base → `sm:` → `md:` → `lg:` → `xl:`.
- Use CSS custom properties defined in `index.css` via semantic tokens (`text-foreground`, `bg-card`, `text-primary`, `border-border`, etc.) — never hard-code raw colors.
- Animation utility classes (`animate-float`, `animate-slide-up`, etc.) are defined in `index.css`; reuse them, don't add ad-hoc inline styles.

```tsx
// Good
<div className={cn("rounded-xl border border-border", isActive && "border-primary")} />

// Avoid
<div style={{ borderRadius: 12, border: "1px solid purple" }} />
```

---

## shadcn-ui components

- Import from `@/components/ui/*` — never from `radix-ui` directly in feature components.
- Do **not** edit files in `src/components/ui/` manually — regenerate via the shadcn CLI.
- Compose shadcn primitives in feature components; extend via `className` prop, not by forking the primitive.

---

## Hooks

- Custom hooks live in `src/hooks/`, named `use-<name>.tsx`.
- A hook must start with `use` and be the sole export of its file (named export, not default).
- Keep hooks focused — one concern per hook.

```tsx
// src/hooks/use-mobile.tsx
export function useIsMobile() { ... }
```

---

## State management

- Prefer local `useState` / `useReducer` — no global state library is in use.
- Lift state only as high as the nearest common ancestor that needs it.
- Server state (Supabase queries) is managed via `@tanstack/react-query` — wrap mutations in `try/catch` and set loading flags.

---

## Async / data fetching

- All Supabase calls go in `src/integrations/supabase/`.
- Use `try/catch/finally` for mutations; set a loading boolean before the call and clear it in `finally`.
- Show user feedback with `useToast` on both success and error.

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const { error } = await supabase.from("table").insert({ ... });
    if (error) throw error;
    toast({ title: "Sukces!" });
  } catch {
    toast({ title: "Błąd", variant: "destructive" });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Page composition

- Pages live in `src/pages/` and only assemble section components — no business logic inside pages.
- Sections are rendered in order inside `<main>` with a `min-h-screen bg-background` wrapper.

---

## Keys in lists

- Use a stable, unique ID from data as `key`; use index only for static, never-reordered lists.

```tsx
// Acceptable for static display-only data
{stats.map((stat, i) => <Card key={i} ... />)}

// Required for dynamic / reordered lists
{items.map((item) => <Row key={item.id} ... />)}
```

---

## Do not

- Do not use `React.FC` or `React.ReactNode` return type annotations on components.
- Do not import from `react` for JSX — the project uses the automatic JSX transform (except when you need hooks).
- Do not create new files in `src/components/ui/` — use the shadcn CLI.
- Do not use inline `style={{}}` for layout/color — always Tailwind.
- Do not commit `.env` or secrets.
