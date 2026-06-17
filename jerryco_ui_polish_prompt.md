# Jerry & Co. — UI Polish Prompt for Claude Code
# Targeted editorial upgrade. Zero content changes. Zero token changes. Zero page architecture changes.

---

## PRIME DIRECTIVE

You are applying a targeted visual polish pass to an existing, working Astro 4 site. 

**NEVER change:**
- Any CSS custom property values in `src/styles/tokens.css`
- Any copy, headings, labels, or body text anywhere
- Any URL, href, or page architecture
- The `HeroCarousel.astro` component (leave completely untouched)
- The `MultiStepForm.astro` component (leave completely untouched)
- The `Header.astro` component (leave completely untouched)
- The `TrustBar.astro` component (leave completely untouched)
- Any structured data / JSON-LD
- The `Base.astro` or `Page.astro` layouts

**ONLY change:** CSS — in `src/styles/components.css`, `src/styles/global.css`, and `<style>` blocks inside `src/pages/index.astro` and `src/components/Footer.astro`.

The design target is the level of polish you see from premium NY agencies: editorial whitespace, intentional typographic hierarchy, zero decorative clutter, precise micro-interactions, and a component language that feels hand-crafted rather than templated. Every change below is documented to the property level. Do not infer or improvise — apply exactly what is written.

Read each file before editing it:
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/components.css`
- `src/pages/index.astro`
- `src/components/Footer.astro`
- `src/components/CTABand.astro`

---

## CHANGE SET 1 — `src/styles/global.css`

### 1.1 Body base refinement
Find the existing `body` rule. Add these properties inside it (do not replace existing ones):
```css
body {
  /* ADD these — keep existing properties */
  font-size: 16px;          /* tighten from 17px — 17px reads slightly bloated at this line-height */
  line-height: 1.72;
  letter-spacing: 0.008em;  /* micro optical tracking — invisible but improves DM Sans readability */
}
```

### 1.2 Heading refinement — tighter, more editorial
Replace the entire heading block (h1, h2, h3, h4 and their individual rules) with:
```css
h1, h2, h3, h4 {
  font-family: var(--font-serif);
  font-weight: 500;             /* drop from 600 — Fraunces 500 reads more elegant, less loud */
  line-height: 1.08;
  margin: 0;
  color: var(--forest);
  letter-spacing: -0.03em;      /* tighten from -0.025em — hallmark of premium editorial type */
}

h1 {
  font-size: clamp(2.75rem, 6vw, 5.25rem);  /* slightly smaller ceiling — 5.75rem was oversized */
  line-height: 1.04;
  letter-spacing: -0.035em;
}

h2 {
  font-size: clamp(2rem, 3.5vw, 3.25rem);   /* tighten ceiling from 3.75rem */
  line-height: 1.1;
  letter-spacing: -0.03em;
}

h3 {
  font-size: clamp(1.125rem, 1.8vw, 1.5rem);
  letter-spacing: -0.02em;
  line-height: 1.25;
}

h4 {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.4;
}
```

### 1.3 Eyebrow refinement
Replace the existing `.eyebrow` rule with:
```css
.eyebrow {
  display: block;
  font-family: var(--font-sans);
  font-size: 10px;              /* from 11px — tighter reads more refined */
  font-weight: 600;
  letter-spacing: 0.22em;       /* from 0.2em — more editorial stretch */
  text-transform: uppercase;
  color: var(--gold-deep);
  margin: 0 0 18px;             /* from var(--sp-2) — explicit for clarity */
}
```

### 1.4 Lede refinement
Replace `.lede` with:
```css
.lede {
  font-size: clamp(1rem, 1.4vw, 1.1875rem);  /* from 1.25rem max — less competing with h2 */
  line-height: 1.7;
  color: var(--text-muted);
  max-width: 50ch;               /* tighter measure — from 52ch */
  font-weight: 400;
}
```

### 1.5 Section rhythm
Replace the `section` rule with:
```css
section {
  padding: clamp(72px, 8vw, 120px) 0;  /* from var(--section-pad) — more generous breathing room */
}
```

Replace `.section-head` with:
```css
.section-head {
  max-width: 680px;              /* from 760px — tighter column reads more intentional */
  margin: 0 auto clamp(56px, 7vw, 96px);  /* from var(--sp-7) — fluid bottom margin */
  text-align: center;
}
.section-head .eyebrow { margin-bottom: 16px; }
.section-head h2       { margin-bottom: 20px; }
.section-head p {
  color: var(--text-muted);
  font-size: 1.0625rem;
  line-height: 1.75;
  max-width: 46ch;
  margin: 0 auto;
}

