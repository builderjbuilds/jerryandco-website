# Jerry & Co. Home Improvement — Full Site Technical Specification & Claude Code Build Brief

**Purpose of this document:** This is the single source of truth for building out the full Jerry & Co. website — every page, shared component, interactive feature, and content requirement — plus a step-by-step plan for handing this work to Claude Code so it can be implemented and deployed with minimal back-and-forth.

This spec assumes the existing one-page landing (`index.html`) as the **design system source of truth** and the conversion hub. Everything below either extends that page or builds new pages that route back into it.

---

## 0. Reference materials Claude Code will need

Before starting, gather these into the project folder so Claude Code has everything in one place:

1. **`index.html`** — the existing landing page (design tokens, components, copy voice, before/after slider implementation).
2. **This specification document.**
3. **Logo assets** — the six logo/wordmark image files (house mark, horizontal lockup, stacked lockup) as actual image files (PNG/SVG), not just references.
4. **Business facts sheet** — MA HIC #208336, EIN, phone (978) 930-3412, social handle @improvewithjerryandco, founder name Jeremiah Ugbine, founding year 2019, service towns (primary 8 + secondary 4), EPA RRP certification status.
5. **Real project photos** (even 3–5 to start) for the gallery and town pages — placeholders are acceptable for v1 but should be flagged for replacement.
6. **The competitive gap-analysis report** (already produced) — for copy tone/positioning reference only, not to be reproduced.

---

## 1. Design system reference (do not redefine — extend)

All new pages must reuse these tokens exactly as defined in `index.html`'s `:root`:

| Token | Value | Usage |
|---|---|---|
| `--bone` | `#F7F3EA` | Page background |
| `--bone-deep` | `#EFE7D6` | Card/section alt background |
| `--ink` | `#14241F` | Header, hero, footer, dark bands |
| `--ink-soft` | `#1E332D` | Cards on dark backgrounds |
| `--forest` | `#1E3934` | Headings, primary text accents |
| `--gold` | `#C8A055` | Primary CTA, accents, badges |
| `--gold-deep` | `#8A6A33` | Text-safe gold (links, eyebrows) |
| `--text` / `--text-muted` | `#20281F` / `#6E6A5E` | Body copy |
| `--radius` / `--radius-sm` | `14px` / `8px` | Corner radii |

**Typography:** Fraunces (serif, headings) + Inter (sans, body/UI), loaded via the existing Google Fonts `@import`. Eyebrow labels are 12px Inter, uppercase, `letter-spacing: 0.18em`, `--gold-deep`.

**Logo mark:** the inline SVG house-mark (roofline + open rectangle body + gold square window) defined in the header/footer of `index.html`. Reuse this exact SVG path data on every page — do not regenerate it.

**New pages inherit:** header nav, footer, button styles (`.btn`, `.btn-gold`, `.btn-outline`, `.btn-outline-dark`), trust-bar styling, card styling (`.service-card`, `.tier-card` patterns), and the `.eyebrow` / `.section-head` conventions.

---

## 2. Full site map

```
/ (homepage — existing, modified per Section 4.1)
/cabinet-refinishing-vs-replacement/   — comparison/objection page
/faq/                                  — FAQ hub with schema
/about/                                — founder story
/our-process/                          — expanded process page
/gallery/                              — full before/after gallery
/guarantee/                            — workmanship guarantee
/financing/                            — Wisetack pay-over-time
/colors/                               — finish & color gallery
/cabinet-quiz/                         — "is refinishing right for me?" quiz
/cabinet-refinishing-medford/          — town page (×8, see template)
/cabinet-refinishing-malden/
/cabinet-refinishing-everett/
/cabinet-refinishing-arlington/
/cabinet-refinishing-somerville/
/cabinet-refinishing-cambridge/
/cabinet-refinishing-woburn/
/cabinet-refinishing-winchester/
/sitemap.xml
/robots.txt
```

**Global rule:** Every standalone page ends with the same closing CTA block used in the homepage's "Close" section (Good/Better/Best teaser + "Get my free video estimate" button linking to `/#estimate`). Every standalone page's nav highlights its parent category (Services / Why Refinish / Gallery / FAQ / About / Service Areas).

