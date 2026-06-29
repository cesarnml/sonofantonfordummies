---
title: 01 - Mental Model
description: The short version of why Son-of-Anton exists and how to think about it.
---

# Mental Model

Son-of-Anton is a delivery workflow for using AI heavily without surrendering authorship. It exists because most AI-assisted development drifts into one of two failure modes:

- babysitting the agent so closely that it never builds momentum
- letting the agent produce a giant diff that nobody can confidently review

The workflow says: keep the human judgment where it matters, and automate the work between those judgment points.

## The Three Gates

There are three developer control points:

1. **Plan** - approve the what and why.
2. **Decompose** - approve the how, as a stack of thin tickets.
3. **Closeout** - approve that the delivered stack is done enough to merge.

Everything between those gates is orchestration. Worktrees, branch naming, red/green/refactor, review artifacts, PR creation, review polling, and state persistence are machinery in service of those gates.

## The Key Sentence

> Slice, review gate, explicit advance.

That is the product. Stacked PRs are useful because they make slices reviewable and ordered, but they are not the point by themselves.

## What The Human Owns

The human owns:

- product direction
- scope trade-offs
- ticket approval
- final acceptance
- decisions to defer, patch, or stop

The human does not need to manually shepherd every command once the approved slice is clear.

## What The Agent Owns

The agent owns bounded execution:

- reading the handoff
- writing the failing test when required
- implementing the smallest passing behavior
- verifying locally
- preparing adversarial review
- patching prudent findings
- opening and updating the PR
- recording what happened in durable files

The agent is allowed to move, but only inside the approved boundaries.

## Why Durable Files Matter

Chat memory is not a system of record. Son-of-Anton writes the important state to disk:

- product plans
- implementation plans
- ticket docs
- handoff docs
- review prompts, reports, and ledgers
- orchestrator state files

This means a new session can resume without pretending the agent remembers everything.

