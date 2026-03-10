# SDD Claude Workflow

A **Specification-Driven Development (SDD)** workflow template for [Claude Code](https://claude.ai/code). Drop the `.claude` folder into any project and get a structured, AI-assisted pipeline that takes a raw task description all the way through to reviewed, production-ready code.

Want to see what the output looks like before setting anything up? Browse `.claude/specs/tasks/example-task/` — it contains a complete real example with all six pipeline artifacts.

---

## How it works

Every task moves through a fixed 6-stage pipeline. Each stage produces an artifact file stored in `.claude/specs/tasks/{TASK_ID}/`.

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

## How it's organized

```
your-project/
├── .claude/
│   ├── commands/                    # Slash commands registered in Claude Code
│   │   ├── spec.md                  #   → /spec TASK_ID
│   │   ├── review-spec.md           #   → /review-spec TASK_ID
│   │   ├── plan.md                  #   → /plan TASK_ID
│   │   ├── code-review.md           #   → /code-review TASK_ID
│   │   └── done.md                  #   → /done TASK_ID
│   ├── context/                     # Permanent context loaded in every session
│   │   ├── role.md                  #   Claude's persona and tech stack expertise
│   │   ├── rules.md                 #   Coding and collaboration rules
│   │   └── conventions.md           #   Project-specific naming, structure, patterns
│   ├── workflows/                   # Step-by-step workflow definitions (called by commands)
│   │   ├── task-to-spec.md
│   │   ├── review-spec.md
│   │   ├── spec-to-implementation-plan.md
│   │   ├── code-review.md
│   │   └── implementation-done.md
│   ├── specs/
│   │   ├── template.md              # Output template used by the Spec stage
│   │   └── tasks/                   # One subfolder per task
│   │       └── example-task/        #   Complete worked example — reference only, do not edit
│   │           ├── 00-raw-task.md
│   │           ├── 02-spec.md
│   │           ├── 03-spec-review.md
│   │           ├── 04-implementation-plan.md
│   │           ├── 05-code-review.md
│   │           └── 06-implementation-done.md
│   └── readme                       # Quick-start Claude reads on first session init
└── .gitignore
```

---

## Prerequisites

- [Claude Code](https://claude.ai/code) installed and authenticated
- An existing project you want to add the workflow to

---

## Quick start

**1. Copy the workflow into your project:**

```sh
cp -r sdd-claude-workflow/.claude your-project/.claude
cat sdd-claude-workflow/.gitignore >> your-project/.gitignore
```

Or click **"Use this template"** on GitHub to start a fresh repo with everything already in place.

**2. Generate CLAUDE.md:**

```sh
cd your-project
claude init
```

This scans your codebase and writes a `CLAUDE.md` with the tech stack, folder structure, and conventions Claude discovered.

**3. Initialise the workflow context:**

Open a new Claude Code session in your project and paste:

```
Read .claude/readme and follow the setup steps.
Then read CLAUDE.md and adjust .claude/context/conventions.md to reflect this project's actual conventions (tech stack, folder structure, naming, patterns).
Also adjust .claude/context/role.md to match the tech stack and domain found in CLAUDE.md.
```

Claude will load the workflow, update the context files, and confirm it is ready.

**4. Review the context files:**

| File | What to check |
|---|---|
| `context/role.md` | Persona and tech stack match your project |
| `context/rules.md` | Adjust if your team has different norms (usually fine as-is) |
| `context/conventions.md` | Naming, folder structure, and patterns match your actual codebase |

Everything is ready. Start your first task below.

---

## Running a task

**1. Create a task folder:**

```sh
# Use your actual task ID from Jira, Linear, Azure DevOps, etc.
mkdir -p .claude/specs/tasks/PROJ-123
```

**2. Write the raw task description:**

Create `.claude/specs/tasks/PROJ-123/00-raw-task.md` with a plain-language description of what needs to be built. Paste directly from your issue tracker if you like.

Optionally add UI screenshots to `.claude/specs/tasks/PROJ-123/ui/` — Claude will analyse them during the Spec stage.

**3. Run the pipeline:**

```
/spec PROJ-123
/review-spec PROJ-123
/plan PROJ-123
```

Implement the code based on `04-implementation-plan.md`, then:

```
/code-review PROJ-123
/done PROJ-123
```

---

## Reference example

`.claude/specs/tasks/example-task/` is a complete worked example. All six output files are present so you can see exactly what each stage produces. Keep it as a reference — your own tasks go alongside it in separate folders.
