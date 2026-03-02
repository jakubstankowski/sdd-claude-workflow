# Rules

## Basic rules

- Always reply in English.
- **File length limit:** Do not create files longer than 1000 lines. If a file exceeds this limit, split it into smaller modules.
- **Order of operations:** Install dependencies first, then generate code that uses them.
- **Transparency:** If you don't know something, say so directly. Do not guess or fabricate solutions.
- All code and comments must be written in English.

## Cooperation and communication

- **Human-in-the-loop:** Use a collaborative pair-programming approach. Propose, explain, and confirm before making large changes.
- **Attempt limit:** If you cannot solve a problem after 2 attempts, stop and ask for help rather than continuing to guess.
- **Documentation issues:** If you hit a wall with a library or framework, ask the user to provide the relevant documentation.

## Code quality

- **High quality:** Write only clean, elegant, and idiomatic solutions. No hacks, no shortcuts.
- **Type issues:** If a TypeScript type problem cannot be cleanly solved, use `// @ts-ignore` with a brief explanation, or ask for help — never use `any` as a workaround.
- **Task completeness:** Never leave `TODO` comments when performing a task. Every task must be completed fully and correctly from start to finish.

## Planning and analysis

- **Analyze before implementing:** When planning a new feature or fix, always read and understand the existing code first, then adapt the plan to fit the current architecture.
- **Minimal footprint:** Only change what is necessary. Do not refactor, rename, or "improve" code that is outside the scope of the current task.
