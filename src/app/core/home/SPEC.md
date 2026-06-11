# Home

## Description

- Page that provides the option to register, log in, and a brief introduction to the web app.

## Endpoint (URL)
- /home
- /

## Technical Guidelines

- Use `router-link` for button redirection.
- Use Bootstrap 5 for components.
- App name: Order Manager.
- Visual structure: Classic.

## Restrictions
- Authentication is not required to access this component.


#### Scenario: Successful navigation to home

- GIVEN a user navigating to the application
- WHEN the user accesses the URL path `/home`
- THEN the system MUST render the Home component landing page

#### Scenario: Redirect from root to home

- GIVEN the application is running
- WHEN a user accesses the root path `/`
- THEN the system MUST automatically redirect the user to the `/home` route

### Requirement: Hero Section Presentation

The system MUST display a centered Hero section containing the application title "Order Manager" and a descriptive subtitle.

#### Scenario: Hero section display

- GIVEN a user is on the Home page
- WHEN the page loads
- THEN the system MUST display a centered Hero section
- AND the title "Order Manager" MUST be prominent

### Requirement: Navigation to Authentication Features

The system MUST provide clear call-to-action (CTA) elements for user registration and login.

#### Scenario: Navigation to Register

- GIVEN a user is on the Home page
- WHEN the user clicks on the "Register" CTA
- THEN the system MUST navigate the user to the `/register` route

#### Scenario: Navigation to Login

- GIVEN a user is on the Home page
- WHEN the user clicks on the "Login" CTA
- THEN the system MUST navigate the user to the `/login` route


## Agent Prompt

- You are a Senior UX/UI and Angular Designer. For the following task, start the SDD action plan and load the skills. For a better structure, use the OpenSpec skill to properly organize the design, proposal, and tasks. You are provided with a `.md` file and a reference image for the Home design in the folder named `stitch_gestor_de_ordenes`. Do not create more than what is indicated in the reference, and do not modify code external to the component.
