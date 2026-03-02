# SDD Claude Workflow

A **Specification-Driven Development (SDD)** workflow template for [Claude Code](https://claude.ai/code). Drop the `.claude` folder into any project and get a structured, AI-assisted pipeline that takes a raw task description all the way through to reviewed, production-ready code.

Want to see what the output looks like before setting anything up? Browse `.claude/specs/tasks/ai-4/` — it contains a complete real example with all six pipeline artifacts.

---

## Prerequisites

- [Claude Code](https://claude.ai/code) installed and authenticated
- An existing project you want to add the workflow to

---

## How it works

Every task moves through a fixed pipeline. Each stage produces an artifact file stored in `.claude/specs/tasks/{TASK_ID}/`.

| Stage | Command | Input | Output |
|---|---|---|---|
| 1. Spec | `/spec TASK_ID` | `00-raw-task.md` + optional UI screenshots | `02-spec.md` |
| 2. Spec review | `/review-spec TASK_ID` | `00-raw-task.md` + `02-spec.md` | `03-spec-review.md` |
| 3. Plan | `/plan TASK_ID` | `02-spec.md` + `03-spec-review.md` | `04-implementation-plan.md` |
| 4. Implement | *(write code)* | `04-implementation-plan.md` | source files |
| 5. Code review | `/code-review TASK_ID` | source files + spec + plan | `05-code-review.md` |
| 6. Done | `/done TASK_ID` | source files + all spec docs | `06-implementation-done.md` |

**Gate rules:**
- Stage 3 (Plan) cannot proceed if Stage 2 result is `FAIL`.
- Stage 5 (Code review) cannot proceed without Stage 3 artifact.
- Stage 6 (Done) cannot proceed without Stages 3 and 5 artifacts.

---

## Adopting this workflow in a new project

### Step 1 — Copy the `.claude` folder into your project

```sh
cp -r /path/to/sdd-claude-workflow/.claude /path/to/your-project/.claude
```

What you are copying:

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
    tasks/           # One subfolder per task — delete ai-4, it is only a reference example
  readme             # Quick-start reference Claude reads on init
```

### Step 2 — Generate CLAUDE.md

In your terminal, from your project root:

```sh
claude init
```

This scans your codebase and writes a `CLAUDE.md` file containing the tech stack, folder structure, commands, and conventions Claude discovered. You will use this in the next step.

### Step 3 — Initialise the workflow context

Open a new Claude Code conversation in your project and paste this prompt:

```
Read .claude/readme and follow the setup steps.
Then read CLAUDE.md and adjust .claude/context/conventions.md to reflect this project's actual conventions (tech stack, folder structure, naming, patterns).
Also adjust .claude/context/role.md to match the tech stack and domain found in CLAUDE.md.
```

Claude will load the workflow, update the context files, and confirm it is ready.

### Step 4 — Review the context files

Quickly check the three files Claude updated:

| File | What to verify |
|---|---|
| `role.md` | Persona and tech stack match your project. |
| `rules.md` | Usually fine as-is — adjust if your team has different norms. |
| `conventions.md` | Naming, folder structure, and patterns match your actual codebase. |

---

## Using the pipeline

### 1. Create a task folder

```sh
# Replace PROJ-123 with your actual task ID (from Jira, Linear, Azure DevOps, etc.)
mkdir -p .claude/specs/tasks/PROJ-123
```

### 2. Write the raw task file

Create `.claude/specs/tasks/PROJ-123/00-raw-task.md` with a plain-language description of what needs to be built. You can paste directly from your issue tracker.

Optionally add UI screenshots to `.claude/specs/tasks/PROJ-123/ui/` — Claude will analyse them during the Spec stage.

### 3. Run the pipeline in Claude Code

```
/spec PROJ-123
/review-spec PROJ-123
/plan PROJ-123
```

Then implement the code, then:

```
/code-review PROJ-123
/done PROJ-123
```

---

## Reference example

The `ai-4` task in this repo is a complete worked example. All six output files are present so you can see exactly what each stage produces before running the pipeline on your own task.