.section-head.left {
  max-width: none;
  margin: 0 0 clamp(40px, 5vw, 72px);
  text-align: left;
}
.section-head.left p {
  margin: 16px 0 0;
  max-width: 52ch;
}
```

### 1.6 Container refinement
Replace `.wrap` with:
```css
.wrap {
  max-width: 1320px;    /* from 1440px — tighter content column, more premium feel */
  margin: 0 auto;
  padding: 0 var(--gutter);
}
```

### 1.7 Scrollbar — remove entirely (too distracting on premium sites)
Add at the bottom of `global.css`:
```css
/* Premium sites hide scrollbars on Webkit — content still scrolls */
::-webkit-scrollbar { width: 0; background: transparent; }
* { scrollbar-width: none; }
```

### 1.8 Selection color — brand-consistent
Add at the bottom of `global.css`:
```css
::selection {
  background: rgba(200, 160, 85, 0.22);
  color: var(--forest);
}
```

---

## CHANGE SET 2 — `src/styles/components.css`

Work section by section. Replace each CSS block exactly as written.

### 2.1 BUTTONS — From pill to refined rectangular

The current `.btn` uses `border-radius: 999px` (pill). Premium editorial sites use sharp or low-radius buttons. Replace the entire BUTTONS section:

```css
/* ═══════════════════════════════════════════════════
   BUTTONS
═══════════════════════════════════════════════════ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.06em;      /* wider tracking on sharp buttons — more intentional */
  text-transform: uppercase;   /* uppercase on sharp buttons reads more authoritative */
  padding: 14px 28px;          /* from 15px 32px — slightly trimmer */
  border-radius: 3px;          /* from 999px — this is the key editorial shift */
  border: 1.5px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

/* Subtle inner shimmer on hover — the DD.NYC / Ruckus signature */
.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.btn:hover::after { opacity: 1; }

.btn-gold {
  background: var(--gold);
  color: var(--ink);
  border-color: var(--gold);
  box-shadow: 0 1px 0 rgba(20,36,31,0.1), inset 0 1px 0 rgba(255,255,255,0.12);
}
.btn-gold:hover {
  background: var(--gold-deep);
  border-color: var(--gold-deep);
  box-shadow: 0 4px 16px rgba(200,160,85,0.28);
}

.btn-outline {
  background: transparent;
  color: var(--bone);
  border-color: rgba(247, 243, 234, 0.32);
}
.btn-outline:hover {
  border-color: rgba(247, 243, 234, 0.7);
  background: rgba(247, 243, 234, 0.06);
}

.btn-outline-dark {
  background: transparent;
  color: var(--forest);
  border-color: rgba(30, 57, 52, 0.22);
}
.btn-outline-dark:hover {
  border-color: var(--forest);
  background: rgba(30, 57, 52, 0.04);
}

.btn-block { width: 100%; justify-content: center; }

/* Sm variant — used in nav */
.btn-sm {
  font-size: 11px;
  padding: 10px 20px;
  letter-spacing: 0.07em;
}
```

### 2.2 TRUST BAR — keep structure, refine spacing and separator
Replace the entire TRUST BAR section:

```css
/* ═══════════════════════════════════════════════════
   TRUST BAR
═══════════════════════════════════════════════════ */
.trust {
  background: var(--bone-deep);
  border-bottom: 1px solid var(--line);
  position: relative;
}
/* Subtle top accent line — agency touch */
.trust::before {
  content: '';
  position: absolute;
  top: 0;
  left: var(--gutter);
  right: var(--gutter);
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.4;
}
.trust-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0;             /* from 28px — more compact, more professional */
  flex-wrap: wrap;
  gap: 20px 32px;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 11.5px;           /* from 13px — more refined small label feel */
  font-weight: 500;
  color: var(--forest);
  letter-spacing: 0.03em;
  white-space: nowrap;
}
.trust-item svg {
  width: 15px;
  height: 15px;
  color: var(--gold-deep);
  flex-shrink: 0;
}
.trust-item a {
  text-decoration: none;
  color: inherit;
  transition: color 0.15s;
}
.trust-item a:hover { color: var(--gold-deep); }

/* Hairline separators between items on desktop */
.trust-row .trust-sep {
  width: 1px;
  height: 14px;
  background: var(--line);
  flex-shrink: 0;
}
```

Note: In `TrustBar.astro`, you do NOT need to add `.trust-sep` divs — the existing layout uses `justify-content: space-between` which handles visual separation adequately. This rule is available if you choose to enhance later.

### 2.3 CHIPS — refinement only (keep pill shape, adjust sizing)

Replace the CHIPS section:
```css
/* ═══════════════════════════════════════════════════
   CHIPS
═══════════════════════════════════════════════════ */
.chip {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 8px 18px;
  border-radius: 3px;          /* from 999px — match button shape language */
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.chip-primary {
  background: var(--forest);
  color: var(--bone);
}
.chip-primary:hover {
  background: var(--ink);
}
.chip-secondary {
  border: 1px solid var(--line);
  color: var(--text-muted);
  background: transparent;
}
.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}
```

### 2.4 SERVICE CARDS — hairline grid system (the most impactful single change)

The current service cards use white backgrounds, box-shadows, border-radius: 20px, and hover lift. Replace entirely with the editorial hairline grid pattern — no shadows, no radius, structural borders only:

```css
/* ═══════════════════════════════════════════════════
   SERVICE CARDS
═══════════════════════════════════════════════════ */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;                    /* hairline gap — the grid IS the border */
  background: var(--line);     /* line color shows through 1px gaps */
  border: 1px solid var(--line);
}

