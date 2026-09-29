---
published: true
name: 'the testing pyramid is upside down for apis'
icon: 'code'
description: 'why integration tests earn more than unit tests at the api boundary — and how to keep them fast'
date: 2026-08-12
---

the classic testing pyramid says: many unit tests, fewer integration tests, a thin layer of end-to-end. after a few years of building apis, i've concluded that for most backend work the pyramid is **upside down** — the money is in a small number of fast, honest integration tests.

### why unit tests disappoint at the api layer

the job of an api is to accept requests, enforce rules, and commit correct data. strip the database away and your unit test is asserting on mocks — it verifies your code agrees with your _assumptions_. sql is not a mock. transactions, constraints, generated columns, and query plans are where the actual behavior lives. a test suite that mocks the database mostly tests the mocks.

### the stack that earns its keep

one postgres container, the real app, real http calls:

- **the golden path** per endpoint: valid request → 200/201 → assert response _and_ database state
- **the rejection paths**: validation failures, auth failures, the conflict case (duplicate, overdrawn, expired) — assert status codes and that _nothing was written_
- **the evil trio**: retry (same idempotency key twice → one resource), concurrent (two parallel withdrawals → balance never negative), and crash-mid-operation (kill the process during a request; restart; assert the invariant holds)

that last trio is what unit tests structurally cannot give you, and what production inflicts on you anyway.

### keeping it fast

integration tests are slow only when you let them be:

- **one shared container per suite**, schema reset between tests via truncation or per-test transactions — not re-migrations
- **parallelize by database schema**, not by praying
- **keep mock-happy boundaries at the edges** (payment gateways, email) with contract tests instead of brittle stubs

### the honest split

for a typical api: 80% integration tests against real infrastructure, 20% unit tests — and only for genuine logic: date math, money rounding, validation rules. the pyramid assumed unit tests were the cheap, fast ones. with containers on every dev machine, that assumption expired. build the suite that catches _production-shaped_ bugs, not the one that maximizes coverage percentages.
