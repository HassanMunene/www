---
published: true
name: 'idempotency keys in practice'
icon: 'code'
description: 'why "just retry" corrupts data, and how to build idempotent apis that actually work'
date: 2026-05-10
---

every distributed system tutorial eventually says the words "make your operations idempotent." what it doesn't say is how much subtlety hides behind that one word. here's the version i wish i'd read before implementing payments.

### the problem in one paragraph

networks retry. users double-click. kafka delivers twice. if `POST /payments` creates a charge every time it's called, your users get double-charged and you get a very bad week. the fix is to make the operation safe to repeat — and the standard tool is the **idempotency key**: the client generates a unique token per logical operation and sends it with every retry.

### the parts tutorials skip

**store the response, not just the key.** a naive implementation records "seen it, skip." but the client that retried _needs the original response_ — it never got it the first time. save the key, the request fingerprint, and the full response together; replay the response on retry.

**define the conflict behavior.** same key, _different_ body: that's a client bug. return `422`, loudly. same key while the first request is still in flight: return `409` with a retry-after, or queue it — but decide deliberately.

**scope and expire keys.** keys should be scoped to the endpoint and the actor, and they need a ttl (24–72h is typical), or your idempotency table becomes its own outage.

**get the storage model right.** the key, request hash, and response live in one row, written in the same transaction as the operation itself. otherwise there's a window where the payment posts but the key doesn't — and the retry double-charges anyway.

### testing it honestly

the test that matters isn't "calling twice returns the same response." it's: **start request, crash mid-transaction, restart, replay the same key, verify exactly one charge exists.** simulate the crash. inject the latency. idempotency that isn't tested against partial failure is a comment in your code, not a property of your system.

---

shipped well, this is invisible. that's the point — the best time to implement it is before the first double-charge, not after.
