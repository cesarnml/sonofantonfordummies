---
title: 06 - First Contribution
description: A safe path for a junior developer's first Son-of-Anton contribution.
---

# First Contribution

Your goal is not to understand the entire orchestrator at once. Your goal is to make one small, reviewable improvement while respecting the workflow.

## Setup

From the Son-of-Anton repo:

```bash
bun install
bun run ci
```

If you are in a fresh Bun worktree and `node_modules` is missing, install before running tests.

## Pick A Small Surface

Good first contribution areas:

- typo or clarity improvements in `docs/template/`
- focused tests around `tools/delivery/` behavior
- small UX improvements in status output
- one isolated parser or formatter edge case

Avoid starting with closeout, branch mutation, or GitHub automation internals unless someone is pairing with you.

## Before You Code

Read:

1. `docs/how-son-of-anton-works.md`
2. `CONTRIBUTING.md`
3. the specific module and test file you plan to touch

If your change is product-scope expansion, do not jump straight to code. It needs planning and approved decomposition first.

## During The Change

Keep the diff narrow:

- test public behavior
- mock only system boundaries
- update docs only when behavior or commands change
- record rationale in ticket docs when working inside an orchestrated ticket

## Before Commit

This repo has an ordering rule:

```bash
bun run format
git status
git add <files>
git commit -m "<subject>"
```

Run verification appropriate to the change. For broad changes, use:

```bash
bun run ci
```

## What Good Looks Like

A good first PR is boring in the best way:

- the behavior is clear
- the test explains why it matters
- the implementation is smaller than expected
- the docs match the command surface
- there is no hidden process state in chat

