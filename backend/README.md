# CLAS Backend API

Backend del sistema CLAS Connect.

Tecnologías utilizadas:

- Node.js
- Express
- TypeScript
- Sequelize
- PostgreSQL

---

# Instalación del proyecto

1 Clonar repositorio

git clone <repo>

2 Entrar al backend

cd backend

3 Instalar dependencias

npm install

4 Ejecutar servidor

npm run dev

---

# Configuración de base de datos

Seguir instrucciones en:

database/README.md

---

# Estructura del backend

## database

Contiene scripts SQL para crear la base de datos.

schema.sql

Define todas las tablas del sistema.

seed.sql

Inserta datos iniciales necesarios para el sistema.

---

## src

Contiene el código de la API.

### connection

Maneja la conexión con PostgreSQL usando Sequelize.

database.ts

---

### models

Define los modelos del sistema.

Cada modelo representa una tabla de la base de datos.

Ejemplo:

Empresa
Usuario
Rubro
Servicio

---

### controllers

Contienen la lógica de negocio.

Ejemplo:

- obtener empresas
- crear empresa
- actualizar empresa

---

### routes

Define los endpoints de la API.

Ejemplo:

GET /empresas
POST /empresas
GET /rubros

---

### app.ts

Configura Express y middlewares.

---

### index.ts

Punto de entrada del servidor.

Inicializa:

- conexión a base de datos
- servidor Express


# Environment Variables

Este proyecto utiliza variables de entorno para la configuración.

1 Copiar el archivo:

.env.example

y renombrarlo a:

.env

2 Configurar las variables según tu entorno local.

Ejemplo:

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=clas_db
DB_USER=postgres
DB_PASSWORD=tu_password