**Navigation update (header, all pages):**

```
Logo | Services ▾ | Why Refinish ▾ | Gallery | FAQ | About | Service Areas ▾ | [Get Free Estimate]
```

- **Services ▾** → Cabinet Refinishing (anchor or own page), Bathroom Refresh, Painting, Full Bathroom Reno
- **Why Refinish ▾** → vs. Replacement, Our Process, Guarantee, Financing
- **Service Areas ▾** → list of 8 town pages

---

## 3. Global / shared components

### 3.1 Header & footer
Extend existing header/footer with the dropdown nav above. Footer link columns expand to: **Site** (existing links + FAQ, About, Guarantee, Financing, Colors, Quiz), **Service Areas** (all 8 town links), **Contact** (unchanged). Add `LocalBusiness` JSON-LD to the footer on every page (see Section 6).

### 3.2 Breadcrumb component
New component for all standalone pages (not the homepage):
```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="/">Home</a> <span aria-hidden="true">/</span> <span>FAQ</span>
</nav>
```
Style: 13px Inter, `--text-muted`, positioned directly under header, `padding: 18px 0`.

### 3.3 CTA band (reusable)
A condensed version of the homepage's "Close" section, minus the tier cards — just eyebrow + one-line headline + gold CTA button to `/#estimate`. Used at the bottom of every standalone page.
```html
<section class="cta-band">
  <p class="eyebrow">Ready when you are</p>
  <h2>Get your free video estimate</h2>
  <a class="btn btn-gold" href="/#estimate">Start my estimate</a>
</section>
```

### 3.4 Before/after slider
Already built in `index.html`. Reuse the exact `.ba`, `.ba-layer`, `.ba-range`, `.ba-handle`, `.ba-grip` markup/CSS/JS as a portable include. Used on: homepage hero, `/gallery/`, `/cabinet-refinishing-vs-replacement/`, town pages.

### 3.5 Accordion component (new — for FAQ)
```html
<div class="accordion-item">
  <button class="accordion-trigger" aria-expanded="false" aria-controls="faq-1">
    How long does a 2K polyurethane finish last?
    <span class="accordion-icon"></span>
  </button>
  <div class="accordion-panel" id="faq-1" hidden>
    <p>...</p>
  </div>
</div>
```
- Single-open or multi-open both acceptable; default to multi-open (simpler, more scannable).
- Icon rotates 180° on expand via `aria-expanded` state.
- Each `.accordion-item` sits inside a `.accordion-group` with a cluster heading (Durability & Warranty / Materials / Process / Cost & Financing).

### 3.6 Progress-bar multi-step form
Replaces the current single-block `#estimateForm`. New structure:
```html
<div class="form-progress" role="progressbar" aria-valuemin="1" aria-valuemax="4" aria-valuenow="1">
  <span class="step active" data-step="1">1. Project</span>
  <span class="step" data-step="2">2. Details</span>
  <span class="step" data-step="3">3. Photos & notes</span>
  <span class="step" data-step="4">4. You</span>
</div>
<form id="estimateForm">
  <fieldset class="form-step" data-step="1">...project type, single-click cards...</fieldset>
  <fieldset class="form-step" data-step="2" hidden>...town, timeline, size, color...</fieldset>
  <fieldset class="form-step" data-step="3" hidden>...notes, optional photo upload note...</fieldset>
  <fieldset class="form-step" data-step="4" hidden>...name, phone, email...</fieldset>
  <div class="form-nav">
    <button type="button" class="btn btn-outline-dark" data-action="back">Back</button>
    <button type="button" class="btn btn-gold" data-action="next">Continue</button>
    <button type="submit" class="btn btn-gold" data-action="submit" hidden>Request my free estimate</button>
  </div>
</form>
```
**Step 1 (project type)** uses large tappable cards (icon + label) instead of a `<select>` — "Cabinet Refinishing" pre-selected/highlighted as the default/featured option, matching the summer focus. **Step 4 (contact info)** is deliberately last per the conversion-research rationale in the gap analysis. JS validates each step's required fields before allowing `Continue`. On final submit, reuse the existing success-state swap (`#formSuccess`).

