# Spec Order View

## 1 - Feature name

- order-view

## 2 - Description

- Interface to view order from of the user logged

## 3 - Endpoint

- Method: GET
- URL: /api/orders
- Response Body:
- 200 OK: Returns the list of orders from the user logged.
    ```json
    [
        {
            "id": 1,
            "userEmail": "[EMAIL_ADDRESS]",
            "amount": 453.23,
            "orderStatus": "PENDING",
            "createdAt": "2022-01-01T00:00:00.000Z"
        }
    ]
    ```
- 401 Unauthorized: User is not logged in.

## 4 - Business Restrictions

- To view the orders, the user status must be ACTIVE.

## 5 - Technical Guidelines

- Create a method getOrders() in /core/services/order.service.ts that handles the GET request.
- Inject HttpService in the service.
- Create an Angular Standalone Component, this component implements the method getOrders() defined in the service.
- The style of component must be clean and modern, based in the login or register components, use Bootstrap 5.
- The component implement Polling every 30 seconds to get the latest orders using RxJS interval() and switchMap()

## 6 - Acceptance Criteria

- Scenario 1: Successful get orders
    - Given that the user is logged in, when the component loads, a GET request must be sent to the /api/orders endpoint. The orders must be displayed in a table.
    - The table must have the following columns:
        - Id: Order Id
        - User Email: User Email
        - Amount: Order Amount
        - Status: Order Status
        - Created At: Order Created At

- Scenario 2: User not logged in
    - Given that the user is not logged in, when the component loads, a 401 Unauthorized error must be shown.

- Scenario 3: User not active
    - Given that the user is not active, when the component loads, a 422 Unprocessable Entity error must be shown.

## 7 - Prompts Utilizados

- Te asigno el rol de Senior en desarrollo de Angular y Typescript, estamos construyendo un Front enlazado con un Backend en Java Spring Boot, el backend se encuentra en la url http://localhost:8080 y el frontend se encuentra en la url http://localhost:4200.
- Te paso la especificacion de la feature en formato md: [SPEC.MD]
- Resticciones: Usa Standalone components, Reactive Forms y CSS puro, tambien Bootstrap 5
- Opera en modo interactivo, explicacion, codigo, validacion y correccion si es necesario.

