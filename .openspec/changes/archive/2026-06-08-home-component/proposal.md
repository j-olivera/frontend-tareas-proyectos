# Proposal: Home Component

## Intent

Create a high-impact, modern landing page for "Gestor de Ordenes" that drives user conversion and provides a professional entry point. The current application lacks a proper landing page, redirecting users immediately to registration.

## Scope

### In Scope
- Create `HomeComponent` as a standalone component.
- Implement a responsive Hero section with centered content using Bootstrap 5.
- Integrate `HomeComponent` into `app.routes.ts` mapping to the `/home` path.
- Update the default route to point to `/home` instead of `/register`.
- Add styled call-to-action (CTA) links to `/login` and `/register`.

### Out of Scope
- Implementing a full dashboard for logged-in users (home remains consistent for all).
- Adding complex animations or external assets.

## Capabilities

### New Capabilities
- `home-navigation`: Provides the main entry point to the application with navigation links to authentication features.

### Modified Capabilities
None

## Approach

Adhere to the "Aether Task System" design system with an "Atmospheric Depth" aesthetic.
- **Layout**: Centered 12-column grid using Bootstrap 5 container and grid utilities.
- **Typography**: `Hanken Grotesk` for headlines and `Inter` for body copy.
- **Color Palette**: Deep indigo and obsidian tones (`#11131c` background) with vibrant interactive accents (`#3E4C92` for primary buttons).
- **Navigation**: Use Angular `routerLink` for seamless internal navigation.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/core/home/home.component.ts` | New | Creation of the standalone Home component. |
| `src/app/app.routes.ts` | Modified | Adding `/home` route and updating default redirect. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Layout breaking on small devices | Low | Use Bootstrap 5 responsive utility classes and test across breakpoints. |
| Contrast issues in dark mode | Low | Follow Aether's specified color palette which ensures high legibility. |

## Rollback Plan

1. Revert `src/app/app.routes.ts` to its previous state (redirecting to `/register`).
2. Delete `src/app/core/home/home.component.ts`.

## Dependencies

- Bootstrap 5 (styles).
- Hanken Grotesk and Inter fonts.

## Success Criteria

- [ ] Users can access the landing page at `/home`.
- [ ] The landing page displays a centered Hero section with "Gestor de Ordenes" title.
- [ ] Primary "Registrarse" button and "Login" link are functional and styled.
- [ ] The layout is responsive and follows the Aether design guidelines.
