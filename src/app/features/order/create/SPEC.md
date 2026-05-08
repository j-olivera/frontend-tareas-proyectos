# Spec Create Order

## 1 - Feature Name

- order-create

## 2 - Description

- Interface for a user to create a new order, the user must be logged in to create an order.

## 3 - Endpoint

### Request Body

- Method: POST
- URL: /api/orders
- Request Body:
    ```json
    {
        "amount": 453.23,
    }
    ```
### Response Body

- 201 Created: Returns the created order with a PENDING status.
    ```json
    {
        "id": 1,
        "userEmail": "[EMAIL_ADDRESS]",
        "amount": 453.23,
        "orderStatus": "PENDING",
        "createdAt": "2022-01-01T00:00:00.000Z"
    }
    ```
- 422 Unprocessable Entity: User is not active.
- 401 Unauthorized: User is not logged in.

## 4 - Business restrictions (Frontend)

- The "Create" button must be disabled until the form is valid.
- Real-time validations:
    - Amount: must be a valid number, greater than 0 and cannot be empty.
- Error messages (422 or 401) must appear below the input and must be clear and concise.

## 5 - Technical Guidelines

- Create a method createOrder(amount: number) in /core/services/order.service.ts that handles the POST request.
- Inject HttpService in the service.
- Use Reactive Forms to manage form validation state.
- Create an Angular Standalone Component, this component implements the method createOrder() defined in the service.
- The style of component must be clean and modern, based in the login or register components, use Bootstrap 5.

## 6 - Acceptance Criteria 

- Scenario 1: Successful Creation
    - Given that the user entered a valid amount, when clicking "Create", a POST request must be sent to the /api/orders endpoint. A "Order successfully created" message should be shown and the page should refresh to create another order.

- Scenario 2: Visual Validations
    - Given that the user entered an invalid amount, when removing focus from the input, the input border must turn red and an error message must appear below the input.

- Scenario 3: Unprocessable Entity (422 Conflict)
    - Given that the user submitted the form correctly, upon reaching the backend and validating that the user is not active, an error message "User is not active" must be shown, and the form must remain on the creation screen.

## 7 - Prompts Utilizados

- Te asigno el rol de Senior en desarrollo de Angular y Typescript, estamos construyendo un Front enlazado con un Backend en Java Spring Boot, el backend se encuentra en la url http://localhost:8080 y el frontend se encuentra en la url http://localhost:4200.
- Te paso la especificacion de la feature en formato md: [SPEC.MD]
- Resticciones: Usa Standalone components, Reactive Forms y CSS puro, tambien Bootstrap 5
- Opera en modo interactivo, explicacion, codigo, validacion y correccion si es necesario.

### Agregados
- Genera un objeto Toast cuando el usuario genere una orden, colocalo en la parte superior derecha de la pantalla, usa los iconos de fontAwesome para representar los estados (Success -> Check, Error -> Close), asi manejamos mejor los mensajes de succes y error
- Muestra el email del usuario en la parte superior izquierda de la pantalla, los datos se obtienen del localStorage, con un formato parecido a un boton y un icono de persona, modifica el user-login.ts para que tambien guarde el email en el localStorage
- Agrega un texto "Ver tus ordenes" abajo del form, el cual redirija a /view-orders, usando routerLink