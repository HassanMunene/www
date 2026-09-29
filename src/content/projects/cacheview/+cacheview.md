---
published: true
name: cacheview
description: developer tool that visualizes redis key patterns, memory hotspots, and ttl health
thumbnail: cacheview.png
ogImage: cacheview.png
images: [cacheview.png]
github: https://github.com/HassanMunene/cacheview
date: 2025-07-21
---

cacheview is a web-based inspector for redis: it maps your keyspace, surfaces memory hotspots, flags keys with missing or suspicious ttls, and lets you trace a key's lifecycle — all without giving anyone raw shell access to production.

## the problem it solves

"what's eating our redis memory?" is a question every team asks eventually. the usual answers — `redis-cli --bigkeys` on a laptop ssh'd into prod, or a spreadsheet of key patterns — are slow and risky. cacheview answers it safely: read-only connections, optional key masking, and sampling instead of full scans on large instances.

## implementation notes

- the analyzer runs **`scan`-based sampling** with cursor checkpoints, so inspecting a 50m-key instance doesn't block it. results stream into a ui grid with server-side filtering.
- key types map to tailored previews: hashes summarize field counts, streams show last entry age, sets estimate cardinality — you see shape before you see values.
- **ttl hygiene scoring** groups keys by prefix and grades each group on expiry coverage, which is the fastest way to spot the one service that forgot `expire`.
- built with react + typescript on the front, node + ioredis behind, websockets pushing live stats.

## what i learned

building tooling teaches you api design twice over: once for the redis protocol, once for the ui that must stay responsive while the backend chews through millions of keys. streaming and incremental rendering matter more than raw speed.
