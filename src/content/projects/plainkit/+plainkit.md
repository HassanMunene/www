---
published: true
name: plainkit
description: accessible, unstyled ui primitives for react — 5kb, zero dependencies
thumbnail: plainkit.png
ogImage: plainkit.png
images: [plainkit.png]
github: https://github.com/HassanMunene/plainkit
date: 2026-09-01
---

plainkit is a set of headless ui primitives for react: dialog, combobox, tabs, toast, tooltip, and friends — fully accessible, completely unstyled, and small enough that you'll actually ship it.

## why headless

styled component libraries decide your design system for you; fighting them is its own job. headless primitives invert the deal: they own the hard part (behavior, focus, keyboard, aria) and leave pixels entirely to you. plainkit's twist is **size discipline**: the whole library gzips under 5kb, enforced in ci.

## the accessibility iceberg

"just a dropdown" is, accessibly speaking: correct `role` semantics, focus trapping, typeahead, `aria-activedescendant` vs roving tabindex, scroll-into-view without scroll-jacking, and screen reader testing in at least nvda and voiceover. each primitive looks simple and takes real care — which is exactly why a reusable version earns its existence.

## engineering notes

- **no runtime css-in-js, no style prop, no theme provider.** primitives render plain elements with data-attributes for state (`data-open`, `data-selected`), so any styling approach works — plain css, tailwind, css modules
- **the size budget is a test.** a ci check fails the build if the gzipped bundle grows past budget; new features must fit or trade against old ones
- **react 19-friendly:** no class components, no legacy context, no forwardref gymnastics — just function components and refs
- testing couples **jest-dom assertions with real interaction tests**, because accessibility bugs live in the interaction, not the markup

## status

v0.3: dialog, tabs, tooltip, toast shipped. combobox (the boss fight) in progress. goal: a 1.0 with docs good enough that nobody has to read the source to succeed.