.service-card {
  background: var(--bone);     /* card bg covers grid bg — gaps show as lines */
  border: none;                /* no individual card border — grid provides it */
  border-radius: 0;            /* from 20px — flat is essential to hairline grid */
  padding: clamp(36px, 3.5vw, 52px) clamp(28px, 3vw, 44px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  transition: background 0.2s ease;
  box-shadow: none;            /* explicitly remove */
}

/* Hover: subtle tint, no lift — lift feels cheap at this level */
.service-card:hover {
  background: var(--bone-deep);
  transform: none;             /* explicitly override any inherited lift */
  box-shadow: none;
}

/* Gold left-border accent on hover — agency signature touch */
.service-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gold);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.25s ease;
}
.service-card:hover::before { transform: scaleY(1); }

/* Featured card — gold border instead of left accent */
.service-card.featured {
  grid-column: span 2;
  flex-direction: row;
  align-items: flex-start;
  gap: clamp(32px, 4vw, 64px);
  background: var(--bone);
  border: none;                /* grid provides the edge */
  /* Subtle diagonal gradient to distinguish from standard cards */
  background: linear-gradient(135deg, #FFFEF9 0%, var(--bone) 100%);
  position: relative;
}
/* Gold top bar on featured card */
.service-card.featured::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold);
}
.service-card.featured::before { display: none; } /* remove left accent for featured */

.service-card.featured .card-body { flex: 1; }
.service-card.featured .card-badge-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  padding-top: 4px;
}

.badge-featured {
  display: inline-flex;
  align-items: center;
  background: var(--gold);
  color: var(--ink);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 2px;          /* from 999px — match rectangular language */
  white-space: nowrap;
}

.service-card h3 {
  font-size: clamp(1.2rem, 1.8vw, 1.5rem);
  color: var(--forest);
  line-height: 1.18;
  letter-spacing: -0.02em;
  margin: 0;
}
.service-card .price {
  font-size: 12px;
  color: var(--gold-deep);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.service-card p {
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.72;
  margin: 0;
  max-width: 42ch;
}
.service-card .tag {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font-weight: 500;
  opacity: 0.75;
}
```

### 2.5 BEFORE/AFTER SLIDER — keep existing, refine card wrapper only

Find the `.ba-card` rule and replace it:
```css
.ba-card {
  background: var(--ink-soft);
  border: 1px solid var(--line-dark);
  border-radius: 4px;          /* from var(--radius) 20px — matches new language */
  padding: 12px;
}
```

Find `.ba` and replace:
```css
.ba {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 2px;          /* from var(--radius-sm) */
  overflow: hidden;
  user-select: none;
}
```

### 2.6 GALLERY — editorial grid, no hover lift

Replace the entire GALLERY section:
```css
/* ═══════════════════════════════════════════════════
   GALLERY
═══════════════════════════════════════════════════ */
.filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: clamp(32px, 4vw, 56px);
}

.filter-btn {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 8px 18px;
  border-radius: 2px;          /* match rectangular language */
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.filter-btn:hover {
  border-color: var(--forest);
  color: var(--forest);
}
.filter-btn.active {
  background: var(--forest);
  color: var(--bone);
  border-color: var(--forest);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;                    /* hairline grid — match service cards */
  background: var(--line);
  border: 1px solid var(--line);
}

.gallery-item {
  aspect-ratio: 3/4;
  border: none;                /* grid provides border */
  border-radius: 0;            /* from var(--radius) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--bone-deep);
  text-align: center;
  padding: clamp(20px, 2.5vw, 36px);
  transition: background 0.2s ease;
  cursor: default;
}
.gallery-item:hover {
  background: var(--bone);
  transform: none;             /* no lift */
  box-shadow: none;
}
.gallery-item svg       { width: 28px; height: 28px; color: var(--gold-deep); opacity: 0.6; }
.gallery-item .g-label  { font-size: 13px; font-weight: 600; color: var(--forest); letter-spacing: -0.01em; }
.gallery-item .g-sub    { font-size: 11.5px; color: var(--text-muted); line-height: 1.55; }
.gallery-item.hidden    { display: none; }
```

### 2.7 PROCESS — remove card radius, tighten number, increase step density

Replace the entire PROCESS section:
```css
/* ═══════════════════════════════════════════════════
   PROCESS
═══════════════════════════════════════════════════ */
.process-band {
  background: var(--ink);
  color: var(--bone);
  position: relative;
  overflow: hidden;
}
/* Subtle large watermark — Ruckus/DD.NYC agency texture */
.process-band::before {
  content: '05';
  position: absolute;
  right: -2%;
  bottom: -8%;
  font-family: var(--font-serif);
  font-size: clamp(160px, 20vw, 280px);
  font-weight: 600;
  color: rgba(247, 243, 234, 0.028);
  line-height: 1;
  user-select: none;
  pointer-events: none;
  letter-spacing: -0.04em;
}
.process-band h2 { color: var(--bone); }
.process-band .eyebrow { color: var(--gold); }
.process-band .section-head p { color: rgba(247, 243, 234, 0.58); }

.process-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;                    /* hairline gap system — consistent with service/gallery */
  background: rgba(247, 243, 234, 0.1);
  border: 1px solid rgba(247, 243, 234, 0.1);
  margin-top: 16px;
}