### 3.7 Quiz engine (for `/cabinet-quiz/`)
A small state machine: array of question objects → each answer maps to a weighted outcome bucket → final screen renders one of three outcomes (Refinish / Refresh+Refinish / Replacement referral) with a tailored CTA. See Section 4.10 for full question set and scoring.

### 3.8 Filter/gallery grid
Already built (`.filter-row`, `.gallery-grid`, `.gallery-item`, `data-cat`). On `/gallery/`, extend `data-cat` taxonomy to include town tags (`data-town="medford"`) so the gallery can optionally be filtered or deep-linked by town (`/gallery/?town=medford`) for use from town pages.

---

## 4. Page-by-page specifications

### 4.1 Homepage (`/`) — modifications to existing `index.html`

| Container | Change |
|---|---|
| 1. Hero | Add sub-headline: *"Factory-grade 2K polyurethane finish — won't chip or peel like brushed-on paint. Most kitchens done in 2–5 days, not weeks."* Link "won't chip or peel" → `/guarantee/`. |
| 2. Trust bar | Add 4th item: "Workmanship Guarantee" badge → `/guarantee/`. Make "EPA RRP Lead-Safe" link → `/faq/#lead-safe`. |
| 3. Services grid | Add line under featured card: *"Factory finish for a fraction of replacement cost — typically 50–75% less than new cabinets."* Each card's implicit "learn more" → corresponding service anchor or page. |
| 4. Process | Add reassurance line on spray step: *"On-site, low-VOC, low-odor process with contained dust — safe to stay home with kids and pets."* Add "See our full process →" → `/our-process/`. |
| 5. Gallery | Add "View full gallery →" link → `/gallery/`. Add durability caption to one item: *"2K polyurethane finish — 18 months later, no chips."* |
| 6. Service area chips | Convert each chip to `<a href="/cabinet-refinishing-{town}/">`. Add line: *"Locally owned and operated — serving the ICC zone for 7 years."* |
| 7. Lead form | Replace with multi-step form (Section 3.6). |
| 8. Tiers | Add lines: vs-replacement link, financing link, guarantee mention (see Section 3.3 pattern, inline). |
| 9. Footer | Expand nav per Section 2/3.1. |

No new sections are added to the homepage — it stays the conversion hub, length-neutral.

---

### 4.2 `/cabinet-refinishing-vs-replacement/`

**SEO target:** "cabinet refinishing vs replacement", "is cabinet refinishing worth it", "refinish or replace kitchen cabinets"

**Sections:**
1. **Header band** (ink bg): Eyebrow "Why refinish" / H1 "Refinish, replace, or repaint? Here's the honest answer." / one-paragraph framing.
2. **Three-way comparison table** (component: `.compare-table`):

| | Full Replacement | Cheap Repaint | Jerry & Co. Refinishing |
|---|---|---|---|
| Cost | $20,000–$50,000+ | $1,000–$2,500 | $1,800–$9,500 |
| Timeline | 4–8+ weeks | 1–2 days | 2–5 days |
| Finish durability | New, varies by brand | Brushed latex — chips/peels | Factory-grade 2K polyurethane |
| Keeps your layout | No | Yes | Yes |
| Box material | New (often lower-grade) | Existing | Existing (often solid wood) |

3. **Decision table** ("Refinish if… / Replace if…") — two-column list format, e.g. "Refinish if: boxes are structurally sound, you like your layout, you want a fast factory finish at 50–75% less than new cabinets" / "Replace if: boxes are water-damaged or you're changing your kitchen's footprint."
4. **Before/after slider** (reuse component) with caption referencing real project.
5. **Cost-comparison visual** — simple horizontal bar chart (3 bars: Replacement / Refinishing / Cheap Paint) showing relative cost — build as inline SVG or lightweight chart, styled with brand tokens.
6. **CTA band** (Section 3.3).

**Internal links in:** homepage Container 3 & 8, FAQ ("Is it cheaper than replacement?"), guarantee page.

---

### 4.3 `/faq/`

**SEO target:** long-tail question queries; voice/AI-overview eligibility (not SERP rich snippets — see gap analysis caveat).

