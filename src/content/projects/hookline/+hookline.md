---
published: true
name: hookline
description: webhook relay with guaranteed delivery, replay, and signature verification
thumbnail: hookline.png
ogImage: hookline.png
images: [hookline.png]
github: https://github.com/HassanMunene/hookline
date: 2026-08-05
---

hookline is infrastructure for webhooks — both directions. **receiving:** it turns the messy reality of third-party webhooks (retries, duplicates, signature quirks, outages) into a clean internal event stream. **sending:** it delivers _your_ webhooks to customers with the guarantees they'll demand: retries with backoff, signed payloads, and a replay button.

## the problems everyone underestimates

webhooks look like "send an http post." in production they are a distributed-systems exercise:

- receivers get **duplicates and reordered events**, so handlers must be idempotent (a recurring theme in my work — see the ledger-api writeup)
- senders owe customers **retries with exponential backoff and jitter**, dead-letter queues, and proof the payload really came from them (hmac signatures with timestamp anti-replay windows)
- every integration eventually needs **"send me that event again"** — replay is a feature, not an apology

## implementation

- delivery pipelines run as a **persistent queue with per-endpoint backpressure**; one customer's dead endpoint can't delay anyone else's
- payloads are stored content-addressed, so retries and replays are cheap and the ui can show exactly what was sent, byte for byte
- signature verification supports the quirks of the big providers (stripe's `t=` scheme, github's `x-hub-signature-256`, raw-body requirements) behind one sane interface
- a dashboard shows delivery attempts, response codes, and latencies per endpoint — the debugging view that saves hours per incident

## status

receiving relay and the sending pipeline are up; the replay ui and multi-tenant api keys are next.
