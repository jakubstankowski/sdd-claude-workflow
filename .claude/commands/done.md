Run the Implementation Done workflow for the given task ID.

Task ID: $ARGUMENTS

## Steps

1. Load permanent context:
   - .claude/context/role.md
   - .claude/context/rules.md
   - .claude/context/conventions.md

2. Verify that these files exist before proceeding:
   - .claude/specs/tasks/$ARGUMENTS/02-spec.md
   - .claude/specs/tasks/$ARGUMENTS/03-spec-review.md
   - .claude/specs/tasks/$ARGUMENTS/04-implementation-plan.md
     If any is missing, stop and report which file is missing.

3. Load the list of changed files from git:
   Run: git diff --name-only HEAD~1 HEAD
   Read all changed source files.

4. Follow workflow exactly as defined in:
   .claude/workflows/implementation-done.md

5. Write output to:
   .claude/specs/tasks/$ARGUMENTS/06-implementation-done.md

6. Print the Specification Coverage table to the user.
