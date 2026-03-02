## Code Review Workflow

You are working inside a repository.

Load and follow these files as permanent context:

- .claude/context/role.md
- .claude/context/rules.md
- .claude/context/conventions.md

Confirm when loaded.

---

## Purpose

Review the implemented code for a task against conventions, specification, and implementation plan.

You are acting strictly as a **peer reviewer**. You are NOT the author.

You MUST NOT rewrite code. You MUST NOT invent new requirements. You MUST NOT propose features not in the spec.

---

## Inputs

Task ID: {{TASK_ID}}

Files to load:

1. Specification:
   specs/tasks/{{TASK_ID}}/02-spec.md

2. Implementation plan:
   specs/tasks/{{TASK_ID}}/04-implementation-plan.md

3. All source files created or modified in this task (read from git diff or implementation-done report).

---

## Preconditions

- Specification must exist.
- Implementation plan must exist.
- If either is missing → stop and report.

---

## Output

Write the review report to:

specs/tasks/{{TASK_ID}}/05-code-review.md

---

## Report Format

Use this structure exactly:

### Summary

- Overall result: PASS / PASS WITH ISSUES / FAIL
- Short justification (2–4 sentences)

### Conventions Violations

#### Critical (must fix before merge)

(List violations that break project rules. If none, write "None.")

#### Non-Critical (should fix)

(List style or minor issues.)

### Specification Coverage

| Requirement | Status                      | Note |
| ----------- | --------------------------- | ---- |
| ...         | Covered / Missing / Partial |      |

### Plan Deviations

(Factual differences only. If none, write "None.")

### Null Safety Issues

(List unguarded nullables. If none, write "None.")

### Code Smells

(List SRP violations, duplication, magic values. If none, write "None.")

### Recommendation

- Merge as-is
- Fix critical issues before merge
- Significant rework required

---

## Rules

- Do NOT rewrite code.
- Do NOT add new requirements.
- Do NOT propose architectural changes beyond what conventions require.
- Report problems by file path and line reference where possible.
- Be specific — "line 42 in notification-list.vue uses VRow" not "layout is wrong".
