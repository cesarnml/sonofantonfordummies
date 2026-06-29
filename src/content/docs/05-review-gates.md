---
title: 05 - Review Gates
description: How Son-of-Anton keeps review records honest.
---

# Review Gates

Son-of-Anton treats review as evidence, not vibes.

## Self-Audit

After implementation and verification, the primary agent records `post-verify`. This is the point where it should inspect its own diff before involving another reviewer.

## Adversarial Subagent Review

For code tickets when enabled, the primary agent writes a filled adversarial prompt:

```bash
bun run deliver --plan <plan-path> write-subagent-adversarial-review
```

Then a runner consumes that exact prompt:

```bash
bun run deliver --plan <plan-path> subagent-review --subagent codex-cli
```

Supported runner names are:

- `claude-cli`
- `codex-cli`
- `cursor-cli`

The subagent is advisory. It returns findings prose. It must not edit files.

## Reconciliation

Reconciliation checks whether the review ledger and git history agree:

```bash
bun run deliver --plan <plan-path> reconcile-subagent-review
```

This blocks silent lies, such as:

- a finding was patched but no patch commit is recorded
- a finding was ignored without a deferral
- the ledger says clean when the report contains actionable issues

## External AI Review

After `open-pr`, the orchestrator polls configured review agents. If review comments arrive, they are saved and triaged before the ticket advances.

## Advisory Observations

Some review notes are real but not blocking for the ticket. These belong in an advisory lane and can be dispositioned after closeout with:

```bash
/soa triage-advisory-observations phase-N
```

If a small verified fix exposes a review gap worth recording, use:

```bash
/soa quality-control phase-N: <description>
```

