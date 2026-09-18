# profilepage — Awwwards-Quality Redesign Plan

Applies `overview/SKILL8.MD` (build-awwwards-quality-sites) to the existing Next.js 14 profile site.
"Awwwards quality" here is an **acceptance bar**, not a claim of recognition.

---

## 0. Current state (audit)

| Area | Today | Verdict vs. skill |
|---|---|---|
| Framework | Next 14 App Router, TS, Tailwind 3.3, shadcn primitives | Keep |
| Motion | `framer-motion` ^12, `lib/motion.ts`, `Reveal`, `hooks/use-motion-prefs.ts` | **Replace** — skill requires GSAP as primary |
| Smooth scroll | none | **Add exactly one** (Lenis) |
| 3D / WebGL | none | Optional, must be justified |
| Content | `lib/content.ts` — single source of truth, 480 lines, typed | Keep, extend |
| Sections | hero → 01 about → 02 work → 03 stack → 04 journey → 05 contact | Keep sequence, re-choreograph |
| Imagery | **none** — `public/` holds only the CV PDF | **Critical gap** |
| Icons | `lucide-react` | **Swap** to Solar via Iconify |
| Avatar | none (monogram component) | **Needs a real photograph** |
| Theme | single dark "editorial ink" (`--ink 240 20% 4%`, mint `156 69% 55%`, signal blue) | Keep, refine |
| Decorative SVG | `hero-backdrop`, `system-diagram`, `flow-pipeline`, `ambient-backdrop`, `cursor-spotlight` | Audit — authored data-graphics OK, authored *illustrations* are not |

Hard blockers before any build: no photograph of the subject, no hero focal asset, no project imagery.

---

## 1. Art direction

**Visual thesis** — *"Systems, made legible."* A senior full-stack engineer is shown through the
artifacts of the work: pipelines, throughput, contracts between services. The page reads like a
technical dossier that has been art-directed — dense, monospaced metadata against large editorial
display type, with one cinematic focal image per act.

**Hero focal asset** — a single high-contrast portrait photograph, duotone-graded into the ink/mint
palette, held in a tall off-centre crop, with a WebGL displacement pass reacting to pointer
(see §5). Static poster ships first frame.

**Type hierarchy**
- Display: large-weight editorial sans (Inter tight tracking, or swap to a distinctive display face) — hero line, section titles.
- Body: Inter, 17–19px, generous measure (62–68ch).
- Metadata: JetBrains Mono, uppercase, 11–12px, wide tracking — indices (`01`), eyebrows, timeline dates, metric labels.

**Color system** (extend existing tokens, do not restart)
- `ink` — canvas, unchanged.
- `mint` — primary action + focus ring, unchanged.
- `signal` blue — secondary section tone, unchanged.
- Add `--paper-dim` for tertiary copy and one warm `--ember` used *once* (final CTA) so it retains meaning.

**Section sequence (motion narrative)**
1. **Hero** — name resolves out of the portrait; nav + message + CTA usable immediately.
2. **01 Positioning** — lede reveals word-by-word; `nowStrip` chips stagger in.
3. **02 Work** — case studies pin; each `systemFlows` diagram scrubs its path on scroll.
4. **03 Stack** — `capability-map` nodes settle into place; hover reveals links (CSS only).
5. **04 Journey** — timeline draws its spine as a scrubbed ScrollTrigger; roles snap past.
6. **05 Contact** — final CTA in `ember`; footer with honest provenance block.

**Smooth-scroll engine: Lenis.** Chosen over Locomotive Scroll — smaller, actively maintained, no
DOM transform wrapper (so `position: sticky`, the pinned case studies and the fixed nav keep working),
and a first-class ScrollTrigger integration. **Locomotive must not be installed.**

**Three.js: yes, scoped to the hero only.** Justification: the portrait displacement is the single
strongest authored moment and depends on a shader; nothing else on the page needs WebGL.
If the portrait asset cannot be sourced, drop Three.js entirely and ship the static duotone crop.

**Compatible installed web-design skill:** none of the currently installed skills is a web-design
aesthetic system (`artifact-design` targets Artifacts, not a Next.js app). Action: before build,
name and follow one installed web-design skill; if none exists, record that explicitly in the
handoff rather than inventing a system.

