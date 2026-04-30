# Probar branch directory-backend-integration

## 1. Traer cambios de GitHub

```bash
git fetch origin
```

Si no tienes el branch local:

```bash
git switch -c directory-backend-integration origin/directory-backend-integration
```

Si ya tienes el branch local:

```bash
git switch directory-backend-integration
git pull
```

Verifica que estás en el branch correcto:

```bash
git branch --show-current
```

## 2. Instalar dependencias

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd ../backend
npm install
```

## 3. Crear archivo .env del backend

En `backend`, crear un archivo llamado `.env`.

Ejemplo:

```env
DB_NAME=clas_db
DB_USER=postgres
DB_PASSWORD=tu_password_de_postgres
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=clas_secret_dev
PORT=3000
```

`DB_PASSWORD` debe ser la contraseña local del usuario `postgres`.

## 4. Configurar base de datos

Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE clas_db;
```

Luego ejecutar en la base `clas_db`:

```text
backend/database/schema.sql
backend/database/seed.sql
```

Opcional: ejecutar el script extra de empresas de prueba si se quiere ver más información en el directorio.

## 5. Levantar backend

Desde `backend`:

```bash
npm run dev
```

Probar que responda:

```bash
curl http://localhost:3000/empresas/public
```

Debe regresar un JSON con empresas.

En Windows PowerShell, si `curl` no funciona bien:

```powershell
curl.exe http://localhost:3000/empresas/public
```

## 6. Levantar frontend

En otra terminal:

```bash
cd frontend
npm run dev
```

Abrir:

```text
http://localhost:5173
```

## 7. Login de prueba

Con el seed actual:

```text
correo: admin@cluster.com
contraseña: 123456
```

Sin login, el detalle usa:

```text
GET /empresas/public/:id
```

Con login, el detalle usa:

```text
GET /empresas/:id
```
