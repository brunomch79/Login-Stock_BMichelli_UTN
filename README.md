# Documentación Técnica – Sistema Login y Gestión de Stock


## Descripción General

El proyecto **Login-Stock** es una aplicación web full stack que permite:
- Registrar e iniciar sesión de usuarios.
- Gestionar productos (alta, baja, modificación y consulta).
- Mantener autenticación persistente en el cliente.

Está dividido en dos partes:
- **Backend:** API REST creada con **Node.js**, **Express** y **Sequelize**.
- **Frontend:** Interfaz construida con **React**, **Zustand** y **TailwindCSS**.


## Backend (API REST con Node.js y Express)

### Estructura General

| Carpeta | Contenido |
|----------|------------|
| `/config` | Configuración de conexión a base de datos. |
| `/models` | Definición de entidades Sequelize (`User`, `Product`). |
| `/routes` | Rutas principales (`/user`, `/product`). |
| `index.mjs` | Punto de entrada del servidor y configuración global. |

El servidor escucha peticiones HTTP y responde con datos en formato **JSON**.


## Endpoints de Usuario (`/user`)

### 1. **POST** `/user/register`

**Descripción:**  
Crea un nuevo usuario en la base de datos.

**Entradas (JSON body):**
```json
{
  "fullName": "Juan Pérez",
  "email": "juan@mail.com",
  "password": "12345",
  "confirmPassword": "12345"
}
Validaciones:

password y confirmPassword deben coincidir.

email debe ser único en la base de datos.

Salidas:

✅ 200 OK

json
{ "msg": "Usuario registrado correctamente" }
❌ 400 Bad Request

json
{ "error": true, "msg": "Las contraseñas no coinciden" }
❌ 409 Conflict

json
{ "error": true, "msg": "El email ya está registrado" }
2. POST /user/login
Descripción:
Verifica las credenciales del usuario y devuelve sus datos junto a un token de autenticación.

Entradas (JSON body):

json
{
  "email": "juan@mail.com",
  "password": "12345"
}
Proceso interno:

Busca al usuario en la base de datos.

Compara la contraseña con el hash guardado (bcrypt).

Genera un token JWT si es válido.

Salidas:

✅ 200 OK

json
{
  "msg": "Login exitoso",
  "user": { "id": 1, "email": "juan@mail.com", "fullName": "Juan Pérez" },
  "token": "eyJhbGciOi..."
}
❌ 404 Not Found

json
{ "error": true, "msg": "Usuario no encontrado" }
❌ 401 Unauthorized

json
{ "error": true, "msg": "Contraseña incorrecta" }

Endpoints de Productos (/product)
Estos endpoints solo deberían usarse tras autenticación.

1. GET /product
Descripción:
Obtiene todos los productos registrados.

Salida:

✅ 200 OK

json
[
  { "id": 1, "name": "Monitor", "price": 500, "stock": 10 },
  { "id": 2, "name": "Teclado", "price": 150, "stock": 30 }
]
2. POST /product
Descripción:
Crea un nuevo producto.

Entradas (JSON body):

json
{
  "name": "Mouse Gamer",
  "price": 100,
  "stock": 50
}
Salidas:

✅ 201 Created

json
{ "msg": "Producto creado correctamente" }
❌ 400 Bad Request

json
{ "error": true, "msg": "Faltan campos requeridos" }
3. PUT /product/:id
Descripción:
Modifica los datos de un producto existente.

Entradas (JSON body):

json
{
  "name": "Mouse RGB",
  "price": 120,
  "stock": 60
}
Salidas:

✅ 200 OK

json
{ "msg": "Producto actualizado correctamente" }
❌ 404 Not Found

json
{ "error": true, "msg": "Producto no encontrado" }
4. DELETE /product/:id
Descripción:
Elimina un producto de la base de datos.

Salidas:

✅ 200 OK

json
{ "msg": "Producto eliminado" }
❌ 404 Not Found

json
{ "error": true, "msg": "Producto no encontrado" }
🧠 Lógica General del Backend
Función	Descripción
sequelize.sync()	Sincroniza modelos con la base de datos MySQL.
bcrypt.hash()	Encripta contraseñas antes de almacenarlas.
bcrypt.compare()	Compara contraseñas durante el login.
jwt.sign()	Genera tokens de sesión seguros.
dotenv.config()	Carga variables de entorno desde .env.

💻 Frontend (React + Zustand)
🔄 Flujo General
El usuario completa el formulario de Registro o Login.

El componente envía la información mediante fetch al backend.

Si la respuesta es exitosa, se muestra un mensaje con react-toastify.

En el login, los datos del usuario se guardan en el estado global con Zustand.

La sesión persiste aunque se recargue la página.

🧱 Componentes principales
Componente	Función
Login.jsx	Formulario de inicio de sesión.
Register.jsx	Formulario de registro de usuario.
Form.jsx	Contenedor reutilizable de formularios.
Input.jsx	Campo de entrada reutilizable.
Button.jsx	Botón genérico reutilizable.
useStore.js	Estado global persistente para usuario autenticado.

🧩 Estado Global (Zustand)
Objetivo: Mantener los datos del usuario logueado en toda la aplicación.

Estructura del estado:

json
{
  "user": {
    "full_name": null,
    "email": null,
    "token": null
  }
}
Funciones principales:

setUser(newUser) → Actualiza el usuario en sesión.

Persistencia automática en localStorage bajo el nombre "token_login_web".

Variables de Entorno (.env)
env
Copiar código
# Servidor
PORT=3000

# Base de Datos
HOST_DB=localhost
PORT_DB=3306
USER_DB=root
PASS_DB=
NAME_DB=login_stock
DIALECT_DB=mysql

# Seguridad
SECRET=mitoken123
🔐 Códigos de Éxito y Error
Código	Tipo	Descripción
200	OK	Operación completada correctamente.
201	Created	Registro creado exitosamente.
400	Bad Request	Error en los datos enviados.
401	Unauthorized	Credenciales inválidas.
404	Not Found	Recurso no encontrado.
409	Conflict	Conflicto con un registro existente.
500	Server Error	Error interno del servidor.

Conclusión
Este sistema implementa un flujo completo de autenticación de usuarios y gestión de productos.
Aplica buenas prácticas como:

Separación de responsabilidades (frontend / backend).

Uso de ORM (Sequelize) para independencia de la base de datos.

Persistencia de sesión en el cliente.

Validación y manejo de errores controlado.

Es una base sólida para ampliar hacia proyectos más complejos (roles, dashboard, reportes, etc.).