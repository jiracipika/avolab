# DESIGN.md — Avolab Solutions (avolab.ca)

## World

"Lab at night": near-black green-void surfaces, one acid-green accent, ambient light fields, film grain, editorial type, and the studio's own products on a bench in the first screen. Dark is the world's choice, not a category default — the products glow on it.

## Tokens

- **Surfaces**: void `#070a08` (page), panel `#0d120e`, panel-2 `#111812`, line `rgba(242,245,238,0.08)`
- **Accent**: avo `#b4f24e` (CTA fills, focus, key-phrase emphasis), avo-deep `#7bc425`
- **Text**: cream `#f2f5ee` (primary), mist `#96a296` (secondary, 7.4:1 on void)
- **Fonts**: Space Grotesk (display), Inter (body)
- **Radius**: cards `1.5rem–2rem`, pills full, buttons `1rem` (`rounded-2xl`), shelf windows `12–14px`
- **Shadows**: offset + blur only (e.g. `0 18px 44px -14px`). Zero-offset colored glows are banned.
- **Gradients**: allowed as ambient radial light fields; banned as text fills.

## Type rules

- Display: Space Grotesk bold, tracking ≤ −0.04em, leading 0.98–1.05. The hero statement is sized against viewport height as well as width (`.hero-title`: `clamp(3.5rem, min(9vw, 12.2vh), 6rem)` on ≥768px) so it and the shelf always share the first screen.
- Body: Inter, 15–18px, mist on void or cream on panel; measure 60–72ch.
- Emphasis: weight, size, or solid avo on a phrase — never gradient text.
- Numerals in counts: `tabular-nums`.

## First paint

The statement, the supporting copy and both calls to action are server-rendered and static: they are fully visible on the first frame and never wait on an animation (measured LCP 0.3–0.5 s locally; the previous entrance choreography pushed it to 2.1 s). Motion may start from a visible state (blur-in, small rise) but may not hide primary content first.

## Motion

- Eases: `[0.22, 0.68, 0.22, 1]`; springs (stiffness 60–300) for interactive elements.
- Entrances: clip-path wipe for headings (`SectionHead`), blur+y for body groups, stagger ≤ 0.09s.
- **The shelf is the authored moment.** Depth is carried by three cues that must agree: blur, size and light falloff. Every layer's motion follows its depth — under the pointer, nearer windows travel further (centre ±22px, far ends ±5px, on both axes); on scroll the bench tilts back, scatters outward and falls out of focus. Hovering a blurred window brings it sharp without moving its link. One off-brand light (the blue field) drifts slowly through neighbouring hues; the lime brand light never shifts.
- Ambient light may move; information may not. HUD-like content never animates its position.
- All motion is gated by `prefers-reduced-motion` (pointer parallax, tilt, scatter and hue drift all stop; the static depth-of-field look stays).
- Pointer parallax listens to `pointerType === "mouse"` only — a finger dragging the page is not a pointer hovering it.

## Layout invariants

- Any absolutely positioned glow wider than the viewport must live inside an `overflow-hidden` ancestor; otherwise the page overflows sideways on phones (this happened: the Arcade glow).
- No horizontal document overflow at any width from 320px up; verify under true mobile emulation (`isMobile`), not a narrow desktop viewport.
- On phones (≥380px wide) the two hero calls to action share one row as equal halves; both are 54px tall and match exactly (a bordered button and an unbordered one differ by 2px otherwise). Button labels are wrapped in a `whitespace-nowrap` span.

## Content rules

- A product named as evidence is a link to the live thing (`.product-link`).
- Product screenshots in `public/shots/` are recaptured from production; refresh them when a product redesigns.
- Control hints follow what the visitor is holding (`(hover: none) and (pointer: coarse)`), never the screen width.
- Every number on the page is derivable from `lib/apps.ts`.

## Bans (this project)

- No eyebrow/kicker labels above headings — the heading carries its own weight.
- No gradient text.
- No section numbers (01/02…).
- No uniform icon+title+text card grids — capabilities render as editorial index rows.
- No emoji/glyph standing in for icons — lucide or authored SVG only.
- No glass where a plain panel + border reads the same (the nav pill and status dot keep glass: functional).
- No decorative hairline grid backgrounds.

## Components

`Hero` (static statement + `Shelf`), `Shelf` (the product bench: a snap-scrolling row on phones with whole, uncropped screenshots; a symmetric depth-of-field bench with pointer parallax on wider screens), `SectionHead` (wipe-in heading), `Reveal` (blur+y), `Magnetic`, `TiltCard` + `.spotlight`, `Counter` (tabular, inline in prose), arcade poster→iframe swap, newsletter form states (loading/success/error), rotating badge, giant footer wordmark (18vw, white 3.5%).

## Browser surfaces (themed, not default)

Selection = avo fill; scrollbar = thin void/panel with avo hover; caret = avo; focus ring = 2px avo, offset 3px; skip-link visible on first Tab.