**Structure:** Page header → 4 `.accordion-group` clusters → CTA band. Include `FAQPage` JSON-LD (Section 6.2).

**Cluster 1 — Durability & Warranty**
- How long does a 2K polyurethane finish last? *(Answer: factory-grade durability comparable to manufacturer finishes; reference Guarantee page)*
- Will it chip or peel? *(No — link to /guarantee/)*
- What's your warranty? *(Summarize written workmanship guarantee + touch-up policy; link /guarantee/)*
- What happens if I scratch or chip it later? *(Touch-up bottle + return visit policy)*

**Cluster 2 — Materials & Compatibility**
- Can you refinish laminate, melamine, or thermofoil cabinets, or only wood?
- What if my cabinets have water damage or peeling laminate?
- Will the wood grain still show through, or is it a solid color?
- Can I change the color completely (e.g., oak to deep green)?

**Cluster 3 — Process & Disruption**
- Is it messy? Do you sand on-site?
- What are the fumes/VOCs like — can I stay home with kids and pets?
- How long am I without a usable kitchen?
- Do you remove doors to a shop, or work on-site?

**Cluster 4 — Cost, Timeline & Financing**
- How much does cabinet refinishing cost?
- Is it really cheaper than replacement? *(link → /cabinet-refinishing-vs-replacement/)*
- Do you offer financing or payment plans? *(link → /financing/)*
- Do you serve my town? *(link → service area page list)*

**Anchor IDs:** each question gets an `id` (e.g., `#lead-safe`, `#2k-durability`) so homepage/other pages can deep-link.

---

### 4.4 `/about/`

**SEO target:** "Jerry & Co Home Improvement", "Medford cabinet refinishing owner", brand searches.

**Sections:**
1. **Founder portrait + intro** (image left, text right on desktop): Jeremiah Ugbine, founder & lead contractor, MA HIC #208336, EPA RRP Lead-Safe certified, 7 years serving Greater Boston.
2. **"Why I do this" narrative** — short first-person-style copy on craft pride, factory-grade standards, origin story (from Bronx, NY → built Jerry & Co. in Greater Boston).
3. **"You get the owner" explainer** — explicit franchise contrast: *"When you hire Jerry & Co., the person who gives you the estimate is the person who does the work — every time. No subcontractors, no rotating crews, no franchise call center."*
4. **Credential strip** — HIC #208336, EPA RRP cert, insured, est. 2019 (reuse trust-bar styling).
5. **Timeline/milestones** (optional, simple) — founding 2019, key project types completed, rebrand to premium-finish specialist 2026.
6. **CTA band.**

---

### 4.5 `/our-process/`

**SEO target:** "how cabinet refinishing works", "2K polyurethane cabinet finish process"

Expand the homepage's 5 steps into a fuller walkthrough — same 5 numbered steps as anchors, but each gets 2–3 paragraphs plus a supporting visual (icon or photo placeholder):

1. **Video walkthrough** — what to expect on the call, what gets measured, how the estimate is delivered same-day.
2. **Prep & containment** — masking, dust containment, what happens to door hardware.
3. **Hand sand & repair** — leveling dents/chips, why this step matters for the final finish.
4. **2K polyurethane spray application** — explain "2-component polyurethane," reference that it's the same chemistry class used to meet Kitchen Cabinet Manufacturers' Association durability standards (do not claim certification — phrase as "the same class of finish that meets industry durability standards").
5. **Cure, reinstall, final walkthrough** — cure time expectations, hardware reinstallation, walkthrough/sign-off.

Include a "Frequently asked at this stage" mini-FAQ under steps 2–4 linking to relevant `/faq/#anchor` items (disruption, fumes, timeline).

---

### 4.6 `/gallery/`

**SEO target:** "cabinet refinishing before and after [town]"

- Full filter bar (reuse Section 3.8), filters: All / Cabinet Refinishing / Bathroom / Painting / Kitchen, **plus** a secondary town filter (dropdown or chip row) once real photos with town tags exist.
- Grid of before/after slider components (not static images) — each gallery item is a mini version of the homepage's `.ba` slider where real photos exist; placeholder cards (current style) where they don't.
- Each item captioned with town + project type + one durability/timeframe note where available (e.g., "Arlington, MA — 14 months later, no chips").
- CTA band.

