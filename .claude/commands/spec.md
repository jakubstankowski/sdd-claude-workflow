Run the Task → Specification workflow for the given task ID.

Task ID: $ARGUMENTS

## Steps

1. Load permanent context:
   - .claude/context/role.md
   - .claude/context/rules.md
   - .claude/context/conventions.md

2. Read input files:
   - .claude/specs/tasks/$ARGUMENTS/00-raw-task.md
   - All images in .claude/specs/tasks/$ARGUMENTS/ui/ (if folder exists)

3. Follow workflow exactly as defined in:
   .claude/workflows/task-to-spec.md

   IMPORTANT: The workflow has a clarification phase (Step 1).
   If there are unclear requirements, present questions to the user and WAIT for answers
   before generating the spec. Do NOT skip this step.

4. Write output to:
   .claude/specs/tasks/$ARGUMENTS/02-spec.md
   Only write this file after clarifying questions (if any) have been answered.

5. Confirm completion and print a one-paragraph summary of what the spec covers.
