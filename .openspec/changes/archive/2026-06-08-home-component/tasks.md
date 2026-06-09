# Tasks: home-component

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 120-160 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Implementation of Home component and routing | PR 1 | Includes fonts, component, styles, and tests. |

## Phase 1: Infrastructure & External Assets

- [x] 1.1 Update `src/index.html` with Google Fonts (Hanken Grotesk, Inter) and Bootstrap 5 CDN link.
- [x] 1.2 Verify that fonts and Bootstrap 5 CSS are loading correctly in the browser.

## Phase 2: Component Implementation

- [x] 2.1 Create directory `src/app/core/home/`.
- [x] 2.2 Create `src/app/core/home/home.component.ts` as a standalone component with `CommonModule` and `RouterModule`.
- [x] 2.3 Create `src/app/core/home/home.component.html` with Hero section, title "Gestor de Ordenes", and CTA buttons for Login and Registrarse.
- [x] 2.4 Create `src/app/core/home/home.component.css` applying Aether Task System tokens (#11131c, #3E4C92) and Bootstrap overrides.

## Phase 3: Routing & Integration

- [x] 3.1 Modify `src/app/app.routes.ts` to import `HomeComponent` and add the `/home` route.
- [x] 3.2 Update `src/app/app.routes.ts` default redirect from `'register'` to `'home'`.

## Phase 4: Testing & Verification

- [x] 4.1 Create `src/app/core/home/home.component.spec.ts` using Vitest.
- [x] 4.2 Test: Verify `HomeComponent` is created successfully.
- [x] 4.3 Test: Verify "Registrarse" button has `routerLink="/register"`.
- [x] 4.4 Test: Verify "Login" link has `routerLink="/login"`.
- [x] 4.5 Test: Verify that navigating to `/` redirects to `/home`.

## Phase 5: Cleanup & Documentation

- [x] 5.1 Update `src/app/app.routes.ts` comments regarding the default route.
- [x] 5.2 Ensure component styles follow Aether Task System accessibility guidelines.
