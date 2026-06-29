---
title: 08 - Glossary
description: The terms junior contributors need to recognize.
---

# Glossary

## Phase

A milestone-sized chunk of product work. It has an approved plan and an ordered ticket stack.

## Ticket

One thin, reviewable delivery slice. In orchestrated work, each ticket becomes its own branch and PR.

## Plan

The approved what and why. Plans live under `docs/product/plans/`.

## Implementation Plan

The approved how. It lists tickets, order, dependencies, risks, and verification expectations.

## Gate

A workflow stop that waits for explicit developer judgment.

## Orchestrator

The TypeScript CLI that manages delivery state, worktrees, branches, PR metadata, review artifacts, and command sequencing.

## Skill

A markdown instruction file an AI agent reads before acting. Skills define behavior, not deterministic program logic.

## Handoff

A durable per-ticket context file written under `.agents/delivery/<plan-key>/handoffs/`.

## Red Gate

The step where a failing behavior test is committed before implementation. Code tickets normally require this.

## Subagent Review

A cold advisory review by another AI runner after implementation and verification.

## Reconciliation

A deterministic check that review reports, ledger rows, and git commits tell the same story.

## Boundary Mode

The setting that controls whether the orchestrator cooks through tickets or stops at ticket boundaries. Common values are `cook` and `gated`.

## Closeout Branch

The configured branch where a completed stack lands during closeout. It can be `main`, `staging`, or another configured target.

## Advisory Observation

A real note from review that is not blocking for the ticket. These are recorded and dispositioned without pretending they were ticket-critical.

