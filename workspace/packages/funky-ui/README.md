# @studio-baeks/funky-ui

A neo-brutalist React design system for [Class Explorer](https://classes.bsiku.dev): cream canvas, neon accents, 2px black lines, hard shadows, and buttons that sink into their shadow when pressed.

Docs and playground: **https://funky-ui.bsiku.dev**

## Install

```bash
npm install @studio-baeks/funky-ui
```

Requires React 19. Load the stylesheet once at your app entry, and the Pretendard Variable font in `index.html`.

```ts
import "@studio-baeks/funky-ui/styles.css";
```

```tsx
import { Button, Card, Text } from "@studio-baeks/funky-ui";

export function Example() {
  return (
    <Card>
      <Text variant="heading">Hello</Text>
      <Button accent="pink" variant="solid" shadow>
        Press me
      </Button>
    </Card>
  );
}
```

Tokens and vocabularies are exported from `@studio-baeks/funky-ui/tokens`.

## With Tailwind

All package CSS lives in the `fk` cascade layer. Declare the layer order at the top of your app CSS and import that CSS **before** the funky-ui stylesheet.

```css
@layer theme, base, fk, components, utilities;
@import "tailwindcss";
```

This keeps Tailwind utilities above funky-ui and funky-ui above the preflight reset. If `fk` comes before `base`, the preflight removes funky-ui's padding and borders.

## License

MIT
