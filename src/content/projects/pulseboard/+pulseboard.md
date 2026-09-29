---
published: true
name: pulseboard
description: self-hosted status page and uptime monitor with a public dashboard
thumbnail: pulseboard.png
ogImage: pulseboard.png
images: [pulseboard.png]
github: https://github.com/HassanMunene/pulseboard
date: 2025-11-02
---

pulseboard is a self-hosted alternative to statuspage.io: it checks your endpoints on a schedule, records response times, and renders a public status page your users can actually trust — because you control the data.

## why i built it

managed status pages are surprisingly expensive for what they do, and a status page that goes down with your infrastructure is useless. i wanted something small enough to run on a $5 vps next to the services it monitors.

## how it works

- a **scheduler service** fans out checks (http, tcp, dns) on configurable intervals. checks are sharded across workers so a slow endpoint can't delay the rest.
- results land in **timescale** for response-time history and percentile rollups (p50/p95/p99), with continuous aggregates keeping the dashboard fast.
- a lightweight **incident engine** evaluates rules — n consecutive failures, latency thresholds — and opens incidents with deduplication so one flapping host doesn't spam notifications.
- the public page is server-rendered, cached aggressively, and safe to put behind a cdn.

## lessons

the hard part wasn't checking endpoints; it was the **judgment calls**: how long to wait before declaring an incident resolved, how to handle a check that fails once every hundred runs, how to communicate partial degradation honestly. monitoring is a product-design problem as much as an engineering one.
