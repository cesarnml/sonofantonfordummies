---
title: 02 - Repo Map
description: Where the main Son-of-Anton concepts live in the codebase.
---

# Repo Map

Newcomers usually get unstuck when they see that Son-of-Anton has two halves:

| Half | Where it lives | What it does |
| --- | --- | --- |
| Deterministic tooling | `tools/delivery/`, `scripts/` | Manages state, git, worktrees, PR lifecycle, review artifacts, and command routing. |
| Agent instructions | `.agents/skills/`, `AGENTS.md`, `CLAUDE.soa.md` | Tells Codex, Claude Code, Cursor, and other agents how to behave during planning, execution, review, and closeout. |

The tooling is the rails. The skills are the operating manual for the driver.

## Start Here In The Source Repo

Read these first:

- `docs/how-son-of-anton-works.md` - the contributor-facing mental model
- `docs/template/overview/start-here.md` - the canonical workflow entry point
- `docs/template/delivery/delivery-orchestrator.md` - the command and state-machine reference
- `docs/template/delivery/son-of-anton.md` - the doctrine behind the workflow
- `docs/template/delivery/tdd-workflow.md` - the red/green/refactor contract

## Important Directories

| Path | Why it matters |
| --- | --- |
| `tools/delivery/` | The TypeScript orchestrator implementation. |
| `tools/delivery/test/` | Behavior-focused tests for the orchestrator. |
| `scripts/deliver.ts` | The `bun run deliver` entrypoint. |
| `scripts/closeout-stack.ts` | The phase closeout entrypoint. |
| `.agents/skills/` | Skill contracts agents must read before acting. |
| `docs/template/` | Consumer-facing docs that ship into repos using Son-of-Anton. |
| `docs/product/plans/` | Approved product plans for Son-of-Anton itself. |
| `docs/product/delivery/` | Implementation plans, tickets, and review artifacts by phase. |

## Important Modules

| Concept | Start in |
| --- | --- |
| CLI argument parsing | `tools/delivery/cli.ts` |
| Runtime config | `tools/delivery/runtime-config.ts` |
| State persistence | `tools/delivery/state.ts` |
| Ticket lifecycle | `tools/delivery/ticket-flow.ts` |
| Branch and worktree planning | `tools/delivery/planning.ts` |
| Git/GitHub adapters | `tools/delivery/platform.ts`, `tools/delivery/platform-adapters.ts` |
| Review polling and artifacts | `tools/delivery/review.ts` |
| Subagent runners | `tools/delivery/subagent-runner.ts` |
| Closeout | `tools/delivery/closeout-stack.ts` |

## The Template Layer

Son-of-Anton installs into other repos as a subtree at `.son-of-anton/`. That is why `docs/template/` exists. It is not merely documentation about this repo; it is product content that consumers receive and reference.

When editing templates, treat them as shipped interface, not private notes.

