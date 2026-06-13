# Jerry & Co. Home Improvement — Full Site Technical Specification & Claude Code Build Brief
**Version 2.0 — Production-ready. Supersedes v1.0.**

This document is the single authoritative source for the full Jerry & Co. website build. It governs every page, component, interaction, and deployment decision across all 8 Claude Code build phases. CLAUDE.md references this file; all factual claims defer to `docs/facts.md`.

---

## 0. Pre-build checklist — gather before Phase 1

- [ ] `index.html` in repo root (design system reference)
- [ ] `docs/facts.md` confirmed current (guarantee term, EPA RRP status, financing status)
- [ ] All 6 logo variants in `assets/img/brand/` (✅ already done)
- [ ] `data/towns.json` confirmed (✅ already done)
- [ ] Cloudinary account created — free tier (25 GB). Upload all project photos + hero video reel
- [ ] Formspark account created — obtain `FORM_ID` for `.env`
- [ ] Netlify account connected to GitHub repo — auto-deploy on push to `main`
- [ ] PostHog account created — obtain `POSTHOG_KEY` for `.env`
- [ ] Resend account created — obtain `RESEND_API_KEY`, verify sending domain
- [ ] Wisetack merchant account confirmed (or mark `/financing/` as informational-only at launch)
- [ ] Domain `jerryandcohomeservices.com` pointed to Netlify (or confirmed ready)
- [ ] Decision: hero media format — autoplay video reel (Cloudinary-hosted .mp4) OR static carousel (Cloudinary image set). Flag in `.env` as `HERO_MODE=video|carousel`

---

## 1. Tech stack — final decisions

| Layer | Technology | Tier | Purpose |
|---|---|---|---|
| Framework | **Astro 4** | Free / OSS | Static-first, island architecture, `getStaticPaths()` for town pages, built-in sitemap plugin |
| Hosting + CI/CD | **Netlify** | Free tier | Git-push deploy, edge CDN, SSL, branch previews, Netlify Forms fallback |
| Image + video CDN | **Cloudinary** | Free (25 GB) | Before/after photos, hero carousel/video, responsive srcset, WebP/AVIF auto-conversion |
| Form backend | **Formspark** | $9/mo or $79/yr | Multi-step form submissions → email + webhook (HousecallPro/Zapier); spam protection; file upload |
| Form fallback (v1 launch) | **Netlify Forms** | Free (250/mo) | Zero-config fallback while Formspark is being set up |
| Analytics + session replay | **PostHog** | Free (1M events/mo) | Form funnel analysis, scroll depth, quiz completion, session replay for conversion debugging |
| Transactional email | **Resend** | Free (3K/mo) | Lead confirmation email + internal Jeremiah notification on every submission |
| Structured data | **Schema.org via Astro head** | Free | LocalBusiness, FAQPage, BreadcrumbList, ImageObject — injected per-page, not hand-coded |
| Financing widget | **Wisetack** | 3.9% per transaction | Astro island on `/financing/` + form confirmation — zero monthly fee |
| Package manager | **pnpm** | Free | Faster installs, strict lockfile for reproducible Netlify builds |

### Why Astro over plain HTML or Next.js
- **vs. plain HTML:** Astro generates the 8 town pages from `towns.json` via `getStaticPaths()` — no manual duplication or generator scripts. Shared components (Header, Footer, CTABand) are real `.astro` partials, not copy-pasted HTML. The existing `index.html` migrates as `src/pages/index.astro` with zero visual changes.
- **vs. Next.js:** Jerry & Co. needs zero server-side runtime — every page is static. Next.js adds SSR complexity and $0–20/mo hosting overhead that buys nothing here. Astro ships zero JS by default; interactive components (quiz, form, slider) opt in via islands.

### Environment variables (`.env` — never commit to git)
```
PUBLIC_CLOUDINARY_CLOUD_NAME=jerryandco
PUBLIC_POSTHOG_KEY=phc_...
FORMSPARK_FORM_ID=abc123
RESEND_API_KEY=re_...
PUBLIC_WISETACK_MERCHANT_ID=wt_...
PUBLIC_HERO_MODE=carousel
```

---

## 2. Repository structure

```
jerryandco-website/
├── .env                          # Never committed — see above
├── .env.example                  # Committed — template with blank values
├── .gitignore
├── astro.config.mjs              # Astro config: @astrojs/sitemap, Netlify adapter
├── package.json                  # pnpm workspace
├── pnpm-lock.yaml
├── netlify.toml                  # Build command, publish dir, headers, redirects
├── CLAUDE.md                     # Standing build instructions (already exists)
├── README.md                     # (already exists)
│
├── docs/
│   ├── spec.md                   # THIS FILE
│   ├── facts.md                  # Business facts (single source of truth)
│   ├── gap-analysis.md           # Competitive context (reference only)
│   └── design-inspiration-report.md
│
├── data/
│   └── towns.json                # Per-town content (already exists)
│
├── src/
│   ├── layouts/
│   │   ├── Base.astro            # <html>, <head>, global CSS import, PostHog snippet
│   │   └── Page.astro            # Base + Header + Footer + Breadcrumb + structured data slot
│   │
│   ├── components/
│   │   ├── Header.astro          # Sticky nav with dropdown menus
│   │   ├── Footer.astro          # 4-col footer with social links + LocalBusiness JSON-LD
│   │   ├── TrustBar.astro        # 5-chip trust signals (reusable)
│   │   ├── CTABand.astro         # Closing CTA (reusable, used on every standalone page)
│   │   ├── Breadcrumb.astro      # Nav breadcrumb for standalone pages
│   │   ├── BeforeAfter.astro     # Before/after slider (island — client:visible)
│   │   ├── HeroCarousel.astro    # Hero media (video loop OR image carousel — island)
│   │   ├── MultiStepForm.astro   # 4-step estimate form (island — client:load)
│   │   ├── Accordion.astro       # FAQ accordion (island — client:visible)
│   │   ├── GalleryGrid.astro     # Filterable gallery (island — client:visible)
│   │   ├── Quiz.astro            # Cabinet quiz state machine (island — client:load)
│   │   ├── WisetackWidget.astro  # Financing widget (island — client:idle)
│   │   └── SchemaLD.astro        # JSON-LD injector for structured data
│   │
│   ├── styles/
│   │   ├── tokens.css            # All CSS custom properties (design tokens)
│   │   ├── global.css            # Reset, base typography, shared utilities
│   │   └── components.css        # Shared component styles (.btn, .card, .chip, etc.)
│   │
│   └── pages/
│       ├── index.astro                           # Homepage (conversion hub)
│       ├── faq.astro                             # FAQ hub
│       ├── cabinet-refinishing-vs-replacement.astro
│       ├── about.astro
│       ├── our-process.astro
│       ├── gallery.astro
│       ├── guarantee.astro
│       ├── financing.astro
│       ├── colors.astro
│       ├── cabinet-quiz.astro
│       ├── cabinet-refinishing-[town].astro      # Dynamic route → 8 pages
│       └── sitemap.xml.ts                        # Auto-generated by @astrojs/sitemap
│
├── assets/
│   └── img/
│       ├── brand/                # 6 logo variants (already exists)
│       └── projects/             # Local originals before Cloudinary upload
│
└── public/
    └── robots.txt
```

