---
published: true
name: 'the appsec checklist every app developer fails'
icon: 'code'
description: 'the ten vulnerabilities that actually ship — and the habits that stop them'
date: 2026-06-28
---

most security advice is written for security teams. this is for the rest of us — the ten ways applications actually get broken, and the habits that catch them before a pentest report does.

### 1. authorization is not authentication

"i know who you are" ≠ "you may see this." the classic bug: `/api/invoices/42` returns the invoice because the user is logged in — anyone's invoice. fix: **every fetch by id goes through ownership/tenant checks**, ideally enforced in the data layer so forgetting it once doesn't leak a database. write the test: user a requests user b's resource → expect 404.

### 2. mass assignment

`user.update(req.body)` — and a customer sends `{"role": "admin"}`. allow-list fields explicitly, or strip privileged ones. frameworks make this too convenient; that's the vulnerability.

### 3. injection didn't die, it moved

sql injection is solved by parameterized queries _until_ someone concatenates an order-by column or a table name. then there's the new generation: **prompt injection** into llm features, and shell interpolation in ci scripts. the rule is unchanged: data is data, code is code, never the twain.

### 4. secrets in the wrong places

keys in environment variables, never in code; different secrets per environment; rotation rehearsed, not theorized; and the front matter of every tutorial ignored — if it's in a client bundle, it's public. the number of "private" api keys shipping in javascript would keep a bug bounty program busy forever.

### 5. the dependency you didn't audit

`npm audit` on ci, lockfiles committed, and a healthy suspicion of packages that do one nice thing and want 40 transitive permissions. your attack surface includes everyone else's attack surface.

### 6. auth sessions done halfway

httpOnly cookies over https, short-lived access tokens, refresh with rotation, logout that actually invalidates. and rate limit login endpoints — credential stuffing is background noise on every public api.

### 7. file uploads

never trust the filename or content-type. validate the magic bytes, store outside the webroot, serve from a separate domain (that's how you avoid stored-xss via svg), and cap sizes.

### 8. information leakage in errors

stack traces to the client, sql errors with table names, "invalid password" vs "no such user" — each is a free reconnaissance report to an attacker. log richly server-side, return politely and vaguely.

### 9. missing security headers

csp (start report-only, tighten monthly), hsts, x-content-type-options, frame-ancestors. an afternoon of headers neutralizes entire exploit classes.

### 10. "we'll add rate limiting later"

you won't. every public endpoint gets a rate limit on day one. see my earlier post — being a good 429 is also a security control.

---

none of this requires being a security engineer. it's a checklist habit: before shipping a feature — who can access it, what input does it trust, what does it leak when it fails. ten minutes; the pentest report you never get is the reward.
