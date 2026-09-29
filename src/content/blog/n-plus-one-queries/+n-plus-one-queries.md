---
published: true
name: 'n+1 queries: a love letter to the query log'
icon: 'code'
description: 'an orm made it one line of code. it also made it four hundred queries.'
date: 2026-04-02
---

the n+1 query problem is the first performance bug everyone hits and the first one everyone's orms helpfully hide. this is a short field guide, written by someone who has caused it more than once.

### anatomy of the bug

you have orders, each with a customer. you write:

```js
const orders = await db.orders.findAll();
for (const order of orders) {
	console.log(order.customer.name); // lazy-loads per iteration
}
```

one query for orders, then **one query per order** for its customer. two hundred orders, two hundred and one round trips. locally: instant. in production, with real data and real network latency: a three-second endpoint and a pager.

### how to find them

**turn on query logging and read it.** every orm has it. the pattern is unmistakable once you've seen it — the same statement shape repeating with different parameters, right after a big result set loads.

better: **instrument in aggregate.** log query count per request alongside duration. when a page's count creeps up as data grows, you've found an n+1 before your users do. this one middleware has caught more problems for me than any apm dashboard.

### the fixes, ranked

1. **eager load with a join or `include`.** the orm's answer, and usually the right one: fetch orders _with_ their customers in one or two queries.
2. **batch with `in`.** when you've already got the parents in memory, collect their ids and fetch all children in one query, then stitch in memory. a `Map` keyed by id is all the "orm" you need here.
3. **denormalize deliberately.** for genuinely hot paths — a username on a comment, say — storing the name on the child row is a legitimate trade. just remember: you've now signed up to keep it consistent.

### the deeper lesson

the orm gave you a line of code that looked free. it wasn't free; it was _amortized invisibly_. the general skill — worth building at every level — is knowing what your one-liner costs at 10 rows, at 10,000, and at 10,000,000. the query log is how you find out. love it accordingly.