---

## 2. Asset system (blocking work)

| Asset | Source | Fallback |
|---|---|---|
| Hero portrait | **User-provided photograph** of Mas Agung Denisa Bekam. Required. | Typographic hero — display name at full bleed, no faked person |
| Case-study imagery (3–4) | Original generated abstract system stills, or appropriately licensed media; provenance comment beside each `import` | `aspect-ratio` placeholder block in `--line`, never a broken image |
| Avatars (testimonials/recommenders) | **Photographs only.** Ship a testimonial section *only* if real, attributable people consent. | **Omit the section.** No initials, no illustrated heads, no generated "customers" |
| Company logos | Iconify SVG Logos, only for employers that are real and truthfully stated (HeyRCG!, AI WorkLabs) | Omit the logo row. No Logo Ipsum, no logo-wall theater |
| Interface icons | **Solar** via Iconify (`@iconify/react` + `@iconify-json/solar`) — replaces `lucide-react` | — |
| Illustrative elements | Transparent PNG cutouts (generated or licensed). **No model-authored illustrative SVG/CSS/canvas paths.** | — |

Explicitly allowed as authored vector: the brand monogram, interface icons, and **data graphics** —
`system-diagram`, `flow-pipeline`, `capability-map` are diagrams of real data in `lib/content.ts`,
not illustrations, so they stay.

Audit and likely remove: `ambient-backdrop.tsx`, `hero-backdrop.tsx` — if these are decorative
authored shapes with no narrative role, they are "gradient blob" territory and go.

Every image gets: a fixed aspect ratio, deliberate `object-position`, real `alt` text (empty only
when truly decorative), `loading="lazy"` below the fold, `priority` on the hero only, and a
`next/image` `sizes` attribute.

---

## 3. Hero

- First viewport carries: name, headline (`person.headline`), location/availability line, two CTAs
  (email + CV download), and the portrait.
- **GSAP intro timeline**: nav fades → display name mask-reveals in two lines → headline words
  stagger (60ms) → CTAs scale in → scroll cue. Total ≤ 1.4s.
- Nav, headline and CTAs are **readable and clickable before the timeline finishes** — animate
  `opacity`/`transform` only, never `visibility` or `pointer-events`.
- Pointer effect on the shader is **additive**: `matchMedia('(pointer: fine)')` gates it; on
  `blur`, `visibilitychange` and touch the shader returns to its rest pose rather than freezing
  mid-interaction.
- **Static first frame** is complete with no JS, no WebGL, no media: server-rendered markup plus
  the duotone poster image.

---

## 4. Motion system

**Migration: `framer-motion` → GSAP.** Both must not coexist.

Files to rewrite:
- `lib/motion.ts` — becomes GSAP easing/duration tokens + a `registerScrollTriggers()` helper.
- `components/reveal.tsx` — `Reveal` keeps its API (`children`, delay) but drives a GSAP `from` tween via `useGSAP`.
- `hooks/use-motion-prefs.ts` — keep; becomes the single reduced-motion authority.
- Every `motion.*` usage in `hero`, `career-timeline`, `contact-card`, `capability-map`, `case-study`, `impact-metrics`, `site-nav`, `scroll-cue`, `cursor-spotlight`.

**Lenis ↔ ScrollTrigger contract** (one place, a `<SmoothScroll>` client provider in `app/layout.tsx`):
- `lenis.on('scroll', ScrollTrigger.update)`
- drive Lenis from `gsap.ticker`, `lagSmoothing(0)`
- `ScrollTrigger.refresh()` after `document.fonts.ready` and after hero media `load`
- on unmount: kill all triggers, remove the ticker callback, `lenis.destroy()`

**Reduced motion** (`prefers-reduced-motion: reduce`):
- Lenis is **never instantiated** — native scroll.
- No scrubbed or pinned timelines are created.
- Reveals render **final state immediately** (not a shortened tween).
- The shader canvas is replaced by the poster image.

**Text reveal accessibility**
- Split only plain text nodes. Never split a link, `<strong>`, or inline markup.
- The unsplit string stays as the accessible name (`aria-label` on the heading); split word spans get `aria-hidden="true"`.
- Without JS the heading renders unsplit and fully visible.

