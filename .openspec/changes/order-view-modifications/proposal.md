# Proposal: Order View Modifications (v2)

## Intent
Enable users to modify order amounts or cancel orders directly from the Order View interface, improving management capabilities for registered users.

## Scope
- **Core Service**: Add `modifyOrder(id, amount)` and `cancelOrder(id)` to `OrderService`.
- **UI Components**:
    - Update `OrderViewComponent` with action buttons (Edit/Cancel).
    - Implement an inline Edit Modal within `OrderViewComponent`.
    - Create a reusable `ConfirmationModalComponent` (Standalone) in `shared/components/modal/confirmation/`.
- **Logic**: Implement status checks (ACTIVE/Logged-in) and reactive form validation for amount updates.

## Capabilities
- `PUT /api/orders/{id}`: Update order amount.
- `DELETE /api/orders/{id}`: Logical deletion (Status: CANCELLED).
- Standalone confirmation dialog for destructive actions.

## Approach
1. **Service Layer**: Implement PUT and DELETE methods in `OrderService` using `HttpClient`.
2. **Shared Modal**: Scaffold a standalone confirmation modal using Bootstrap 5 classes and `@Input` / `@Output` for interaction.
3. **Feature UI**: Update `OrderViewComponent` HTML/TS to include the requested action buttons and manage modal visibility/state.
4. **Validation**: Use Reactive Forms for amount modification to ensure data integrity (amount > 0).

## Affected Areas
- `src/app/core/services/order/order.service.ts`
- `src/app/features/order/view/order-view.component.ts|html|css`
- `src/app/shared/components/modal/confirmation/` (New component)

## Risks
- Incorrect state handling after modification could lead to UI/UX inconsistencies.
- Insufficient validation for "ACTIVE" status if not exposed by the current `AuthService`.

## Rollback Plan
- Revert commits affecting `OrderService` and `OrderViewComponent`.
- Delete the new `ConfirmationModalComponent`.
- Restore previous `order-view` templates from Git history.

## Dependencies
- `ReactiveFormsModule` for edit forms.
- `AuthService` for session validation.
- `Bootstrap 5` for modals and styling.

## Success Criteria
- Users can successfully modify order amounts and see updates reflected in the UI.
- Users can cancel orders, resulting in a "CANCELLED" status in the list.
- Unauthenticated or non-ACTIVE users are blocked from performing these actions.
