# funky-ui — Design Guide (platform-neutral)

Read this when you want the funky-ui **look** somewhere the CSS can't follow —
native mobile, desktop toolkits (SwiftUI, Jetpack Compose, Flutter, Qt),
Python/tkinter, game UI, slides, anything that isn't web HTML.

On the web you don't need this file: load the stylesheet and use the classes
([html recipe](https://funky-ui.bsiku.dev/docs/api/recipes/html.md)). Everywhere
else, the CSS is useless but the **design system still holds** — it's just a set
of token values plus a few rules. This file is the whole system as raw values so
you can re-implement it in any styling language. Translate the tokens into that
platform's idioms; keep the rules.

---

## 1. Identity — what makes it "funky-ui"

A **neo-brutalist** system. The feeling is loud, flat, and physical:

- **Cream canvas, neon fills.** The background is warm cream (not white); content
  surfaces are pure white; accents are saturated neon. No muted pastels, no soft
  grays as the lead.
- **Thick black borders.** Every surface and control has a solid black outline
  (2px, 3px for emphasis). Always pure black `#000`, never a tinted gray.
- **Hard shadows, zero blur.** Shadows are solid offset rectangles — a black
  shape shoved down-and-right with **no blur and no spread softening**. This is
  the single most recognizable trait. A blurred drop-shadow is wrong.
- **Sharp corners.** Corner radius is `0`. Even "pills" are rectangular. Don't
  round anything.
- **Press into shadow.** Interactive elements sit *above* their hard shadow. On
  hover they sink halfway (shadow shrinks, element moves down-right); on
  press/active they sink fully (shadow gone, element fully offset). This is the
  signature motion — replicate it wherever the platform allows.

> If a platform can't do hard offset shadows or the press-sink motion, keep the
> borders + neon + sharp corners + bold type. Those four alone read as funky-ui.
> See fidelity notes at the end.

---

## 2. The three rules

1. **Loud by default.** There is no quiet default state. Components render at
   their boldest with zero configuration — neon fill, black border, hard shadow.
   Restraint is opt-in (a `neutral` variant), never the starting point.
2. **Press into shadow.** Interactive things float and sink. Don't invent a
   different hover/press feedback; use this one consistently.
3. **Fewer choices.** Options are deliberately narrow — a fixed set of
   variants/sizes/colors, nothing arbitrary. Never introduce off-token colors,
   ad-hoc spacing, or one-off type sizes. If a value isn't in the token tables
   below, it doesn't belong.

---

## 3. Tokens — the exact values

These are the single source of truth (compiled from `tokens.ts`). Re-express them
in your platform's units; keep the numbers.

### Color — surface & ink

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#fff5d1` | App background (cream) |
| `surface` | `#ffffff` | Cards, raised surfaces (white) |
| `sunken` | `#fff0b8` | Recessed areas |
| `ink` | `#222222` | Primary text / black-ish |
| `ink-muted` | `#6f6a52` | Secondary text |
| `ink-inverse` | `#ffffff` | Text on dark/neon fills |
| `line` | `#000000` | All borders (pure black) |

### Color — neon accents

| Token | Value | Role alias |
| --- | --- | --- |
| `pink` | `#ff4eba` | `primary` |
| `purple` | `#7828c8` | `secondary` |
| `green` | `#00c22a` | `success` |
| `orange` | `#ff9100` | `warning` |
| `cyan` | `#3decfd` | `info` |
| `yellow` | `#ffd500` | — |
| `sky` | `#00c8ff` | — |
| `danger` | `#ff3b3b` | `danger` (red) |
| `accent-soft` | `#f0fdff` | Faint cyan tint |

### Shadow — hard offset, blur 0

Format is `offset-x offset-y blur spread color`. **Blur and spread are always 0.**

| Token | Value |
| --- | --- |
| `shadow-sm` | `4px 4px 0 0 rgba(0,0,0,0.2)` |
| `shadow-md` | `6px 6px 0 0 rgba(0,0,0,0.2)` |
| `shadow-lg` | `8px 8px 0 0 rgba(0,0,0,0.2)` |

On platforms with only a single shadow primitive: a solid black rectangle at 20%
opacity, offset down-right by 4–8px, no blur.

### Shape

| Token | Value |
| --- | --- |
| `radius` | `0` (everything sharp) |
| `border-width` | `2px` |
| `border-width-bold` | `3px` |
| `border-color` | `#000000` |

### Spacing

| Token | Value (rem / px @16) |
| --- | --- |
| `space-xs` | `0.375rem` / 6px |
| `space-sm` | `0.5rem` / 8px |
| `space-md` | `0.75rem` / 12px |
| `space-lg` | `1rem` / 16px |
| `space-xl` | `1.5rem` / 24px |
| `space-2xl` | `2rem` / 32px |

### Type

- **Font family:** `Pretendard` (with system-ui fallbacks). It's a free Korean +
  Latin sans; on web it loads via CDN. On native, bundle Pretendard or fall back
  to the platform's neutral sans.
- **Weights:** medium `500`, bold `700`, black `900`. Headings and "chrome"
  labels are black-weight — funky-ui leans heavy.
- **Sizes (rem / px @16):** 2xs `0.625/10` · xs `0.75/12` · sm `0.875/14` ·
  md `1/16` · lg `1.125/18` · xl `1.25/20` · 2xl `1.5/24` · 3xl `1.875/30` ·
  4xl `2.25/36`.
- **Chrome style** (labels, nav, eyebrows): UPPERCASE, letter-spacing `0.05em`,
  black weight.

### Control heights

| Token | Value |
| --- | --- |
| `control-sm` | `1.75rem` / 28px |
| `control-md` | `2.25rem` / 36px |
| `control-lg` | `2.75rem` / 44px |

### Motion — the press

| Token | Value |
| --- | --- |
| `duration` | `100ms` |
| `easing` | `ease-out` |
| `press-offset` | `4px` |

Press behavior in three states:
- **Rest:** element at origin, full hard shadow (size by component: sm/md/lg).
- **Hover:** element moves `+2px, +2px`; shadow shrinks to `2px 2px`.
- **Active/pressed:** element moves `+4px, +4px` (the press-offset); shadow gone.
- **Disabled:** 50% opacity, no press.

Net effect: the element slides down-right into the space its shadow occupied, as
if physically pushed into the page.

---

## 4. Building a component from tokens

A funky-ui component is a recipe over these tokens. The shared anatomy:

- A rectangular box, `radius 0`.
- `2px` solid black border (`3px` for heavy emphasis).
- A fill: cream/white for neutral surfaces, a neon accent for emphasis or status.
- A hard shadow (sm/md/lg) if it's raised or interactive.
- Black-weight type for headings/labels; medium for body.
- If interactive: the press-into-shadow states above.

Examples to anchor the translation:

- **Button (primary):** neon-pink fill, black text or white per contrast, 2px
  black border, hard shadow-sm, sharp corners, press states. Padding from
  `space` tokens; height ≈ `control-md`.
- **StatTile:** solid neon fill, 2px border, hard shadow, a small uppercase label
  on top and a large black-weight number below.
- **Card:** white fill, 2px border, hard shadow, inner padding ≈ `space-lg`. No
  press (it's a container, not interactive).

The component catalog (names, props, variants) lives in the web docs
([atoms](https://funky-ui.bsiku.dev/docs/api/components/atoms.md) ·
[components](https://funky-ui.bsiku.dev/docs/api/components/components.md) ·
[templates](https://funky-ui.bsiku.dev/docs/api/components/templates.md)) — use
those for *what* exists and *what props* it takes; use this file for the *values*
to render it with.

---

## 5. Fidelity notes — what survives the jump

Platforms vary in what they can express. Priority when something has to give:

| Trait | Keep it? | If the platform can't |
| --- | --- | --- |
| Neon fills + cream bg | **Always** | (every platform can) |
| Pure-black borders | **Always** | Thicker stroke if 2px isn't available |
| Sharp corners (radius 0) | **Always** | (usually the easy default) |
| Black-weight type | **Always** | Heaviest available weight |
| Hard offset shadow | High | Approximate with a solid black box behind, or a thick bottom/right border; never a blurred shadow |
| Press-into-shadow motion | Medium | Drop to a simple offset-on-press, or a quick color/scale nudge; skip entirely if there's no interaction model |
| Pretendard font | Low | Any clean neutral sans |

The rank order of identity: **borders + neon + sharp corners + heavy type** come
first — get those and it already reads as funky-ui. Hard shadows and the press
motion are the icing that makes it unmistakable; add them where the platform
allows.

---

## Reference

- Package: `@studio-baeks/funky-ui` (npm) — web/React + the CSS this is distilled from
- Site: [funky-ui.bsiku.dev](https://funky-ui.bsiku.dev)
- AI index: [llms.txt](https://funky-ui.bsiku.dev/llms.txt)
- Web/HTML usage: [recipes/html.md](https://funky-ui.bsiku.dev/docs/api/recipes/html.md)