**Division of labour**
- CSS: hover, focus, active, tap, nav underline, card lift.
- GSAP: entrance choreography.
- ScrollTrigger: **only** the pinned case studies, the timeline spine draw, and the flow-pipeline scrub.
- No property is ever animated by two systems.

---

## 5. Three.js (hero only)

- One responsibility: displacement + duotone grade of the portrait, with a pointer-following ripple.
- Subordinate to content — the canvas is `aria-hidden`, sits behind text, and captures no pointer events that block the CTAs.
- Perf budget: `min(devicePixelRatio, 2)`; render paused via `IntersectionObserver` when offscreen and on `visibilitychange`; pointer input throttled to rAF; zero per-frame allocation (pre-allocate vectors/uniforms).
- Fallbacks: reduced motion → poster; WebGL context creation failure → poster; `webglcontextlost` → poster, page keeps working.
- Cleanup on unmount: cancel rAF, disconnect observers, remove listeners, dispose geometry, material, textures, render targets, then `renderer.dispose()`.

---

## 6. Quality bar

- Complete semantic page: responsive nav (existing `site-nav`, keep the mobile sheet), five sections, concrete conversion content (case studies with real outcomes from `caseStudies`), final CTA, footer, visible keyboard focus (`:focus-visible` mint ring already in `globals.css` — keep).
- Refine states for every interactive element: hover / focus-visible / active / loading / disabled / error / touch / reduced-motion.
- Performance: `next/image` with `sizes` everywhere, lazy below fold, bounded transforms, blur limited to the one hero vignette, capped canvas work, nothing animating offscreen.
- **Reject:** gradient blobs, ornamental bento grids, glass-everywhere, stock layouts, fabricated testimonials, invented partnerships, logo walls without proof, motion with no narrative role.
- Never describe the result as award-winning or Awwwards-recognized.

---

## 7. Validation checklist (pre-handoff)

- [ ] `npm run build` clean; `npm run typecheck` clean; `npm run lint` clean.
- [ ] Desktop (1440) and mobile (390) reviewed in browser.
- [ ] Keyboard: full tab order, visible focus on every control, skip-link to `#main` works.
- [ ] JS disabled: all copy present, hero complete, nav anchors work.
- [ ] `prefers-reduced-motion: reduce`: no Lenis instance, no scrub/pin, final states, poster instead of canvas.
- [ ] `grep -r "locomotive"` → no results. Exactly one Lenis instance.
- [ ] ScrollTrigger refreshes after fonts and hero media; all triggers killed on unmount.
- [ ] `grep -rn "lorem\|TODO\|placeholder\|Logo Ipsum"` in `app/ components/ lib/ public/` → clean.
- [ ] Every image has provenance recorded in source; no uncredited media; no unsupported claims.
- [ ] Split headings expose the unsplit accessible name.

---

## 8. Execution order

1. **Gather assets** (blocking): portrait photograph, case-study imagery, confirm which testimonials/logos are honestly available.
2. Install `gsap`, `@gsap/react`, `lenis`, `@iconify/react`, `@iconify-json/solar`; remove `framer-motion`, `lucide-react`.
3. Add `<SmoothScroll>` provider + rewrite `lib/motion.ts` and `reveal.tsx`.
4. Port components off `motion.*` one at a time; build after each.
5. Rebuild the hero (portrait, GSAP intro, then the shader as a separate commit so it can be dropped).
6. Audit/remove `ambient-backdrop` and `hero-backdrop`; keep the data diagrams.
7. Swap icons to Solar.
8. Type, color-token and spacing pass.
9. Run §7 checklist; write the handoff report (design skill used, asset sources, motion stack, Three.js decision, validation done, remaining limitations).

---

## 9. Open questions

1. Is there a usable photograph of the subject? Without it, the hero becomes typographic and Three.js is dropped.
2. Are the case-study clients nameable, or must they stay anonymized as they are in `lib/content.ts`?
3. Do real, consenting recommenders exist? If not, the testimonial section is omitted rather than faked.
4. Which installed web-design skill should be followed? None currently installed fits; needs a decision or an explicit "none".
