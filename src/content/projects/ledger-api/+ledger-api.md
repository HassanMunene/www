---
published: true
name: ledger-api
description: double-entry ledger service with idempotent payments and an auditable event log
thumbnail: ledger-api.png
ogImage: ledger-api.png
images: [ledger-api.png]
github: https://github.com/HassanMunene/ledger-api
date: 2026-02-09
---

ledger-api is a standalone ledger service that answers one question reliably: _how much money is where, right now, and how did it get that way?_ it implements double-entry bookkeeping as an api, so any product can record payments, transfers, and refunds without inventing its own accounting logic.

## why double-entry

single-column balances are easy to corrupt. a double-entry ledger records every movement as a pair of entries that must sum to zero, which makes corruption detectable and audits possible. balances are derived from entries, never stored as the source of truth.

## design decisions

- **idempotency keys everywhere.** clients send an `Idempotency-Key` header; the api stores the first response and replays it on retries. duplicate submissions from flaky mobile networks become a non-event.
- **serializable transactions for posting.** correctness beats throughput here. reads for reporting go to a replica, so the write path stays small and predictable.
- **the outbox pattern for events.** entries are written and their events staged in one transaction; a relay publishes them afterwards. consumers never see an entry without its event, or the reverse.
- **immutable history.** corrections are new reversing entries, never edits. every balance can be replayed from the log.

## what i'd do differently

i underestimated how much of the work is operational: migrations on a table that must never be locked for long, backfills that don't double-post, dashboards that notice when the relay falls behind. the code was the easy ten percent.
