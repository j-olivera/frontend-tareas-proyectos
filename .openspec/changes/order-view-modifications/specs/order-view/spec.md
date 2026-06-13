# Delta Spec: Order View Modifications

## Modified Requirements

### REQ-001: Fetch and Display Orders
The system MUST fetch the list of orders belonging to the logged-in user and display them in a structured table.

#### Scenario: Successful Fetching
- **Given** the user is authenticated and ACTIVE
- **When** the Order View component loads
- **Then** a GET request MUST be sent to `/api/orders`
- **And** the response data SHALL be displayed in a table with columns: Id, User Email, Amount, Status, Created At, and Actions.

## Added Requirements

### REQ-003: Modify Order Amount
The system MUST allow users to update the amount of an existing order.

#### Scenario: Successful Modification
- **Given** the user is authenticated and ACTIVE
- **And** an order is displayed in the list
- **When** the user clicks the "Edit" action and provides a valid amount (> 0)
- **Then** a PUT request MUST be sent to `/api/orders/{id}` with the new amount
- **And** the UI SHALL reflect the updated amount upon success.

#### Scenario: Invalid Amount Validation
- **Given** the user is editing an order amount
- **When** the user enters an amount less than or equal to 0
- **Then** the system MUST display a validation error message
- **And** the update action SHALL be disabled.

### REQ-004: Cancel Order
The system MUST allow users to cancel an existing order, resulting in a status change.

#### Scenario: Successful Cancellation
- **Given** the user is authenticated and ACTIVE
- **And** an order is displayed in the list
- **When** the user clicks the "Cancel" action and confirms the operation
- **Then** a DELETE request MUST be sent to `/api/orders/{id}`
- **And** the order status SHALL be updated to "CANCELLED" in the list.

### REQ-005: Confirmation Dialog for Destructive Actions
Destructive actions MUST require user confirmation before execution.

#### Scenario: Confirming Cancellation
- **Given** the user clicks "Cancel" on an order
- **When** the confirmation modal appears
- **Then** the system MUST wait for the user to click "Confirm" before proceeding with the DELETE request
- **And** the user SHALL have the option to "Cancel" the dialog without making changes.
