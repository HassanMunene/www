---
published: true
name: 'deploying small projects without a kubernetes cluster'
icon: 'globe'
description: 'a pragmatic hosting stack for side projects: what to run where, and what to skip'
date: 2026-02-17
---

every few months someone tells me their side project needs kubernetes. it doesn't. here's the stack i've converged on for small services — boring, cheap, and surprisingly hard to outgrow.

### the layers

**static frontend → pages/cdn.** sveltekit or next with static output goes to cloudflare pages, github pages, or netlify. free, fast, done. don't rent a server for html.

**one api → one small vps or a platform free tier.** fly.io, railway, render, or a $5 vps with a systemd unit. until you have real traffic, a single well-configured process beats a swarm of misconfigured ones. (and if you choose the vps, learn systemd restarts and log rotation _before_ the 2am crash, not during.)

**postgres, managed.** neon, supabase, or your provider's managed postgres. the moment you're storing money or user data, you do not want to be your own dba — backups and point-in-time recovery are the whole product.

**redis → only when justified.** it's a dependency with its own failure modes. most "we need caching" problems at this scale are an index away from solved.

### the boring stuff that matters

- **https everywhere** via a reverse proxy (caddy makes this a two-liner)
- **migrations as code**, run on deploy, never by hand
- **one health endpoint** that actually checks the database, and uptime monitoring pointed at it
- **logs to stdout**, shipped wherever you'll actually look — not scattered across machines
- **a deploy script you can run from your phone**, because incidents don't wait for your laptop

### the real trick

the goal isn't an impressive architecture diagram; it's a service that survives you ignoring it for three weeks. choose components that fail loudly, recover on their own, and cost little enough that you don't resent them. scale problems are good problems — and they announce themselves with data, not opinions, so you'll know when it's time.
