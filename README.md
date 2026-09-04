# CLAS Platform

> **Note:** This branch is a sanitized public portfolio demo of an academic project originally built for a real automotive-industry client. Seed data, company names, contact details, and logos throughout this repo have been replaced with fictional equivalents; no real client or company data is included. Live demo: _link coming soon once deployed_.

Main web platform for the `Cluster Automotriz de Sonora (CLAS)`.

This repository contains the public-facing directory, authentication flow, protected administration areas, and the backend API used to manage companies, contacts, memberships, catalogs, and related business data for the automotive cluster.

## Overview

The platform is split into two applications:

- `frontend/`: React + Vite client for the public site and protected admin views.
- `backend/`: Express + TypeScript API backed by PostgreSQL through Sequelize.

Core capabilities include:

- Public company directory with company detail pages.
- Authentication with JWT-based protected routes.
- Company, contact, and manufactured product management.
- Catalog management for certifications, industries, rubros, processes, memberships, and more.
- Many-to-many company relationships for certifications, industries, needs, processes, and rubros.

## Tech Stack

### Frontend

- React 19
- Vite 8
- TypeScript
- Tailwind CSS 4
- React Router 7
- Axios

### Backend

- Node.js
- Express 5
- TypeScript
- Sequelize + `sequelize-typescript`
- PostgreSQL
- JWT authentication
- Multer for logo uploads
- Zod

## Repository Layout

```text
CLAS/
|-- backend/
|   |-- database/
|   |   |-- README.md
|   |   |-- schema.sql
|   |   `-- seed.sql
|   |-- src/
|   |   |-- app.ts
|   |   |-- index.ts
|   |   |-- connection/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   `-- routes/
|   |-- package.json
|   `-- tsconfig.json
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |-- context/
|   |   |-- features/
|   |   `-- pages/
|   |-- package.json
|   `-- vite.config.ts
|-- DocumentacionAPI.pdf
`-- README.md
```

## Prerequisites

- Node.js
- npm
- PostgreSQL
- pgAdmin (optional, but useful for running SQL files manually)

## Runtime URLs

- Frontend development app: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- Current backend CORS origin: `http://localhost:5173`

The backend currently listens on port `3000` from code, and the frontend API client is also configured to call `http://localhost:3000`.

## Environment Variables

