---
name: Aether Task System
colors:
  surface: '#11131c'
  surface-dim: '#11131c'
  surface-bright: '#373943'
  surface-container-lowest: '#0c0e17'
  surface-container-low: '#191b24'
  surface-container: '#1d1f29'
  surface-container-high: '#282933'
  surface-container-highest: '#32343e'
  on-surface: '#e1e1ef'
  on-surface-variant: '#c6c5d2'
  inverse-surface: '#e1e1ef'
  inverse-on-surface: '#2e303a'
  outline: '#90909c'
  outline-variant: '#454650'
  surface-tint: '#b9c3ff'
  primary: '#b9c3ff'
  on-primary: '#1a2a6f'
  primary-container: '#3e4c92'
  on-primary-container: '#b7c1ff'
  inverse-primary: '#4b59a0'
  secondary: '#c2c5de'
  on-secondary: '#2b2f43'
  secondary-container: '#44485d'
  on-secondary-container: '#b4b7d0'
  tertiary: '#c0c1ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#3b3bc9'
  on-tertiary-container: '#bebfff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dee1ff'
  primary-fixed-dim: '#b9c3ff'
  on-primary-fixed: '#001158'
  on-primary-fixed-variant: '#334187'
  secondary-fixed: '#dee1fb'
  secondary-fixed-dim: '#c2c5de'
  on-secondary-fixed: '#161b2d'
  on-secondary-fixed-variant: '#42465a'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#11131c'
  on-background: '#e1e1ef'
  surface-variant: '#32343e'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1200px
---

## Brand & Style

This design system is engineered for deep focus and professional task management. It utilizes a **Modern Minimalist** aesthetic with a heavy emphasis on dark-mode ergonomics. The visual narrative is built around "focused depth"—using subtle tonal shifts rather than harsh lines to define the interface. 

The target audience consists of power users and professionals who require a workspace that recedes into the background, allowing their content and objectives to take center stage. The emotional response is one of calm, reliability, and precision.

Key stylistic markers include:
- **Atmospheric Depth:** Using deep indigo and obsidian tones to create a sense of infinite digital space.
- **Vibrant Functional Accents:** Using high-chroma violet-blues strictly for interactive elements to guide the eye without causing fatigue.
- **Refined Typography:** High-legibility sans-serifs that maintain clarity even at small scales on low-light displays.

## Colors

The palette is derived from the "midnight" spectrum found in the reference imagery. 

- **Primary (#3E4C92):** A muted indigo-violet used for primary action buttons and active selection states.
- **Secondary (#1E2235):** The "Surface" color. Used for cards, modals, and container backgrounds that need to sit above the base layer.
- **Tertiary (#6366F1):** A vibrant iris used sparingly for small icons, progress indicators, or "new" badges.
- **Neutral (#0F111A):** The foundation. This is the global background color, providing the deep canvas for the rest of the UI.
- **Foregrounds:** Text uses high-contrast white (#FFFFFF) for titles and a desaturated slate (#94A3B8) for secondary information.

## Typography

This design system uses a dual-font strategy to balance character with utility. 

**Hanken Grotesk** is used for headlines. Its contemporary geometry and sharp terminals convey the professional and modern tone required for project management. 

**Inter** is used for all functional text, body copy, and labels. It is selected for its exceptional legibility in dark environments and its wide range of weights which helps establish clear information hierarchy. 

Labels should always be used in uppercase with a slight letter-spacing increase to ensure they are distinct from standard body text.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Content is contained within a centered 12-column grid on desktop to prevent eye strain on ultra-wide monitors, while fluidly adapting to margins on mobile.

- **Rhythm:** An 8px base grid governs all padding and margins. 
- **Density:** The design favors "generous utility"—enough white space to separate complex task data without making the user scroll excessively.
- **Breakpoints:**
    - **Mobile (<768px):** 1-column layout, 16px side margins.
    - **Tablet (768px - 1024px):** 6-column grid, 24px gutters.
    - **Desktop (>1024px):** 12-column grid, 1200px max-width container.

## Elevation & Depth

In this system, depth is communicated through **Tonal Tiering** and **Subtle Outlines** rather than traditional shadows.

- **Layer 0 (Background):** Neutral (#0F111A).
- **Layer 1 (Containers/Cards):** Secondary (#1E2235).
- **Layer 2 (Popovers/Modals):** A slightly lighter tint of the secondary color (#2A2F45).

To define boundaries, use a 1px solid border with 10% opacity white. This creates a "hairline" effect that is visible but non-intrusive. Only the highest level elements (modals) receive a very large, soft shadow (40px blur, 0.4 alpha) to simulate a lift off the surface.

## Shapes

The design system utilizes a **Rounded (0.5rem / 8px)** corner radius as its base. 

This level of roundedness strikes a balance between the clinical sharpness of enterprise software and the soft friendliness of consumer apps. It creates a "modern professional" feel. 

- **Small elements (Checkboxes):** 4px radius.
- **Standard elements (Buttons, Inputs):** 8px radius.
- **Large elements (Cards, Modals):** 16px radius (rounded-lg).

## Components

### Buttons
- **Primary:** Background Primary (#3E4C92), Text White. No border. On hover, increase brightness by 10%.
- **Secondary/Ghost:** No background, 1px border using Secondary color.
- **Sizing:** Buttons should have a height of 44px for high tap-target accessibility.

### Input Fields
- **Default State:** Background #161925 (slightly darker than cards), 1px border #2A2F45.
- **Focus State:** Border transitions to Primary (#3E4C92) with a 2px outer glow of the same color at 20% opacity.
- **Labels:** Positioned above the field in `label-sm` typography, color desaturated slate.

### Task Cards
- Cards use the Secondary background.
- Hover state: The 1px hairline border color should brighten to reflect the Primary accent.
- Content should be padded with a consistent 24px (3x base spacing).

### Chips & Tags
- Used for task categories. 
- Background is a 15% opacity version of the accent color (e.g., Violet/Blue) with a high-chroma text color of the same hue for maximum contrast within the dark theme.