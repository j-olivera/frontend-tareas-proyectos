# Spec Register User

## 1 - Feature name

user-registration-screen

## 2 - Description

Interface for a visitor to create a new account on the Tasks and Proyects platform by entering their data.

## 3 - Endpoint

Method: POST URL: /api/users

### Request Body

```json
{
    "email": "[EMAIL_ADDRESS]",
    "password": "[PASSWORD]"
}
```
### Expected Responses

- 201 Created: Returns a user with PENDING state
- 400 Bad Request: Returns a validation error (email, password)
- 409 Conflict: Returns a duplicate email error


## 4 - Business restrictions (Frontend)

- The "Register" button must be disabled until the form is valid
- Real-time validations:
    - Email: must be a valid email format and cannot be empty
    - Password: must be at least 6 characters long and cannot be empty
- Error messages (400 or 409) must appear below each input and must be clear and concise


## 5 - Technical Guidelines

- Use Reactive Forms to manage form validation state
- Create an Angular Standalone Component
- Inject an "AuthService" that uses HttpClient to make the POST request

## 6 - Acceptance Criteria 

- Scenario 1: Successful Registration
    - Given that the user entered a valid email and a valid password, when clicking "Register", a POST request must be sent to the /api/users endpoint. A message "Account successfully created" should be shown and the user redirected to the orders screen.

- Scenario 2: Visual Validations
    - Given that the user entered an invalid email, when removing focus from the input, the input border must turn red and an error message must appear below the input.
    - Given that the user entered an invalid password, when removing focus from the input, the input border must turn red and an error message must appear below the input.

- Scenario 3: Duplicate Email (409 Conflict)
    - Given that the user submitted the form correctly, upon reaching the backend and validating that the email already exists, an error message "Email already exists" must be shown, and the form must remain on the registration screen.

## 7 - Prompts Utilizados

- Te asigno el rol de Senior en desarrollo de Angular y Typescript, estamos construyendo un Front enlazado con un Backend en Java Spring Boot, el backend se encuentra en la url http://localhost:8080 y el frontend se encuentra en la url http://localhost:4200.
- Te paso la especificacion de la feature en formato md: [SPEC.MD]
- Resticciones: Usa Standalone components, Reactive Forms y CSS puro, no uses librerias externas
- Entregame el .ts y .html. Tambien el AuthService y explicame paso a paso como funciona la logica de envios para que pueda aprender y defenderla en mi revisión.

    