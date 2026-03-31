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
### Respuestas esperadas

- 201 Created: Devuelve un usuario con estado PENDING
- 400 Bad Request: Devuelve un error de validación (email, password)
- 409 Conflict: Devuelve un error de email duplicado


## 4 - Business restrictions (Frontend)

- El boton de "Registrarse" debe estar deshabilitado hasta que el formulario sea valido
- Validaciones en tiempo real:
    - Email: debe ser un email valido y no puede estar vacío
    - Password: debe tener al menos 6 caracteres y no puede estar vacía
- Los mensajes de error (400 o 409) deben aparecer debajo de cada input y deben ser claros y concisos


## 5 - Lineamientos técnicos

- Se utiliza Reactive Forms para manejar el estado de las validaciones del formulario
- Crear un componente Standalone en Angular
- Inyectar un servicio como "AuthService" que utilice HttpClient para realizar la peticion POST

## 6 - Criterios de aceptación 

- Escenario 1: Registro exitoso
    - Dado que el usuario ingreso un email valido y una contraseña valida, al hacer clic en "Registrarse" se debe enviar una peticion POST al endpoint /api/users. Mostrando un mensaje "Cuenta creada exitosamente" y redirigiendo al usuario a la pantalla de login

- Escenario 2: Validaciones visuales
    - Dado que el usuario ingreso un email invalido, al quitar el foco del input, el borde del input debe cambiar a color rojo y debe aparecer un mensaje de error debajo del input
    - Dado que el usuario ingreso una contraseña invalida, al quitar el foco del input, el borde del input debe cambiar a color rojo y debe aparecer un mensaje de error debajo del input

- Escenario 3: Email duplicado (409 Conflict)
    - Dado que el usuario envio el formulario correctamente, al llegar al backend y realizar las comprobaciones correspondientes y detectar que el email ya existe, se debe mostrar un mensaje de error "El email ya existe" y el formulario debe permanecer en la pantalla de registro

## 7 - Prompts Utilizados

- Te asigno el rol de Senior en desarrollo de Angular y Typescript, estamos construyendo un Front enlazado con un Backend en Java Spring Boot, el backend se encuentra en la url http://localhost:8080 y el frontend se encuentra en la url http://localhost:4200.
- Te paso la especificacion de la feature en formato md: [SPEC.MD]
- Resticciones: Usa Standalone components, Reactive Forms y CSS puro, no uses librerias externas
- Entregame el .ts y .html. Tambien el AuthService y explicame paso a paso como funciona la logica de envios para que pueda aprender y defenderla en mi revisión.

    