---

## 3. Design system — tokens (do not redefine, only extend)

All tokens are defined once in `src/styles/tokens.css` and imported via `global.css`. Every `.astro` component uses these — never hardcode hex values in component files.

```css
:root {
  /* Brand palette */
  --bone: #F7F3EA;
  --bone-deep: #EFE7D6;
  --ink: #14241F;
  --ink-soft: #1E332D;
  --forest: #1E3934;
  --gold: #C8A055;
  --gold-deep: #8A6A33;
  --text: #20281F;
  --text-muted: #6E6A5E;
  --line: rgba(30,57,52,0.14);
  --line-dark: rgba(247,243,234,0.16);

  /* Spacing */
  --radius: 14px;
  --radius-sm: 8px;
  --section-pad: 88px;

  /* Typography */
  --font-serif: 'Fraunces', serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

**Typography:** Fraunces (serif, headings) + Inter (sans, body/UI). Load via Google Fonts in `Base.astro` `<head>` — single import, no duplication across pages.

**Logo mark:** The inline SVG house-mark defined in `index.html` header/footer. Extract to `Header.astro` and `Footer.astro` as a shared SVG snippet — never regenerate it.

---

## 4. Global components — implementation specs

### 4.1 Header.astro
```
sticky, top:0, z-index:50, background:var(--ink), border-bottom:1px solid var(--line-dark)
```
**Nav structure:**
```
[Logo mark + wordmark] | Services ▾ | Why Refinish ▾ | Gallery | FAQ | About | Areas ▾ | [Get Free Estimate btn-gold]
```
Dropdown menus (CSS-only, no JS required — use `:focus-within` + `aria-expanded` for keyboard access):
- **Services ▾:** Cabinet Refinishing · Bathroom Refresh · Interior Painting · Full Bathroom Reno
- **Why Refinish ▾:** vs. Replacement · Our Process · Guarantee · Financing
- **Areas ▾:** all 8 town page links, 2-column grid layout

Mobile (≤880px): hamburger toggle (`<input type="checkbox">` CSS trick or minimal JS). Nav collapses to full-screen overlay. "Get Free Estimate" persists as sticky bottom bar on mobile.

### 4.2 Footer.astro
4-column grid (bone-deep background on dark/ink background):
- **Col 1:** Logo + brand blurb (condo ICP version — see Section 6.1 Container 09)
- **Col 2:** Services links + social icon row (Instagram, TikTok, YouTube, Facebook, Pinterest)
- **Col 3:** Company links (About, FAQ, Process, Guarantee, Financing, Colors, Quiz)
- **Col 4:** Service Areas (all 8 town page links)

Footer includes `SchemaLD.astro` with `LocalBusiness` JSON-LD (see Section 8.2). Legal line: `© 2026 Jerry & Co. Home Improvement LLC · MA HIC #208336 · All in-unit work performed with building-compliant containment and low-VOC materials`.

### 4.3 TrustBar.astro
5 trust chips, horizontally scrollable on mobile:
1. MA HIC #208336 — licensed & verified
2. EPA RRP Lead-Safe Certified → links to `/faq/#lead-safe`
3. Fully insured — owner on every job
4. HOA & building-compliant process
5. Workmanship Guarantee → links to `/guarantee/`

### 4.4 CTABand.astro
Reusable close section used at the bottom of every standalone page. Props: `eyebrow`, `headline`, `ctaText`, `ctaHref`. Default values:
```
eyebrow: "Ready when you are"
headline: "Get your free video estimate"
ctaText: "Start my estimate"
ctaHref: "/#estimate"
```

### 4.5 BeforeAfter.astro (island: `client:visible`)
Portable slider component. Props: `beforeSrc`, `afterSrc`, `beforeAlt`, `afterAlt`, `caption`. Cloudinary image URLs passed as props — no hardcoded paths. Reused on: homepage hero, `/gallery/`, `/cabinet-refinishing-vs-replacement/`, all 8 town pages.

Implementation: existing range-input JS from `index.html` extracted as a self-contained `<script>` inside the component. Touch and keyboard accessible (`aria-label` on range input).

### 4.6 HeroCarousel.astro (island: `client:load`)
Controlled by `PUBLIC_HERO_MODE` env var.

**`video` mode:** Cloudinary-hosted `.mp4` autoplay loop, muted, `playsinline`, `preload="none"`, poster frame from Cloudinary. Overlaid with dark gradient `rgba(20,36,31,0.65)`. Text and CTAs render above the video.

**`carousel` mode:** 3–5 Cloudinary image slides. Auto-advance every 5s. Pause on hover/focus. Swipeable on touch. Dots navigation. Images: aerial Boston cityscape (slide 1) → condo kitchen before (slide 2) → same kitchen after spray finish (slide 3) → condo bathroom before/after (slide 4). Each slide uses Cloudinary responsive srcset (`w_800,w_1200,w_1600,f_auto,q_auto`).

### 4.7 MultiStepForm.astro (island: `client:load`)
4-step progress bar form. Submits to Formspark (`action="https://submit-form.com/{FORM_ID}"`). Fallback `netlify` attribute for Netlify Forms during v1 launch.

**Step 1 — Project type** (large tappable cards, no `<select>`):
- Cabinet Refinishing ⭐ (pre-selected, gold border)
- Bathroom Refresh
- Interior Painting
- Full Bathroom Reno
- Kitchen Refresh
- Something else

**Step 2 — Property & details:**
- Property type (single-select chips): Own condo · Renting & renovating · Landlord/multi-unit · Single-family home
- Town (dropdown — 12 ICC + secondary towns + Other)
- Timeline (chips): ASAP · Within 30 days · 1–3 months · Just exploring
- Project size (text input — placeholder: `e.g. 18 cabinet doors, 2-BR condo unit, 4th floor`)
- Desired finish/color (text input)

**Step 3 — Building access & notes:**
- Building access notes (textarea — placeholder: `HOA requirements, building management contact, elevator reservation window, noise curfew, etc.`)
- Optional: photo upload note ("Snap a few photos and email them to jerry@jerryandcohomeservices.com after submitting — it speeds up your estimate")

**Step 4 — Contact (last, deliberately):**
- Full name · Phone · Email
- Submit button: "Request my free video estimate"
- Foot note: "No spam, no obligation. You'll hear from us within 5 minutes."

**Success state:** Replaces form with confirmation card. Triggers Resend confirmation email via Formspark webhook.

**URL param pre-fill:** On load, read `URLSearchParams` (`?project=cabinet-refinishing&town=somerville&type=condo`) and pre-populate Step 1 card selection + Step 2 dropdowns. Used by quiz-to-form handoff.