Create a `.env` file inside `backend/` with the variables the backend actually uses:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clas_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=super_secret_key
```

Notes:

- `backend/src/connection/database.ts` loads these values with `dotenv`.
- The backend port is currently hardcoded in `backend/src/index.ts`, so there is no `PORT` environment variable in active use.

## Database Setup

Create the database first:

```sql
CREATE DATABASE clas_db;
```

Then run the SQL files in this order:

1. `backend/database/schema.sql`
2. `backend/database/seed.sql`

What gets created:

- Core catalog tables such as memberships, organization types, certifications, functions, rubros, roles, industries, needs, and processes.
- Main business tables for companies, users, contacts, and manufactured products.
- Join tables for company certifications, industries, needs, processes, and rubros.

Seed data highlights:

- A seeded admin user exists with email `admin@cluster.com`.
- The seed file includes the comment `password: admin123 (ejemplo hasheado con bcrypt)`.
- The same insert also includes an inline comment `contrasena: 123456`, so treat the seed comments as documentation notes and verify locally before sharing credentials.

Additional database notes are available in `backend/database/README.md`.

## Installation

There is no root application script in this repository. Run commands inside `backend/` and `frontend/` separately.

### Backend

```bash
cd backend
npm install
npm run build
npm run dev
```

Available backend scripts:

- `npm run build`: compile TypeScript into `dist/`
- `npm run dev`: run TypeScript watch mode and restart the compiled server with nodemon

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Available frontend scripts:

- `npm run dev`: start the Vite development server
- `npm run build`: type-check and build the production bundle
- `npm run lint`: run ESLint
- `npm run preview`: preview the production build locally

## Application Routes

### Public Frontend Routes

- `/`
- `/directorio`
- `/noticias`
- `/noticias/:id`
- `/login`
- `/empresa/:id`
- `/contrasena_reset`
- `/membresias`

### Protected Frontend Routes

- `/admin`
- `/admin/nueva-empresa`
- `/admin/empresas/:id/editar`
- `/mi-cuenta`

Route protection is enforced in the frontend based on the authenticated user and role information from the auth context.

## Authentication and Roles

The backend uses JWT authentication for protected endpoints.

Authorization header format:

```http
Authorization: Bearer <token>
```

Role IDs currently used by the application:

| ID | Role Name |
|---|---|
| `1` | Admin Cluster |
| `2` | Admin Empresa |
| `3` | Usuario Empresa |

High-level access model:

- `1`: full administrative access across the platform.
- `2`: company-scoped administration for its own company data and users.
- `3`: standard authenticated company user access.

## Backend API Overview

The main API is mounted in `backend/src/app.ts`.

### Core Endpoints

| Area | Base Path | Notes |
|---|---|---|
| Auth | `/auth` | Includes `POST /auth/login` |
| Users | `/usuarios` | User CRUD and company-scoped user listing |
| Roles | `/roles` | Role catalog CRUD |
| Companies | `/empresas` | Protected company CRUD plus paginated listing |
| Public Companies | `/empresas/public` | Public directory listing and public company detail |
| Contacts | `/contactos` | Company contact CRUD |
| Products | `/productos` | Manufactured product CRUD |

### Catalog Endpoints

| Resource | Base Path |
|---|---|
| Rubros | `/rubros` |
| Certifications | `/certificaciones` |
| Memberships | `/membresias` |
| Organization Types | `/organizaciones` |
| Contact Functions | `/funciones` |
| Industries | `/industrias` |
| Needs | `/necesidades` |
| Processes | `/procesos` |

### Company Relationship Endpoints

| Relationship | Base Path |
|---|---|
| Company Certifications | `/empresa-certificaciones` |
| Company Rubros | `/empresa-rubros` |
| Company Industries | `/empresa-industrias` |
| Company Needs | `/empresa-necesidades` |
| Company Processes | `/empresa-procesos` |

### Static Assets

| Path | Purpose |
|---|---|
| `/uploads` | Serves uploaded files from the backend runtime directory |

## API Behavior Notes

- Most protected endpoints use `verifyToken`.
- Role-restricted endpoints also use `checkRole(...)`.
- Company logo uploads are handled with Multer.
- Uploaded logos are stored under `uploads/logos` at runtime.
- The `uploads/` directory is ignored by Git.

### Public vs Protected API Behavior

- Public company directory routes are exposed through `/empresas/public` and `/empresas/public/:id`.
- Protected company management routes are exposed through `/empresas`.
- Some catalog routes are public for reads in the current implementation, while others require authentication for reads as well, so check the route files if you need exact behavior by resource.

## Development Notes

- `backend/src/index.ts` calls `sequelize.sync()` on startup before listening.
- `backend/src/app.ts` serves the API root response `CLAS API running` at `/`.
- The frontend API client is configured in `frontend/src/api/config.ts`.
- The backend serves uploaded files with `express.static` from `/uploads`.

## Troubleshooting

### Backend cannot connect to PostgreSQL

Check:

- PostgreSQL is running.
- The `clas_db` database exists.
- The values in `backend/.env` match your local PostgreSQL credentials.

### Frontend cannot reach the API

Check:

- The backend is running on `http://localhost:3000`.
- The frontend is running on `http://localhost:5173`.
- The frontend API base URL in `frontend/src/api/config.ts` still matches the backend URL.

### Uploaded logos are not visible

Check:

- The upload completed successfully through the backend.
- Files exist in the backend runtime `uploads/` directory.
- Requests are being made to the `/uploads` path exposed by the backend.

## Additional Documentation

- `DocumentacionAPI.pdf`: deeper API reference
- `backend/database/README.md`: database setup notes

## Validation Checklist

- README content matches `backend/package.json` and `frontend/package.json` scripts.
- API paths match the routes mounted in `backend/src/app.ts`.
- Database instructions match `backend/database/schema.sql`, `backend/database/seed.sql`, and `backend/database/README.md`.
