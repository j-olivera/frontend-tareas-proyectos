# Spec Driven Development

## 1 - Feature Name

user-login-screen

## 2 - Description

Interface (form) for REGISTERED users to log in, obtaining their access token and 
being redirected to their orders

## 3 - Endpoints

METHOD: POST | URL: /api/login
BODY: { "email": "..", "password": ".." }

Expected responses:
- 200 Ok: { "token": "...", "type": "Bearer" }
- 401 Unauthorized: { "message": "Invalid credentials" }
- 404 Not Found: { "message": "User not found"}

## 4 - Business Constraints (FrontEnd)

- The "Login" button is disabled until the email format is valid and the password has at least 8 characters
- Upon receiving the token, the frontend must store it in localStorage
- Credential errors must be shown with a generic message that does not reveal whether it's the user or the password that is wrong

## 5 - Technical Guidelines

- Use Reactive Forms for form validations
- The component must be standalone
- Add the login() method to auth-service to make the request to the backend

## 6 - Acceptance Criteria

- Scenario 1 - Successful login
    - Given that the user is registered and entered their credentials correctly
    the backend returns their jwt, shows a welcome message and redirects the user to /orders

- Scenario 2 - Invalid credentials
    - Given that the user is not registered or entered their credentials incorrectly
    the backend returns a 401 Unauthorized error, shows a generic error message and does not redirect the user, the data entered in the form is NOT cleared.

- Scenario 3 - Invalid form
    - Given that the user entered an invalid email format or a password shorter than 8 characters
    the "Login" button is disabled and an error message is shown below the corresponding field


## 7 - Prompt Used

- Following the project context and understanding the following Use Case [url] generate a component following the indications in the [SPEC.MD], without using external libraries, following the project architecture, provide the corresponding .ts .html and .css files and the modifications made in the auth-service.ts