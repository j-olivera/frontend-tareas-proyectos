# Spec Drive Develoment

## 1 - Nombre de la feature

user-login-screen

## 2 - Descripcion

Interface (formulario) para que los usuarios REGISTRADOS se logeen, obteniendo su token de acceso y 
siendo redirigido a sus ordenes

## 3 - Endpoints

METODO: POST | URL: /api/login
BODY: { "email": "..", "password": ".." }

Respuestas esperadas 
    200 Ok: { "token": "...", "type": "Bearer" }
    401 Unauthorized: { "message": "Credenciales invalidas" }
    404 Not Found: { "message": "Usuario no encontrado"}

## 4 - Restricciones del negocio (FrontEnd)

- El boton de "Ingresar" esta deshabilitado hasta que el formato del correo sea correcto y la contraseña tenga al menos 8 caracteres
- Al recibir el token el frontend debe almacenarlo en el localStorage
- Los errores de credenciales deben mostrarse con un msj generico, que no exponga si es el usuario o la contraseña

## 5 - Lineamientos tecnicos

- Usar Reactive Forms para para las validaciones del formulario
- El componente debe ser standalone
- Agregar el metodo login() al auth-service para hacer la peticion al backend

## 6 - Criterios de aceptacion

- Escenario 1 - Login exitoso
    - Dado que el usuario esta registrado e ingreso sus credenciales correctamente
    el backend devuelve su jwt, muestra un mensaje de bienvenida y redirige al usuario a /orders

- Escenario 2 - Credenciales invalidas
    - Dado que el usuario no esta registrado o ingreso sus credenciales incorrectamente
    el backend devuelve un error 401 Unauthorized, muestra un mensaje de error generico y no redirige al usuario, los datos ingresados en el formulario NO son borrados.

- Escenario 3 - Formulario invalido
    - Dado que el usuario ingreso un formato de correo invalido o una contraseña menor a 8 caracteres
    el boton de "Ingresar" esta deshabilitado y se muestra un mensaje de error debajo del campo correspondiente


## 7 - Prompt utilizado

- Siguiendo el contexto del proyecto y entendiendo el siguiente Caso de Uso [url] genera un componente siguiendo las indicaciones en el [SPEC.MD], sin utilizar librerías externas, siguiendo la arquitectura del proyecto, dame los archivos .ts .html y .css correspondientes y las modifcaciones realizadas en el auth-service.ts