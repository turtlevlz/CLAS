# CLAS: Clúster Automotriz de Sonora - Plataforma Principal

Plataforma web oficial para el **Clúster Automotriz de Sonora (CLAS)**, diseñada para centralizar recursos de la industria y fomentar la colaboración profesional en la región.

## Descripción del Proyecto

Este sistema funciona como el núcleo digital para el sector automotriz en Sonora, incluyendo:

- **Directorio de Empresas:** Base de datos searchable y filtrable de los miembros del clúster.
- **Sistema de Newsletter:** Actualizaciones de noticias de la industria y notificaciones de eventos.
- **Portal de Colaboración Segura:** Acceso basado en roles para miembros acreditados, permitiendo ver datos privados y herramientas de networking.

---

## 📋 Funcionalidades Clave

1. **Acceso Público:** - Consulta del directorio general de empresas.
   - Registro al boletín informativo (Newsletter).
2. **Acceso Autenticado:** - Inicio de sesión seguro para miembros verificados.
   - Acceso a credenciales exclusivas y métricas de colaboración.
3. **Panel de Administración:** - Herramientas de gestión para perfiles de empresas y distribución de noticias.

---

## ⚙️ Configuración e Instalación

Para obtener una copia local y ponerla en marcha, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/turtlevlz/CLAS.git
   ```

## 🛠️ Reglas del Workflow (Git & GitHub)

Para mantener el proyecto organizado y evitar conflictos de código, todos los integrantes debemos seguir estas reglas:

### 1. La Rama `main` es Sagrada

- **Prohibido** hacer `push` directo a `main`.
- Todo cambio debe hacerse en una rama independiente y unirse mediante un **Pull Request (PR)**.
- La rama `main` siempre debe tener código que funcione (que compile/corra).

### 2. Manejo de Ramas (Branching)

Usaremos una nomenclatura simple para las ramas:

- `feature/nombre-de-la-tarea` (para nuevas funcionalidades).
- `fix/descripcion-del-error` (para corregir bugs).
- `docs/cambios-en-documentacion` (para el README o manuales).

**Ejemplo:** `git checkout -b feature/directorio-empresas`

### 3. El Ciclo de Trabajo Diario

Antes de empezar a programar, sigue siempre este orden:

1. **Actualiza tu local:** `git checkout main` -> `git pull origin main`.
2. **Crea/Regresa a tu rama:** `git checkout mi-rama`.
3. **Sincroniza tu rama:** `git merge main` (para traer lo que otros hayan subido).

### 4. Commits Descriptivos

Evita mensajes como "cambios", "asdf" o "listo". Usa mensajes que expliquen qué hiciste:

- `✅ Add: Estructura básica del modelo de Base de Datos`
- `✨ Feat: Implementación de filtro por categoría en el directorio`
- `🐛 Fix: Corrección de error en el login de miembros`

### 5. Pull Requests y Revisión

- Al terminar una tarea, sube tu rama y abre un **Pull Request** en GitHub.
- Al menos **un compañero** debe revisar el código antes de darle `Merge` a `main`.
- Si hay conflictos, se resuelven en equipo, no se usa `--force`.
