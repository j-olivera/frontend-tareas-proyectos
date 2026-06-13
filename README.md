# Frontend - Order Manager

This project is a task and project management application developed as part of an integrative work for the Universidad Nacional de Chilecito (UNdeC). It focuses on implementing a robust frontend using Angular and following the Spec-Driven Development (SDD) methodology.

## Project Context

The application serves as a centralized order management system, allowing users to register, log in, and manage various tasks and orders efficiently. It emphasizes clean architecture, rigorous documentation, and high quality standards through the use of specifications.

## Architecture and Structure

The project follows a modular organization to ensure maintainability and scalability:

- **Core**: Contains singleton services, global models, and essential components such as authentication guards and interceptors.
- **Features**: Organized by business domain (e.g., Order, User). Each feature includes its own components, logic, and localized specifications.
- **Shared**: Includes reusable components and utilities shared across different feature modules.
- **OpenSpec**: The `.openspec` directory contains high-level specifications and methodology artifacts that drive the development lifecycle.

## Methodology: Spec-Driven Development (SDD)

Development is guided by formal specifications (SPEC.md files). Each component and feature is defined by requirements and scenarios before implementation, ensuring:

- Clear functional boundaries and unambiguous requirements.
- Strong traceability between business rules and technical implementation.
- A focus on acceptance criteria through structured scenarios (GIVEN/WHEN/THEN).

## Technologies Used

| Technology | Version | Description |
|------------|---------|-------------|
| Angular | ^21.2.0 | Core Framework |
| TypeScript | ~5.9.2 | Programming Language |
| RxJS | ~7.8.0 | Reactive Programming |
| Vitest | ^4.0.8 | Unit Testing Framework |
| Analog | ^2.6.1 | Vite-based Angular Plugin |
| Prettier | ^3.8.1 | Code Formatting |
| Node.js | ^18.0.0+ | Runtime Environment |

## Installation and Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm (v11 or higher)
- Angular CLI

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend-tareas-proyectos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will be accessible at http://localhost:4200/.

## Testing

The project utilizes Vitest for unit testing, providing a fast and reliable test execution environment integrated with the Vite ecosystem.

To run the test suite:
```bash
npm test
```

## Production Build

To generate a production-ready build:
```bash
npm run build
```
The compiled artifacts will be located in the `dist/` directory.

## Backend Integration

This frontend is designed to work with a dedicated backend built with Java Spring Boot.

- **Backend Repository**: [https://github.com/j-olivera/Final-Integrador](https://github.com/j-olivera/Final-Integrador)
- **Default API URL**: http://localhost:8080
