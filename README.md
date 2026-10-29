# funky-ui

A neo-brutalist React design system for Class Explorer. Cream canvas, neon accents, 2px black lines, hard shadows — and controls that sink into their shadow when pressed.

## Structure

The system stacks in one direction; every layer reads only the layers before it.

| Layer | | |
|---|---|---|
| Foundations | 5 systems | `Color · Typography → Shape → Layout → Motion` |
| Primitives | 14 | `Box · Text · Icon · VisuallyHidden · Portal → Surface · Paint · Glass · Pressable · Selectable · Floating · Stack · Inline · Grid` |
| Atoms | 14 | `Button · IconButton · NavButton · Link · Badge · Spinner · Divider · Input · Textarea · Select · Checkbox · Radio · Switch · Label` |
| Molecules | 15 | `Card · SectionTitle · PageHeader · Accordion · SegmentedControl · Tabs · Menu · Modal · Tooltip · SearchField · FormField · Stat · Meter · Notice · EmptyState` |
| Components | 8 | `AppBar · SideNav · BottomNav · TermSwitcher · StudentBadge · PersonCard · ClassTile · TimetableGrid` |

Atoms and Molecules are generic. Components are specific to Class Explorer.

Primitives come in two tiers. The first tier (Box, Text, Icon, VisuallyHidden, Portal) depends on nothing. The second tier adds exactly one capability on top of Box: painting, pressing, selecting, floating or layout. **Surface** paints boxes with the neutral fills (canvas, raised, sunken, well, inverse, or none for rows that sit on another surface), the purple brand fill that only the app bars use, and an optional neutral hover layer, **Paint** paints elements with accent × variant in every state, hover included — the variant system exposed as a primitive — **Glass** paints translucent white glass on coloured bars, **Pressable** makes an element a press target: semantics, cursor, disabled state and the none, sink, raise, lift and tap motions, with no colour of its own, **Selectable** announces that an element is selected with exactly one aria attribute chosen by its role and, with `grow`, draws the selected item at 105% (the selected colour stays with the paint primitives), and **Floating** places a panel next to its anchor — in the document body or inside an open modal — picks its stacking layer, reports outside presses and Escape, moves focus on open and plays the enter motion. Among primitives only Paint carries an accent, and everything inside a Paint follows its colour; boxes that are not painted (Box, Surface, Card) have none. Button is Pressable + Selectable + Paint, a pressable Card is Pressable + Surface, NavButton is Pressable + Selectable + Glass and Menu is Floating + Surface + a selectable group; Badge, Notice and the modal header bar are built on Paint, the app bars on Surface's brand fill, and Card, Modal and Menu panels on Surface.

Colour is two axes: **accent** (9 — black/system, pink/primary, purple/secondary, cyan, yellow, orange, sky, green/success, red/error) × **variant** (11 — filled, outline, hairline, frameline, framelineMuted, plain, solid, solidMuted, muted, ghost, ghostMuted). Every accent has a five-step ladder (ink · solidInk · solid · soft · softInk) whose text steps pass WCAG AA on the cream canvas. Shadows come in two depths only: 4px for raised objects, 6px for modals.

Styles are written with vanilla-extract and ship in a single cascade layer `fk`. The canonical inventory is `workspace/packages/funky-ui/src/inventory.ts`; the playground and docs derive from it.

## Running

```bash
cd workspace
pnpm install
pnpm dev          # playground and docs on http://localhost:5190
pnpm typecheck
pnpm build        # package (dist: JS, CSS, types), then the site
```

Docs (Korean) live in [`docs/`](docs/README.md) and are served by the site straight from the source.

## Licence

MIT © Jaewon Baek
