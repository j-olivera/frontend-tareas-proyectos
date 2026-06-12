# Spec Order View v2

## 1 - Feature name

- order-view-modifications

## 2 - Description 

- UI/UX experience that allows users to modify the amount of an order or cancel it once registered.

## 3 - Endpoints

### Modify Order

- **URL:** `PUT /api/orders/{id}`
- **Authentication:** Required (Bearer Token).
- **Path Variable:** `id` (Order ID).
- **Body (JSON):**
```json
{
  "amount": 150.50
}
```
- **Responses:**
  - `200 OK`: Returns the updated `OrderResponse` object.
  - `400 Bad Request`: If amount is null or <= 0.
  - `403 Forbidden`: If attempting to modify an order that does not belong to the user.
  - `404 Not Found`: If the order with that ID does not exist.

---

### Cancel Order
Performs a logical deletion by changing the order status to `CANCELLED`.

- **URL:** `DELETE /api/orders/{id}`
- **Authentication:** Required (Bearer Token).
- **Path Variable:** `id` (Order ID).
- **Responses:**
  - `200 OK`: Returns the `OrderResponse` object with `orderStatus: "CANCELLED"`.
  - `403 Forbidden`: If attempting to cancel an order that does not belong to the user.
  - `404 Not Found`: If the order with that ID does not exist.

---

### Response Structure (OrderResponse)
Both endpoints return this object:
```json
{
  "id": 1,
  "userEmail": "user@example.com",
  "amount": 150.50,
  "orderStatus": "PENDING", // or "CANCELLED"
  "createdAt": "2026-06-11T19:55:46"
}
```

## 4 - Business Restrictions

- To modify or cancel an order, the user MUST have an `ACTIVE` status.
- To modify or cancel an order, the user MUST be logged in.

## 5 - Technical Guidelines

- Implement `modifyOrder()` (PUT) and `cancelOrder()` (DELETE) methods in `src/app/core/services/order/order.service.ts`.
- Implement an inline edit modal for order amount within the `OrderViewComponent`.
- Implement a Standalone reusable `ConfirmationModalComponent` in `src/app/shared/components/confirmation-modal/`.
- Use Reactive Forms for the amount modification logic.
- Styling MUST follow the project's established dark theme and use Bootstrap 5 utility classes.

## 6 - Acceptance Criteria

- **Scenario 1: Successful Modification**
    - GIVEN a logged-in user with ACTIVE status
    - WHEN they attempt to modify an order amount via the edit modal
    - THEN the system MUST send a PUT request to `/api/orders/{id}`
    - AND the UI SHALL reflect the new amount upon success.

- **Scenario 2: Successful Cancellation**
    - GIVEN a logged-in user with ACTIVE status
    - WHEN they attempt to cancel an order and confirm the action
    - THEN the system MUST send a DELETE request to `/api/orders/{id}`
    - AND the order status SHALL be updated to "CANCELLED" in the list.

- **Scenario 3: Inactive User**
    - GIVEN a user that is no longer ACTIVE
    - WHEN they attempt to modify or cancel an order
    - THEN the system MUST reject the request (HTTP 422).

- **Scenario 4: Unauthenticated User**
    - GIVEN a user that is not logged in
    - WHEN they attempt to access order modifications
    - THEN the system MUST reject the request and redirect to `/login`.
