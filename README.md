# CLAS: Clúster Automotriz de Sonora - Plataforma Principal
 
Plataforma web oficial para el **Clúster Automotriz de Sonora (CLAS)**, diseñada para centralizar recursos de la industria y fomentar la colaboración profesional en la región.
 
## Descripción del Proyecto
 
Este sistema funciona como el núcleo digital para el sector automotriz en Sonora, incluyendo:
 
- **Directorio de Empresas:** Base de datos buscable y filtrable de los miembros del clúster.
- **Sistema de Newsletter:** Actualizaciones de noticias de la industria y notificaciones de eventos.
- **Portal de Colaboración Segura:** Acceso basado en roles para miembros acreditados, permitiendo ver datos privados y herramientas de networking.
---
 
## Estructura del proyecto
 
```
CLAS/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── connection/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/   # Modelos de PostgreSQL
│       └── routes/   # Rutas de API
└── frontend/         # Páginas y Componentes de React
```
 
---
 
## Requisitos
 
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://postgresql.org)
- npm
---
 
## Base de Datos
 
Ejecutar en pgAdmin4 o en terminal:
```
CREATE DATABASE clas_db;
```
 
Ejecutar el archivo schema.sql que se encuentra en:
```
backend/database
```
 
Ejecutar el archivo seed.sql para agregar datos seedeados.
 
---
 
## Configuración e Instalación
 
```
# Instalar dependencias en ambos directorios (backend y frontend)
npm install
 
# Variables de entorno
cp .env.example .env
 
# Iniciar servidor de desarrollo
npm run dev
```
 
---
 
## Variables de entorno
 
Editar el archivo .env en base a los siguientes datos:
```
PORT=3000
 
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clas_db
DB_USER=postgres
DB_PASSWORD=your_password
 
JWT_SECRET=super_secret_key
```
 
---
 
## API
 
Descripción general de la API. Para una descripción detallada checar el archivo `DocumentacionAPI.pdf`.
 
### Roles
 
| ID Role | Nombre | Descripción |
|---|---|---|
| `1` | Admin Cluster | Acceso Completo |
| `2` | Admin Empresa | Maneja datos de su propia compañía |
| `3` | Usuario de empresa | Leer directorio, manejar su propia cuenta |
 
### Middleware
 
**`verifyToken`** - Valida JWTs enviado en el header de autorización. Formato:
`Authorization: Bearer <token>`
 
**`checkRole`** - Valida que el usuario tenga alguno de los roles permitidos.
 
**`uploadLogo`** - Permite subir imágenes. Formatos aceptados: `.jpg, .jpeg, .png y .webp`. Se guardan en uploads/logos. Límite de 5 MBs.
 
### Usuarios
 
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `POST` | `/usuarios` | Rol 1 | Crear un usuario. Rol 1 puede crear cualquier usuario. Rol 2 solo puede crear un Rol 3 para su propia empresa. |
| `GET` | `/usuarios` | Rol 1 | Listar a todos los usuarios. |
| `GET` | `/usuarios/:id` | Cualquiera | Listar usuario por id. Rol 2 solo puede ver usuarios de su empresa. Rol 3 solo se puede ver a sí mismo. |
| `GET` | `/usuarios/empresa/:empresa_id` | Rol 1 y 2 | Listar usuarios de una compañía. |
| `PATCH` | `/usuarios/:id` | Cualquiera | Actualizar datos de un usuario. Rol 2 solo puede actualizar usuarios de su empresa. Rol 3 solo a sí mismo. |
| `DELETE` | `/usuarios/:id` | Cualquiera | Borrar un usuario. No se puede borrar rol 1. Rol 2 solo puede borrar usuarios Rol 3 de su empresa. Rol 3 solo a sí mismo. |
 
**Reglas generales:** Campos de `nombre_usuario`, `correo_electronico`, `contrasena` obligatorios. Correo debe ser un correo con formato válido y no puede ser repetido. Debe existir `rol_id`. Rol 1 no puede tener `empresa_id`. Roles 2 y 3 requieren un `empresa_id` válido.
 
