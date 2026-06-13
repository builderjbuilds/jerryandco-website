# Jerry & Co. Home Improvement — Website

Source repository for the Jerry & Co. Home Improvement LLC website (jerryandcohomeservices.com) — a Greater Boston (ICC zone) premium finish and renovation contractor. Summer 2026 focus: factory-grade cabinet refinishing (2K polyurethane spray finish).

## Status

🚧 Pre-build. The one-page landing (`index.html`) is complete and serves as the design-system source of truth. Standalone pages (FAQ, vs-replacement, About, town pages, etc.) are specified but not yet built — see `docs/spec.md`.

## Repo structure

```
index.html              # Existing landing page — design system source of truth (conversion hub)
CLAUDE.md                # Standing instructions for Claude Code sessions in this repo
docs/
  spec.md                # Full technical spec & Claude Code build brief — START HERE
  facts.md               # Business facts sheet — single source of truth for factual claims
  gap-analysis.md         # Competitive gap analysis & page strategy (background reference)
  design-inspiration-report.md  # Brand/design reference (background reference)
data/
  towns.json             # Per-town content data for the 8 service-area page templates
assets/
  css/                    # (empty — Phase 1 extracts shared tokens/components from index.html)
  js/                      # (empty — Phase 1 extracts shared JS modules from index.html)
  img/
    brand/                 # Logo assets (6 variants)
    projects/              # Project photos for gallery/town pages (placeholders until real photos added)
```

## How to build this out

This repo is designed to be handed to **Claude Code** in phased sessions. Open `docs/spec.md` Section 7 ("Shipping this to Claude Code") for:
- the supplementary-info checklist (what to confirm before starting),
- the 8-phase prompt sequence (foundation refactor → trust pages → process/gallery → differentiators → town pages → SEO/sitemap → deploy),
- and the QA/acceptance checklist to run before publishing.

`CLAUDE.md` is read automatically at the start of each session and encodes the hard rules (reuse design tokens, never invent facts, keep town pages unique, etc.).

## Open decisions before launch

See `docs/facts.md` for the full list — the three that block specific pages:
1. **Guarantee term length** (placeholder: 2-year) — blocks `/guarantee/` and homepage trust-bar badge.
2. **EPA RRP certification status/date** — blocks any "lead-safe certified since X" claim.
3. **Financing provider status** (Wisetack proposed) — determines whether `/financing/` launches fully integrated or informational-only.

## License / ownership

Private repository. © 2026 Jerry & Co. Home Improvement LLC. MA HIC #208336.
