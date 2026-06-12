# Technical Design: Order View Modifications

## Technical Approach

### 1. Service Layer Enhancements
Update `OrderService` to include methods for modifying and canceling orders.
- `modifyOrder(id: number, amount: number)`: Sends a `PUT` request to `/api/orders/{id}` with `{ amount }`.
- `cancelOrder(id: number)`: Sends a `DELETE` request to `/api/orders/{id}`.

### 2. UI Components

#### Internal Edit Modal
`OrderViewComponent` will implement an inline modal for editing the order amount.
- **Technology**: Reactive Forms (`FormControl`, `Validators`).
- **Validation**: `Validators.required`, `Validators.min(0.01)`.
- **Styling**: Bootstrap 5 Modal classes (`modal`, `modal-dialog`, `modal-content`).

#### Reusable Confirmation Modal
Create `ConfirmationModalComponent` as a standalone component in `src/app/shared/components/confirmation-modal/`.
- **Interface**:
  - `@Input() title: string`
  - `@Input() message: string`
  - `@Output() confirm = new EventEmitter<void>()`
  - `@Output() cancel = new EventEmitter<void>()`
- **Styling**: Consistent with the project's dark theme using Bootstrap 5 utility classes.

### 3. State Management and Refresh
The current `orders$` observable uses polling. To provide immediate feedback after a successful action:
- Introduce a `refresh$ = new BehaviorSubject<void>(undefined)` to trigger the `switchMap` in `orders$`.
- After a successful `PUT` or `DELETE`, call `this.refresh$.next()`.

---

## Architecture Decisions

### Rationale for Internal Edit Modal
- **Simplicity**: The edit form only contains one field (`amount`). Creating a separate component for this specific use case would introduce unnecessary complexity in data passing and event handling.
- **Context Preservation**: Keeping the logic within `OrderViewComponent` allows for easy access to the current list state and refresh triggers.

### Rationale for External Confirmation Modal
- **Reusability**: Confirmation of destructive actions is a common pattern. An external standalone component can be reused across the application (e.g., deleting a profile, logging out with a prompt).
- **Separation of Concerns**: Decouples the generic "Are you sure?" UI logic from the specific "Cancel Order" business logic.

---

## Data Flow

1. **Modify Flow**:
   - User clicks "Edit" button in table row.
   - `OrderViewComponent` sets `selectedOrder` and opens the edit modal.
   - User enters new amount and clicks "Guardar".
   - `OrderService.modifyOrder` is called.
   - On success: Modal closes, `refresh$` triggers a new fetch.
   - On error: Display error message within the modal.

2. **Cancel Flow**:
   - User clicks "Cancel" button in table row.
   - `OrderViewComponent` sets `orderToCancelId` and opens `ConfirmationModalComponent`.
   - User clicks "Confirmar".
   - `OrderService.cancelOrder` is called.
   - On success: Modal closes, `refresh$` triggers a new fetch.

---

## File Changes

### Modified Files
- `src/app/core/services/order/order.service.ts`: Add `modifyOrder` and `cancelOrder` methods.
- `src/app/features/order/view/order-view.component.ts`: Add logic for modals, reactive forms, and action handlers.
- `src/app/features/order/view/order-view.component.html`: Add Edit/Cancel buttons and modal templates.
- `src/app/features/order/view/order-view.component.css`: Add styles for new buttons and modal integration.

### New Files
- `src/app/shared/components/confirmation-modal/confirmation-modal.component.ts`
- `src/app/shared/components/confirmation-modal/confirmation-modal.component.html`
- `src/app/shared/components/confirmation-modal/confirmation-modal.component.css`

---

## Interfaces / Contracts

### OrderService
```typescript
modifyOrder(id: number, amount: number): Observable<OrderResponse>;
cancelOrder(id: number): Observable<void>;
```

### ConfirmationModalComponent
```typescript
@Component({ ... })
export class ConfirmationModalComponent {
  @Input() title = 'Confirmar Acción';
  @Input() message = '¿Estás seguro de que deseas realizar esta acción?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
```

---

## Testing Strategy

### OrderService (Unit Tests)
- Verify `modifyOrder` sends `PUT` request with correct payload.
- Verify `cancelOrder` sends `DELETE` request to correct URL.
- Verify error handling for both methods.

### OrderViewComponent (Unit Tests)
- Verify Edit button opens the modal with the correct order amount.
- Verify Submit calls `modifyOrder` and triggers refresh on success.
- Verify Cancel button opens the confirmation modal.
- Verify Confirmation calls `cancelOrder` and triggers refresh on success.

### ConfirmationModalComponent (Unit Tests)
- Verify `@Input` values are rendered correctly.
- Verify clicking "Confirmar" emits `confirm` event.
- Verify clicking "Cancelar" emits `cancel` event.