### 4.8 Accordion.astro (island: `client:visible`)
Props: `items[]` (array of `{question, answer, id}`), `groupLabel`. Multi-open default. `aria-expanded` on trigger button, `hidden` on panel. Icon rotates 180° via CSS `[aria-expanded="true"] .icon { transform: rotate(180deg) }`.

### 4.9 GalleryGrid.astro (island: `client:visible`)
Props: `items[]` (array of `{beforeSrc, afterSrc, label, town, category, caption}`). Filter bar: All · Cabinet Refinishing · Bathroom · Painting · Kitchen · **Condo & multi-unit** (new category). Secondary filter dropdown: All towns · [8 ICC towns]. Deep-link support: `/gallery/?cat=cabinet&town=somerville` pre-selects filters on load via `URLSearchParams`. All images from Cloudinary — never local paths.

### 4.10 Quiz.astro (island: `client:load`)
State machine: 6 questions → weighted scoring → 3 outcome screens. On outcome render, CTA button builds a URL to `/#estimate` with pre-fill params matching quiz answers and routes there.

### 4.11 SchemaLD.astro
Props: `type` (`LocalBusiness` | `FAQPage` | `BreadcrumbList` | `Service`), `data` (object). Renders `<script type="application/ld+json">` in `<head>` via Astro's `<slot name="head">`. Town pages pass `areaServed` from `towns.json`. Never hand-code JSON-LD in page files.

---

## 5. Full sitemap

```
/ ..................... Homepage (conversion hub)
/faq/ ................. FAQ hub
/cabinet-refinishing-vs-replacement/
/about/
/our-process/
/gallery/
/guarantee/
/financing/
/colors/
/cabinet-quiz/
/cabinet-refinishing-medford/
/cabinet-refinishing-malden/
/cabinet-refinishing-everett/
/cabinet-refinishing-arlington/
/cabinet-refinishing-somerville/
/cabinet-refinishing-cambridge/
/cabinet-refinishing-woburn/
/cabinet-refinishing-winchester/
/sitemap.xml .......... Auto-generated by @astrojs/sitemap
/robots.txt
```
**Total: 20 URLs** (10 core + 8 town + sitemap + robots)

---

## 6. Page-by-page specifications

### 6.1 Homepage `index.astro` — condo ICP modifications applied to all 9 containers

**Meta:** `<title>` = "Cabinet Refinishing & Home Refresh for Boston Condo Owners | Jerry & Co." `<description>` = "Factory-grade 2K polyurethane cabinet refinishing and bathroom refresh for condo owners across the Greater Boston ICC zone. HOA-compliant, low-VOC, done in 2–5 days. MA HIC #208336."

