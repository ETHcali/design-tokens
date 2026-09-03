/**
 * ETH Cali Tailwind preset — the token set as utility classes.
 *
 * Consumed by both properties:
 *   ethcali-web     (the site)
 *   wallet_ethcali  (the dApp)
 *
 * Every colour here points at a channel triple in tokens.css rather than a hex
 * literal. Two reasons, and both have bitten this codebase before:
 *
 *   1. One definition. A hex repeated here would drift from tokens.css exactly
 *      the way ethcaliorg/css/tokens.css drifted from branding_repo/tokens.css.
 *   2. Opacity modifiers keep working. `rgb(var(--x) / <alpha-value>)` is what
 *      makes `bg-surface-slab/50` produce 50% opacity. A bare `var(--x)` would
 *      make Tailwind emit the colour and silently drop the `/50`.
 *
 * IMPORTANT: this preset assumes tokens.css is loaded. Import it once, globally
 * (Next.js: in _app.tsx or the root layout) — without it every class below
 * resolves to `rgb()` with no channels and paints nothing.
 */

/** `--name-rgb` → a Tailwind colour that honours the `/opacity` modifier. */
const token = (name) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

module.exports = {
  theme: {
    extend: {
      colors: {
        'eth-blue': {
          DEFAULT: token('eth-blue'),
          lift: token('eth-blue-lift'),
          deep: token('eth-blue-deep'),
          text: token('eth-blue-text'),
          // Fixed-alpha by design: a wash is a wash at 14%. No modifier.
          wash: 'var(--eth-blue-wash)',
          ring: 'var(--eth-blue-ring)',
        },
        'on-brand': token('on-brand'),

        surface: {
          void: token('surface-void'),
          slab: token('surface-slab'),
          inset: token('surface-inset'),
          ridge: token('surface-ridge'),
          paper: token('surface-paper'),
        },

        content: {
          primary: token('text-primary'),
          secondary: token('text-secondary'),
          muted: token('text-muted'),
          faint: token('text-faint'),
        },

        line: {
          hairline: 'var(--line-hairline)',
          strong: 'var(--line-strong)',
          brand: 'var(--line-brand)',
        },

        // Never decorative. Green means something succeeded on-chain.
        signal: {
          confirmed: token('signal-confirmed'),
          pending: token('signal-pending'),
          reverted: token('signal-reverted'),
        },
      },

      fontFamily: {
        sans: ['Sarun Pro', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      // Sarun Pro has no 600; it steps Medium 500 → Bold 700. `font-semibold`
      // is mapped to 700 so it renders as designed instead of being synthesised.
      fontWeight: {
        book: '300',
        normal: '400',
        medium: '500',
        semibold: '700',
        bold: '700',
        black: '900',
      },

      borderRadius: {
        chip: 'var(--radius-chip)',
        control: 'var(--radius-control)',
        card: 'var(--radius-card)',
        full: 'var(--radius-full)',
      },

      spacing: {
        // Minimum comfortable touch target. Use on every onchain button.
        tap: 'var(--tap-min)',
        gutter: 'var(--gutter)',
        nav: 'var(--nav-h)',
      },

      maxWidth: {
        page: 'var(--page-max)',
      },

      transitionTimingFunction: {
        DEFAULT: 'var(--ease)',
        brand: 'var(--ease)',
      },

      transitionDuration: {
        fast: '120ms',
        base: '200ms',
        slow: '280ms',
      },
    },
  },
};