.process-step {
  background: transparent;
  border: none;                /* grid provides edges */
  border-radius: 0;            /* from var(--radius) */
  padding: clamp(32px, 3vw, 48px) clamp(20px, 2.5vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: background 0.2s ease;
}
.process-step:hover {
  background: rgba(247, 243, 234, 0.045);
}

.process-num {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 3.5vw, 3.75rem);  /* larger, more editorial */
  color: rgba(200, 160, 85, 0.28);            /* ghost gold — not full gold */
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.04em;
  display: block;
}

.process-step h3 {
  color: var(--bone);
  font-size: clamp(0.9375rem, 1.3vw, 1.125rem);
  line-height: 1.28;
  letter-spacing: -0.015em;
}

.process-step p {
  font-size: 13.5px;
  color: rgba(247, 243, 234, 0.56);
  line-height: 1.72;
  margin: 0;
}
```

### 2.8 SERVICE AREA — more editorial, remove generic styling

Replace the SERVICE AREA section:
```css
/* ═══════════════════════════════════════════════════
   SERVICE AREA
═══════════════════════════════════════════════════ */
.area-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(56px, 7vw, 112px);
  align-items: start;
}
.area-note {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 28px;
  line-height: 1.65;
  letter-spacing: 0.01em;
}
```

### 2.9 ESTIMATE FORM — precise refinement

Replace the entire ESTIMATE FORM section:
```css
/* ═══════════════════════════════════════════════════
   ESTIMATE FORM
═══════════════════════════════════════════════════ */
.estimate-band { background: var(--bone-deep); }

.estimate-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: clamp(56px, 7vw, 112px);
  align-items: start;
}

.estimate-stats {
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3vw, 36px);
  margin-top: clamp(36px, 4vw, 56px);
}

.estimate-stat {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding-bottom: clamp(24px, 3vw, 36px);
  border-bottom: 1px solid var(--line);
}
.estimate-stat:last-child { border-bottom: none; padding-bottom: 0; }

.estimate-stat .num {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 2.5vw, 2.25rem);
  color: var(--gold-deep);
  min-width: 64px;
  line-height: 1;
  padding-top: 4px;
  font-weight: 500;
  letter-spacing: -0.03em;
  flex-shrink: 0;
}

.estimate-stat p {
  margin: 0;
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.68;
}

.estimate-stat strong {
  display: block;
  color: var(--forest);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  letter-spacing: 0;
}

/* Form card — sharp, elevated */
.form-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 4px;          /* from var(--radius) 20px */
  padding: clamp(36px, 4vw, 56px) clamp(32px, 3.5vw, 52px);
  box-shadow:
    0 2px 0 var(--line),       /* bottom edge depth — subtle elevation signal */
    0 12px 48px rgba(20, 36, 31, 0.06);
}
.form-card h3 {
  font-size: 1.25rem;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
}
.form-card .sub {
  font-size: 13.5px;
  color: var(--text-muted);
  margin: 0 0 28px;
  line-height: 1.62;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}
.form-row.single { grid-template-columns: 1fr; }

.field { display: flex; flex-direction: column; gap: 5px; }

.field label {
  font-size: 10px;
  font-weight: 600;
  color: var(--forest);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.field input,
.field select,
.field textarea {
  font-family: var(--font-sans);
  font-size: 14.5px;
  border: 1px solid rgba(30, 57, 52, 0.16);
  border-radius: 3px;          /* from var(--radius-sm) 12px */
  padding: 12px 14px;
  background: var(--bone);
  color: var(--text);
  line-height: 1.5;
  transition: border-color 0.15s, box-shadow 0.15s;
  -webkit-appearance: none;
  appearance: none;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--gold-deep);
  box-shadow: 0 0 0 3px rgba(138, 106, 51, 0.12);
  background: #fff;
}

.field input::placeholder,
.field textarea::placeholder { color: rgba(30, 57, 52, 0.3); }

.field textarea { resize: vertical; min-height: 96px; }

.form-foot {
  font-size: 11.5px;
  color: var(--text-muted);
  margin-top: 20px;
  text-align: center;
  line-height: 1.65;
  letter-spacing: 0.01em;
}

.form-success { display: none; text-align: center; padding: 56px 24px; }
.form-success.show { display: block; }
.form-success svg { width: 40px; height: 40px; color: var(--gold-deep); margin: 0 auto 20px; }
.form-success h3 { margin-bottom: 12px; }
.form-success p  { color: var(--text-muted); font-size: 14.5px; line-height: 1.68; margin: 0; }
```

### 2.10 TIERS — editorial dark section refinement

Replace the entire TIERS section:
```css
/* ═══════════════════════════════════════════════════
   TIERS
═══════════════════════════════════════════════════ */
.tiers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;                    /* hairline grid — consistent system */
  background: rgba(247, 243, 234, 0.1);
  border: 1px solid rgba(247, 243, 234, 0.1);
  margin-top: 48px;
}

.tier-card {
  background: transparent;
  border: none;                /* grid provides edges */
  border-radius: 0;            /* from var(--radius) */
  padding: clamp(40px, 4vw, 56px) clamp(28px, 3vw, 44px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: background 0.2s ease;
  position: relative;
}
.tier-card:hover {
  background: rgba(247, 243, 234, 0.04);
}

/* Recommended tier — gold top bar instead of full border */
.tier-card.best {
  background: rgba(200, 160, 85, 0.04);
}
.tier-card.best::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold);
}

