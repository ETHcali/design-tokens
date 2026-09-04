# @ethcali/design-tokens

**Design** tokens — colours, typography, spacing, radii. This package contains no
smart contracts, no token addresses and no ABIs. If you are looking for ERC-20s,
you want `scs-ethcali`.

The ETH Cali design system as data. **This is the source of truth** — both
`ethcali-web` (the site) and `wallet_ethcali` (the dApp) consume it, and neither keeps
a copy.

It exists because the tokens were previously duplicated in `branding_repo/tokens.css`
and `ethcaliorg/css/tokens.css`, and had already drifted: the site copy had gained
`@font-face`, `--eth-blue-ring`, `--on-brand` and layout tokens that the "source of
truth" file never got.

## Install

```bash
npm i "@ethcali/design-tokens@github:ETHcali/design-tokens#v1"
```

The workspace is independent repos with no root `package.json`, so this installs from
git rather than a registry. Pin the tag — `#v1`, not `#main` — so a token change never
lands in a consumer without a deliberate bump.

## Use

**1. Load the CSS once, globally.** Nothing works without it: the Tailwind preset emits
`rgb(var(--surface-slab-rgb) / …)`, and with no variables defined that paints nothing.

```ts
// pages/_app.tsx  (or app/layout.tsx)
import '@ethcali/design-tokens/tokens.css';
```

**2. Extend the Tailwind config.**

```js
// tailwind.config.js
module.exports = {
  presets: [require('@ethcali/design-tokens/tailwind-preset')],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
};
```

## What you get

| Class | Token |
|---|---|
| `bg-surface-void` | page background |
| `bg-surface-slab` | card |
| `bg-surface-inset` | nested surface / input |
| `text-content-primary` `-secondary` `-muted` `-faint` | text ramp |
| `border-line-hairline` `-strong` `-brand` | dividers |
| `bg-eth-blue` `text-eth-blue-text` | brand |
| `text-signal-confirmed` `-pending` `-reverted` | state |
| `rounded-chip` `-control` `-card` `-full` | radii |
| `min-h-tap` | 48px touch target |
| `max-w-page` | 1200px |

Opacity modifiers work everywhere they should: `bg-surface-slab/50`, `bg-eth-blue/15`.

## Rules

- **Never write a raw hex in a component.** If a token is missing, add it here first.
- **Colours are defined once**, as a channel triple (`--surface-slab-rgb: 12 13 22`).
  The `--surface-slab` you use in CSS is derived from it. Adding a colour means adding
  both lines — never a second hex.
- **Signal colours are not decorative.** `--signal-confirmed` green means something
  succeeded on-chain. A merely pleasant green is a brand colour, not a signal.
- **Sarun Pro has no 600.** It steps Medium 500 → Bold 700. The preset maps
  `font-semibold` to 700 so it renders as drawn instead of being synthesised.
- **Fixed-alpha tokens take no opacity modifier.** `--eth-blue-wash` is a wash at 14%
  by definition; `bg-eth-blue-wash/50` will not do what you expect. Use
  `bg-eth-blue/7` if you want a different one.

## Fonts

Five weights of Sarun Pro ship as woff2 in `fonts/`, declared in `tokens.css` with
paths relative to that file. Preload Black and Book on every page:

```html
<link rel="preload" href="/fonts/SarunPro-Black.woff2" as="font" type="font/woff2" crossorigin>
```

JetBrains Mono (400/500/700) is not bundled — pull it from Google Fonts.
