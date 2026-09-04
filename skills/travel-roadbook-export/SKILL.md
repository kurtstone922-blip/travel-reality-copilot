---
name: travel-roadbook-export
description: Export a confirmed or clearly provisional Trip State into a compact Markdown, local HTML, print-ready PDF or JSON roadbook. Use when the traveler asks to generate, save, print or review the final travel document; do not hide incomplete planning or claim live facts are verified.
---

# Travel Roadbook Export

Turn the current Trip State into a practical travel artifact without regenerating the itinerary or consuming tokens to rewrite boilerplate.

## Check readiness

Read `completion_ledger`, confirmed itinerary, lodging, dining disposition, transport detail and verification queue. A final roadbook requires explicit states for overnight lodging, intended day confirmations, dining handling and material transport coverage. Dining may be specific restaurants, meal areas/windows or explicitly skipped.

If blocking completion items remain, offer to resolve them or generate a clearly labeled provisional roadbook. Tickets, opening hours, prices, weather and live schedules may remain preparation reminders when they do not invalidate the route.

## Offer formats

- local HTML — recommended detailed artifact with day navigation, collapsible sections, links and print styling;
- compact PDF — execution-oriented table, preferably A4 landscape and roughly one day per page or two light days per page;
- Markdown — portable text fallback;
- JSON — structured state handoff;
- HTML plus PDF when the host can render both.

## Keep generation deterministic

Do not ask the model to invent a new webpage on every export. When filesystem execution is available, run `scripts/render-roadbook.mjs <trip-state.json> <output.html>`. It generates a dependency-free local HTML file from structured state. Use the HTML print stylesheet or an available document/browser tool to create PDF.

If the host cannot run scripts, follow `references/output-contract.md` and reuse the same compact structure. Generate only the traveler content, not decorative code.

## Content contract

Include every effective confirmed item and every unresolved material reminder, but exclude rejected candidates, superseded drafts and the conversation transcript. Preserve:

- trip summary, route and important boundaries;
- accommodation and dining anchors or explicit flexible windows;
- each day's sequence, time ranges, transport legs, reservations and optional items;
- official, map and booking links when available;
- Plan B only when the traveler generated and retained it;
- source/verification labels and open completion items.

HTML may include one licensed/source-attributed image for important places when the host can acquire and save it safely. Prefer local compressed WebP assets for offline use. Remote images are not offline; missing or uncertain images degrade to links without blocking export.

## Local HTML behavior

Use no framework, CDN, remote font or required network dependency. Provide a top summary, sticky or compact day navigation, anchor links, one section per day, collapsible detail, responsive layout and print CSS. External official/map/booking links may require network even though the roadbook itself opens locally.

## PDF behavior

Favor information density over decoration. Use concise tables with time, item, duration, transport, reservation/verification and notes. Keep full explanations and image galleries in HTML. Make URLs readable or clickable; use QR codes only when the host has a deterministic QR capability.

## Finish visibly

Return the created file paths and summarize whether the artifact is final or provisional, which items remain unverified, and the available next actions: open, revise affected days, refresh verification, regenerate, or end.

Read `references/output-contract.md` for the export envelope. Read `../../core/STATE.md` and `../../core/trip-state.schema.json` for the canonical state.
