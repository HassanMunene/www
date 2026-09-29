---
published: true
name: 'database indexes, explained with a phone book'
icon: 'code'
description: 'what b-trees actually do, why your where clause ignores your index, and how to read an explain plan'
date: 2026-08-30
---

the phone book is the best explanation of a database index ever printed. names are sorted by surname, then first name. that single design decision explains b-trees, composite index ordering, and most "why is this query slow?" meetings you'll ever attend.

### what the index buys you

find "okafor" in a phone book and you don't start at page 1 — you jump to roughly the right page, because the book is **sorted**. a b-tree index is a sorted structure with a map: "okafor entries start at offset x." lookups go from o(n) full scans to o(log n) navigated jumps. sorted insertions keep it that way.

### the rules the phone book teaches

**1. column order is everything.** the book is sorted by `(surname, firstname)`. finding "okafor" is fast. finding everyone named "chidi" — without a surname — is a full-book scan, because firstname isn't sorted at the top level. same in sql: an index on `(a, b)` serves queries filtering `a`, or `a and b`, but **not `b` alone** (the leftmost-prefix rule). order composite indexes by how you query.

**2. ranges break the second column.** "all names between murimi and mutua, sorted by firstname" — the book can't do that, because within a surname the entries are sorted by firstname, and you're spanning many surnames. in sql, a range condition on `a` prevents `(a, b)` from serving `b` too. range columns go last in composite indexes.

**3. some sorts are free.** a query ordering by `(surname, firstname)` needs no sort step — the index _is_ the order. order by clauses that match index order are a quiet but large win.

### why your index might be ignored anyway

- **the planner did the math and a scan is cheaper.** returning 40% of the table, a scan is honest work. indexes aren't automatic wins
- **functions and casts on the column**: `where lower(email) = ...` needs an expression index
- **leading wildcards**: `like '%son'` can't use the sort; `'son%'` can
- **implicit type casts** between column and parameter

### reading the explain plan without fear

`explain analyze` is the phone book's table of contents. look for: **seq scan** on a big table with a selective filter (bad sign), rows estimates wildly off reality (stale statistics — run analyze), and **nested loops over thousands of rows** (usually an n+1 wearing a suit). fix the estimate or the access path — in that order of cheapness.

---

add an index when a measured query needs it, verify with the plan, and stop. every index also taxes every write. the phone book works because it's small and changes slowly — your hottest table might not have that luxury.
