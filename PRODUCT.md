# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Around ten individual Thai investors, each handed the app personally by its author. They manage their own portfolios of US-listed stocks and ETFs and check in several times a day. Because the US market runs 9:30–16:00 ET, their market hours fall late at night and into the early morning Bangkok time — a real usage scene, often on a phone, often in the dark.

They are the people who wanted the author's own Sheets-based tracker but could not face its setup (a Google Sheet, an Apps Script deployment, and a write key). They are not developers.

## Product Purpose

A personal portfolio tracker that requires no setup at all: sign in with Google and start adding holdings. It consolidates positions, live quotes, transaction history, plans, and analytics in one place, so the user opens one tab and has what they need to make a decision.

Success is a person who was blocked by setup using it daily without ever thinking about where the data lives.

## Positioning

The data lives in the user's *own* Google Drive, in the `appDataFolder` — a private folder only this app can read. There is no backend, no database, and no account on anyone's server. The author cannot see a user's portfolio, and this is a structural fact, not a policy promise.

That is the mechanism a neighboring tracker cannot truthfully copy: most either host your financial data themselves or make you build the storage yourself. This does neither.

## Operating Context

- Used against US market hours from Bangkok: evenings and overnight local time, frequently on a phone in a dark room.
- Installable as a PWA; also used as a normal browser tab on desktop.
- Money is handled in both THB and USD, including FCD accounts and Thai commission plus 7% VAT. This is a Thai investor's tracker and is not generalized for other markets.
- Users may sign in on more than one device, and more than one Google account may be remembered on a shared device.

## Capabilities and Constraints

- One portfolio; stocks and ETFs live together in it.
- Google Sign-In with `drive.appdata` and `userinfo.profile` scopes only — both non-sensitive, so no verification review.
- Multiple remembered accounts, keyed by the Google `sub`, never by email. Signing out keeps an account listed; removing it revokes and forgets.
- A demo mode that runs the whole app on seeded data without signing in.
- Bilingual EN/TH throughout; four themes (light/dark × warm/cool).
- Market data comes from keyless, CORS-open sources; there is no API key to configure and no server to run.
- Deliberately absent, and not to be implied: ETF look-through, AI chat, multi-portfolio, and any server-side component.

## Brand Commitments

- **Name: "Portfolio Tracker"** — confirmed 2026-08-06, replacing the working name "Folio". Every user-facing surface uses it.
- English is the default language; Thai is available via an existing toggle and must read as well as English.
- The app inherits the author's warm, personal identity from its parent tracker: confident and personal rather than institutional. It is explicitly not generic fintech.

## Evidence on Hand

- A seeded **demo dataset** in `index.html` (`startDemo`): real tickers with plausible positions — AAPL, MSFT, NVDA, VOO, GOOGL, COST, TSLA. It already ships user-visible as a demo, so it is legitimate material to compose with, labeled as a sample.
- `icons/icon.svg`: ascending bars with a terracotta trend line on an ink ground.
- **No** customers, testimonials, press, benchmarks, pricing, user counts, or performance claims exist. None may be fabricated. The app is given away; there is no commercial claim to make.

## Product Principles

1. **Zero setup is the whole promise.** Anything that reintroduces configuration betrays the reason this fork exists.
2. **Custody is the user's, structurally.** Never design anything that implies the author or a server holds the data — and never weaken the arrangement that makes that true.
3. **Personal, not institutional.** These are ten people the author knows, using a tool he made; it should feel like that, not like a bank.
4. **Glanceable first, explorable second.** Surface what matters at a glance; detail belongs in modals and expandable sections.
5. **Honest numbers only.** Every figure traces to the user's own data or to clearly labeled demo data.

## Accessibility & Inclusion

WCAG AA: 4.5:1 minimum contrast for body text, 3:1 for large text. `prefers-reduced-motion` is honored. Both light and dark themes ship in warm and cool tones. Frequent night-time use makes dark-theme legibility a primary case, not an afterthought.