---

### 4.7 `/guarantee/`

**SEO target:** "cabinet refinishing warranty", brand trust queries.

**Sections:**
1. **Header** — "The Jerry & Co. Workmanship Guarantee" (named guarantee, not generic "warranty").
2. **Plain-language guarantee terms** — e.g., a multi-year guarantee against peeling, adhesion failure, or finish defects attributable to workmanship (exact term length to be set by Jeremiah — placeholder: "2-year workmanship guarantee").
3. **Touch-up program** — every cabinet refinishing client receives a labeled touch-up bottle matched to their finish, plus one complimentary in-person touch-up visit within the guarantee period.
4. **"Why local accountability beats a national warranty"** — short explainer (per gap analysis: even franchise warranties are "honored by each individual franchise" — local accountability from an owner who answers his own phone is the real value).
5. **What's not covered** — normal wear, water damage from leaks, owner-caused damage (standard exclusions, written plainly).
6. **CTA band.**

---

### 4.8 `/financing/`

**SEO target:** "cabinet refinishing financing", "pay over time home improvement"

**Sections:**
1. **Header** — "Pay over time, not all at once."
2. **How it works** — 3-step explainer for Wisetack-style flow: (1) Get your written estimate, (2) Apply in minutes — soft credit check, no impact to your score, (3) Choose your monthly plan and we get started.
3. **Plan overview** — present as approximate monthly-payment examples for the existing price bands (e.g., a $4,000 cabinet refinish ≈ $X/mo over 12 months) — mark all figures "illustrative — final terms shown at application," since actual Wisetack terms depend on credit and term length.
4. **FAQ mini-block** — "Does this affect my credit?" / "Is there a fee?" (plain-language: a small transaction fee is built into the offer, not charged to the homeowner directly — verify exact disclosure language with Wisetack's merchant terms before publishing).
5. **CTA band** — button text: "Check my rate" → routes to financing application link/widget once integrated; until then, routes to `/#estimate` with a note "ask about financing."

---

### 4.9 `/colors/`

**SEO target:** "cabinet refinishing colors", "kitchen cabinet color ideas"

**Sections:**
1. **Header** — "Explore finishes" — framed as inspiration, not a binding visualizer.
2. **Curated palette grid** — 6–8 palette cards, each showing a swatch + name + 1-line mood description, in brand-appropriate tones (deep forest green, warm white/bone, charcoal/ink, navy, sage, warm taupe, matte black, soft gold-adjacent neutrals). Each card links to gallery items in that color where available.
3. **"Which finish fits your kitchen?" prompt** — short CTA into `/cabinet-quiz/`.
4. **Optional (Stage 3):** embed a third-party visualizer widget if budget allows — spec as a clearly separated, lazy-loaded `<iframe>` or widget container so it doesn't block page load.
5. **CTA band.**

---

### 4.10 `/cabinet-quiz/`

**SEO target:** low — this page is a conversion/differentiation tool, not primarily an SEO page.

**Question set (4–6 questions, single-select, large tappable cards):**

1. *What's the current condition of your cabinet boxes?* → Options: "Solid, just dated" (refinish-positive) / "Some wear, a few issues" (refinish-positive, flag for repair add-on) / "Water damage or falling apart" (replacement-leaning)
2. *What material are your cabinets?* → "Solid wood / wood veneer" (refinish-positive) / "Laminate / thermofoil / melamine" (refinish-possible, route to FAQ note) / "Not sure" (neutral)
3. *Are you happy with your current layout?* → "Yes, just want a new look" (refinish-positive) / "Mostly, minor changes only" (refresh-positive) / "No, I want to reconfigure" (replacement-leaning)
4. *What's your color goal?* → "Same color, fresh finish" / "Totally different color" / "Not sure yet — show me options" (routes to `/colors/`)
5. *What's your rough budget?* → "$1,800–$5,000" / "$5,000–$9,500" / "$9,500+" (maps loosely to Good/Better/Best)
6. *When would you like to start?* → "ASAP" / "Within 30 days" / "1–3 months" / "Just exploring"

**Scoring/outcome logic:**
- Tally refinish-positive vs. replacement-leaning answers.
- **3+ refinish-positive, no replacement-leaning** → Outcome A: "Cabinet refinishing is a great fit." → CTA into multi-step form (Step 1 pre-set to "Cabinet Refinishing", town/timeline/budget pre-filled from Q5/Q6).
- **Mixed (1–2 replacement-leaning)** → Outcome B: "Refinishing plus a few updates could work well." → suggests refresh/refinish bundle, same CTA pre-fill.
- **2+ replacement-leaning (esp. Q1="falling apart")** → Outcome C: "You may be better served by a fuller renovation — let's talk about it." → CTA still routes to the same form (Step 1 = "Full Bathroom Renovation" / "Something else" as appropriate), framed honestly rather than as a hard "no."

**Implementation note:** simple JS object array; no backend required. Store answers in a JS object, pass relevant fields into the homepage form via URL query params (`/#estimate?project=cabinet-refinishing&town=...`) and have the form's JS pre-populate fields from `URLSearchParams` on load.

---

### 4.11 Town page template — `/cabinet-refinishing-{town}/` (×8)

**SEO target:** "cabinet refinishing {town} MA"

**Required per-town variables:** `{town}`, `{town_slug}`, 1–2 local project photos (or before/after slider), 1 local testimonial (real, town-attributed — placeholder until available), 1–2 sentences of genuinely local content (neighborhood names, housing-stock notes — e.g., for pre-1978 towns, a line about EPA RRP relevance given older cabinetry/woodwork).

**Sections:**
1. **Header band** — "Cabinet Refinishing in {town}, MA" + one-sentence local positioning.
2. **Before/after slider** — local project if available, otherwise the homepage's default with a note.
3. **Why {town} homeowners choose refinishing** — 2–3 sentences referencing local housing stock (e.g., "{town}'s mix of pre-1978 colonials and condo conversions means many kitchens still have solid-wood cabinet boxes worth preserving").
4. **Local testimonial** (placeholder structure ready for real quotes — note: do not fabricate quotes; placeholder text must read as a placeholder, not a real review).
5. **Services recap** — condensed version of homepage services grid (4 cards), each linking back to homepage anchors or relevant standalone pages.
6. **Mini-FAQ** — 2–3 questions pulled from `/faq/` most relevant to that town (e.g., older housing stock → lead-safe question).
7. **CTA band**, plus a "Also serving nearby: {2–3 neighboring towns, linked}" line for internal linking.

**Anti-doorway-page requirement (per gap analysis):** each town page must have ≥80–100% unique content — do not template paragraph 3 verbatim across all 8 towns; vary the housing-stock/neighborhood framing per town using real characteristics (e.g., Cambridge/Somerville → triple-deckers and condo conversions; Winchester/Arlington → larger single-family colonials; Everett/Malden → mixed 2–6 unit multi-family).

**Schema:** `LocalBusiness` + `Service` + `areaServed` (Section 6.3).

---

## 5. SEO & schema requirements

### 5.1 Per-page metadata
Every page needs a unique `<title>` (≤60 chars), `<meta name="description">` (≤155 chars), canonical URL, and Open Graph tags (`og:title`, `og:description`, `og:image` using a brand image, `og:url`).

### 5.2 FAQPage schema (for `/faq/`)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does a 2K polyurethane finish last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```
Note: per the gap analysis, this will not produce SERP rich-result snippets as of mid-2026 — implement for content/AI-overview value, not snippet eligibility.

### 5.3 LocalBusiness + Service + ServiceArea schema (footer, all pages; expanded on town pages)
```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Jerry & Co. Home Improvement LLC",
  "telephone": "+1-978-930-3412",
  "url": "https://www.jerryandcohomeservices.com",
  "areaServed": ["Medford, MA", "Malden, MA", "Everett, MA", "Arlington, MA", "Somerville, MA", "Cambridge, MA", "Woburn, MA", "Winchester, MA"],
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Cabinet Refinishing",
      "areaServed": "{town}, MA"
    }
  }
}
```
On town pages, narrow `areaServed` to that town plus its immediate neighbors.

### 5.4 `sitemap.xml` & `robots.txt`
Generate `sitemap.xml` listing all URLs in Section 2 with `lastmod` dates; `robots.txt` allows all, references sitemap location.

---

## 6. Technical stack & file structure recommendation

Two viable approaches — pick one before briefing Claude Code:

**Option A — Plain HTML/CSS/JS (matches current build), with a small templating step**
- Extract shared CSS into `/assets/css/tokens.css` (design tokens + shared component styles) and `/assets/css/components.css`.
- Extract shared JS (slider, accordion, form, quiz, gallery filter) into `/assets/js/*.js` modules.
- Each page is its own `.html` file; town pages are 8 near-duplicate files generated from one template using a small Node/Python script that injects per-town variables from a `towns.json` data file. This keeps hosting simple (any static host) while avoiding hand-duplication errors.

**Option B — Static site generator (Astro or 11ty)**
- Better for the 8 town pages (one template + a data collection) and for maintaining the shared design system as components/partials.
- Slightly more setup overhead; worth it if more city pages or blog content are planned later.

**Recommendation:** Option A is sufficient given the current scope (12 pages total) and keeps the existing `index.html` directly reusable. Revisit Option B if the page count grows significantly (e.g., expanding beyond 8 towns or adding a blog).

Proposed file structure (Option A):
```
/index.html
/cabinet-refinishing-vs-replacement/index.html
/faq/index.html
/about/index.html
/our-process/index.html
/gallery/index.html
/guarantee/index.html
/financing/index.html
/colors/index.html
/cabinet-quiz/index.html
/cabinet-refinishing-medford/index.html  (×8, generated)
/assets/css/tokens.css
/assets/css/components.css
/assets/js/slider.js
/assets/js/accordion.js
/assets/js/form.js
/assets/js/quiz.js
/assets/js/gallery.js
/assets/img/...
/data/towns.json
/sitemap.xml
/robots.txt
```

---

## 7. Shipping this to Claude Code

### 7.1 Supplementary information checklist (gather before starting)
- [ ] `index.html` (current build) placed in the project repo
- [ ] This specification document placed in the project repo (e.g., `/docs/spec.md`)
- [ ] Logo image files (all 6 variants) in `/assets/img/brand/`
- [ ] Business facts sheet (Section 0, item 4) — can be a short `facts.md`
- [ ] Real project photos if available, with town/category labels; otherwise explicitly confirm "use placeholders for now"
- [ ] Decision on Option A vs. B (Section 6)
- [ ] Decision on exact guarantee terms (length of workmanship guarantee) — needed for `/guarantee/` and homepage badge
- [ ] Confirmation on Wisetack (or alternative financing) integration status — affects `/financing/` CTA behavior
- [ ] Hosting target (Netlify, Vercel, GitHub Pages, etc.) — affects deployment instructions

### 7.2 Recommended prompting structure — phased, not all-at-once

Claude Code performs best with **scoped, sequential prompts** rather than one mega-prompt for 12 pages. Suggested phases:

**Phase 1 — Refactor foundation (do this first, always)**
> "Using `index.html` as the design system reference, extract the shared design tokens, component CSS, and reusable JS (before/after slider, gallery filter, form handler) into `/assets/css/` and `/assets/js/` files. Refactor `index.html` to use these shared files via `<link>`/`<script>` instead of inline `<style>`/`<script>`, with zero visual changes. Then implement the homepage modifications described in Section 4.1 of `/docs/spec.md`, including the new multi-step lead form described in Section 3.6."

**Phase 2 — Highest-priority standalone pages**
> "Build `/faq/index.html` and `/cabinet-refinishing-vs-replacement/index.html` per Sections 4.3 and 4.2 of `/docs/spec.md`, using the shared assets from Phase 1. Include the FAQPage and LocalBusiness JSON-LD from Section 6. Add the new header/footer navigation from Section 2/3.1 across both new pages AND update `index.html`'s nav to match."

**Phase 3 — Trust pages**
> "Build `/about/index.html`, `/guarantee/index.html`, and `/financing/index.html` per Sections 4.4, 4.7, 4.8. Use the business facts in `/docs/facts.md` for all factual claims — do not invent credentials, dates, or warranty terms beyond what's specified."

**Phase 4 — Process & gallery**
> "Build `/our-process/index.html` and `/gallery/index.html` per Sections 4.5 and 4.6, reusing the before/after slider and gallery filter components from `/assets/js/`."

**Phase 5 — Differentiators**
> "Build `/cabinet-quiz/index.html` and `/colors/index.html` per Sections 4.9 and 4.10, including the quiz scoring logic and the URL-param pre-fill integration with the homepage's multi-step form."

**Phase 6 — Town pages**
> "Create `/data/towns.json` with entries for all 8 towns listed in Section 2, including the per-town variables described in Section 4.11 (using placeholder local content I'll review/edit per town). Build a generator script that produces `/cabinet-refinishing-{town}/index.html` for each entry from a single template, per Section 4.11. Run it to generate all 8 pages."

**Phase 7 — SEO, sitemap, QA**
> "Generate `/sitemap.xml` and `/robots.txt` per Section 5.4. Add per-page `<title>`/`<meta description>`/Open Graph tags per Section 5.1 to every page. Then run an accessibility and link-check pass across the whole site — fix any broken internal links, missing alt text, or color-contrast issues against the tokens in Section 1."

**Phase 8 — Deploy**
> "Prepare this static site for deployment to [Netlify/Vercel/GitHub Pages — specify]. Confirm build/output settings and provide the deployment steps."

### 7.3 Why phased prompts (not one giant prompt)
- Each phase produces a **reviewable, working increment** — you can check copy accuracy and design fidelity before compounding changes.
- Claude Code can run linting/link-checks between phases.
- If a fact (guarantee term, financing status) changes mid-build, only the relevant phase needs rework.

### 7.4 Standing instructions to include in every Claude Code session
Add these as persistent context (e.g., in a `CLAUDE.md` project file) so every phase respects them automatically:
- "Reuse design tokens and components from `/assets/css/tokens.css` — never introduce new colors, fonts, or spacing values."
- "All factual claims (license numbers, certifications, warranty terms, pricing) must come from `/docs/facts.md` or `/docs/spec.md` — do not invent or estimate."
- "Every standalone page must include the shared header, footer, breadcrumb, and CTA band components."
- "Town pages must have unique local content per Section 4.11 — flag any page where content is templated verbatim."
- "Maintain WCAG AA contrast and keyboard accessibility for all interactive components (accordion, multi-step form, quiz, slider)."

---

## 8. QA / acceptance checklist (run before publishing)

- [ ] All 12 pages load with shared header/footer/nav consistent across the site
- [ ] Multi-step form completes and shows success state; URL-param pre-fill from quiz works
- [ ] FAQ accordion is keyboard-operable; FAQPage schema validates (Google Rich Results Test, for content parsing even without snippet display)
- [ ] LocalBusiness schema validates on every page; town pages have correct `areaServed`
- [ ] Before/after sliders work via mouse, touch, and keyboard (range input)
- [ ] All 8 town pages pass a uniqueness check (no near-duplicate paragraphs)
- [ ] sitemap.xml lists all 12 URLs with correct paths; robots.txt references it
- [ ] All internal links resolve (no 404s) — especially the cross-links between FAQ ↔ vs-replacement ↔ guarantee ↔ financing
- [ ] Lighthouse/accessibility pass on homepage and at least one standalone + one town page
- [ ] No factual claims beyond what's in `/docs/facts.md` (license #, warranty terms, certifications, pricing ranges)

---

## Notes & open decisions for Jeremiah
- **Guarantee term length** (Section 4.7) is a placeholder ("2-year") — confirm before publishing.
- **Financing**: confirm whether Wisetack (or another provider) will actually be integrated before launch, or whether `/financing/` should launch as an informational page only with CTA routing to the estimate form.
- **Real photos**: every page above is designed to function with placeholders, but the before/after sliders and town-page local content are the highest-priority items to replace with real assets post-launch.
