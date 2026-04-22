-- EXTENSION NECESARIA PARA UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- MEMBRESIAS
CREATE TABLE IF NOT EXISTS membresias (
    id_membresia SERIAL PRIMARY KEY,
    nombre_membresia VARCHAR(50) NOT NULL
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
    rfc VARCHAR(13),
    correo_electronico VARCHAR(150),
    telefono VARCHAR(20),
    sitio_web VARCHAR(250),
    membresia_id INTEGER REFERENCES membresias(id_membresia),
    tipo_organizacion_id INTEGER REFERENCES tipos_organizacion(id_tipo),
    ciudad VARCHAR(100),
    domicilio_completo TEXT,
    giro VARCHAR(150),
    fabrica_para_automotriz BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    logo VARCHAR(250) DEFAULT 'default_logo.png',
    fecha_registro TIMESTAMPTZ DEFAULT NOW()
);

-- USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_usuario VARCHAR(100) NOT NULL,
    contrasena VARCHAR(150) NOT NULL,
    correo_electronico VARCHAR(150) UNIQUE,
    empresa_id INTEGER REFERENCES empresas(id_empresa),
    rol_id INTEGER REFERENCES roles(id_rol)
);

-- CONTACTOS
CREATE TABLE IF NOT EXISTS contactos (
    id_contacto SERIAL PRIMARY KEY,
    empresa_id INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    funcion_id INTEGER REFERENCES funciones_contacto(id_funcion),
    nombre_completo VARCHAR(150),
    puesto VARCHAR(150),
    telefono_celular VARCHAR(20),
    correo VARCHAR(150)
);

-- RELACION EMPRESA - RUBRO
CREATE TABLE IF NOT EXISTS empresa_rubro (
	empresa_id INTEGER,
	rubro_id INTEGER,
	PRIMARY KEY (empresa_id, rubro_id),
	FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa),
	FOREIGN KEY (rubro_id) REFERENCES rubros(id_rubro)
);

-- RELACION EMPRESA - CERTIFICACIONES
CREATE TABLE IF NOT EXISTS empresa_certificaciones (
    empresa_id INTEGER,
    certificacion_id INTEGER,
    PRIMARY KEY (empresa_id, certificacion_id),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa),
    FOREIGN KEY (certificacion_id) REFERENCES certificaciones(id_certificacion)
);