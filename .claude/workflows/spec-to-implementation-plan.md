## Specification → Implementation Plan Workflow

You are working inside a repository.

Load and follow these files as permanent context:

- .claude/context/role.md
- .claude/context/rules.md
- .claude/context/conventions.md

Confirm when loaded.

---

## Purpose

Transform an approved specification into a concrete, step-by-step
implementation plan.

You are NOT writing code.
You are designing HOW the implementation will be executed.

You MUST strictly follow all frontend and safety conventions.

---

## Inputs

Task ID: {{TASK_ID}}

Files to load:

1. Specification:
   specs/tasks/{{TASK_ID}}/02-spec.md

2. Specification review:
   specs/tasks/{{TASK_ID}}/03-spec-review.md

---

## Preconditions

- The review result MUST be `PASS` or `PASS WITH ISSUES`.
- If the review result is `FAIL`, stop and report why planning cannot proceed.

---

## Global Rules (MANDATORY)

- Do NOT invent new requirements.
- Do NOT change the specification.
- Do NOT write actual implementation code.
- Do NOT add unnecessary comments in any future code.
- NEVER assume a variable is non-null unless explicitly non-nullable (`string`).

---

## Frontend Architecture Rules (MANDATORY)

**All frontend rules come from `.claude/context/conventions.md` — follow it as the single source of truth.**

## Output

Write the implementation plan to:

specs/tasks/{{TASK_ID}}/04-implementation-plan.md

---

## Output Rules

- Use clear markdown sections.
- No code blocks longer than illustrative signatures.
- No speculative features.
- No comments about “possible improvements”.

This document must be directly executable as a development checklist.