.tier-name {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold);
}

.tier-card h3 {
  color: var(--bone);
  font-size: clamp(1.125rem, 1.8vw, 1.375rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.tier-card p {
  font-size: 14px;
  color: rgba(247, 243, 234, 0.6);
  line-height: 1.72;
  margin: 0;
}

.close-cta {
  background: var(--ink);
  color: var(--bone);
  text-align: center;
  position: relative;
  overflow: hidden;
}
/* Agency-style large ghost text backdrop */
.close-cta::before {
  content: '3';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-serif);
  font-size: clamp(200px, 30vw, 400px);
  font-weight: 600;
  color: rgba(247, 243, 234, 0.018);
  line-height: 1;
  user-select: none;
  pointer-events: none;
  letter-spacing: -0.04em;
}

.close-cta h2 { color: var(--bone); position: relative; }
.close-cta > .wrap > p {
  color: rgba(247, 243, 234, 0.58);
  max-width: 48ch;
  margin: 20px auto clamp(40px, 5vw, 64px);
  font-size: 1.05rem;
  line-height: 1.72;
  position: relative;
}
```

### 2.11 RESPONSIVE — update all breakpoints to match new component changes

Replace the entire RESPONSIVE section at the bottom of components.css:
```css
/* ═══════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════ */
@media (max-width: 1080px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .service-card.featured { grid-column: span 2; flex-direction: column; gap: 24px; }
  .service-card.featured .card-badge-col { align-items: flex-start; }
  .process-list { grid-template-columns: repeat(3, 1fr); }
  .tiers-grid   { grid-template-columns: repeat(3, 1fr); } /* keep 3 col until 768 */
}

@media (max-width: 768px) {
  .services-grid { grid-template-columns: 1fr; }
  .service-card.featured { grid-column: span 1; }
  .process-list { grid-template-columns: repeat(2, 1fr); }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .area-grid { grid-template-columns: 1fr; gap: 48px; }
  .estimate-grid { grid-template-columns: 1fr; gap: 48px; }
  .tiers-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .trust-row { justify-content: flex-start; gap: 16px 28px; }
}

@media (max-width: 480px) {
  .process-list { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: 1fr; }
  .chip-group { gap: 8px; }
}
```

---

## CHANGE SET 3 — `src/pages/index.astro` `<style>` block

Open `src/pages/index.astro`. Find the `<style>` block at the bottom. Replace it entirely with the following. All rules in this block are scoped to the homepage only:

```css
<style>
  /* ── Condo strip ──────────────────────────────────── */
  .condo-strip {
    background: var(--bone-deep);
    border-bottom: 1px solid var(--line);
    padding: clamp(32px, 4vw, 56px) 0;
  }

  .condo-card {
    background: var(--bone);
    border: 1px solid var(--line);
    border-radius: 3px;         /* from var(--radius) 20px */
    padding: clamp(36px, 4vw, 56px) clamp(28px, 3.5vw, 52px);
    display: flex;
    flex-direction: column;
    gap: 36px;
    position: relative;
    overflow: hidden;
  }
  /* Gold left accent stripe — DD.NYC pattern */
  .condo-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--gold) 0%, transparent 100%);
    opacity: 0.6;
  }

  .condo-strip-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(24px, 3.5vw, 56px);
    position: relative;
  }
  /* Vertical hairlines between columns */
  .condo-strip-grid::before,
  .condo-strip-grid::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--line);
  }
  .condo-strip-grid::before { left: 33.333%; }
  .condo-strip-grid::after  { left: 66.666%; }

  .condo-strip-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--forest);
    line-height: 1.55;
    padding: 0 clamp(0px, 2vw, 24px);
  }
  .condo-strip-item:first-child { padding-left: 0; }
  .condo-strip-item:last-child  { padding-right: 0; }
  .condo-strip-item svg {
    width: 20px;
    height: 20px;
    color: var(--gold-deep);
    flex-shrink: 0;
    margin-top: 1px;
  }

  .condo-card-sub {
    font-size: clamp(0.9375rem, 1.4vw, 1.125rem);
    font-weight: 500;
    color: var(--forest);
    line-height: 1.5;
    border-top: 1px solid var(--line);
    padding-top: 28px;
    letter-spacing: -0.015em;
    margin: 0;
    position: relative;
    opacity: 0.85;
  }

  /* ── Services section ──────────────────────────────── */
  #services {
    background: var(--bone);
  }
  .section-lede-center {
    max-width: 48ch;
    margin: 16px auto 0;
    color: var(--text-muted);
    font-size: 1rem;
    line-height: 1.72;
    text-align: center;
  }

  /* ── Area section ────────────────────────────────────── */
  .area-section { background: var(--bone-deep); }
  .area-section a.chip { text-decoration: none; transition: background 0.15s, opacity 0.15s; }
  .area-section a.chip:hover { background: var(--ink); }
  .area-section h2 { margin-bottom: 20px; }

  /* ── Process link row ─────────────────────────────── */
  .process-link-row {
    text-align: center;
    margin-top: clamp(40px, 5vw, 72px);
  }

  /* ── Gallery link row ─────────────────────────────── */
  .gallery-link-row {
    text-align: center;
    margin-top: clamp(32px, 4vw, 56px);
  }

  /* ── Tiers ─────────────────────────────────────────── */
  .tiers-sub {
    font-size: 1rem;
    color: rgba(247, 243, 234, 0.56);
    max-width: 46ch;
    margin: 16px auto clamp(0px, 0vw, 0px);
    line-height: 1.72;
    text-align: center;
    position: relative;
  }
  .tiers-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: clamp(40px, 5vw, 64px);
    position: relative;
  }
  .tiers-note {
    font-size: 12px;
    color: rgba(247, 243, 234, 0.42);
    max-width: 52ch;
    text-align: center;
    line-height: 1.72;
    letter-spacing: 0.02em;
  }
  .tiers-links {
    display: flex;
    gap: 32px;
    align-items: center;
    font-size: 12px;
    letter-spacing: 0.04em;
  }
  .tiers-links a {
    color: rgba(247, 243, 234, 0.45);
    text-decoration: none;
    transition: color 0.15s;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 600;
  }
  .tiers-links a:hover { color: var(--gold); }

  /* ── Testimonial section (add this section directly above #estimate in index.astro) ── */
  /* See CHANGE SET 5 for the HTML — these are its styles */
  .testimonial-band {
    background: var(--ink);
    color: var(--bone);
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  /* Ghost serif backdrop */
  .testimonial-band::before {
    content: '"';
    position: absolute;
    left: 50%;
    top: -10%;
    transform: translateX(-50%);
    font-family: var(--font-serif);
    font-size: clamp(200px, 28vw, 380px);
    font-weight: 500;
    color: rgba(247, 243, 234, 0.022);
    line-height: 1;
    user-select: none;
    pointer-events: none;
  }
  .testimonial-quote {
    font-family: var(--font-serif);
    font-size: clamp(1.25rem, 2.2vw, 1.875rem);
    font-weight: 400;
    font-style: italic;
    line-height: 1.5;
    letter-spacing: -0.02em;
    color: var(--bone);
    max-width: 780px;
    margin: 0 auto 36px;
    position: relative;
  }
  .testimonial-attribution {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: clamp(48px, 6vw, 80px);
  }
  .testimonial-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(247,243,234,0.1);
    border: 1.5px solid rgba(247,243,234,0.2);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .testimonial-avatar svg {
    width: 22px;
    height: 22px;
    color: rgba(247,243,234,0.4);
  }
  .testimonial-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--bone);
    letter-spacing: 0.01em;
    text-align: left;
  }
  .testimonial-meta {
    font-size: 12px;
    color: rgba(247,243,234,0.45);
    letter-spacing: 0.03em;
    text-align: left;
    margin-top: 2px;
  }
  .testimonial-scores {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(247,243,234,0.1);
    border: 1px solid rgba(247,243,234,0.1);
    max-width: 600px;
    margin: 0 auto;
    position: relative;
  }
  .testimonial-score-item {
    padding: 28px 24px;
    background: transparent;
    transition: background 0.2s;
  }
  .testimonial-score-item:hover { background: rgba(247,243,234,0.035); }
  .testimonial-score-num {
    font-family: var(--font-serif);
    font-size: 2.25rem;
    font-weight: 500;
    color: var(--bone);
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 6px;
  }
  .testimonial-score-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(247,243,234,0.45);
  }
  .testimonial-score-src {
    font-size: 11px;
    color: var(--gold);
    margin-top: 4px;
    letter-spacing: 0.02em;
  }

  /* ── Mobile sticky estimate bar ────────────────────── */
  .mobile-cta-bar {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background: var(--gold);
    padding: 0;
    border-top: 1px solid var(--gold-deep);
  }
  .mobile-cta-bar a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    gap: 8px;
  }
  .mobile-cta-bar a svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  /* ── Responsive ──────────────────────────────────── */
  @media (max-width: 900px) {
    .condo-strip-grid {
      grid-template-columns: 1fr 1fr;
    }
    .condo-strip-grid::after { display: none; }
    .condo-strip-grid::before { left: 50%; }
    .testimonial-scores { grid-template-columns: 1fr; max-width: 320px; }
  }

  @media (max-width: 768px) {
    .mobile-cta-bar { display: block; }
    /* Add bottom padding to last section so sticky bar doesn't cover content */
    footer { padding-bottom: 60px; }
  }

  @media (max-width: 560px) {
    .condo-strip-grid { grid-template-columns: 1fr; }
    .condo-strip-grid::before,
    .condo-strip-grid::after { display: none; }
    .tiers-links { flex-direction: column; gap: 12px; }
    .testimonial-quote { font-size: 1.125rem; }
  }
