---
published: true
name: 'a survival guide to rate limiting'
icon: 'globe'
description: 'token buckets vs sliding windows, where to put the counter, and the four-way handshake of 429s'
date: 2026-07-22
---

rate limiting looks like a one-liner and ships like a subsystem. here's the field guide i wish i had before my first api went viral.

### pick your algorithm (they're not equal)

- **fixed window:** "100 requests per minute" reset on the clock. simple, but clients learn to slam you at :59 and :00 — two windows' worth in two seconds. fine for coarse protection
- **sliding window log:** exact, memory-hungry. every request stored with a timestamp. great for small n, expensive at scale
- **sliding window counter:** the pragmatic compromise — interpolate between the current and previous window. good accuracy, tiny memory
- **token bucket:** the professional's choice. requests consume tokens; tokens refill at a steady rate, letting controlled bursts through while capping sustained load. it maps directly onto how real traffic behaves

### the distributed elephant

one node, an in-memory counter, done. **ten nodes behind a load balancer:** where does the counter live?

- **redis with a lua script** (atomic check-and-decrement) is the standard answer. it costs a round trip per request — usually acceptable
- **local counters with sync** trade precision for latency: each node limits at 1/n locally, syncing periodically. occasional overage, no hot-spot on redis
- **the chunky compromise:** each node leases batches of capacity (100 at a time), renewing as drained. fewer round trips, bounded overshoot

choose based on what the limit protects: billing hard limits want correctness; abuse protection tolerates fuzz.

### the part everyone skips: being a good 429

a rate limit response is an api contract. include:

- `429` with **`retry-after`** in seconds — clients that honor it become well-behaved automatically
- **`ratelimit-limit` / `ratelimit-remaining` / `ratelimit-reset`** headers so clients self-regulate before hitting the wall
- a **distinct error body** — "rate limited" is a different world from "you did something wrong," and sdks branch on it

and on the consuming side: respect those headers, back off exponentially with jitter, and cache aggressively. the best rate limit handling is the requests you never made.

---

start with a token bucket at the edge, one shared counter store, honest 429s — then instrument before tightening anything. most rate limit outages are self-inflicted by limits set with confidence instead of data.
