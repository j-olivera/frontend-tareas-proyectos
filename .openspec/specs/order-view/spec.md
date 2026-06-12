# Spec: Order View

## Purpose
The Order View feature MUST allow registered users to view their list of orders in a modern, reactive interface.

## Requirements

### REQ-001: Fetch and Display Orders
The system MUST fetch the list of orders belonging to the logged-in user and display them in a structured table.

#### Scenario: Successful Fetching
- **Given** the user is authenticated and ACTIVE
- **When** the Order View component loads
- **Then** a GET request MUST be sent to `/api/orders`
- **And** the response data SHALL be displayed in a table with columns: Id, User Email, Amount, Status, and Created At.

#### Scenario: Polling Updates
- **Given** the Order View component is active
- **When** 30 seconds have passed since the last update
- **Then** the system MUST automatically re-fetch the orders list using polling logic (interval and switchMap).

### REQ-002: Access Control and Error Handling
The system MUST restrict access based on authentication and user status.

#### Scenario: User Not Logged In
- **Given** the user is NOT authenticated
- **When** the Order View component attempts to load
- **Then** the system MUST display a 401 Unauthorized error message.

#### Scenario: User Not Active
- **Given** the user is authenticated but NOT in ACTIVE status
- **When** the Order View component attempts to load
- **Then** the system MUST display a 422 Unprocessable Entity error message.
