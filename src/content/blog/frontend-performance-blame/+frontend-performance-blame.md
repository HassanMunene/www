---
published: true
name: 'your app is not slow because of javascript'
icon: 'globe'
description: 'measuring before optimizing: the four horsemen of slow frontends and how to tell them apart'
date: 2026-06-10
---

when a frontend feels slow, javascript gets blamed first and fired last. in most audits i've done, the framework is the _fourth_ biggest cause — behind images, waterfalls, and plain unmeasured guesses. performance work is diagnosis, not vibes.

### step zero: measure the actual user

your laptop is a liar. chrome devtools cpu throttling at 4x, network at "slow 4g," and lighthouse's **field data** (real users) instead of lab scores. a dev machine on fiber renders anything smoothly; your users in nairobi on mid-range androids live in a different physics.

### the four horsemen, in guilt order

**1. images.** the usual 70% of the page weight, and the usual 70% of the win: proper `srcset`/sizes, modern formats (avif/webp), explicit width/height (no layout shift), `loading="lazy"` below the fold, and preload for the one image that must lead the page.

**2. request waterfalls.** third-party scripts, fonts chained behind css, api calls that could run in parallel. the fix is boring: preload the critical path, defer everything else, and audit the third-party tags quarterly — they accrete like barnacles.

**3. blocking the main thread.** long tasks jank the page regardless of framework. code-split by route, defer hydration-weight libraries (the date picker does not need to load on the login screen), move genuinely heavy work (parsing, crypto) to a web worker.

**4. javascript, finally.** yes, the framework matters — but by the time it's your bottleneck, you've fixed the rest and earned the right to care. memoize the actually-expensive render, not everything with a prop.

### the discipline that separates pros

**one change, one measurement.** "we refactored for performance" is a story; "we cut lcp from 4.1s to 2.3s by converting hero images to avif and adding srcset" is engineering. keep a perf log: change, hypothesis, before/after numbers. half the time the number refuses to move — that's information too, and it's how you learn what actually matters on your site.

---

performance isn't a feature you finish; it's a budget you keep. measure first, fix the horsemen in order, and only then blame javascript.
