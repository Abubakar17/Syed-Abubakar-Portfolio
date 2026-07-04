# DESIGN.md — Syed Muhammad Abubakar Portfolio

> Terminal-grade dark canvas with a single blue accent — this site's own colours and type, reshaped with the structural confidence, oversized headlines, and restrained motion of five reference studios.

**Theme:** dark-first, with a maintained light mode.

**The governing rule (from the brief):** *my site wins on colours and fonts; the references win on layout and feel.* Every token below is pulled from the shipped CSS ([src/index.css](src/index.css)) — verified against source, not estimated. Every structural/motion principle is synthesized from the five reference systems. Nothing from the references' palettes or typefaces is imported.

---

## 1. Sources

| Source | File | What we take from it |
|--------|------|----------------------|
| **This site (live CSS)** | `src/index.css`, `tailwind.config.cjs` | All colours, fonts, radii — the identity |
| ORYZO | `design/DESIGN.md` | Warm-dark editorial void; one-filled-CTA restraint; full-viewport section rhythm |
| Hyperstudio | `design/DESIGN (1).md` | "The line IS the layout" — hairline borders as the sole structural device; 120–210px section gaps |
| Vivid+Co | `design/DESIGN (2).md` | Scale carries hierarchy, not weight; signature easing curve; stillness as confidence |
| Resend | `design/DESIGN (3).md` | Monospace-as-developer-identity; ghost buttons only; borders not shadows |
| GSAP | `design/DESIGN (4).md` | Oversized display type bleeding to viewport edge; `{ }` curly-bracket section eyebrows |
| Prior merge | `design/DESIGN (5).md` | First iteration of this document — superseded by this file; its decision log is carried forward below |
| Drop-in component | `components/comp2.md` | Scroll-driven hero (Lenis + framer-motion) — assessed in §7, adopted in philosophy only (see Decision #12) |

---

## 2. Colours
*(Source of truth: `src/index.css` `:root` and `:root[data-theme="light"]`)*

### Dark (default)

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void | `#050608` | `--bg` | Page canvas — near-black, slightly blue-cool, never pure black |
| Panel | `#0c1017` | `--panel` | Card/panel surface, one step up from canvas |
| Panel Strong | `#111722` | `--panel-strong` | Elevated surface — modals, stronger emphasis |
| Hairline | `rgba(255,255,255,0.10)` | `--line` | Default 1px border on cards, dividers, nav pill |
| Hairline Strong | `rgba(255,255,255,0.18)` | `--line-strong` | Emphasized borders — buttons, portrait frame, active states |
| Text | `#f7f8fb` | `--text` | Primary text, headings |
| Muted | `#a7afbd` | `--muted` | Secondary text, body copy, card descriptions |
| Soft | `#687385` | `--soft` | Tertiary text, timestamps, terminal chrome dots |
| Accent | `#6aa8ff` | `--accent` | The one chromatic colour — cursor blink, links, active glow |
| Accent Strong | `#8fc2ff` | `--accent-strong` | Brighter accent — eyebrows, icon fills, hover states |
| Accent Muted | `rgba(106,168,255,0.14)` | `--accent-muted` | Wash background for primary buttons, badges, active filters |
| Terminal Blue | `#d7e8ff` | *(inline, `.terminal-body`)* | Monospace terminal text — brighter than muted for code readability |
| Tag Blue | `#c5d9f7` | *(inline, `.tag-row span`)* | Tag/pill text inside outlined badges |
| Button Primary Text | `#dcecff` | *(inline, `.button.primary`)* | Text on the primary/active button state |

### Light (`data-theme="light"`)

| Name | Value | Token |
|------|-------|-------|
| Canvas | `#f7f9fc` | `--bg` |
| Panel | `#ffffff` | `--panel` |
| Panel Strong | `#eef3f8` | `--panel-strong` |
| Hairline | `rgba(12,18,28,0.10)` | `--line` |
| Hairline Strong | `rgba(12,18,28,0.18)` | `--line-strong` |
| Text | `#101722` | `--text` |
| Muted | `#536173` | `--muted` |
| Soft | `#7b8796` | `--soft` |
| Accent | `#246bfe` | `--accent` |
| Accent Strong | `#064ed6` | `--accent-strong` |
| Accent Muted | `rgba(36,107,254,0.10)` | `--accent-muted` |

**Hard rule — one accent hue.** Blue is the only chromatic colour in the system. Every reference earns its accent through rarity (ORYZO's ember, Hyperstudio's gold, Resend's violet, GSAP's five-colour taxonomy); this site's rarity is monochrome-blue. No second hue, ever. Semantic exceptions (e.g. an error state in a future form) must be raised in the Decision Log first.

---

## 3. Typography
*(Source: `src/index.css` — Inter for UI/body, system monospace for the terminal motif)*

### Inter — primary typeface, all UI and body
- **Stack:** `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Weights:** 400 (body), 650–760 (headings — Inter's variable axis, not a flat 700)
- **Role:** Every heading, paragraph, nav item, and button. No secondary display face — scale and weight carry hierarchy, matching Vivid+Co and Hyperstudio's single-typeface discipline.

### Monospace — terminal/code motif (signature developer-identity element)
- **Stack:** `"SFMono-Regular", Consolas, "Liberation Mono", monospace`
- **Size/leading:** 14px / 1.8
- **Role:** The `.terminal` component, and (per Decision #7) extended to tech-tag pills on project cards. This is the site's strongest existing signature — the direct kin of Resend's Commit Mono developer identity. Never use it for prose.

### Type scale (fluid `clamp()` values from the live site)

| Role | Size | Line Height | Weight | Selector |
|------|------|-------------|--------|----------|
| eyebrow | 12px | 1 | 750, uppercase, 0.14em tracking | `.eyebrow` |
| tag | 12px | 1 | 400 | `.tag-row span` |
| card body | 13px | 1.4 | 400 | `.highlight-card p` |
| button | 14px | 1 | 700 | `.button` |
| terminal | 14px | 1.8 | 400 mono | `.terminal-body` |
| hero typed line | clamp(18px, 3vw, 28px) | 1.35 | 400 | `.hero-title` |
| body / prose | 18px | 1.75–1.8 | 400 | `.hero-copy`, `.prose p` |
| heading-sm | 24px | 1.2 | 680 | `.highlight-card h2` |
| heading | 28px | 1.2 | 680 | `h2` |
| heading-lg | clamp(30px, 4vw, 48px) | 1.2 | 680 | `.split-section h2` |
| display-sm | clamp(36px, 5vw, 62px) | 1.05 | 680–760 | `.section-heading h1` |
| display | clamp(44px, 8vw, 92px) | 0.98 | 760 | `h1` |

**Approved upgrade — bolder scale commitment (Decision #10):** GSAP (224px), Resend (96px), and Vivid+Co (136px) all push display type meaningfully past our 92px ceiling. Raise the hero `h1` to `clamp(48px, 9vw, 120px)` and add `letter-spacing: -0.02em` at the top of the range. Same Inter at weight 760 — just bolder commitment to scale, per Vivid+Co's "scale carries hierarchy, not boldness."

---

## 4. Spacing & Shape

### Radius vocabulary — exactly two values
| Element | Value |
|---------|-------|
| Cards, buttons, panels, portrait frame, theme toggle | `8px` |
| Pills, badges, tags, nav bar, chrome dots | `999px` |

This binary (sharp-ish 8px vs. full pill) already matches Hyperstudio's and Resend's disciplined vocabularies. **Never introduce a third radius value.**

### Spacing (current live values)
| Context | Value |
|---------|-------|
| Page max-width | `1120px` (`--max`) |
| Section padding | 92px top / 64px bottom |
| Hero column gap | 54px |
| Card padding | 24px (20px ≤540px) |
| Grid gaps | 14–16px |
| Split-section padding | 68px, hairline border top+bottom |
| Terminal margins | 72px top / 64px bottom |

**Approved upgrade — editorial breathing room (Decision #11):** Hyperstudio (120–210px) and Resend (96px+) both give sections more air. Widen **inter-section** padding to ~120px top / 96px bottom. Card padding and grid gaps stay tight (16–24px) — the references breathe *between* sections, not inside cards.

---

## 5. Layout & Feel — synthesized from the references

None of the references' colours or fonts are imported; only their structural and motion philosophy.

1. **Hairline-as-structure** *(Hyperstudio, GSAP, ORYZO)* — 1px `--line` borders are *the* structural device. Section transitions are hairlines, never background-colour shifts. "The line IS the layout."
2. **Oversized, confident type** *(Vivid+Co, Resend, GSAP)* — authority through scale, not boldness or colour. Weight-760 Inter at 120px says more than any decoration.
3. **One signature moment, quiet everywhere else** *(universal)* — the flip-portrait card (photo front / initials back, 3D hover flip) is this site's one "loud" element. No reference has an equivalent. Everything else — buttons, cards, nav — stays deliberately restrained around it.
4. **Ghost-first buttons** *(all five references)* — no solid-fill CTA exists in any reference. `.button` already uses a translucent wash; this is locked as a Don't.
5. **Terminal motif as identity** *(Resend)* — the monospace terminal window reads "engineer," not just "designer." Keep it, extend it to tech tags.
6. **Section eyebrows as wayfinding** *(GSAP's `{ }` device)* — the existing `.eyebrow` class may adopt a light typographic bracket treatment (`{ Experience }`) as a nod to GSAP without copying its colour taxonomy.
7. **Scroll as reveal, not decoration** *(comp2.md, ORYZO's full-viewport rhythm)* — scroll-linked motion is welcome when it reveals content (clip-path expands, elements settle into place), never as ambient parallax noise. See §7.

---

## 6. Components
*(Existing components, annotated with reference-inspired refinements)*

### Sticky Pill Navigation
Blurred, semi-transparent pill bar (999px radius), hairline border, 5px internal padding, 13px links. Already a step beyond Hyperstudio's floating hairline nav — keep as-is.

### Flip Portrait Card — **the signature element**
3D flip on hover (700ms, 10s return delay), photo front / initials-on-gradient back, hairline frame offset −18px with an accent corner bracket. The page's one bold risk. **Refinement:** swap the generic `700ms ease` for the signature curve `cubic-bezier(0.52, 0.01, 0, 1)` (§8).

### Ghost Button (primary + secondary)
8px radius, translucent wash `rgba(255,255,255,0.04)`, hairline-strong border; primary variant swaps to `--accent-muted` background + accent border + `#dcecff` text. **Never filled solid.**

### Glass Card Family (highlight / project / achievement / submission / timeline)
Shared language: 8px radius, `--line` border, white gradient wash (`0.055` → `0.025`). Unified across every card on the site — a real strength; keep unified.

### Terminal Window
macOS chrome dots (`--soft`, 999px), monospace body in `#d7e8ff`, hairline divider under the chrome bar. Expand the motif to tech tags (below).

### Tag Pill
999px radius, hairline border, `#c5d9f7` at 12px. **Refinement (Decision #7):** render tag text in the monospace stack — "these are technologies, not marketing labels."

### Section Eyebrow
12px / 750 / uppercase / 0.14em / `--accent-strong`. Optional `{ }` bracket treatment (§5.6).

### Timeline Row
220px meta column + flexible content column inside the glass-card family. No changes.

### Theme Toggle
8px radius, hairline border, hover lifts with accent-muted glow. Keep — the light theme is maintained, not vestigial.

### Scroll Reveal (`[data-reveal]`)
Existing 560ms fade-and-rise on section entry. Keep, but move to the signature easing curve (§8).

---

## 7. Drop-in Component Assessment — `components/comp2.md`

`comp2.md` is a SpaceX-style smooth-scroll hero (ReactLenis + framer-motion + react-icons): a sticky full-screen image whose `clip-path` expands as you scroll, plus parallax Unsplash imagery.

**Verdict: adopt the technique, not the component.** (Decision #12)

- ✅ **Take:** the scroll-linked clip-path reveal is genuinely engaging and fits "scroll as reveal" (§5.7). Applied to *our* content — e.g. the terminal window or a project screenshot expanding into view — it would be a modern upgrade with no identity cost. Lenis smooth-scroll is also a cheap, high-polish win site-wide.
- ❌ **Leave:** the stock-photo parallax gallery (three references explicitly ban photography-as-decoration), the zinc palette (violates our token system), `font-black uppercase` headings (violates our type voice), and react-icons/SiSpacex branding.
- **Cost note:** adopting it means adding `framer-motion` + `lenis` (~40kb gz). Acceptable if used for the hero reveal + smooth scroll; not acceptable for one-off decoration.

`comp1.md` is empty — nothing to assess.

---

## 8. Motion Philosophy

One named curve, everywhere: **`cubic-bezier(0.52, 0.01, 0, 1)`** — slow start, decisive stop, like optical focus pulling (Resend/Vivid+Co's documented signature; 150 occurrences in Vivid+Co's CSS). Replace every generic `ease` with it:

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hovers (buttons, cards, links) | 180ms | signature curve |
| Scroll reveals (`[data-reveal]`) | 560ms | signature curve |
| Portrait flip | 700ms | signature curve |
| Scroll-linked reveals (if comp2 technique adopted) | scroll-driven | linear-to-scroll, no easing needed |

**Don't** introduce springs, bounces, or scale-pop hovers. Every reference agrees: stillness and precision read as more confident than bounce. The existing `prefers-reduced-motion` guard stays mandatory.

---

## 9. Do's and Don'ts

### Do
- Keep the palette strictly monochrome-blue — `--accent` is the only chromatic colour in the system, in both themes.
- Use Inter for 100% of UI/body; reserve monospace exclusively for code-identity moments (terminal, tech tags).
- Hold the radius system to exactly two values: 8px and 999px.
- Let the flip-portrait card be the one loud element; keep everything around it quiet.
- Apply `cubic-bezier(0.52, 0.01, 0, 1)` as the single motion signature.
- Use hairline borders as the primary structural device between sections — never background-colour shifts.
- Keep the light theme in parity whenever a token or component changes.

### Don't
- Don't add a second accent colour — no green, orange, violet, or gold, regardless of how good it looks in the reference files.
- Don't fill any button solid — ghost/translucent only.
- Don't introduce a third border-radius value.
- Don't add spring/bounce motion or ambient parallax decoration.
- Don't use stock photography — the only photo on the site is the portrait; everything else is type, hairlines, and the terminal.
- Don't let card padding or grid gaps balloon — only inter-section spacing widens.

---

## 10. Decision Log

*Every design decision, in order. New entries are appended — never edited in place — so the trail stays complete.*

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Site structure: Home, About, Experience, Projects, Skills, Contact (6 pages) | Awards folded into About; Research folded into Projects — recruiter-facing sites don't need standalone pages for content that supports only 1–2 paragraphs |
| 2 | Google role framed as full-time 3-month Data Center Technician (Jun–Sept 2026), predictive content | User confirmed this is the actual upcoming role; content is forward-looking and should be revised once the role is underway |
| 3 | Research submissions (ICES Journal, MICCAI 2025) phrased as "submitted"/"findings submitted to," never "published" | Both submissions were rejected; "submitted" is accurate and still credible without overclaiming |
| 4 | Colours and fonts sourced directly from the live site's `src/index.css`, not invented | Per brief: "my site wins on colours and fonts" — real CSS custom properties, not guesses from a screenshot |
| 5 | Layout, structure, and motion synthesized from 5 references (ORYZO, Hyperstudio, Vivid+Co, Resend, GSAP); their colours/fonts explicitly NOT imported | Per brief: "the references win on layout and feel" — clean separation so the merge doesn't become a sixth generic dark-mode clone |
| 6 | Flip-portrait card designated the site's one signature/"loud" element | Most distinctive existing component, with no equivalent in any reference — boldness is spent in exactly one place |
| 7 | Terminal/monospace motif retained and extended to tech-tag pills | Validated by Resend's monospace developer-identity pattern; the site already has the seed of it |
| 8 | Motion signature: `cubic-bezier(0.52, 0.01, 0, 1)` replaces all generic `ease` | Resend/Vivid+Co's documented curve — one deliberate easing instead of default CSS |
| 9 | Hero display ceiling raised and inter-section spacing widened — flagged as recommendation | References consistently push both further than the live site |
| 10 | **Approved:** hero `h1` → `clamp(48px, 9vw, 120px)` with `-0.02em` tracking at the top of the range | Promotes Decision #9's type half from recommendation to spec, per this merge ("make it more engaging and aesthetic and modern") |
| 11 | **Approved:** inter-section padding → ~120px top / 96px bottom; card padding and grid gaps stay tight | Promotes Decision #9's spacing half to spec; references breathe between sections, not inside cards |
| 12 | `comp2.md` smooth-scroll hero: adopt the clip-path scroll-reveal technique and Lenis smooth scrolling; reject the stock-photo parallax, zinc palette, and heavy type | The technique modernizes the hero without identity cost; the component wholesale would violate the no-photography, one-palette, and type-voice rules. `comp1.md` is empty |
| 13 | Light theme documented as a first-class token set and kept in parity | It exists in shipped CSS and the toggle is a kept component; prior merge (DESIGN (5).md) omitted it |
| 14 | This file supersedes `design/DESIGN (5).md`; reference dumps stay in `design/` untouched | Single source of truth at project root, per brief; raw references remain available for future consultation |
| 15 | **Implemented (July 2026):** Decisions #8, #10, #11 applied to `src/index.css` / `src/App.jsx` — `--ease` token on every transition, hero at 120px with −0.02em tracking, 120/96px section rhythm, mono tech tags (with light-theme colour `#2f568f`), `{ }` eyebrow brackets via CSS pseudo-elements, orchestrated hero entrance (staggered rise per child, portrait scale-in), keyed route transitions (`.route-view`), stagger delays on all card grids via `--reveal-delay`/`--stagger`, terminal clip-path iris reveal (`.reveal-clip`), and a type-and-delete typing loop | Executes the approved spec; verified with a production build and headless-Chrome screenshots of all six routes |
| 16 | Decision #12's Lenis/framer-motion adoption re-scoped to a dependency-free implementation: the clip-path reveal is CSS-transition-driven (IntersectionObserver-triggered) instead of scroll-linked, and smooth scrolling stays native CSS | Same visual effect, zero new dependencies, zero bundle growth — the ~40kb cost in #12 was only acceptable *if* needed, and it wasn't |
| 17 | Route-change scroll reset switched from `behavior: "smooth"` to instant | A smooth multi-hundred-pixel scroll fights the new route-enter transition; the page transition is now the only motion on navigation |
| 18 | Reduced-motion guard extended to zero out animation/transition *delays*, not just durations | Staggered delays would otherwise leave content invisible for up to ~0.5s for reduced-motion users |
