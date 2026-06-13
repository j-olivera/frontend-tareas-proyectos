# Tasks: Order View Modifications

## Review Workload Forecast
Chained PRs recommended: Yes
400-line budget risk: Low
Estimated changed lines: 280
Decision needed before apply: No

## Task Breakdown

### Phase 1: Foundation (Service)
- [x] 1.1: Update OrderService methods
  - Add `modifyOrder(id: number, amount: number): Observable<OrderResponse>` to `src/app/core/services/order/order.service.ts`.
  - Add `cancelOrder(id: number): Observable<void>` to `src/app/core/services/order/order.service.ts`.
- [x] 1.2: Service Unit Tests
  - Add tests for `modifyOrder` and `cancelOrder` in `src/app/core/services/order/order.spec.ts`.
  - Verify correct HTTP methods (PUT/DELETE) and endpoints.

### Phase 2: Shared Components
- [x] 2.1: Implement ConfirmationModalComponent
  - Create `ConfirmationModalComponent` as a standalone component in `src/app/shared/components/confirmation-modal/`.
  - Implement `@Input` for `title` and `message`, and `@Output` for `confirm` and `cancel`.
  - Use Bootstrap 5 modal styling.
- [x] 2.2: Modal Unit Tests
  - Create `src/app/shared/components/confirmation-modal/confirmation-modal.component.spec.ts`.
  - Verify input rendering and event emission.

### Phase 3: Feature UI Implementation
- [x] 3.1: Update OrderViewComponent Logic
  - Update `src/app/features/order/view/order-view.component.ts`.
  - Implement `refresh$` BehaviorSubject to trigger re-fetching.
  - Setup Reactive Forms (`FormGroup`) for the inline edit modal.
  - Add handlers for `onEdit`, `onCancel`, `confirmEdit`, and `confirmCancel`.
- [x] 3.2: Update OrderViewComponent Template
  - Update `src/app/features/order/view/order-view.component.html`.
  - Add "Acciones" column with Edit and Cancel buttons to the table.
  - Add Inline Edit Modal template using Bootstrap 5 classes.
  - Integrate `ConfirmationModalComponent` for order cancellation.
- [x] 3.3: Update OrderViewComponent Styles
  - Update `src/app/features/order/view/order-view.component.css`.
  - Add styling for action buttons and modal layout.

### Phase 4: Integration & Testing
- **4.1: Component Unit Tests**
  - Add tests in `src/app/features/order/view/order-view.component.spec.ts`.
  - Mock `OrderService` and verify calls to `modifyOrder` and `cancelOrder`.
  - Test modal visibility and form validation logic.
- **4.2: Final Verification**
  - Run `npm test` to ensure all tests pass.
  - Run `npm run build` to verify no compilation errors.
