---
published: true
name: shamba erp
description: multi-tenant erp for farm management — inventory, sales, and payroll in one place
thumbnail: shamba-erp.png
ogImage: shamba-erp.png
images: [shamba-erp.png]
github: https://github.com/HassanMunene/shamba-erp-frontend
date: 2026-04-18
---

shamba erp is a multi-tenant enterprise resource planning system for small and medium farms. it covers inventory, sales, purchasing, payroll, and reporting behind one login, with per-farm data isolation and role-based access.

## problem

the farms this was built for were juggling spreadsheets, whatsapp orders, and paper receipts. stock went missing between harvest and sale, and nobody could answer basic questions like "which crop made money this quarter?" off-the-shelf erps were either too expensive or too generic — they didn't model agriculture's realities like batch tracking and seasonal demand.

## architecture

the frontend is a react single-page app with typescript, talking to a rest api. the interesting decisions:

- **multi-tenancy via row-level scoping.** every table carries a tenant id and every query goes through a repository layer that injects it automatically. one database, no cross-tenant leaks, cheap to operate.
- **role-based access control.** owners, managers, and field staff see different subsets of the app. permissions are checked on the api, not just hidden in the ui.
- **offline-tolerant workflows.** connectivity on farms is unreliable, so the frontend queues mutations locally and replays them when back online.

## what went wrong (and got fixed)

the first version computed stock levels with correlated subqueries. it was fine with ten products and fell over at a thousand. rewriting the hot paths as maintained aggregates dropped the inventory dashboard from seconds to milliseconds. that exercise taught me more about database performance than any tutorial: measure first, then fix the actual query plan.

## status

actively developed. next up: payment reconciliation and sms notifications for low stock.
