---
published: true
name: 'how to read an unfamiliar codebase without drowning'
icon: 'paper'
description: 'a repeatable pass-by-pass method for onboarding onto a large codebase'
date: 2026-01-19
---

every new job, project, or open-source contribution starts the same way: a codebase you don't understand, a deadline you do. over a few onboarding cycles i've settled on a method that works — for me and for the people i've mentored.

### pass 1: the shape, not the files (30 minutes)

resist opening source files. instead:

- run the project. `README`, then `docker compose up` or the equivalent — getting it _running_ teaches you the real entry points
- read the dependency list and the folder structure. `src/routes`, `src/services`, `src/lib` — the directories are the architecture diagram the docs forgot
- find the deployment config. it tells you what the _runtime_ actually cares about

### pass 2: trace one feature end to end (2–3 hours)

pick something small and user-visible — a button, an endpoint. follow it: route → controller → service → query → response. the goal is not to understand everything; it's to calibrate how this codebase does **error handling, logging, validation, and auth** — its idioms. every later change is easier because you've seen the pattern once.

### pass 3: the gravity wells (ongoing)

every codebase has them: the module everyone tiptoes around, the file with 40% of the churn. find them with `git log --stat` frequency, and read the _tests_ around them — tests are executable documentation of intent.

### rules that make it stick

- **take notes as an outsider.** the gaps you notice on day one disappear on day ten — you stop seeing them. write them down; that list is your first contribution.
- **fix one small thing immediately.** a typo, a flaky test, a stale comment. it exercises the entire pipeline — branch, ci, review, deploy — while the stakes are zero.
- **ask questions in batches**, with what you tried attached. "i expected x, saw y, read z — where did i go wrong?" gets great answers; "how does this work?" gets none.

---

reading code is the majority of the job and the least-taught skill. treat it like the engineering problem it is: measure, trace, and leave the map better than you found it.
