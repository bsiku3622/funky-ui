# @studio-baeks/funky-ui

A loud, neo-brutalist React design system — neon on cream, thick black borders, hard offset shadows, and a signature press-into-shadow interaction.

It's the shared design language for the apps Studio Baeks builds for the Korea Science Academy of KAIST (KSA).

## Install

```bash
npm i @studio-baeks/funky-ui
```

## Usage

Import the stylesheet once at your app entry point, then use the components.

```tsx
import "@studio-baeks/funky-ui/styles.css";
import { Button, StatTile } from "@studio-baeks/funky-ui";

export const App = () => (
  <>
    <StatTile color="cyan" label="Active students" value="357" />
    <Button variant="primary">Press me</Button>
  </>
);
```

If you only need the tokens, import `@studio-baeks/funky-ui/tokens.css` to get the CSS variables (`--funky-*`) on their own.

## What's inside

- **Atoms** — Button · Input · SearchInput · Tag · Badge · Text · Icon
- **Components** — Card · StatTile · Accordion · Tabs · Modal · Panel · Window · Toolbar · Toast
- **Templates** — AppShell · ToolShell
- **Tokens** — color · shadow · radius · border · space · font · motion

Requires React 18+ (peer dependency).

## License

MIT © Studio Baeks
