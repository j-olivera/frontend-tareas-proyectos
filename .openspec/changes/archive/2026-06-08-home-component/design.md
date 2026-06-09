# Design: Home Component

## Technical Approach

The `HomeComponent` will be implemented as a **standalone** Angular component to ensure high modularity and ease of integration. It will utilize **Bootstrap 5** for its responsive grid system and layout utilities, while adhering to the **Aether Task System**'s "Atmospheric Depth" aesthetic through custom CSS variables.

The component will serve as the primary landing page at the `/home` route, with the root path (`/`) redirecting to it. It will provide clear navigation paths to the authentication features (`/login` and `/register`) using `routerLink`.

## Architecture Decisions

### Decision: Standalone Component
**Choice**: Standalone
**Alternatives considered**: NgModule-based component
**Rationale**: Aligns with modern Angular best practices (v17+) and simplifies component usage without the overhead of feature modules.

### Decision: Bootstrap 5 via CDN (Initial Implementation)
**Choice**: CDN in `index.html`
**Alternatives considered**: NPM package
**Rationale**: For the current prototype phase, using CDNs for Bootstrap 5 and Google Fonts minimizes `package.json` churn and setup time while fulfilling the requirement to use Bootstrap 5.

### Decision: Tonal Tiering implementation
**Choice**: Custom CSS Variables
**Rationale**: Using CSS variables in the component's style file ensures consistency with the Aether design system while allowing for easy adjustments to tones and accents.

## Data Flow

The `HomeComponent` is a presentation-heavy component with minimal internal state. Data flow is primarily one-way from the component to the view, and navigation events triggered by user interactions.

```
User Action (Click) ──→ HomeComponent (Template) ──→ Router (Navigation)
                                                        │
    /home ──────────────────────────────────────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/app/core/home/home.component.ts` | Create | Logic for the standalone Home component. |
| `src/app/core/home/home.component.html` | Create | Template with Hero section and CTA buttons. |
| `src/app/core/home/home.component.css` | Create | Styles applying Aether Task System tokens and Bootstrap overrides. |
| `src/app/app.routes.ts` | Modify | Add `/home` route and update default redirect from `/register` to `/home`. |
| `src/index.html` | Modify | Add Google Fonts (Hanken Grotesk, Inter) and Bootstrap 5 CSS/JS. |

## Interfaces / Contracts

No new interfaces or API contracts are required for this pure-UI change. The component will rely on standard Angular `RouterModule` for navigation.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Component Creation | Verify `HomeComponent` is correctly instantiated. |
| Unit | CTA Buttons | Verify "Registrarse" and "Login" buttons exist and have correct `routerLink` attributes. |
| Integration | Default Redirection | Verify that navigating to `/` redirects the user to `/home`. |
| Integration | Routing | Verify that `/home` route renders the `HomeComponent`. |

## Migration / Rollout

No migration required. The change will be rolled out by updating the routing configuration, which will make the new landing page the entry point for all users.

## Open Questions

- [ ] Should we implement a "Language Selector" on the home page as part of the professional entry point? (Deferred to future iteration).
