# SDD Claude Workflow

A **Specification-Driven Development (SDD)** workflow template for [Claude Code](https://claude.ai/code). Drop the `.claude` folder into any project and get a structured, AI-assisted pipeline that takes a raw task description all the way through to reviewed, production-ready code.

---

## How it works

Every task moves through a fixed pipeline. Each stage produces an artifact file stored in `.claude/specs/tasks/{TASK_ID}/`.

| Stage | Command | Input | Output |
|---|---|---|---|
| 1. Spec | `/spec {TASK_ID}` | `00-raw-task.md` + optional UI screenshots | `02-spec.md` |
| 2. Spec review | `/review-spec {TASK_ID}` | `00-raw-task.md` + `02-spec.md` | `03-spec-review.md` |
| 3. Plan | `/plan {TASK_ID}` | `02-spec.md` + `03-spec-review.md` | `04-implementation-plan.md` |
| 4. Implement | *(write code)* | `04-implementation-plan.md` | source files |
| 5. Code review | `/code-review {TASK_ID}` | source files + spec + plan | `05-code-review.md` |
| 6. Done | `/done {TASK_ID}` | source files + all spec docs | `06-implementation-done.md` |

**Gate rules:**
- Stage 3 (Plan) cannot proceed if Stage 2 result is `FAIL`.
- Stage 5 (Code review) cannot proceed without Stage 3 artifact.
- Stage 6 (Done) cannot proceed without Stages 3 and 5 artifacts.

---

## Adopting this workflow in a new project

### Step 1 — Copy the `.claude` folder

```sh
cp -r /path/to/sdd-claude-workflow/.claude /path/to/your-project/.claude
```

The folder you are copying contains:

```
.claude/
  commands/          # Slash commands: /spec, /review-spec, /plan, /code-review, /done
  context/           # Permanent context loaded by every workflow
    role.md          # Claude's persona and expertise
    rules.md         # Coding rules and collaboration rules
    conventions.md   # Project-specific code conventions
  workflows/         # Workflow definitions (called by commands)
  specs/
    template.md      # Spec output template
    tasks/           # One subfolder per task (created as you work)
  readme             # Quick-start reference (Claude reads this on init)
```

### Step 2 — Initialise Claude for your project

Open Claude Code in your project root and run:

```
claude init
```

`claude init` scans your codebase and generates a `CLAUDE.md` file in the project root containing the tech stack, project structure, commands, and conventions it discovers.

Then paste this message in a new conversation to load the workflow context and kick off the setup:

```
Read .claude/readme and follow the setup steps.
Then read CLAUDE.md and adjust .claude/context/conventions.md to reflect this project's actual conventions (tech stack, folder structure, naming, patterns).
Also adjust .claude/context/role.md to match the tech stack and domain found in CLAUDE.md.
```

Claude will load `.claude/readme`, update the context files from `CLAUDE.md`, and confirm it is ready.

### Step 3 — Review the context files

Quickly review the three files Claude updated to catch anything it missed or got wrong:

| File | What to verify |
|---|---|
| `role.md` | Persona and tech stack match your project. |
| `rules.md` | Coding standards and collaboration rules — usually fine as-is, adjust if your team has different norms. |
| `conventions.md` | Conventions match your actual codebase (naming, folder structure, patterns). |

### Step 4 — Replace the README

Replace this `README.md` with one that describes your actual project. The workflow documentation lives in `.claude/readme` and does not need to be in the project README.

---

## Using the pipeline

### Create a task

For a new task, create a folder and a raw task file:

```sh
mkdir -p .claude/specs/tasks/{TASK_ID}
```

Create `.claude/specs/tasks/{TASK_ID}/00-raw-task.md` describing the task in plain language (copy from Azure DevOps, Jira, Linear, etc.).

Optionally add UI screenshots to `.claude/specs/tasks/{TASK_ID}/ui/` — Claude will analyse them during the Spec stage.

### Run the pipeline

```
/spec {TASK_ID}
/review-spec {TASK_ID}
/plan {TASK_ID}
... implement code ...
/code-review {TASK_ID}
/done {TASK_ID}
```

Replace `{TASK_ID}` with your actual task identifier (e.g. `ai-4`, `PROJ-123`).

### Alternative: manual workflow invocation

If you prefer running workflows directly without slash commands:

```sh
claude run .claude/workflows/task-to-spec.md --var TASK_ID={TASK_ID}
claude run .claude/workflows/review-spec.md --var TASK_ID={TASK_ID}
claude run .claude/workflows/spec-to-implementation-plan.md --var TASK_ID={TASK_ID}
claude run .claude/workflows/code-review.md --var TASK_ID={TASK_ID}
claude run .claude/workflows/implementation-done.md --var TASK_ID={TASK_ID}
```

---

## Repository structure (this template)

This repo is itself a React + TypeScript project (Vite, shadcn-ui, Tailwind, Supabase) used as a real-world example of the workflow in action. The `ai-4` task under `.claude/specs/tasks/` is a complete example showing all six pipeline artifacts.

When you copy the `.claude` folder to a new project, you can safely delete `.claude/specs/tasks/ai-4` — it is only there as a reference.
