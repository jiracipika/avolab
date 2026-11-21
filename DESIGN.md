# DESIGN.md — Avolab Solutions (avolab.ca)

## World

"Lab at night": near-black green-void surfaces, one acid-green accent, blueprint grid, film grain, editorial type. Dark is the world's choice, not a category default — the products glow on it.

## Tokens

- **Surfaces**: void `#070a08` (page), panel `#0d120e`, panel-2 `#111812`, line `rgba(242,245,238,0.08)`
- **Accent**: avo `#b4f24e` (CTA fills, focus, key-phrase emphasis), avo-deep `#7bc425`
- **Text**: cream `#f2f5ee` (primary), mist `#96a296` (secondary, 7.4:1 on void)
- **Fonts**: Space Grotesk (display), Inter (body)
- **Radius**: cards `1.5rem–2rem`, pills full, buttons `1rem` (`rounded-2xl`)
- **Shadows**: offset + blur only (e.g. `0 18px 44px -14px`). Zero-offset colored glows are banned.
- **Gradients**: allowed as ambient radial light fields and marquee edge fades; banned as text fills.

## Type rules

- Display: Space Grotesk bold, tracking ≤ −0.04em, max 6rem (hero may hit 13.5vw on small screens), leading 1.02–1.05.
- Body: Inter, 15–18px, mist on void or cream on panel; measure 60–72ch.
- Emphasis: weight, size, or solid avo on a phrase — never gradient text.
- Numerals in counts: `tabular-nums`.

## Motion

- Eases: `[0.22, 0.68, 0.22, 1]` entrances; springs (stiffness 180–300, damping 14–22) for interactive elements.
- Entrances: clip-path wipe for headings (`SectionHead`), blur+y for body groups, stagger ≤ 0.09s.
- Hero owns the signature moment: multi-axis pointer parallax (blobs ±38px, grid ±10px + 0.8° rotate) on top of scroll-linked drift.
- Every interactive element has hover + active + focus-visible + disabled states; all motion gated by `prefers-reduced-motion`.

## Bans (this project)

- No eyebrow/kicker labels above headings — the heading carries its own weight.
- No gradient text.
- No section numbers (01/02…).
- No uniform icon+title+text card grids — capabilities render as editorial index rows.
- No emoji/glyph standing in for icons — lucide or authored SVG only.
- No glass where a plain panel + border reads the same (the nav pill and status dot keep glass: functional).

## Components

`SectionHead` (wipe-in heading), `Reveal` (blur+y), `Magnetic`, `TiltCard` + `.spotlight`, marquee (hairline-dot separator), `Counter` (tabular, inline in prose), arcade poster→iframe swap, newsletter form states (loading/success/error), rotating badge, giant footer wordmark (18vw, white 3.5%).

## Browser surfaces (themed, not default)

Selection = avo fill; scrollbar = thin void/panel with avo hover; caret = avo; focus ring = 2px avo, offset 3px; skip-link visible on first Tab.
