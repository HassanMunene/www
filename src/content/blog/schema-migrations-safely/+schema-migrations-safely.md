---
published: true
name: 'schema migrations without downtime'
icon: 'code'
description: 'expand-and-contract, the danger of not null, and why lock_timeout is your new best friend'
date: 2026-07-05
---

at some point every backend engineer runs their first destructive migration against a live table and learns a lesson they never forget. this post is that lesson, secondhand, for free.

### the golden rule: expand and contract

never change what the code and the database agree on in one step. instead, split every migration into three safe phases:

1. **expand** — add the new column nullable, the new table, the new index `concurrently`. the old code doesn't care
2. **migrate** — backfill in batches, deploy code that writes _both_ shapes, read from the new one. rollout is a deploy, not a ddl statement
3. **contract** — only when nothing reads the old shape anymore: drop the old column, remove the dual-write. weeks later, on purpose

the killer feature of this discipline: **every step is reversible or harmless**. a bad migration becomes a non-event.

### the classic traps

- **`not null` on a big table.** postgres must verify every row while holding a lock. instead: add the column nullable → backfill in batches → add `not null` via `check (col is not null) not valid` then `validate constraint` — the modern way takes the lock for milliseconds
- **`alter table ... alter column type`.** rewrites the table. behind a lock. during friday deploy. don't
- **`create index` without `concurrently`** on anything real — it blocks writes for the duration
- **long-running transactions holding locks**, turning your fast migration into a queue of every query behind it. set `lock_timeout` (fail fast, retry) and `statement_timeout` on migration runs

### migrations are code, not events

- forward-only files, reviewed like code, run by ci on deploy — never hand-typed into a console at midnight
- tested against a **copy of production-scale data**, because a migration that takes 3 seconds on your laptop takes 40 minutes on the real table
- every migration gets a **runbook line**: what it does, expected duration, rollback plan. future-you at 2am is the audience

---

downtime isn't a fact of life for growing systems; it's an architectural decision made lazily and paid loudly. expand and contract is more steps and zero heroics — which is exactly why it works.
