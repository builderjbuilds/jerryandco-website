# Standing instructions for Claude Code — Jerry & Co. Home Improvement site build

This file is read automatically at the start of every session in this repo. Follow these rules across ALL phases of the build (see `docs/spec.md` Section 7.2 for the phased prompt sequence).

## Source of truth, in priority order
1. `docs/facts.md` — all factual claims (license #, EIN, certifications, pricing, guarantee terms, service area). If a fact isn't here, flag it — do not invent or estimate it.
2. `docs/spec.md` — page-by-page specifications, component specs, sitemap, and schema requirements.
3. `index.html` — the existing design system source of truth (tokens, typography, component markup/CSS/JS patterns). Reuse, don't redefine.
4. `docs/gap-analysis.md` and `docs/design-inspiration-report.md` — background/positioning context only. Do not copy or reproduce text from these into site copy; they're for tone/strategy reference.

## Hard rules
- **Reuse design tokens and components** from `index.html` / `assets/css/tokens.css` once extracted — never introduce new colors, fonts, spacing values, or border-radii.
- **Never invent factual claims.** License numbers, certification status (note: EPA RRP status is marked TBD in `docs/facts.md` — do not assert a certification date until confirmed), warranty terms (placeholder "2-year" — flag, don't finalize), and financing terms (Wisetack integration status is TBD) must come from `docs/facts.md`.
- **Every standalone page** includes the shared header (with the new dropdown nav), footer (with LocalBusiness JSON-LD), breadcrumb, and CTA band components per `docs/spec.md` Section 3.
- **Town pages must have genuinely unique content** per `data/towns.json` — no paragraph should be templated verbatim across all 8 towns. If you can't produce unique content for a section, leave it as a clearly-marked placeholder rather than duplicating.
- **Accessibility:** maintain WCAG AA contrast against the tokens in `docs/spec.md` Section 1, and keep all interactive components (accordion, multi-step form, quiz, before/after slider) keyboard-operable.
- **Placeholders stay obviously placeholders.** Do not write copy that reads as a real testimonial, real photo, or real credential when the underlying data is marked `"status": "placeholder"`.

## Build sequence
Follow the 8 phases in `docs/spec.md` Section 7.2 in order. Each phase should be a separate commit. Do not start a phase until the previous one is reviewed/approved.

## Open decisions (do not resolve unilaterally — surface to Jeremiah)
- Exact workmanship guarantee term length (`docs/facts.md`)
- EPA RRP certification status/date (`docs/facts.md`)
- Wisetack financing integration status (`docs/facts.md`)
- Option A (plain HTML/CSS/JS) vs. Option B (Astro/11ty) for the tech stack (`docs/spec.md` Section 6) — default to Option A unless told otherwise
