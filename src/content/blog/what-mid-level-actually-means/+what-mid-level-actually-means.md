---
published: true
name: 'what "mid-level" actually means'
icon: 'code'
description: 'moving past "senior in title only" — the three shifts that define the mid-level engineer'
date: 2026-06-14
---

the jump from junior to mid-level is mostly invisible from the outside. your title changes, maybe your pay. but the actual shift is in **what you are trusted with** — and it happens in three dimensions.

### 1. from tasks to problems

a junior is handed tasks: "add pagination to this endpoint." a mid-level engineer is handed problems: "users complain search feels slow." the task version has a known solution. the problem version requires you to decide _whether_ pagination is even the right fix, measure where the time goes, and propose something — with the judgment to know when a two-line index beats a two-week rewrite.

if you want to signal this shift, the fastest way is to write up your work in terms of the problem, the options you considered, and why you picked one. it costs ten minutes and it changes how people read your contributions.

### 2. from "it works" to "it survives"

mid-level code is boring in the right ways. it survives retries, restarts, bad input, and the one teammate who will use your library wrong. concretely:

- idempotent handlers, because networks retry whether you like it or not
- migrations that don't lock the table you're deployed on
- timeouts and limits on everything that leaves your process
- logs you'd want to read at 3am — context, not just "an error occurred"

none of this is glamorous. all of it is what separates demo-quality from production-quality.

### 3. from "my code" to "our system"

juniors optimize for their files. mid-level engineers optimize for the system: they leave the codebase easier to reason about, they review generously and thoroughly, and they write the missing runbook instead of becoming the missing runbook.

---

none of this requires permission or a promotion. pick one thing from the list, apply it this week, and you're already doing the job. the title catches up eventually.
