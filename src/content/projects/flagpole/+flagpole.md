---
published: true
name: flagpole
description: feature flag service with fast evaluation, audit trails, and sdk-first design
thumbnail: flagpole.png
ogImage: flagpole.png
images: [flagpole.png]
github: https://github.com/HassanMunene/flagpole
date: 2026-09-12
---

flagpole is a self-hosted feature flag platform: create flags in a ui, evaluate them from any service in single-digit milliseconds, and keep an audit trail of every change. it's the release-engineering glue most teams eventually hand-roll badly.

## why feature flags matter at every scale

flags aren't a big-company toy. even a two-person team benefits: deploy is no longer the release event, risky features ship dark and ramp gradually, and a bad rollout becomes a toggle flip instead of a rollback pipeline. the hard part is running the _service_ reliably — which is exactly the kind of problem worth building once.

## design

- **evaluation is a read-only hot path.** flag definitions live in memory, rebuilt on change; the evaluate endpoint does zero database i/o. p99 target: under 5ms, verified with load tests in ci.
- **edge caching with versioned snapshots.** sdks pull a signed snapshot of all flags, poll for the version, and hot-reload on change. services keep evaluating correctly even if the flag service dies — the failure mode is "stale flags," not "no deployments today."
- **targeting rules as data.** percentage rollups, user attributes, allow-lists — all expressible as json the sdk interprets identically in node and the browser.
- **every mutation is audited.** who flipped what, when, and why (required reason field). flags are inline comments in production behavior; the audit log is where they get read.

## the engineering lessons

building a system other engineers depend on changes your standards: contract tests for the sdk protocol, chaos drills for the outage mode you promise not to have, and docs treated as a feature. the code is maybe half the project; the trust is the other half.
