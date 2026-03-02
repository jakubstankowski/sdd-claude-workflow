Run the Specification Review workflow for the given task ID.

Task ID: $ARGUMENTS

## Steps

1. Load permanent context:
   - .claude/context/role.md
   - .claude/context/rules.md
   - .claude/context/conventions.md

2. Verify that these files exist before proceeding:
   - .claude/specs/tasks/$ARGUMENTS/00-raw-task.md
   - .claude/specs/tasks/$ARGUMENTS/02-spec.md
     If either is missing, stop and report which file is missing.

3. Follow workflow exactly as defined in:
   .claude/workflows/review-spec.md

4. Write output to:
   .claude/specs/tasks/$ARGUMENTS/03-spec-review.md

5. Print the Summary section (Overall assessment + justification) to the user.
