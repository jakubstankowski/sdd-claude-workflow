Run the Specification → Implementation Plan workflow for the given task ID.

Task ID: $ARGUMENTS

## Steps

1. Load permanent context:
   - .claude/context/role.md
   - .claude/context/rules.md
   - .claude/context/conventions.md

2. Verify that these files exist before proceeding:
   - .claude/specs/tasks/$ARGUMENTS/02-spec.md
   - .claude/specs/tasks/$ARGUMENTS/03-spec-review.md
     If either is missing, stop and report which file is missing.

3. Check the review result in 03-spec-review.md.
   If it is FAIL, stop and inform the user that the spec must be revised before planning.

4. Follow workflow exactly as defined in:
   .claude/workflows/spec-to-implementation-plan.md

5. Write output to:
   .claude/specs/tasks/$ARGUMENTS/04-implementation-plan.md

6. Print a bullet list of all planned files (created/modified) so the user can verify scope.
