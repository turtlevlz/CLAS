-- EXTENSION NECESARIA PARA UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- MEMBRESIAS
CREATE TABLE IF NOT EXISTS membresias (
    id_membresia SERIAL PRIMARY KEY,
    nombre_membresia VARCHAR(50) NOT NULL,
    precio NUMERIC(10,2) NOT NULL DEFAULT 0
);

-- TIPOS DE ORGANIZACION
CREATE TABLE IF NOT EXISTS tipos_organizacion (
    id_tipo SERIAL PRIMARY KEY,
    nombre_tipo VARCHAR(100) NOT NULL
);

-- CERTIFICACIONES
CREATE TABLE IF NOT EXISTS certificaciones (
    id_certificacion SERIAL PRIMARY KEY,
    nombre_certificacion VARCHAR(100) NOT NULL
);

-- FUNCIONES DE CONTACTO
CREATE TABLE IF NOT EXISTS funciones_contacto (
    id_funcion SERIAL PRIMARY KEY,
    nombre_funcion VARCHAR(100) NOT NULL
);

-- RUBROS
CREATE TABLE IF NOT EXISTS rubros (
    id_rubro SERIAL PRIMARY KEY,
    nombre_rubro VARCHAR(100) NOT NULL
);

-- ROLES
CREATE TABLE IF NOT EXISTS roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

-- EMPRESAS
CREATE TABLE IF NOT EXISTS empresas (
    id_empresa SERIAL PRIMARY KEY,
    nombre_comercial VARCHAR(100) NOT NULL,
    razon_social VARCHAR(200),
    rfc VARCHAR(13) NOT NULL UNIQUE,
    correo_electronico VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    sitio_web VARCHAR(250),
    membresia_id INTEGER NOT NULL REFERENCES membresias(id_membresia) ON DELETE RESTRICT,
    tipo_organizacion_id INTEGER NOT NULL REFERENCES tipos_organizacion(id_tipo) ON DELETE RESTRICT,
    ciudad VARCHAR(100),
    domicilio_completo TEXT,
    giro VARCHAR(150),
    fabrica_para_automotriz BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    logo VARCHAR(250) DEFAULT 'default_logo.png',
    fecha_registro TIMESTAMPTZ DEFAULT NOW(),
    descripcion TEXT,
    anio_fundacion INTEGER,
    rango_empleados VARCHAR(50)
);

-- USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_usuario VARCHAR(100) NOT NULL,
    contrasena VARCHAR(150) NOT NULL,
    correo_electronico VARCHAR(150) NOT NULL UNIQUE,
    empresa_id INTEGER REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    rol_id INTEGER NOT NULL REFERENCES roles(id_rol) ON DELETE RESTRICT
);

-- CONTACTOS
CREATE TABLE IF NOT EXISTS contactos (
    id_contacto SERIAL PRIMARY KEY,
    empresa_id INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    funcion_id INTEGER NOT NULL REFERENCES funciones_contacto(id_funcion) ON DELETE RESTRICT,
    nombre_completo VARCHAR(150),
    puesto VARCHAR(150),
    telefono_celular VARCHAR(20),
    correo VARCHAR(150)
);

-- PROCESOS
CREATE TABLE IF NOT EXISTS procesos (
    id_proceso SERIAL PRIMARY KEY,
    nombre_proceso VARCHAR(150) NOT NULL
);

-- PRODUCTOS FABRICADOS
CREATE TABLE IF NOT EXISTS productos_fabricados (
    id_producto SERIAL PRIMARY KEY,
    empresa_id INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    nombre_producto TEXT NOT NULL,
    clientes TEXT,
    porcentaje_produccion NUMERIC(5,2) CHECK (porcentaje_produccion BETWEEN 0 AND 100)
);

-- INDUSTRIAS
CREATE TABLE IF NOT EXISTS industrias (
    id_industria SERIAL PRIMARY KEY,
    nombre_industria VARCHAR(100) NOT NULL
);

-- NECESIDADES 
CREATE TABLE IF NOT EXISTS necesidades_proveeduria (
    id_necesidad SERIAL PRIMARY KEY,
    nombre_necesidad VARCHAR(150) NOT NULL
);

-- RELACION EMPRESA - RUBRO
CREATE TABLE IF NOT EXISTS empresa_rubros (
	empresa_id INTEGER,
	rubro_id INTEGER,
	PRIMARY KEY (empresa_id, rubro_id),
	FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa) ON DELETE CASCADE,
	FOREIGN KEY (rubro_id) REFERENCES rubros(id_rubro) ON DELETE CASCADE
);

-- RELACION EMPRESA - CERTIFICACIONES
CREATE TABLE IF NOT EXISTS empresa_certificaciones (
    empresa_id INTEGER,
    certificacion_id INTEGER,
    PRIMARY KEY (empresa_id, certificacion_id),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    FOREIGN KEY (certificacion_id) REFERENCES certificaciones(id_certificacion) ON DELETE CASCADE
);

-- RELACION EMPRESA - PROCESOS
CREATE TABLE IF NOT EXISTS empresa_procesos (
    empresa_id INTEGER,
    proceso_id INTEGER,
    PRIMARY KEY (empresa_id, proceso_id),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    FOREIGN KEY (proceso_id) REFERENCES procesos(id_proceso) ON DELETE CASCADE
);

-- RELACION EMPRESA - INDUSTRIAS
CREATE TABLE IF NOT EXISTS empresa_industrias (
    empresa_id INTEGER,
    industria_id INTEGER,
    PRIMARY KEY (empresa_id, industria_id),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    FOREIGN KEY (industria_id) REFERENCES industrias(id_industria) ON DELETE CASCADE
);

-- RELACION EMPRESA - NECESIDADES
CREATE TABLE IF NOT EXISTS empresa_necesidades (
    empresa_id INTEGER,
    necesidad_id INTEGER,
    PRIMARY KEY (empresa_id, necesidad_id),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    FOREIGN KEY (necesidad_id) REFERENCES necesidades_proveeduria(id_necesidad) ON DELETE CASCADE
);

-- INDICES
CREATE INDEX IF NOT EXISTS idx_empresa_rubros_rubro_id
ON empresa_rubros(rubro_id);

CREATE INDEX IF NOT EXISTS idx_empresa_certificaciones_certificacion_id 
ON empresa_certificaciones(certificacion_id);

CREATE INDEX IF NOT EXISTS idx_empresa_procesos_proceso_id 
ON empresa_procesos(proceso_id);

CREATE INDEX IF NOT EXISTS idx_empresa_industrias_industria_id
ON empresa_industrias(industria_id);

CREATE INDEX IF NOT EXISTS idx_empresa_necesidades_necesidad_id
ON empresa_necesidades(necesidad_id);