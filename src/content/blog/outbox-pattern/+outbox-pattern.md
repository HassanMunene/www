---
published: true
name: 'what the outbox pattern actually buys you'
icon: 'code'
description: 'dual writes lose data in production. the outbox pattern is the boring fix.'
date: 2026-03-08
---

here's a bug that ships quietly and detonates later:

```js
await db.save(order);        // succeeds
await events.publish(...);   // broker hiccups, throws
// order exists, downstream never hears about it. no error anywhere.
```

two writes to two systems — a database and a message broker — with no shared transaction. the database commit succeeds, the publish fails, and the two systems silently disagree forever. this is the **dual-write problem**, and the fix has a boring name: the **transactional outbox**.

### the pattern

instead of publishing the event, you _write it to a table_, in the same transaction as your business data:

```
BEGIN
  insert into orders ...
  insert into outbox (event_type, payload, status) values (...)
COMMIT
```

either both writes happen or neither does. atomicity, restored — between your rows.

then a separate **relay** (poller or change-data-capture tail) reads the outbox, publishes each event, and marks it done. consumers get exactly-once _visibility into what happened_, with at-least-once delivery in practice — which is why your consumers still need idempotency (see: every event handler should tolerate redelivery).

### the details that decide success or failure

- **ordering:** one relay, one partition per aggregate id, or explicit sequence numbers. naive parallelism shuffles your event history.
- **cleanup:** outbox rows are a liability after delivery. archive aggressively.
- **monitoring the lag:** alert on `oldest undelivered event age`, not just queue depth. a stuck relay is an outage that hasn't been noticed yet.

### why i like it

the outbox isn't clever. it uses the atomicity your database already has, requires no new infrastructure, and fails in ways you can see and replay. in a field full of exotic consistency schemes, "write it down in the same transaction, then deliver" is the pattern most likely to still be running correctly in five years.
