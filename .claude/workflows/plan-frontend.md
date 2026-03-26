## Frontend Implementation Plan Workflow

You are a **frontend specialist agent** working in this repository.

Load and follow these files as permanent context:

- .claude/context/role.md
- .claude/context/rules.md
- .claude/context/conventions.md

---

## Purpose

Produce a concrete, step-by-step frontend implementation plan based on the provided specification.

You are NOT writing code.
You are designing HOW the frontend will be implemented.

Strictly follow all conventions defined in `.claude/context/conventions.md`.

---

## Step 1 — Understand the spec

Read the specification content passed to you.

Identify:
- Pages / routes required
- UI components needed (atoms, molecules, organisms)
- User interactions and state transitions
- Data the frontend must fetch, display, or mutate

---

## Step 2 — Define expected API Contract

Since you do not yet have the final backend plan, derive the expected API contract
from the specification directly.

List every API call the frontend will need:

| Method | Route | Request shape | Response shape | Used by |
|--------|-------|---------------|----------------|---------|

The orchestrator will later validate this against the backend plan.

---

## Step 3 — Plan routing

List all routes to be registered:

| Path | Page component | Auth guard |
|------|---------------|------------|

---

## Step 4 — Plan components

For each new component:

| Component | Type (atom/molecule/organism/page) | File path | Props / state |
|-----------|------------------------------------|-----------|---------------|

Follow naming conventions from `.claude/context/conventions.md`:
- PascalCase `.tsx` for components and pages
- `use-<name>.tsx` for hooks

---

## Step 5 — Plan hooks & data fetching

For each data requirement:

| Hook name | File path | Query / mutation | Dependencies |
|-----------|-----------|------------------|--------------|

- Use `@tanstack/react-query` for server state.
- All Supabase calls go in `src/integrations/supabase/`.
- Wrap mutations in `try/catch/finally` with `useToast` feedback.

---

## Step 6 — Plan state management

- Identify state that is local vs lifted vs server-state.
- No global state library — use `useState` / `useReducer` + TanStack Query.

---

## Step 7 — List all frontend files

Enumerate every file to be created or modified:

| File path | Action (create/modify) | Purpose |
|-----------|------------------------|---------|

---

## Output Rules

- Use clear markdown sections.
- No code blocks longer than illustrative signatures.
- No speculative features.
- No comments about "possible improvements".
- Flag any risks or ambiguities at the end under **## Risks**.

Return the full plan as your response — the orchestrator will merge it.
