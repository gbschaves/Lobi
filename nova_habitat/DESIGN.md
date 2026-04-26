---
name: Nova Habitat
colors:
  surface: '#12131a'
  surface-dim: '#12131a'
  surface-bright: '#383941'
  surface-container-lowest: '#0d0e15'
  surface-container-low: '#1a1b22'
  surface-container: '#1e1f26'
  surface-container-high: '#292931'
  surface-container-highest: '#33343c'
  on-surface: '#e3e1ec'
  on-surface-variant: '#bbcac0'
  inverse-surface: '#e3e1ec'
  inverse-on-surface: '#2f3038'
  outline: '#85948b'
  outline-variant: '#3c4a42'
  surface-tint: '#45dfa4'
  primary: '#5af0b3'
  on-primary: '#003825'
  primary-container: '#34d399'
  on-primary-container: '#00563b'
  inverse-primary: '#006c4b'
  secondary: '#ffb2b9'
  on-secondary: '#67001f'
  secondary-container: '#891933'
  on-secondary-container: '#ff97a3'
  tertiary: '#e8ccff'
  on-tertiary: '#490081'
  tertiary-container: '#d5a9ff'
  on-tertiary-container: '#662a9f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#68fcbf'
  primary-fixed-dim: '#45dfa4'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#ffdadc'
  secondary-fixed-dim: '#ffb2b9'
  on-secondary-fixed: '#400010'
  on-secondary-fixed-variant: '#891933'
  tertiary-fixed: '#f0dbff'
  tertiary-fixed-dim: '#ddb8ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#62259b'
  background: '#12131a'
  on-background: '#e3e1ec'
  surface-variant: '#33343c'
typography:
  headline-xl:
    fontFamily: Clash Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Clash Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Clash Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

Nova Habitat is a next-generation real estate platform that leaves the corporate and stiff tropes behind. The brand personality is bold, dynamic, and unapologetically modern—embracing a "Cyber-Organic" aesthetic. It targets a demographic that appreciates high-end design, digital innovation, and seamless experiences without the traditional coldness of legacy tech.

The visual style is built on high-contrast **Neon-Glassmorphism**. It utilizes pure, deep graphite backgrounds to let the vibrant, energetic accent colors pop. Every interaction should feel snappy, responsive, and tactile, relying on luminous hover states and crisp animations to guide the user.

## Colors

The palette is anchored in an ultra-modern, neutral Dark Mode (Graphite/Zinc), entirely devoid of corporate blues. 

The primary color is an electrifying **Mint Emerald**, used for primary actions, success states, and key interactive elements—signifying wealth, growth, and eco-modernity. A vibrant **Sunset Coral** serves as the secondary tone, providing a warm, human contrast for notifications or important secondary actions. 

A specialized **Digital Amethyst** acts as the tertiary accent, used for premium features, AI-driven insights, or subtle gradients. Backgrounds are deep and void-like, ensuring the neon-tinted surface containers and glowing borders command attention.

## Typography

This design system utilizes a contemporary dual-font strategy. **Clash Display** is used for headlines, bringing a striking, slightly brutalist but highly legible character that makes property titles and large numbers visually arresting. **Plus Jakarta Sans** is employed for body text and labels, chosen for its exceptional geometric clarity and modern tech feel.

Letter spacing is tightened on headlines for a bold, poster-like impact, while labels are slightly tracked out to maintain legibility when overlaid on complex property images or blurred backgrounds.

## Layout & Spacing

The design follows a **12-column fluid grid** for property exploration and a **fixed-width container** for dashboards and forms. A strict 8px mathematical rhythm ensures crisp alignment across the SPA.

Layouts prioritize stark contrasts. Generous negative space (deep black) is used to frame glowing, semi-transparent components, making the UI feel like a sophisticated dashboard floating in space.

## Elevation & Depth

Depth is achieved through luminous borders and blurred backdrops rather than dark drop-shadows.
- **Level 1 (Base):** Deep, almost pure black background (`#09090b`).
- **Level 2 (Cards/Surface):** Semi-transparent graphite (20% opacity) with a `backdrop-filter: blur(16px)`. Edges are defined by a crisp, 1px border at 15% opacity of the primary Mint color.
- **Level 3 (Modals/Popovers):** Higher opacity fills with intense blurs and a prominent inner glow border.
- **Interactive Depth:** On hover, elements elevate by intensifying the primary Mint outer glow (`box-shadow: 0 0 24px rgba(52, 211, 153, 0.25)`) and slightly increasing surface brightness.

## Shapes

The shape language blends sharp precision with soft touchpoints. Core components use a standard **0.5rem (8px)** radius for a structured tech feel, while larger imagery and modal windows utilize a **1.5rem (24px)** radius. Buttons and interactive tags are fully rounded (Pill-shaped) to clearly signal interactivity against the more structured grid of the property cards.

## Components

### Navigation
A floating, pill-shaped "island" navigation with a heavy backdrop blur. Active states are marked by a glowing Mint dot below the text or a subtle Amethyst gradient background.

### Property Cards
High-impact visual cards. The image takes up 80% of the card, with a dark, frosted-glass footer containing the price and details. On hover, the image scales subtly (1.05x), and the card emits a soft Mint glow, signaling it's ready to be clicked.

### Interactive Tables
Designed for the management dashboard (CRUD operations). Rows use transparent backgrounds that light up with a subtle Coral gradient and a vibrant left-border accent when hovered. Actions (Edit/Delete) appear cleanly on the right edge upon hover.

### Buttons & Inputs
- **Primary Buttons:** Solid Mint Green with dark-slate text. Features a persistent, soft outer glow.
- **Inputs:** Deep, recessed graphite fields. On `:focus`, the bottom border or full outline illuminates with a crisp Mint neon line.
- **Skeletons:** Loading states use a fast-moving, high-contrast shimmer, transitioning between deep zinc and slightly lighter graphite, simulating a digital scanning effect.

### Chips & Tags
Used for filtering (e.g., "Apartment", "2 Bedrooms"). High-contrast pill shapes with thin borders, lighting up with a Coral or Mint fill when actively selected.