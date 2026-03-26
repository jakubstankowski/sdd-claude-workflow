Run the Fullstack Implementation Plan for the given task ID using parallel specialist agents.

Task ID: $ARGUMENTS

---

## Step 1 — Verify preconditions

Check these files exist:
- .claude/specs/tasks/$ARGUMENTS/02-spec.md
- .claude/specs/tasks/$ARGUMENTS/03-spec-review.md

If either is missing → stop and report which file is missing.

Read 03-spec-review.md. If the overall result is FAIL → stop and inform the user
that the spec must be revised before planning can proceed.

Read 02-spec.md fully. You will pass its content to subagents.

---

## Step 2 — Spawn two parallel subagents

Launch BOTH agents at the same time using the Agent tool (parallel, not sequential).

### Agent A — Backend Specialist

- subagent_type: general-purpose
- prompt: |
    You are a backend specialist agent working in this repository.

    Follow the instructions in: .claude/workflows/plan-backend.md

    Task ID: $ARGUMENTS

    Specification content:
    [paste full content of 02-spec.md here]

    Produce the backend implementation plan and return it as your response.

### Agent B — Frontend Specialist

- subagent_type: general-purpose
- prompt: |
    You are a frontend specialist agent working in this repository.

    Follow the instructions in: .claude/workflows/plan-frontend.md

    Task ID: $ARGUMENTS

    Specification content:
    [paste full content of 02-spec.md here]

    NOTE: You do NOT yet have the backend API contract. In Step 2 of your workflow,
    derive the expected API contract from the specification directly.
    The orchestrator will validate it for consistency after you finish.

    Produce the frontend implementation plan and return it as your response.

Wait for both agents to complete before continuing.

---

## Step 3 — Integration check

With both plans returned, perform the integration check:

For every API call planned in the frontend plan:
- Does a matching endpoint exist in the backend plan?
- Do the DTO names/shapes match between backend and frontend?
- Is the HTTP method and route consistent?

Build an **Integration Gaps** list. Format:

| Frontend expects | Backend provides | Gap |
|-----------------|-----------------|-----|

If no gaps: write "No integration gaps."

---

## Step 4 — Write unified plan

Merge both plans + integration check into a single file at:
.claude/specs/tasks/$ARGUMENTS/04-implementation-plan.md

Use this structure:

```
# Implementation Plan — Task $ARGUMENTS

## Backend Plan
[paste Agent A output here]

## Frontend Plan
[paste Agent B output here]

## API Contract
[unified endpoints table from both plans]

## Integration Check
[gaps table or "No integration gaps"]

## Unified Implementation Order
1. DB migration (if any)
2. Domain entities
3. DTOs in Modules.Contracts
4. Backend handlers/services
5. API endpoints
6. Regenerate TypeScript contracts: pnpm lerna run contract
7. Frontend atoms/molecules
8. Frontend organisms/pages
9. Route registration
10. API wiring + end-to-end test in browser
```

---

## Step 5 — Report to user

Print:
- Total files planned: N backend, N frontend
- The API Contract table
- Integration gaps (if any)
- Any risks flagged by either agent
