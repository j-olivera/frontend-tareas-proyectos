# Spec Order View v2

## 1 - Feature name

- order-view-v2

## 2 - Description 

- Experiencia Ux/Ui que permite al usuario modificar el monto o cancelar la orden ya registrada. 

## 3 - Endpoint

### Modificar orden

- **URL:** `PUT /api/orders/{id}`
- **Autenticación:** Requerida (Bearer Token).
- **Path Variable:** `id` (ID de la orden).
- **Body (JSON):**
```json
{
  "amount": 150.50
}
```
- **Respuestas:**
  - `200 OK`: Devuelve el objeto `OrderResponse` actualizado.
  - `400 Bad Request`: Si el monto es nulo o <= 0.
  - `403 Forbidden`: Si intentas modificar una orden que no te pertenece.
  - `404 Not Found`: Si la orden con ese ID no existe.

---

### Cancelar Orden
Realiza un borrado lógico de la orden cambiando su estado a `CANCELLED`.

- **URL:** `DELETE /api/orders/{id}`
- **Autenticación:** Requerida (Bearer Token).
- **Path Variable:** `id` (ID de la orden).
- **Respuestas:**
  - `200 OK`: Devuelve el objeto `OrderResponse` con `orderStatus: "CANCELLED"`.
  - `403 Forbidden`: Si intentas cancelar una orden que no te pertenece.
  - `404 Not Found`: Si la orden con ese ID no existe.

---

### Estructura de Respuesta (OrderResponse)
Ambos endpoints devuelven este objeto:
```json
{
  "id": 1,
  "userEmail": "usuario@ejemplo.com",
  "amount": 150.50,
  "orderStatus": "PENDING", // O "CANCELLED"
  "createdAt": "2026-06-11T19:55:46"
}
```

## 4 - Bussines Restrictions

- Para modificar o cancelar una orden, el usuario debe estar en estado ACTIVE
- Para modificar o cancelar una orden, el usuario debe estar en logueado
## 5 - Technical Guidelines

- Crea los metodos modifyOrder() (PUT) y cancelOrder() (DELETE) en in /core/services/order.service.ts
- Crea un modal para la modificación de la orden, en el mismo componente de order-view
- Crea un modal para la confirmación de ambas funciones, de tipo Standalone, ubicado en /shared/modal/confirmation/
- Codigo de referencia en Tailwind para el boton que debe estar posicionado en lugar de "Acciones" definido en el cuadro
```html
<div class="flex items-center bg-secondary-container rounded-lg overflow-hidden border border-white/10 shadow-lg group">
<!-- Left Half: Edit -->
<button class="h-[52px] w-24 flex items-center justify-center text-primary hover:bg-primary/10 active:scale-95 transition-all border-r border-white/10" title="Editar orden">
<span class="material-symbols-outlined text-[24px]">edit</span>
</button>
<!-- Right Half: Close/Remove -->
<button class="h-[52px] w-24 flex items-center justify-center text-error hover:bg-error/10 active:scale-95 transition-all" title="Eliminar orden">
<span class="material-symbols-outlined text-[24px]">close</span>
</button>
</div>
```
- El estilo debe seguir los colores ya utilizados y usar Bootstrap 5.

## 6 - Acceptance Criteria

- Escenario 1: Exito en la modificacion
    - Cuando el usuario logeado intenta modificar una orden, se abre un modal con la peticion para actualizar el monto de la orden utilizando el endpoint /api/orders/{id}, permitiendo modificar la orden con exito

- Escenario 2: Exito en la eliminacion
    - Cuando el usuario logeado intenta eliminar una orden, se abre un modal con la peticion para eliminar la orden utilizando el endpoint /api/orders/{id}, permitiendo modificar la orden con exito

- Escenario 3: El usuario no esta activo
    - Cuando el usuario intenta cancelar o modificar una orden pero ya no cuenta con el estado ACTIVE, el sistema rechaza la petición
  
- Escenario 4: El usuario no esta logeado
    - Cuando el usuario intenta cancelar o modificar una orden pero esta deslogueado, el sistema rechaza la peticion y redirige a /login


## 7 - Prompts Utilizados

- Te asigno el rol de Senior en desarrollo de Angular y Typescript, estamos construyendo un Front enlazado con un Backend en Java Spring Boot, el backend se encuentra en la url http://localhost:8080 y el frontend se encuentra en la url http://localhost:4200.
- Te paso la especificacion de la feature en formato md: [SPEC.MD]
- Resticciones: Usa Standalone component, Reactive Forms y CSS, tambien Bootstrap 5
- Utiliza las skills de SDD y el framework OpenSpec, opera en modo interactivo, respetando la arquitectura del sistema, no modifiques archivos externos al flujo del spec sin consultarlo antes.
