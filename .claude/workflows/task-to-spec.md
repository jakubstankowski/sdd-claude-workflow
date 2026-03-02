You are an autonomous assistant working inside this repository.

## GLOBAL CONTEXT

Load and follow:

- .claude/context/role.md
- .claude/context/rules.md
- .claude/context/conventions.md

## TASK

We are converting an Azure DevOps task into a technical specification.

Task ID: {{TASK_ID}}

## INPUT

Read:

- specs/tasks/{{TASK_ID}}/00-raw-task.md
- If folder ui exist take all images in specs/tasks/{{TASK_ID}}/ui/

## PROCESS

Generate the specification by following these steps in order:

### Step 1 — Clarify before writing

Read the raw task carefully. Identify any requirements that are:

- Ambiguous (can be interpreted in more than one way)
- Missing detail needed to implement (e.g. "what happens when X is empty?")
- Contradictory with each other

For each unclear point, formulate a **specific, concrete question** for the developer/PO.

**Present these questions to the user and wait for answers before continuing.**

If everything is clear, state "No clarifying questions — proceeding to spec." and continue.

### Step 2 — Write the specification

Using the task, UI images, answers to clarifying questions (if any), and the template at `.claude/specs/template.md`, produce a complete technical specification.

Rules:

- Do not invent requirements
- List assumptions explicitly
- Prefer existing conventions

When analyzing UI:

- Use images as primary source of truth
- Describe layout, states, interactions visible in images
- Do not guess hidden behavior

## OUTPUT

Write the final specification to:
specs/tasks/{{TASK_ID}}/02-spec.md
