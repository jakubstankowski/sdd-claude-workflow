## Implementation Done Workflow

You are working inside a repository.

## Global Context

Load and follow these files as permanent context:

- .claude/context/role.md
- .claude/context/rules.md
- .claude/context/conventions.md

Confirm when loaded.

---

## Purpose

Document what has been implemented for the task.

This step creates a factual delivery report based on:

- the specification
- the implementation plan

You are NOT reviewing quality.
You are NOT suggesting changes.
You are NOT validating architecture.

You are recording completion.

---

## Inputs

Task ID: {{TASK_ID}}

Files to load:

1. Specification:
   `specs/tasks/{{TASK_ID}}/02-spec.md`

2. Specification review:
   `specs/tasks/{{TASK_ID}}/03-spec-review.md`

3. Implementation plan:
   `specs/tasks/{{TASK_ID}}/04-implementation-plan.md`

4. All source code changed in this task.

---

## Preconditions

- Specification review MUST be `PASS` or `PASS WITH ISSUES`.
- Implementation plan MUST exist.
- If either is missing → stop and report.

---

## Global Rules (MANDATORY)

- Do NOT invent new requirements.
- Do NOT reinterpret the spec.
- Do NOT propose improvements.
- Do NOT evaluate correctness.
- Do NOT criticize the solution.
- Do NOT redesign anything.

---

## What You Must Produce

### 1. Implemented Scope vs Specification

For every requirement from the specification, mark:

- `Implemented`
- `Not implemented`

Optional short factual note allowed. No judgment.

### 2. Implemented Files

List:

- created files
- modified files

### 3. Implemented Components

For each component from the plan confirm existence: `Exist` / `Missing`.

### 4. Implemented Stores

For each store from the plan confirm existence: `Exist` / `Missing`.

### 5. Deviations from Plan

List ONLY factual differences, such as:

- file renamed
- component merged
- structure slightly changed

No evaluation whether it is good or bad.

### 6. Extra Work (if present)

If something exists in code but was not in plan/spec → list it as:

> Additional implementation not covered by the original documents.

No judgment.

---

## Output

Write the report to:

`specs/tasks/{{TASK_ID}}/06-implementation-done.md`

---

## Output Rules

- Use clean markdown.
- No speculative content.
- No opinions.

Required sections:

| Section | Content |
|---|---|
| **Summary** | Short factual description of what was delivered |
| **Specification Coverage** | Requirement → `Implemented` / `Not implemented` |
| **Files** | Created / Modified |
| **Components** | `Exist` / `Missing` |
| **Stores** | `Exist` / `Missing` |
| **Deviations** | Facts only |
| **Additional Implementation** | If none → write "None" |

---

## Important Philosophy

This file is a delivery manifest.

It should allow reviewers, testers, or managers to know:

- what arrived
- what did not

Without opinions.
