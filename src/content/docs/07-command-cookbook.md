---
title: 07 - Command Cookbook
description: Common commands and when to use them.
---

# Command Cookbook

Use this as a recognition guide. The source repo docs remain authoritative.

## Product Planning

```bash
/soa plan <idea-or-draft>
/soa decompose docs/product/plans/phase-N-slug.md
```

Use this path for new product feature-set expansion, phase shaping, or epic decomposition.

## Execute A Phase

```bash
bun run deliver --plan docs/product/delivery/phase-NN/implementation-plan.md start
```

Resume with:

```bash
bun run deliver --plan docs/product/delivery/phase-NN/implementation-plan.md status
bun run deliver --plan docs/product/delivery/phase-NN/implementation-plan.md start
```

## Ticket Gates

```bash
bun run deliver --plan <plan-path> post-red
bun run deliver --plan <plan-path> post-verify clean
bun run deliver --plan <plan-path> write-subagent-adversarial-review
bun run deliver --plan <plan-path> subagent-review --subagent codex-cli
bun run deliver --plan <plan-path> reconcile-subagent-review
bun run deliver --plan <plan-path> open-pr
bun run deliver --plan <plan-path> poll-review
bun run deliver --plan <plan-path> advance
```

Do not reorder these for code tickets.

## Runtime Policy Overrides

```bash
bun run deliver --plan <plan-path> --boundary-mode gated start
bun run deliver --plan <plan-path> --subagent-review-policy disabled start
bun run deliver --plan <plan-path> --baseline orchestrator status
bun run deliver --plan <plan-path> --baseline run-policy status
```

Overrides are persisted in delivery state for the run. If config diverges later, the orchestrator asks you to choose a baseline.

## Standalone Work

```bash
bun run deliver triage-standalone
/soa triage-standalone PR#19
```

Use this for small bounded non-ticket PRs.

## Phase Closeout

```bash
bun run closeout-stack --plan docs/product/delivery/phase-NN/implementation-plan.md
```

This needs developer approval. The stack is not supposed to merge itself.

## Post-Phase Follow-Up

```bash
/soa triage-advisory-observations phase-N
/soa quality-control phase-N: <description>
```

The first command dispositions non-blocking advisory observations. The second applies a bounded fix and records a review-gap ledger entry.

