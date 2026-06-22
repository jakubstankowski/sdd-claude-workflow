Implement the backend scaffold for the given task ID — everything except service method bodies.

Task ID: $ARGUMENTS

---

## Purpose

You are implementing backend scaffolding. The user will implement service method bodies themselves.

**You implement:** migrations, entities, DTOs, repositories, controllers, DI registration, service class skeleton (with stubs).
**You do NOT implement:** the body of any service method — leave each as a stub.

---

## Step 1 — Verify preconditions

Check these files exist:
- .claude/specs/tasks/$ARGUMENTS/02-spec.md
- .claude/specs/tasks/$ARGUMENTS/03-spec-review.md
- .claude/specs/tasks/$ARGUMENTS/04-implementation-plan.md

If any is missing → stop and report which file is missing.

Load permanent context:
- .claude/context/role.md
- .claude/context/rules.md
- .claude/context/conventions.md

---

## Step 2 — Read the implementation plan

Read .claude/specs/tasks/$ARGUMENTS/04-implementation-plan.md in full.

Identify:
- All files to create or modify
- All service methods listed in the plan
- The implementation order

---

## Step 3 — Implement scaffold

Follow the implementation order from the plan. For each item:

### Migrations
Implement fully.

### Entities
Implement fully.

### DTOs (in Modules.Contracts or module-local)
Implement fully.

### Repositories
Implement fully — including EF Core queries, projections, and any helper methods.

### Controllers
Implement fully — routing, auth attributes, request/response wiring, calls into the service.

### DI registration
Implement fully.

### Service class
- Create the class with all method signatures exactly as in the plan.
- For EACH service method body, write this stub:

```csharp
// TODO: implement
// Contract: <one sentence — what this method must do>
// Inputs: <list key parameters and their meaning>
// Returns: <what should be returned and when>
// Edge cases: <nulls, not found, validation, business rules>
throw new NotImplementedException();
```

Do NOT write any real logic in service method bodies. Not even a single line of business logic.

---

## Step 4 — Report to user

After all files are written, print:

### Scaffold complete

**Implemented (by Claude):**
- [ list every created/modified file except service ]

**Yours to implement — service methods:**

For each stub, print:
```
[ClassName].[MethodName]
Contract: <the contract comment from the stub>
```

Tell the user:
> Implement each service method above, then run `/done $ARGUMENTS` when finished.