</style>
```

---

## CHANGE SET 4 — `src/components/CTABand.astro`

Replace the entire `<style>` block inside `CTABand.astro`:

```css
<style>
  .cta-band {
    background: var(--forest);      /* from var(--ink) — forest is slightly warmer, less stark */
    color: var(--bone);
    text-align: center;
    padding: clamp(72px, 8vw, 112px) 0;
    position: relative;
    overflow: hidden;
  }
  /* Ghost number backdrop */
  .cta-band::before {
    content: '→';
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--font-serif);
    font-size: clamp(100px, 15vw, 200px);
    color: rgba(247, 243, 234, 0.04);
    line-height: 1;
    user-select: none;
    pointer-events: none;
  }
  .cta-band .wrap { position: relative; }
  .cta-band h2 {
    color: var(--bone);
    font-size: clamp(1.625rem, 3vw, 2.375rem);
    margin-bottom: 32px;
    letter-spacing: -0.03em;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
  .cta-band .eyebrow {
    color: var(--gold);
    margin-bottom: 16px;
  }
</style>
```

---

## CHANGE SET 5 — New HTML: Testimonial section + Mobile sticky CTA

Open `src/pages/index.astro`. Find the comment `<!-- ===== ESTIMATE FORM ===== -->`. **Insert the following two blocks immediately before it:**

### 5A — Testimonial section (insert before the estimate section)

```html
<!-- ===== TESTIMONIALS ===== -->
<section class="testimonial-band" id="reviews">
  <div class="wrap">
    <p class="eyebrow" style="color:var(--gold);">Client reviews</p>
    <blockquote class="testimonial-quote">
      "Jerry transformed our entire apartment — bathrooms, kitchen, paint. The level of detail and craftsmanship was exceptional. He showed up every day, kept us informed, and the result was stunning."
    </blockquote>
    <div class="testimonial-attribution">
      <div class="testimonial-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/></svg>
      </div>
      <div>
        <p class="testimonial-name">Ceri Lewellen</p>
        <p class="testimonial-meta">Full apartment renovation · East Boston</p>
      </div>
    </div>
    <div class="testimonial-scores">
      <div class="testimonial-score-item">
        <div class="testimonial-score-num">5.0</div>
        <div class="testimonial-score-src">Google</div>
        <div class="testimonial-score-label">Verified reviews</div>
      </div>
      <div class="testimonial-score-item">
        <div class="testimonial-score-num">5.0</div>
        <div class="testimonial-score-src">Houzz Pro</div>
        <div class="testimonial-score-label">Portfolio verified</div>
      </div>
      <div class="testimonial-score-item">
        <div class="testimonial-score-num">#208336</div>
        <div class="testimonial-score-src">Mass.gov</div>
        <div class="testimonial-score-label">MA HIC Licensed</div>
      </div>
    </div>
  </div>
</section>
```

### 5B — Mobile sticky CTA bar (insert immediately before `<Footer />`)

```html
<!-- ===== MOBILE STICKY CTA ===== -->
<div class="mobile-cta-bar" aria-label="Get a free estimate">
  <a href="#estimate" data-ph-event="cta_clicked" data-ph-label="mobile_sticky_cta">
    Get my free estimate
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </a>
</div>
```

---

## CHANGE SET 6 — `src/components/Footer.astro` `<style>` block

Find the `<style>` block in `Footer.astro`. Replace it entirely:

```css
<style>
  footer {
    background: var(--ink);
    border-top: 1px solid var(--line-dark);
    color: rgba(247, 243, 234, 0.6);
    position: relative;
    overflow: hidden;
  }
  /* Ghost serif watermark — agency texture */
  footer::before {
    content: 'J&C';
    position: absolute;
    right: -2%;
    bottom: -10%;
    font-family: var(--font-serif);
    font-size: clamp(100px, 16vw, 220px);
    font-weight: 600;
    color: rgba(247, 243, 234, 0.018);
    line-height: 1;
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1fr 1fr;
    gap: clamp(32px, 4vw, 64px);
    padding: clamp(56px, 7vw, 96px) 0 40px;
    position: relative;
  }

  /* Brand column */
  .footer-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  .footer-brand .logo-mark {
    color: var(--bone);
    width: 30px;
    height: 24px;
    flex-shrink: 0;
  }
  .footer-brand .brand-text {
    font-family: var(--font-serif);
    font-size: 18px;
    letter-spacing: 0.02em;
    color: var(--bone);
    font-weight: 500;
  }

  .footer-blurb {
    max-width: 32ch;
    font-size: 13.5px;
    margin: 0 0 20px;
    line-height: 1.72;
    color: rgba(247, 243, 234, 0.48);
  }

  /* Contact details in footer brand col */
  .footer-contact {
    margin-bottom: 20px;
  }
  .footer-contact a {
    display: block;
    font-size: 13px;
    color: var(--gold);
    text-decoration: none;
    letter-spacing: 0.01em;
    line-height: 1.8;
    transition: color 0.15s;
  }
  .footer-contact a:hover { color: var(--bone); }

  .social-row {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-top: 4px;
  }
  .social-row a {
    color: rgba(247, 243, 234, 0.38);
    transition: color 0.2s;
    text-decoration: none;
    display: flex;
  }
  .social-row a:hover { color: var(--gold); }
  .social-row svg { width: 17px; height: 17px; }

  /* Link columns */
  .footer-col h4 {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(247, 243, 234, 0.28);  /* subtler than current — more refined */
    margin: 0 0 18px;
    font-family: var(--font-sans);
  }
  .footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 11px;
    font-size: 13.5px;
  }
  .footer-col a {
    text-decoration: none;
    color: rgba(247, 243, 234, 0.52);
    transition: color 0.15s;
    letter-spacing: 0.01em;
    line-height: 1.4;
  }
  .footer-col a:hover { color: var(--bone); }

  /* Bottom bar */
  .footer-bottom {
    border-top: 1px solid var(--line-dark);
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px 32px;
    position: relative;
  }
  .footer-legal {
    font-size: 11px;
    color: rgba(247, 243, 234, 0.3);
    letter-spacing: 0.01em;
    line-height: 1.6;
  }
  .footer-legal-links {
    display: flex;
    gap: 24px;
  }
  .footer-legal-links a {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(247, 243, 234, 0.28);
    text-decoration: none;
    transition: color 0.15s;
  }
  .footer-legal-links a:hover { color: rgba(247, 243, 234, 0.6); }

  @media (max-width: 880px) {
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; padding-top: 48px; }
  }
  @media (max-width: 560px) {
    .footer-grid { grid-template-columns: 1fr; gap: 36px; }
    .footer-bottom { flex-direction: column; align-items: flex-start; }
  }
