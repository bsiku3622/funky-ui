# Plain HTML — funky-ui without React

funky-ui is a **zero-runtime** system: every component is just a string of global
CSS classes, and the React layer only assembles that string. So you can drop the
exact same look into plain HTML — no build step, no npm, no React. Add one
stylesheet and write the class names by hand.

The only pieces that need JavaScript are the three stateful components
(`Modal`, `Tabs`, `Accordion`); everything else — including the signature
press-into-shadow — is pure CSS.

> For non-web targets (native, Python/tkinter, Flutter, …) there is no CSS to
> reuse. Read [`design.md`](https://funky-ui.bsiku.dev/docs/api/design.md) instead
> and translate the tokens into that platform's styling.

---

## 1. Load the stylesheet

One `<link>` from the jsDelivr CDN. `styles.css` `@import`s `tokens.css`
(which itself pulls the Pretendard font), so this single line brings the whole
system — variables, font, and all component classes.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@studio-baeks/funky-ui/dist/styles.css"
/>
```

Pin a version for production stability:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@studio-baeks/funky-ui@0.1.1/dist/styles.css" />
```

Tokens only (just the `--funky-*` variables + reset, no component classes):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@studio-baeks/funky-ui/dist/tokens.css" />
```

The system sets `background: var(--funky-bg)` (cream) and the base font on
`<body>` for you. A minimal page:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@studio-baeks/funky-ui/dist/styles.css" />
  </head>
  <body>
    <button class="funky-button funky-pressable funky-button--primary" type="button">
      Loud by default
    </button>
  </body>
</html>
```

---

## 2. The class-name contract

The React prop → CSS class mapping is mechanical:

| React | HTML class |
| --- | --- |
| `<Button variant="primary" size="lg">` | `class="funky-button funky-pressable funky-button--primary funky-button--lg"` |
| `<Tag color="cyan">` | `class="funky-tag funky-tag--cyan"` |
| `<Text variant="chrome" muted>` | `class="funky-text funky-text--chrome funky-text--muted"` |

Rules of thumb:

- **Base class is always present** (`funky-button`, `funky-tag`, …).
- **A prop becomes a `--modifier` class** (`funky-button--primary`,
  `funky-tag--cyan`). The *default* value is the bare base with no modifier
  (e.g. `Tag color="neutral"` and `Button size="md"` add nothing extra).
- **Anything interactive also needs `funky-pressable`** — that's the class that
  does press-into-shadow. Buttons in the recipes below include it; if you make
  your own pressable element, add it.

---

## 3. Atoms

### Button

`variant`: `primary · secondary · success · warning · danger · info · neutral · ink`
(neutral is the visual default). `size`: `sm · md · lg` (md default — omit the class).
Always include `funky-pressable`.

```html
<button class="funky-button funky-pressable funky-button--primary" type="button">Primary</button>
<button class="funky-button funky-pressable funky-button--danger funky-button--sm" type="button">Small danger</button>
<button class="funky-button funky-pressable funky-button--neutral" type="button" disabled>Disabled</button>

<!-- leading / trailing icon: just drop the glyph inside -->
<button class="funky-button funky-pressable funky-button--success" type="button">
  <span class="funky-icon" style="width:18px;height:18px">✓</span>
  Saved
</button>
```

### Input

A wrapper `div` holds the field and optional icon slots.

```html
<!-- plain field -->
<div class="funky-input">
  <input class="funky-input__field" placeholder="Your name" />
</div>

<!-- full width -->
<div class="funky-input funky-input--full">
  <input class="funky-input__field" placeholder="Stretches to parent" />
</div>

<!-- with leading icon -->
<div class="funky-input">
  <span class="funky-input__icon">@</span>
  <input class="funky-input__field" placeholder="handle" />
</div>
```

### SearchInput

It's just an `Input` pre-wired with a search glyph and `type="search"`.

```html
<div class="funky-input">
  <span class="funky-input__icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </span>
  <input class="funky-input__field" type="search" placeholder="Search..." />
</div>
```

### Tag / Badge

Small inline chips. `color`: `neutral · pink · purple · cyan · yellow · orange · sky · green`.
Tag defaults to `neutral` (no modifier); Badge defaults to `pink`.

```html
<span class="funky-tag">neutral</span>
<span class="funky-tag funky-tag--cyan">cyan</span>

<span class="funky-badge funky-badge--pink">3</span>
<span class="funky-badge funky-badge--green">NEW</span>
```

### Text

`variant`: `heading · body · chrome`. The React component picks a semantic tag by
variant (`heading`→`h2`, `body`→`p`, `chrome`→`span`) — match that, or use any tag
you need. Add `funky-text--muted` for muted ink.

```html
<h2 class="funky-text funky-text--heading">Black-weight display</h2>
<p class="funky-text funky-text--body">Readable medium-weight prose.</p>
<span class="funky-text funky-text--chrome">UPPERCASE TRACKED LABEL</span>
<p class="funky-text funky-text--body funky-text--muted">Muted secondary line.</p>
```

### Icon

A square slot for any glyph/SVG you bring. The system ships no icon set; size is
set inline.

```html
<span class="funky-icon" style="width:20px;height:20px">
  <svg><!-- your svg --></svg>
</span>
```

---

## 4. Components

### Card

A bordered "껍데기" frame. Padded by default (inner `__body` wrapper). For flush
content, drop the wrapper.

```html
<!-- padded (default) -->
<div class="funky-card">
  <div class="funky-card__body">
    <h2 class="funky-text funky-text--heading">Card title</h2>
    <p class="funky-text funky-text--body">Anything goes inside.</p>
  </div>
</div>

<!-- flush (padded={false}) -->
<div class="funky-card">
  <img src="cover.jpg" alt="" style="width:100%;display:block" />
</div>
```

### StatTile

A finished stat unit: solid neon fill + big black number. `color`:
`pink · purple · cyan · yellow · orange · sky · green`. `hint` line is optional.

```html
<div class="funky-stat-tile funky-stat-tile--cyan">
  <span class="funky-stat-tile__label">Revenue</span>
  <span class="funky-stat-tile__value">$12,400</span>
  <span class="funky-stat-tile__hint">+12% this week</span>
</div>
```

---

## 5. Stateful components (need JavaScript)

These three carry open/active state. The CSS provides the *visuals*; you wire the
state toggles. Below is plain dependency-free JS — match the class names exactly.

### Accordion

Toggle `aria-expanded`, the chevron's `--open` modifier, and the panel's
visibility.

```html
<div class="funky-accordion">
  <div class="funky-accordion__item">
    <button class="funky-accordion__header" type="button" aria-expanded="false" aria-controls="acc-1">
      <span>Section one</span>
      <span class="funky-accordion__chevron">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </button>
    <div class="funky-accordion__panel" id="acc-1" role="region" hidden>
      Panel content, revealed when open.
    </div>
  </div>
</div>

<script>
  document.querySelectorAll(".funky-accordion__header").forEach((header) => {
    header.addEventListener("click", () => {
      const open = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", String(!open));
      header.querySelector(".funky-accordion__chevron")
        .classList.toggle("funky-accordion__chevron--open", !open);
      document.getElementById(header.getAttribute("aria-controls")).hidden = open;
    });
  });
</script>
```

### Tabs

Move the `--active` modifier and `aria-selected`, and show only the matching
panel. Pair triggers and panels by a shared `data-value`.

```html
<div class="funky-tabs">
  <div class="funky-tabs__list" role="tablist">
    <button class="funky-tabs__trigger funky-tabs__trigger--active" role="tab" aria-selected="true" data-value="overview">Overview</button>
    <button class="funky-tabs__trigger" role="tab" aria-selected="false" data-value="details">Details</button>
  </div>
  <div class="funky-tabs__panel" role="tabpanel" data-value="overview">Overview panel.</div>
  <div class="funky-tabs__panel" role="tabpanel" data-value="details" hidden>Details panel.</div>
</div>

<script>
  document.querySelectorAll(".funky-tabs").forEach((tabs) => {
    const triggers = tabs.querySelectorAll(".funky-tabs__trigger");
    const panels = tabs.querySelectorAll(".funky-tabs__panel");
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const value = trigger.dataset.value;
        triggers.forEach((t) => {
          const on = t === trigger;
          t.classList.toggle("funky-tabs__trigger--active", on);
          t.setAttribute("aria-selected", String(on));
        });
        panels.forEach((p) => { p.hidden = p.dataset.value !== value; });
      });
    });
  });
</script>
```

### Modal

An overlay holds a centered panel. Close on the × button, the backdrop, and Esc.
Click on the panel itself must not bubble to the overlay.

```html
<button class="funky-button funky-pressable funky-button--primary" type="button" id="open-modal">Open</button>

<div class="funky-modal__overlay" id="modal" hidden>
  <div class="funky-modal" role="dialog" aria-modal="true">
    <div class="funky-modal__header">
      <span>Confirm</span>
      <button class="funky-modal__close" type="button" aria-label="Close">×</button>
    </div>
    <div class="funky-modal__body">Are you sure?</div>
    <div class="funky-modal__footer">
      <button class="funky-button funky-pressable funky-button--neutral" type="button" data-close>Cancel</button>
      <button class="funky-button funky-pressable funky-button--danger" type="button">Delete</button>
    </div>
  </div>
</div>

<script>
  const overlay = document.getElementById("modal");
  const panel = overlay.querySelector(".funky-modal");
  const open = () => { overlay.hidden = false; };
  const close = () => { overlay.hidden = true; };

  document.getElementById("open-modal").addEventListener("click", open);
  overlay.addEventListener("click", close);                       // backdrop
  panel.addEventListener("click", (e) => e.stopPropagation());    // keep panel clicks inside
  overlay.querySelector(".funky-modal__close").addEventListener("click", close);
  overlay.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) close();
  });
</script>
```

---

## 6. Template — AppShell

The full app frame: purple top navbar + cream sidebar + content + mobile bottom
nav. Nav items are `<a>` (with `href`) or `<button>`; mark the current one with
`--active`.

```html
<div class="funky-appshell">
  <header class="funky-appshell__navbar">
    <span class="funky-appshell__brand">ACME</span>
    <div class="funky-appshell__account">
      <button class="funky-button funky-pressable funky-button--ink funky-button--sm" type="button">Account</button>
    </div>
  </header>

  <div class="funky-appshell__body">
    <aside class="funky-appshell__sidebar">
      <div class="funky-appshell__sidebar-head">ACME</div>
      <nav class="funky-appshell__nav">
        <p class="funky-appshell__nav-label">Main Navigation</p>
        <a class="funky-nav-item funky-nav-item--active" href="#"><span>Dashboard</span></a>
        <a class="funky-nav-item" href="#"><span>Reports</span></a>
      </nav>
      <div class="funky-appshell__sidebar-foot">
        <div class="funky-appshell__status-card">
          <p class="funky-appshell__status-card-title">SYSTEM STATUS</p>
          <p class="funky-appshell__status-card-text">All Systems Go</p>
        </div>
      </div>
    </aside>

    <main class="funky-appshell__content">
      <!-- page content -->
    </main>
  </div>

  <nav class="funky-appshell__bottom-nav">
    <a class="funky-bottom-nav-item funky-bottom-nav-item--active" href="#"><span>Dashboard</span></a>
    <a class="funky-bottom-nav-item" href="#"><span>Reports</span></a>
  </nav>
</div>
```

---

## 7. Keep the rules

The three system rules apply identically in HTML:

1. **Loud by default** — use the bold base classes; reach for `--neutral` to be quiet.
2. **Press into shadow** — put `funky-pressable` on interactive elements; never
   re-create the sink with your own `transform`.
3. **Fewer choices** — express intent with the `--modifier` classes only. Don't
   inject raw hex or ad-hoc inline styles; if you need a value, pull it from a
   `var(--funky-*)` token (see [`tokens`](https://funky-ui.bsiku.dev/docs/api/foundations/tokens.md)).