### Empresas
 
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `POST` | `/empresas` | Rol 1 | Crear una empresa. Requiere `multipart/form-data` si se envía un logo. |
| `GET` | `/empresas?page=n` | Cualquiera | Listar empresas. Máximo de 12 registros por página. Número de página es opcional, se usa 1 por defecto. |
| `GET` | `/empresas/:id` | Cualquiera | Listar una empresa por id. |
| `PATCH` | `/empresas/:id` | Rol 1 y 2 | Editar una empresa. Rol 2 solo puede modificar su propia empresa. |
| `DELETE` | `/empresas/:id` | Rol 1 | Eliminar una empresa. Solo Rol 1 puede eliminar una empresa. |
 
**Reglas generales:** Campos de `nombre_comercial`, `rfc`, `correo_electronico`, `membresia_id`, `tipo_organizacion_id` requeridos. No se aceptan duplicados de `nombre_comercial`, `rfc` o `correo_electronico`.
 
### Contactos
 
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `POST` | `/contactos` | Rol 1 y 2 | Agregar un contacto. Rol 2 solo de su propia empresa. |
| `GET` | `/contactos/empresa/:empresa_id` | Cualquiera | Listar los contactos de una empresa. |
| `GET` | `/contactos/:id` | Cualquiera | Obtener un contacto específico. |
| `PATCH` | `/contactos/:id` | Rol 1 y 2 | Modificar un contacto. Rol 2 solo de su propia empresa. |
| `DELETE` | `/contactos/:id` | Rol 1 y 2 | Eliminar un contacto. Rol 2 solo de su propia empresa. |
 
**Reglas generales:** Los campos `funcion_id`, `nombre_completo`, `puesto`, `telefono_celular` son requeridos.
 
### Productos fabricados
 
| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `POST` | `/productos` | Rol 1 y 2 | Crear un nuevo producto fabricado. Rol 2 solo puede crear de su propia empresa. |
| `GET` | `/productos/empresa/:empresa_id` | Rol 1 y 2 | Listar productos para una empresa. |
| `GET` | `/productos/:id` | Rol 1 y 2 | Listar un producto específico. |
| `PATCH` | `/productos/:id` | Rol 1 y 2 | Actualizar un producto. |
| `DELETE` | `/productos/:id` | Rol 1 y 2 | Eliminar un producto. |
 
**Reglas generales:** `porcentaje_produccion` debe ser un valor entre 0 y 100. No puede haber productos con nombre duplicado en una misma empresa.
 
### Endpoints de catálogo
 
Estos endpoints siguen un mismo patrón CRUD. Todos requieren autorización. La creación de uno está restringida al rol 1.
 
```
Patrón CRUD
POST  | Crear un objeto nuevo.
GET   | Listar todos los objetos.
GET   | Listar un objeto por ID.
PATCH | Actualizar un objeto.
DELETE| Eliminar un objeto.
```
 
| Recurso | Ruta base | Notas |
|---|---|---|
| Roles | `/roles` | No se puede modificar o eliminar el rol para el admin del clúster. No se puede eliminar un rol en uso por un usuario. |
| Membresías | `/membresias` | No se puede eliminar si está asignado a una empresa. |
| Organizaciones | `/organizaciones` | No se puede eliminar si está asignado a una empresa. |
| Certificaciones | `/certificaciones` | - |
| Rubros | `/rubros` | - |
| Industrias | `/industrias` | No se puede eliminar si está asignado a una empresa. |
| Necesidades | `/necesidades` | No se puede eliminar si está asignado a una empresa. |
| Procesos | `/procesos` | No se puede eliminar si está asignado a una empresa. |
| Funciones de contacto | `/funciones` | No se puede eliminar si está asignado a un contacto. |
 
### Relaciones de Empresas (muchos a muchos)
 
| Nombre | Ruta |
|---|---|
| Certificaciones | `/empresa-certificaciones` |
| Industrias | `/empresa-industrias` |
| Necesidades | `/empresa-necesidades` |
| Procesos | `/empresa-procesos` |
| Rubros | `/empresa-rubros` |
