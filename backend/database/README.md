# Database Setup

Este proyecto utiliza PostgreSQL como sistema de base de datos.

## 1 Instalar PostgreSQL

Descargar desde:

https://www.postgresql.org/download/

Instalar también pgAdmin.

Durante la instalación se pedirá crear una contraseña para el usuario `postgres`.

---

## 2 Crear base de datos

Abrir pgAdmin o terminal y ejecutar:

CREATE DATABASE clas_db;

---

## 3 Crear estructura de tablas

Ejecutar el archivo:

database/schema.sql

Esto creará todas las tablas del sistema.

---

## 4 Insertar datos iniciales

Ejecutar:

database/seed.sql

Esto agregará:

- tiers
- rubros
- servicios
- roles

---

## 5 Verificar tablas

La base de datos debe tener:

tiers
empresas
rubros
empresa_rubro
servicios
empresa_servicios
roles
usuarios

# Cambios a la base de datos

Si se realizan cambios en la estructura de la base de datos se debe crear un archivo
SQL dentro de la carpeta `migrations`.

Formato del nombre:

001_descripcion_cambio.sql
002_descripcion_cambio.sql

Ejemplo:

001_add_direccion_empresa.sql

Contenido del archivo:

ALTER TABLE empresas
ADD direccion VARCHAR(200);

Cada integrante deberá ejecutar los archivos nuevos en su base de datos local.