| Container | Current state | Required change |
|---|---|---|
| **01 Hero** | Generic homeowner headline + CSS slider | Replace with `HeroCarousel.astro` (video/carousel). H1: *"Factory-grade finishes built for Boston condo living — done in days, not weeks, with zero neighbor drama."* Sub-headline: *"We work within HOA guidelines, building curfews, and elevator scheduling. No dust, no odor, no disruption to your neighbors."* Eyebrow: "For condo owners in Greater Boston." Two CTAs: [Get my free video estimate → #estimate] [See the spray finish → #gallery]. Credibility micro-line: *"Trusted in Somerville, Cambridge, and Medford triple-deckers and condo conversions since 2019."* |
| **02 Trust bar** | 4 chips | Upgrade to `TrustBar.astro` (5 chips). Add: "HOA & building-compliant process." Reframe "owner on every job" → *"One point of contact — no rotating crews, no contractor strangers in your building."* Add "Low-VOC, neighbor-safe process." EPA chip links to `/faq/#lead-safe`. Guarantee chip links to `/guarantee/`. |
| **03 NEW — Condo-ready strip** | Does not exist | Insert between trust bar and services grid. 3-column icon + label block (bone-deep background): *"HOA documentation provided on request"* / *"Low-VOC, neighbor-safe process"* / *"Elevator & building-access coordination included."* Single line of body copy: *"We've navigated condo boards, building managers, and neighbor scheduling across the ICC zone for 7 years."* |
| **04 Services grid** | 4 generic cards | Add condo-specific microcopy to each card. Cabinet: *"No demo, no dumpster, no elevator damage — done in 2–5 days."* Bathroom: *"Gut-free refresh that meets condo renovation bylaws — no permit triggers in most ICC buildings."* Painting: Remove "exterior" reference — replace with *"Interior painting & refresh — all work contained within your unit."* Full reno: *"May require building board approval — we help you navigate the documentation."* Add 5th card: "Multi-unit / building refresh" — B2B/PM card (seeds referral flywheel). |
| **05 Process** | 5 steps, generic | Add condo-specific microcopy to each step. Step 01: *"We also gather building access requirements, elevator reservation windows, and HOA documentation needs at this stage."* Step 02: *"Fully sealed dust containment within your unit. All equipment staged within your unit — no lobby or hallway storage."* Step 03: *"Hand-sanding only — no loud power tools that travel through condo walls."* Step 04: *"Low-VOC formula — safe for shared ventilation systems common in multi-unit buildings."* Step 05: *"Final walkthrough includes elevator condition check and hallway inspection before we leave."* Add "See our full process →" → `/our-process/`. |
| **06 Gallery** | 8 placeholder slots | Replace placeholder labels with ICC condo-town references (Somerville, Cambridge, Medford, Malden, Arlington). Add "Condo & multi-unit" filter. Add intro line: *"Real transformations in Greater Boston condos, triple-deckers, and multi-family units."* Add "View full gallery →" → `/gallery/`. All slots use `BeforeAfter.astro` with Cloudinary URLs once real photos exist. |
| **07 Service area** | Generic copy, passive chips | Reframe headline: *"Home to Greater Boston's highest density of condos, triple-deckers, and condo conversions — the buildings we know best."* Add building-type callouts: *"Somerville & Cambridge — triple-decker conversions, HOA-managed condo buildings / Arlington & Winchester — larger unit condos and owner-renovated colonials."* Convert every chip to `<a href="/cabinet-refinishing-{town}/">`. Add line: *"Locally owned and operated — serving the ICC zone for 7 years."* |
| **08 Estimate form** | 9-field flat form | Replace with `MultiStepForm.astro` (4-step, full condo ICP fields). Headline changes to: *"Tell us about your unit — we handle the building logistics."* |
| **09 Tiers** | Generic Good/Better/Best | Add below tier grid: *"Every tier includes: zero lobby or hallway staging, low-VOC materials only, same-day cleanup, and a certificate of insurance for your property manager or HOA."* Eyebrow: change to *"Trusted by condo owners across the ICC zone."* Best tier rename to "Full unit kitchen." Add referral prompt: *"Live in a building with neighbors who could use a refresh? Ask about our building referral program."* Add financing line → `/financing/`. Add guarantee line → `/guarantee/`. |
| **10 Footer** | Generic blurb, no social | Upgrade to `Footer.astro`. Brand blurb: *"Factory-grade cabinet refinishing and bathroom refresh for condo owners across Greater Boston — built around your building's rules, your neighbors, and your timeline."* Add social icon row. Add "Condo owners" nav column. Legal line upgrade (see 4.2). |

---

### 6.2 `/faq/`
**SEO target:** "cabinet refinishing FAQ", "how long does cabinet refinishing last", "can you refinish laminate cabinets"
**Meta:** `<title>` = "Cabinet Refinishing FAQ | Jerry & Co. Greater Boston" `<description>` = "Answers to the most common questions about cabinet refinishing, the 2K polyurethane process, material compatibility, condo logistics, and pricing."

**Layout:** Page header → 5 `Accordion.astro` groups → `CTABand.astro`

**Group 1 — Durability & Warranty** (`#durability`)
- How long does a 2K polyurethane finish last?
- Will it chip or peel like regular paint?
- What's your workmanship guarantee?
- What if I scratch or chip a door later?

**Group 2 — Materials & Compatibility** (`#materials`)
- Can you refinish laminate, melamine, or thermofoil cabinets — or only solid wood?
- What if my laminate is already peeling?
- Will the wood grain show through, or will it be a solid color?
- Can you change the color completely (e.g. honey oak to deep green)?

**Group 3 — Process & Disruption** (`#process-disruption`)
- Is the process messy? Do you sand on-site?
- What are the fumes like — can I stay home with kids and pets?
- How long am I without a usable kitchen?
- Do you remove doors to a shop, or work on-site?

**Group 4 — Condo & Building Logistics** (`#condo`) ← new group, ICP-specific
- How do you handle elevator access and freight scheduling?
- Do you provide a certificate of insurance for my building or HOA?
- Do you comply with building noise curfews?
- Can my downstairs neighbors be affected by the process?
- Do you coordinate with property managers directly?

**Group 5 — Cost, Timeline & Financing** (`#cost`)
- How much does cabinet refinishing cost?
- Is refinishing really cheaper than replacement?
- Do you offer payment plans or financing?
- Do you serve my town?

Schema: `FAQPage` JSON-LD via `SchemaLD.astro` for all questions (content depth + AI-overview eligibility; rich snippets deprecated May 2026).

---

### 6.3 `/cabinet-refinishing-vs-replacement/`
**SEO target:** "cabinet refinishing vs replacement", "is cabinet refinishing worth it", "refinish or replace cabinets Boston"
**Meta:** `<title>` = "Cabinet Refinishing vs. Replacement — The Honest Comparison | Jerry & Co." `<description>` = "Factory-grade refinishing costs 50–75% less than full replacement and takes 2–5 days. Here's the three-way comparison: refinishing vs. replacement vs. cheap repaint."

**Sections:**
1. Header band (ink bg): eyebrow "Why refinish" / H1 / intro paragraph
2. Three-way comparison table (`.compare-table` — styled to brand tokens):

| | Full Replacement | Cheap Repaint | Jerry & Co. Refinishing |
|---|---|---|---|
| Cost | $20,000–$50,000+ | $1,000–$2,500 | $1,800–$9,500 |
| Timeline | 4–8+ weeks | 1–2 days | 2–5 days |
| Finish durability | Varies by manufacturer | Brushed latex — chips within 1–2 years | Factory-grade 2K polyurethane |
| Keeps your layout | No | Yes | Yes |
| Box material | New (often lower-grade MDF) | Existing | Existing (often solid wood) |
| Condo-friendly | Requires demo & dumpster | Yes | Yes — no demo, no dumpster |
| HOA disruption | High | Low | Zero — contained within unit |

3. Decision table (two-column list): "Refinish if…" / "Replace if…"
4. `BeforeAfter.astro` with real before/after caption
5. Cost-comparison bar chart (inline SVG — 3 horizontal bars, brand token colors)
6. `CTABand.astro`

---

### 6.4 `/about/`
**SEO target:** "Jerry & Co Home Improvement", "Jeremiah Ugbine", brand searches
**Meta:** `<title>` = "About Jeremiah Ugbine & Jerry & Co. Home Improvement | Greater Boston" `<description>` = "Jerry & Co. is Jeremiah Ugbine — owner, lead contractor, and the person who shows up to every job. 7 years serving Greater Boston condos and homes. MA HIC #208336."

**Sections:**
1. Founder portrait + intro (2-col on desktop: image left / text right)
2. "Why I do this" — first-person narrative voice
3. "You get the owner" — explicit franchise contrast: *"When you hire Jerry & Co., the person who gives you the estimate is the person who does the work — every time. No subcontractors, no rotating crews, no franchise call center."*
4. Credential strip (reuse `TrustBar.astro` styling)
5. Condo-specific expertise section: *"7 years navigating Boston's condo boards, building managers, and neighbor scheduling — we understand the logistics your neighbors don't want to deal with."*
6. `CTABand.astro`

---

### 6.5 `/our-process/`
**SEO target:** "how cabinet refinishing works", "2K polyurethane cabinet process", "cabinet refinishing process Boston"

5 expanded steps (each with 2–3 paragraphs + condo-specific logistics note):
1. **Video walkthrough** — estimate delivered same day; building access requirements gathered at this stage
2. **Prep & containment** — masking, dust containment, equipment staged within unit, no hallway storage
3. **Hand sand & repair** — no power tools; neighbor-safe; leveling described
4. **2K polyurethane spray application** — chemistry explanation (factory-grade class), low-VOC, shared-ventilation safe
5. **Cure, reinstall, final walkthrough** — cure time, elevator condition check, hallway inspection, sign-off

Mini-FAQ anchors after steps 2–4 linking to `/faq/#process-disruption` and `/faq/#condo`.

---

### 6.6 `/gallery/`
**SEO target:** "cabinet refinishing before and after Boston", "condo kitchen refinishing"

Full `GalleryGrid.astro` with dual filter (category + town). Intro: *"Real transformations in Greater Boston condos, triple-deckers, and multi-family units."* Every item uses `BeforeAfter.astro` with Cloudinary images + caption (town + building type + timeframe note where available, e.g. "Porter Square condo — deep forest green, 3 days in unit"). `CTABand.astro`.

---

### 6.7 `/guarantee/`
**SEO target:** "cabinet refinishing warranty Boston", brand trust queries

Sections:
1. Header: "The Jerry & Co. Workmanship Guarantee"
2. Plain-language terms (pull exact term from `docs/facts.md` — placeholder "2-year")
3. Touch-up program: labeled touch-up bottle + one complimentary in-person touch-up visit
4. "Why local accountability beats a national warranty" — solo-operator framing vs. franchise
5. Condo addendum: *"For condo clients, our guarantee also covers any incidental damage to elevator surfaces or hallway finishes caused during our work — documented at the final walkthrough."*
6. What's not covered (plain language)
7. `CTABand.astro`

---

### 6.8 `/financing/`
**SEO target:** "cabinet refinishing financing", "pay over time home improvement Boston"

Sections:
1. Header: "Pay over time, not all at once."
2. 3-step explainer: Get estimate → Apply (soft check, no credit impact) → Choose plan
3. `WisetackWidget.astro` (island: `client:idle`) — or informational placeholder if not yet integrated
4. Illustrative monthly payment examples (mark "illustrative — final terms at application")
5. Mini-FAQ: "Does this affect my credit?" / "Is there a fee to me?" / "How quickly am I approved?"
6. `CTABand.astro` — CTA text: "Check my rate" (→ Wisetack) or "Ask about financing" (→ `/#estimate`) if not integrated

---

### 6.9 `/colors/`
**SEO target:** "kitchen cabinet color ideas Boston", "cabinet refinishing colors"

Sections:
1. Header: "Explore finishes"
2. Curated palette grid (6–8 cards): each shows Cloudinary swatch image + palette name + 1-line mood description. Names: Deep Forest (brand green) / Bone White / Soft Sage / Charcoal Matte / Navy Shaker / Warm Taupe / Matte Black / Champagne
3. "Not sure which finish fits your kitchen?" → CTA to `/cabinet-quiz/`
4. `CTABand.astro`

---

### 6.10 `/cabinet-quiz/`
**SEO target:** conversion/differentiation tool (not primary SEO page)

6-question `Quiz.astro` state machine. Full question set and scoring:

| Q | Question | Answers | Weight |
|---|---|---|---|
| 1 | Current cabinet box condition? | Solid, just dated (+2) / Some wear (+1) / Water damage or falling apart (-2) | |
| 2 | Cabinet material? | Solid wood / wood veneer (+2) / Laminate/thermofoil (+0, flag FAQ) / Not sure (+1) | |
| 3 | Happy with current layout? | Yes, just want a new look (+2) / Mostly, minor changes (+1) / No, want to reconfigure (-2) | |
| 4 | Color goal? | Same color, fresh (+1) / Totally different color (+2) / Not sure → `/colors/` (+1) | |
| 5 | Property type? | Own condo (+2, adds condo context to pre-fill) / Landlord/multi-unit (+2) / Single-family (+1) | |
| 6 | Timeline? | ASAP (+0) / Within 30 days (+0) / 1–3 months (+0) / Just exploring (+0) (captured for pre-fill only) | |

**Outcome scoring:**
- Score ≥ 6, no negatives → **Outcome A:** "Cabinet refinishing is a great fit." → CTA to `/#estimate?project=cabinet-refinishing&type={property-type}&timeline={timeline}`
- Score 3–5 OR 1 negative → **Outcome B:** "Refinishing plus a few updates could work well." → same CTA pre-fill + suggest bathroom refresh bundle
- Score < 3 OR 2+ negatives → **Outcome C:** "You may be better served by a fuller renovation — let's talk." → CTA to `/#estimate?project=full-bathroom-renovation`

---

### 6.11 Town page template `/cabinet-refinishing-[town].astro`
Generated via `getStaticPaths()` from `data/towns.json`.

**Meta per town:** `<title>` = "Cabinet Refinishing in {Town}, MA | Jerry & Co." `<description>` = "Factory-grade cabinet refinishing for {Town} condo owners and homeowners. {1-line housing stock hook}. MA HIC #208336. Free video estimate."

**Sections:**
1. Header band: "Cabinet Refinishing in {town}, MA" + 1-sentence local positioning
2. `BeforeAfter.astro` with town-specific Cloudinary image (or placeholder)
3. "Why {town} condo owners choose refinishing" — unique housing-stock paragraph from `towns.json`
4. Local testimonial (placeholder until real — marked explicitly as placeholder in template)
5. Condensed services grid (4 cards) — same condo-ICP microcopy as homepage
6. Mini-FAQ (2–3 Q&As from `/faq/#condo` and `/faq/#cost` most relevant to that town)
7. "Also serving nearby: {neighbors linked}" — internal link row
8. `CTABand.astro`

**Schema per town:** `LocalBusiness` + `Service` + `areaServed: [{town}, MA]` + `BreadcrumbList` via `SchemaLD.astro`.

**Anti-doorway-page rule:** Each town page paragraph must be ≥80% unique. Housing-stock framing per town (from `towns.json`):
- Somerville/Cambridge: triple-deckers, condo conversions, compact kitchens, pre-listing refresh
- Medford/Arlington: pre-1978 colonials, solid-wood cabinet boxes
- Malden/Everett: 2–6 unit multi-family, landlord/turnover ICP
- Woburn/Winchester: 1950s–1970s ranch/colonial, highest home equity

---

## 7. SEO & structured data

### 7.1 Per-page meta (all 20 URLs)
Every page requires: unique `<title>` (≤60 chars), `<meta name="description">` (≤155 chars), `<link rel="canonical">`, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`). OG image: Cloudinary-hosted branded image (1200×630) auto-generated per page type or shared brand image. Twitter/X card: `summary_large_image`.

### 7.2 Structured data schemas
| Page | Schema types |
|---|---|
| All pages (footer) | `LocalBusiness`, `HomeAndConstructionBusiness` |
| Homepage | `LocalBusiness` + `Service` (cabinet refinishing) |
| `/faq/` | `FAQPage` + `BreadcrumbList` |
| `/about/` | `Person` (Jeremiah Ugbine) + `BreadcrumbList` |
| `/our-process/` | `HowTo` + `BreadcrumbList` |
| `/gallery/` | `ImageGallery` + `BreadcrumbList` |
| `/guarantee/` | `Service` (with warranty property) + `BreadcrumbList` |
| Town pages | `LocalBusiness` (areaServed: {town}) + `Service` + `BreadcrumbList` |

### 7.3 `sitemap.xml`
Auto-generated by `@astrojs/sitemap` on every Netlify build. All 20 URLs included. Configure `changefreq` and `priority` in `astro.config.mjs`:
```js
sitemap({ customPages: [], changefreq: 'weekly', priority: 0.7 })
```
Homepage priority: 1.0. Town pages: 0.8. FAQ/process: 0.9. Quiz/colors: 0.5.

### 7.4 `robots.txt`
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://www.jerryandcohomeservices.com/sitemap.xml
```

---

## 8. Integrations

### 8.1 Cloudinary
- Cloud name: `jerryandco` (set in `.env`)
- All `<img>` tags use Cloudinary URLs with transformation params: `f_auto,q_auto,w_800` (mobile) + `w_1200` (desktop) via `srcset`
- `BeforeAfter.astro` and `HeroCarousel.astro` both accept Cloudinary URLs as props
- Hero video: `f_auto,q_auto,vc_auto` transformation for browser-native codec delivery
- Naming convention: `projects/{town}-{service}-{number}-{before|after}.jpg`

### 8.2 Formspark
- `action="https://submit-form.com/{FORMSPARK_FORM_ID}"` on `MultiStepForm.astro`
- hCaptcha spam protection enabled in Formspark dashboard
- On submission: Formspark sends email to `jerry@jerryandcohomeservices.com` + triggers Resend webhook for lead confirmation email
- File upload note in Step 3 directs to email (no file upload in v1 — simplifies form backend)
- Netlify Forms fallback: add `data-netlify="true"` attribute during v1 launch period

### 8.3 Resend
Two email templates (brand-token HTML, no external CSS frameworks):
1. **Lead confirmation** (to lead): "We got your estimate request — here's what happens next" (5-minute ack + 3-step what-to-expect + Jeremiah's cell for urgent questions)
2. **Internal notification** (to Jeremiah): lead summary card (name, phone, town, project type, property type, building notes, timeline)

### 8.4 PostHog
Snippet in `Base.astro` `<head>` — loads after page paint (`defer`). Track custom events:
- `form_step_completed` (step: 1–4)
- `form_submitted`
- `quiz_completed` (outcome: A/B/C)
- `before_after_dragged`
- `gallery_filter_used` (filter value)
- `cta_clicked` (location: hero/trust-bar/tiers/cta-band)

### 8.5 Wisetack
Island component (`client:idle`) on `/financing/` and as an optional inline on `MultiStepForm.astro` success state. Loads Wisetack JS snippet from their CDN only when the island becomes active — zero impact on page load for all other pages.

---

## 9. Performance targets

| Metric | Target | Strategy |
|---|---|---|
| Lighthouse Performance | ≥ 90 | Astro zero-JS default, Cloudinary auto-format, islands lazy-load |
| LCP (Largest Contentful Paint) | < 2.5s | Hero image preloaded via `<link rel="preload">`, Cloudinary CDN |
| CLS (Cumulative Layout Shift) | < 0.1 | Explicit `width`/`height` on all images, skeleton loaders on islands |
| FID / INP | < 100ms | Minimal JS, islands only where needed |
| Accessibility | WCAG AA | `aria-` attributes on all interactive components, color contrast verified against tokens |
| Mobile usability | Pass | Sticky bottom CTA on mobile, touch-friendly slider, 44px tap targets |

---

## 10. Netlify configuration (`netlify.toml`)

```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/estimate"
  to = "/#estimate"
  status = 301

[[redirects]]
  from = "/contact"
  to = "/#estimate"
  status = 301
```

---

## 11. The 8 phased build sessions

Each session = one Claude Code conversation. Use `/clear` between phases. Commit and push at the end of every phase — Netlify auto-deploys a preview URL. Review the preview before starting the next phase.

---

### Phase 1 — Astro scaffold + design system migration
**Objective:** Working Astro project that renders `index.html` content identically. No new pages, no visual changes. Foundation for all subsequent phases.

**Claude Code prompt:**
```
Working in this repo, using docs/spec.md Section 2 as the file structure reference and docs/facts.md for all factual content:

1. Init an Astro 4 project with pnpm: `pnpm create astro@latest . -- --template minimal --no-install`, then `pnpm install`.
2. Add dependencies: `@astrojs/netlify`, `@astrojs/sitemap`. Configure both in `astro.config.mjs`.
3. Create `netlify.toml` per docs/spec.md Section 10.
4. Create `.env.example` with all keys from docs/spec.md Section 1 (blank values).
5. Extract ALL CSS from `index.html` into three files:
   - `src/styles/tokens.css` — :root custom properties only
   - `src/styles/global.css` — reset + base typography + @import for tokens.css + Google Fonts @import
   - `src/styles/components.css` — all shared component classes (.btn, .card, .chip, .trust-item, etc.)
6. Create `src/layouts/Base.astro` — imports global.css, accepts <slot name="head"> for per-page meta/schema.
7. Create `src/layouts/Page.astro` — extends Base.astro, includes Header + Footer + Breadcrumb slots.
8. Create `src/components/Header.astro` — nav per docs/spec.md Section 4.1. CSS-only dropdowns.
9. Create `src/components/Footer.astro` — 4-col layout per docs/spec.md Section 4.2, including social icon row.
10. Create `src/components/TrustBar.astro` — 5 chips per docs/spec.md Section 4.3.
11. Create `src/components/CTABand.astro` — per docs/spec.md Section 4.4, props: eyebrow/headline/ctaText/ctaHref.
12. Create `src/pages/index.astro` — migrate all HTML content from `index.html` using the new layout/components. CSS comes from imported stylesheets. No inline <style> or <script> blocks in the .astro file — all JS extracted to component islands (placeholder `client:visible` stubs for slider, gallery, form for now).
13. Create `public/robots.txt` per docs/spec.md Section 7.4.
14. Run `pnpm build` — confirm zero build errors and `dist/` output.
15. Commit: "feat(phase-1): astro scaffold, design system migration, shared components"
```

**Acceptance criteria:** `pnpm build` succeeds. `dist/index.html` renders identically to original `index.html` in browser. No inline styles in `.astro` files. All design tokens in `tokens.css`.

---

### Phase 2 — Homepage rebuild with condo ICP modifications
**Objective:** `index.astro` reflects all 10 container changes from docs/spec.md Section 6.1. `HeroCarousel.astro` and `MultiStepForm.astro` implemented as islands. Netlify preview deploy confirms visual accuracy.

**Claude Code prompt:**
```
Phase 2. Read docs/spec.md Section 6.1 (all 10 container modifications) and Section 4.6–4.7 (HeroCarousel and MultiStepForm component specs). Build:

1. `src/components/HeroCarousel.astro` — island (client:load). Reads PUBLIC_HERO_MODE from import.meta.env. In carousel mode: 3–5 Cloudinary image slides (use placeholder Cloudinary URLs in the format https://res.cloudinary.com/{cloud}/image/upload/f_auto,q_auto,w_1200/v1/projects/placeholder-{n}.jpg), auto-advance 5s, pause on hover, swipeable touch, dot nav. In video mode: <video autoplay muted loop playsinline> with Cloudinary-hosted mp4 placeholder. Overlay: dark gradient + hero text + CTAs per spec.

2. `src/components/MultiStepForm.astro` — island (client:load). All 4 steps per docs/spec.md Section 4.7. Formspark action URL reads from import.meta.env.FORMSPARK_FORM_ID. URL param pre-fill on mount. Step 1 uses tappable cards (no <select>). Step 4 last. Success state swaps form for confirmation card. Include data-netlify="true" fallback attribute.

3. Update `src/pages/index.astro` — apply ALL changes from docs/spec.md Section 6.1 containers 01–10. Use HeroCarousel in container 01, TrustBar in container 02, new condo-ready strip in container 03, MultiStepForm in container 08. All copy changes per the spec table exactly.

4. PostHog event tracking: add cta_clicked events to all CTA buttons, form_step_completed on each step advance.

Commit: "feat(phase-2): homepage condo ICP rebuild, hero carousel, multi-step form"
```

**Acceptance criteria:** All 10 homepage container changes present. Form advances through 4 steps and shows success state. Hero carousel auto-plays. PostHog events fire (verify in PostHog Live Events dashboard). Netlify preview URL works on mobile.

---

### Phase 3 — High-priority SEO pages: FAQ + vs-replacement
**Objective:** `/faq/` and `/cabinet-refinishing-vs-replacement/` live with all content, schema, and internal cross-links.

**Claude Code prompt:**
```
Phase 3. Read docs/spec.md Sections 6.2 and 6.3. Build:

1. `src/components/Accordion.astro` — island (client:visible). Props: items[], groupLabel. Per spec Section 4.8. aria-expanded, hidden panel, icon rotation via CSS.

2. `src/components/SchemaLD.astro` — per spec Section 4.11. Accepts type + data props, renders <script type="application/ld+json"> in head slot.

3. `src/pages/faq.astro` — per spec Section 6.2. 5 accordion groups including the new "Condo & Building Logistics" group. FAQPage schema via SchemaLD.astro. All anchor IDs per spec (#durability, #materials, #process-disruption, #condo, #cost). Breadcrumb. CTABand.

4. `src/pages/cabinet-refinishing-vs-replacement.astro` — per spec Section 6.3. Comparison table (brand-token CSS, not a bare HTML table), decision list, BeforeAfter placeholder, cost-comparison SVG bar chart (3 bars, brand colors, inline SVG). Breadcrumb. CTABand.

5. Update Header.astro — confirm "Why Refinish ▾" dropdown includes both new pages.

6. Update Footer.astro — confirm both new pages appear in Company links column.

Commit: "feat(phase-3): FAQ and vs-replacement pages with schema"
```

**Acceptance criteria:** Both pages build and render. FAQ accordions are keyboard-operable. Schema validates in Google Rich Results Test. Internal links between pages resolve. Footer + nav links work.

---

### Phase 4 — Trust pages: About + Guarantee + Financing
**Objective:** `/about/`, `/guarantee/`, `/financing/` live. Wisetack island implemented (or clearly marked as informational placeholder).

**Claude Code prompt:**
```
Phase 4. Read docs/spec.md Sections 6.4, 6.7, 6.8 and docs/facts.md. Build:

1. `src/pages/about.astro` — per spec Section 6.4. All copy from docs/facts.md only — do not invent dates, certifications, or narrative beyond what's specified. Person schema via SchemaLD.astro. Placeholder for founder photo (Cloudinary URL format: https://res.cloudinary.com/jerryandco/image/upload/f_auto,q_auto,w_800/v1/brand/founder.jpg).

2. `src/pages/guarantee.astro` — per spec Section 6.7. Guarantee term from docs/facts.md (placeholder "2-year" if not confirmed). Condo addendum section included. Service schema with warranty property.

3. `src/components/WisetackWidget.astro` — island (client:idle). If PUBLIC_WISETACK_MERCHANT_ID is set in env, render the Wisetack embed script. If not set, render an informational placeholder card ("Ask about financing when you request your estimate") with CTA to /#estimate.

4. `src/pages/financing.astro` — per spec Section 6.8. WisetackWidget island. Illustrative payment examples marked "illustrative." Mini-FAQ accordion (3 questions). CTABand with conditional CTA text based on Wisetack integration status.

Commit: "feat(phase-4): about, guarantee, financing trust pages"
```

**Acceptance criteria:** All three pages build. No invented facts (verify against facts.md). Wisetack shows informational placeholder if env var absent. Guarantee term pulls from facts.md.

---

### Phase 5 — Process + Gallery pages
**Objective:** `/our-process/` and `/gallery/` live with full content, Cloudinary image integration, and condo-specific copy.

**Claude Code prompt:**
```
Phase 5. Read docs/spec.md Sections 6.5, 6.6 and Section 4.5 (BeforeAfter) and Section 4.9 (GalleryGrid). Build:

1. `src/components/BeforeAfter.astro` — island (client:visible). Full implementation per spec Section 4.5. Props: beforeSrc, afterSrc, beforeAlt, afterAlt, caption. Touch + keyboard accessible. Range input aria-label.

2. `src/components/GalleryGrid.astro` — island (client:visible). Per spec Section 4.9. Dual filter (category + town). URL param pre-select on load. All 8 placeholder items use BeforeAfter with Cloudinary placeholder URLs. "Condo & multi-unit" filter category included.

3. `src/pages/our-process.astro` — per spec Section 6.5. 5 expanded steps with condo-specific logistics copy per each step. Mini-FAQ links after steps 2–4. HowTo schema via SchemaLD.astro. Breadcrumb. CTABand.

4. `src/pages/gallery.astro` — per spec Section 6.6. GalleryGrid island. Intro copy. ImageGallery schema. Breadcrumb. CTABand.

Commit: "feat(phase-5): process and gallery pages with Cloudinary integration"
```

**Acceptance criteria:** Gallery filters work. BeforeAfter sliders are touch/keyboard operable. GalleryGrid URL params pre-select correctly. All Cloudinary URLs follow the `f_auto,q_auto` pattern.

---

### Phase 6 — Differentiator pages: Quiz + Colors
**Objective:** `/cabinet-quiz/` and `/colors/` live. Quiz-to-form URL handoff works end-to-end.

**Claude Code prompt:**
```
Phase 6. Read docs/spec.md Sections 6.9, 6.10 and Section 4.10 (Quiz). Build:

1. `src/components/Quiz.astro` — island (client:load). Full 6-question state machine per spec Section 6.10 question table and scoring logic. Large tappable answer cards (not radio buttons). Progress indicator. 3 outcome screens per spec. Outcome A/B CTA builds URL: /#estimate?project=cabinet-refinishing&type={property-type}&timeline={timeline}. Outcome C CTA: /#estimate?project=full-bathroom-renovation. PostHog event: quiz_completed with outcome value.

2. `src/pages/cabinet-quiz.astro` — Quiz island. Page header: "Is cabinet refinishing right for your home?" Subheading: "Answer 6 quick questions — we'll tell you if refinishing makes sense and what to expect." No CTABand (quiz IS the conversion mechanism).

3. `src/pages/colors.astro` — per spec Section 6.9. 8 palette cards using Cloudinary placeholder swatch images (format: /v1/colors/{name}-swatch.jpg). Quiz CTA between palette grid and footer. CTABand.

4. Verify end-to-end: quiz completion → /#estimate URL → MultiStepForm pre-fills Step 1 card + Step 2 property type from URL params.

Commit: "feat(phase-6): quiz and colors pages, quiz-to-form handoff"
```

**Acceptance criteria:** Quiz advances through all 6 questions. All 3 outcomes render correctly. URL pre-fill populates form fields on homepage. PostHog quiz_completed event fires with correct outcome.

---

### Phase 7 — 8 Town pages via `getStaticPaths()`
**Objective:** All 8 town pages live with unique content, correct schema, and internal cross-links.

**Claude Code prompt:**
```
Phase 7. Read docs/spec.md Section 6.11 and data/towns.json. Build:

1. `src/pages/cabinet-refinishing-[town].astro` — dynamic route. getStaticPaths() reads all 8 entries from data/towns.json. Each page implements all 8 sections from spec Section 6.11. Housing-stock paragraph pulled from towns.json housing_stock_note field. Testimonial slot clearly marked as placeholder (visible HTML comment + placeholder text that reads as placeholder, never as a real review). Mini-FAQ pulls 2–3 anchor links from town's mini_faq_anchors array in towns.json. "Also serving nearby" row uses neighbors array.

2. Schema per town: LocalBusiness with areaServed: [{town}, MA], Service, BreadcrumbList — all via SchemaLD.astro.

3. Uniqueness check: after generation, compare the housing_stock_note paragraphs across all 8 pages and confirm no two are identical. Flag any that share >50% of their text.

4. Update Footer.astro Service Areas column with all 8 town page links (if not already present from Phase 1).

5. Update Header.astro Areas ▾ dropdown with all 8 links in 2-column grid layout.

Commit: "feat(phase-7): 8 town pages via getStaticPaths"
```

**Acceptance criteria:** All 8 town URLs build and render. Each has unique housing-stock paragraph. Schema validates per town. Neighbor links resolve. No placeholder testimonial text reads as a real quote.

---

### Phase 8 — SEO, analytics, email, QA, and production deploy
**Objective:** Full QA pass, all tracking wired, all meta complete, production deploy to `jerryandcohomeservices.com`. Tag `v1.0.0`.

**Claude Code prompt:**
```
Phase 8 — final QA, polish, and production deploy. Read docs/spec.md Sections 7, 8, 9, and 10.

1. Per-page meta: confirm every one of the 20 URLs has a unique <title> (≤60 chars), <meta description> (≤155 chars), canonical URL, and Open Graph tags per spec Section 7.1. Add Twitter card meta. Fix any missing or duplicate meta.

2. OG images: create a shared OG image template using Cloudinary (1200×630, brand colors, logo, tagline). Apply to all pages. Town pages get the town name in the OG image via Cloudinary text overlay transformation.

3. @astrojs/sitemap: confirm sitemap.xml generates all 20 URLs. Set priority values per spec Section 7.3.

4. PostHog: confirm all 7 custom events from spec Section 8.4 fire correctly. Verify in PostHog Live Events. Add to Base.astro head with defer attribute.

5. Resend: implement webhook receiver (Netlify serverless function at /api/notify) that triggers on Formspark submission. Send both email templates from spec Section 8.3 using Resend SDK. Test with a real form submission.

6. Accessibility audit: run axe-core against homepage, /faq/, and /cabinet-refinishing-somerville/. Fix all critical and serious issues. Confirm keyboard nav through accordion, form steps, and before/after slider.

7. Lighthouse audit: run on homepage and one town page. Target ≥90 Performance. Fix any issues (image sizing, render-blocking resources, CLS from unsized images).

8. Internal link audit: `grep -r 'href="/' dist/` — verify all internal links resolve to existing URLs. Fix any 404s.

9. Mobile review: test on 390px viewport (iPhone 15 size). Confirm sticky bottom CTA bar, touch slider, form tap targets ≥44px.

10. Git tag: `git tag v1.0.0 && git push origin v1.0.0`

11. Netlify production deploy: confirm custom domain is pointed. Set all env vars in Netlify dashboard (not just .env). Trigger production deploy from main branch. Confirm SSL, www redirect, and all 20 URLs return 200.

Commit: "feat(phase-8): QA, analytics, transactional email, production deploy v1.0.0"
```

**Acceptance criteria:** All 20 URLs return HTTP 200 in production. Lighthouse ≥90 on homepage. Zero axe-core critical issues. PostHog receives events from production. Resend sends both emails on test submission. `git tag v1.0.0` exists.

---

## 12. QA / acceptance checklist (run before tagging v1.0.0)

- [ ] All 20 URLs build and return 200 in production
- [ ] `pnpm build` produces zero errors and zero warnings
- [ ] `index.astro` reflects all 10 container changes from Section 6.1
- [ ] HeroCarousel auto-plays (carousel mode) or video loops (video mode)
- [ ] MultiStepForm advances through 4 steps, submits to Formspark, shows success state
- [ ] URL param pre-fill populates form from quiz handoff
- [ ] FAQ accordions are keyboard-operable; all 5 groups render
- [ ] FAQPage schema validates in Google Rich Results Test
- [ ] LocalBusiness schema on every page (validate 3 pages minimum)
- [ ] Town pages: all 8 have unique housing-stock paragraphs (no duplicates)
- [ ] Town pages: areaServed in schema matches page town name
- [ ] BeforeAfter sliders: mouse + touch + keyboard (range input)
- [ ] GalleryGrid: dual filter (category + town) works; URL params pre-select
- [ ] Quiz: all 6 questions, all 3 outcomes, CTA URLs correct
- [ ] Quiz → form handoff: URL params populate Step 1 + Step 2 correctly
- [ ] Sitemap.xml: all 20 URLs present with correct priorities
- [ ] robots.txt: sitemap reference correct
- [ ] PostHog: all 7 custom events fire in production
- [ ] Resend: lead confirmation + internal notification send on form submission
- [ ] Wisetack: renders correctly (or informational placeholder if not integrated)
- [ ] Lighthouse Performance ≥90 on homepage
- [ ] axe-core: zero critical/serious accessibility issues
- [ ] Mobile (390px): sticky CTA bar, 44px tap targets, touch slider
- [ ] All internal links resolve (zero 404s)
- [ ] Custom domain live with SSL
- [ ] `git tag v1.0.0` exists and pushed

---

## 13. Open decisions (resolve before or during Phase 1)

| Decision | Impact | Default if unresolved |
|---|---|---|
| Guarantee term length | `/guarantee/`, homepage trust chip | Use "2-year" placeholder — publish as placeholder, update copy post-launch |
| EPA RRP certification status/date | `/about/`, trust bar copy | Say "EPA RRP Lead-Safe Certified" (status, no date) until Jeremiah confirms |
| Wisetack integration status | `/financing/` CTA behavior | Launch as informational — WisetackWidget shows "ask about financing" placeholder |
| Hero media format (video vs. carousel) | `HeroCarousel.astro` mode | Default to carousel (`PUBLIC_HERO_MODE=carousel`) — switch to video when reel is ready |
| Real project photos | Gallery, town pages, BeforeAfter sliders | All Cloudinary URLs use `/v1/projects/placeholder-{n}.jpg` — swap post-launch |
| Founder photo | `/about/` | Cloudinary placeholder `/v1/brand/founder.jpg` — swap post-launch |
| Real testimonials | Town pages | All testimonial slots clearly marked as HTML comments — never read as real reviews |

