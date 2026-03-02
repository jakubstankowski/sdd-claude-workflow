Run the Code Review workflow for the given task ID.

Task ID: $ARGUMENTS

## Steps

1. Load permanent context:
   - .claude/context/role.md
   - .claude/context/rules.md
   - .claude/context/conventions.md

2. Verify that these files exist before proceeding:
   - .claude/specs/tasks/$ARGUMENTS/02-spec.md
   - .claude/specs/tasks/$ARGUMENTS/04-implementation-plan.md
     If either is missing, stop and report which file is missing.

3. Load the list of changed files from git:
   Run: git diff --name-only HEAD~1 HEAD
   (or use the implementation-done report if available at .claude/specs/tasks/$ARGUMENTS/05-implementation-done.md)

4. Read all changed source files.

5. Follow workflow exactly as defined in:
   .claude/workflows/code-review.md

6. Write output to:
   .claude/specs/tasks/$ARGUMENTS/05-code-review.md

7. Print the Summary section (result + critical issues count) to the user.