</style>
```

Also update the `footer-bottom` HTML inside `Footer.astro`. Find the existing `<div class="footer-bottom">` block and replace it with:

```html
<div class="footer-bottom wrap">
  <p class="footer-legal">
    © 2026 Jerry &amp; Co. Home Improvement LLC · MA HIC #208336 · All in-unit work performed with building-compliant containment and low-VOC materials.
  </p>
  <div class="footer-legal-links">
    <a href="/guarantee/">Guarantee</a>
    <a href="/financing/">Financing</a>
    <a href="/faq/">FAQ</a>
  </div>
</div>
```

And add a contact block inside the brand column in `Footer.astro` (add it between `.footer-blurb` and `.social-row`):

```html
<div class="footer-contact">
  <a href="tel:+13476026801">(347) 602-6801</a>
  <a href="mailto:jerry@jerryandcohomeservices.com">jerry@jerryandcohomeservices.com</a>
  <a href="https://www.jerryandcohomeservices.com" style="color:rgba(247,243,234,0.35);font-size:11px;letter-spacing:0.03em;">www.jerryandcohomeservices.com</a>
</div>
```

---

## CHANGE SET 7 — MultiStepForm type-card radius fix

Open `src/components/MultiStepForm.astro`. Find all instances of `border-radius` in the `<style>` block that use large values (the form card itself is already handled by components.css `.form-card`). Inside the MultiStepForm `<style>` block only, add this at the bottom to override any pill or large-radius shapes on the project type cards:

```css
/* Align type-card border-radius to new rectangular language */
.type-card {
  border-radius: 3px !important;
}
.type-card:has(input:checked) {
  border-radius: 3px !important;
}
```

---

## CHANGE SET 8 — tokens.css: add one new spacing token only

Open `src/styles/tokens.css`. Add one line after `--section-pad`:
```css
--section-pad-tight: clamp(40px, 5vw, 72px);  /* for denser sections like testimonials */
```
Do not change any existing token values.

---

## QA CHECKLIST — run after all changes

Execute these checks before committing:

1. `pnpm build` — must complete with zero errors and zero warnings
2. Manual check: `grep -n "border-radius: 999px" src/styles/components.css` — must return zero results (all pills converted)
3. Manual check: `grep -n "border-radius: var(--radius)" src/styles/components.css` — must return zero results on service cards, gallery items, process steps, tiers
4. Visually confirm at 1280px viewport: service cards show hairline grid (no individual card shadows), process steps show hairline grid on dark bg, gallery items show hairline grid
5. Visually confirm at 390px viewport:
   - Mobile sticky gold CTA bar visible at bottom
   - Hero text does not overflow
   - Condo strip collapses to single column
   - Form fields are full-width
   - Tiers stack to single column
   - Trust bar wraps cleanly
6. Confirm testimonial section renders between gallery/area section and estimate form
7. Confirm footer contact links (phone + email) render in brand column
8. Confirm footer legal links row shows Guarantee / Financing / FAQ
9. Check focus states: tab through page — all interactive elements show `outline: 2px solid var(--gold-deep)` (this is already in global.css, confirm it wasn't overwritten)
10. Confirm `.btn` has `border-radius: 3px` in all states (no 999px anywhere)
11. Confirm `process-band::before` ghost text is visible but subtle (not distracting) at full-width desktop
12. Confirm `close-cta::before` ghost "3" is not visible at mobile — check z-index and overflow

Commit message: `polish(ui): editorial redesign — hairline grid system, rectangular language, agency typography, testimonial section, mobile sticky CTA`

---

## WHAT THIS DOES NOT CHANGE (confirm these are untouched after the pass)

- `src/styles/tokens.css` custom property values (except the one new `--section-pad-tight` addition)
- Every word of copy in `index.astro`, `Header.astro`, `Footer.astro`, `TrustBar.astro`
- `HeroCarousel.astro` — zero changes
- `MultiStepForm.astro` — only the `.type-card border-radius` override in its own style block
- `Header.astro` — zero changes
- `TrustBar.astro` — zero changes
- `Base.astro`, `Page.astro` — zero changes
- All `href` values, all page URLs, all structured data
- Font families (Fraunces + Inter remain)
- Color values (`--bone`, `--forest`, `--gold`, etc. remain)
