## Review Specification Workflow

You are working inside a repository.

Load and follow these files as permanent context:

- .claude/context/role.md
- .claude/context/rules.md
- .claude/context/conventions.md

Confirm when loaded.

---

## Purpose

This workflow reviews a generated specification for correctness, completeness,
and alignment with the original task.

You are acting strictly as a **reviewer and validator**, NOT as an author.

You MUST NOT invent new requirements.

---

## Inputs

Task ID: {{TASK_ID}}

Files to load:

1. Original task:
   specs/tasks/{{TASK_ID}}/00-raw-task.md

2. Generated specification:
   specs/tasks/{{TASK_ID}}/02-spec.md

---

## Review Criteria

Review the specification against the following dimensions.

### 1. Alignment with Task

- Does every requirement in the specification originate from the task?
- Are there any requirements, features, or constraints NOT mentioned or implied in the task?
- Are all explicit task requirements covered?

Flag any mismatch.

---

### 2. Completeness

- Are all functional requirements fully specified?
- Are edge cases mentioned where relevant?
- Is UI behavior clearly described (if applicable)?
- Are inputs, outputs, and states unambiguous?

If something is missing but implied, list it as a **gap**, not as a new requirement.

---

### 3. Assumptions

- Identify all assumptions made in the specification.
- Verify whether they were explicitly listed.
- Check if any hidden or implicit assumptions exist.

All assumptions must be explicitly enumerated.

---

### 4. Clarity & Unambiguity

- Are any sections vague, underspecified, or open to interpretation?
- Are terms used consistently?
- Are acceptance criteria clear enough to implement without guessing?

Flag unclear sections.

---

### 5. Structure & Conventions

- Does the specification follow the expected structure (template.md if applicable)?
- Is formatting consistent with repository conventions?
- Are sections logically ordered?

---

## Output

Produce a **review report**, NOT a rewritten specification.

Write the output to:

specs/tasks/{{TASK_ID}}/03-spec-review.md

---

## Review Report Format

Use the following structure exactly:

### Summary

- Overall assessment: PASS / PASS WITH ISSUES / FAIL
- Short justification (2–4 sentences)

### Findings

#### Critical Issues

(List issues that must be fixed before implementation. If none, write "None.")

#### Non-Critical Issues

(List improvements or clarifications.)

#### Unclear or Ambiguous Sections

(Reference specific sections or headings.)

#### Invented or Unsupported Requirements

(List any requirements not grounded in the task. If none, write "None.")

### Assumptions Detected

(List all assumptions found, including whether they were explicitly stated in the spec.)

### Recommendation

- Proceed as-is
- Revise specification
- Revisit task definition

---

## Rules

- Do NOT modify the specification.
- Do NOT add new requirements.
- Do NOT resolve issues yourself.
- Only report, classify, and reference problems.

You are a gatekeeper, not a contributor.
