-- EXTENSION NECESARIA PARA UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- TIERS
CREATE TABLE IF NOT EXISTS tiers (
	id_tier SERIAL PRIMARY KEY,
	nombre_tier VARCHAR(50)
);

-- EMPRESAS
CREATE TABLE IF NOT EXISTS empresas (
	id_empresa SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	datos_generales TEXT,
	correo_electronico VARCHAR(150),
	contacto VARCHAR(20),
	nombre_contacto VARCHAR(50),
	tier_id INTEGER,
	logo VARCHAR(250) DEFAULT 'default_logo.png',
	FOREIGN KEY (tier_id) REFERENCES tiers(id_tier)
);

-- RUBROS
CREATE TABLE IF NOT EXISTS rubros(
	id_rubro SERIAL PRIMARY KEY,
	nombre_rubro VARCHAR(100) NOT NULL
);

-- RELACION EMPRESA - RUBRO
CREATE TABLE IF NOT EXISTS empresa_rubro (
	empresa_id INTEGER,
	rubro_id INTEGER,
	PRIMARY KEY (empresa_id, rubro_id),
	FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa),
	FOREIGN KEY (rubro_id) REFERENCES rubros(id_rubro)
);

-- SERVICIOS
CREATE TABLE IF NOT EXISTS servicios(
	id_servicio SERIAL PRIMARY KEY,
	nombre_servicio VARCHAR(150) NOT NULL
);

-- RELACION EMPRESA - SERVICIOS
CREATE TABLE IF NOT EXISTS empresa_servicios (
    empresa_id INTEGER,
    servicio_id INTEGER,
    PRIMARY KEY (empresa_id, servicio_id),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id_servicio)
);

-- ROLES
CREATE TABLE IF NOT EXISTS roles (
	id_rol SERIAL PRIMARY KEY,
	nombre_rol VARCHAR(50) NOT NULL
);

-- USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
	id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	nombre_usuario VARCHAR(100) NOT NULL,
	contrasena VARCHAR(150) NOT NULL,
	empresa_id INTEGER,
	rol_id INTEGER,
	FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa),
	FOREIGN KEY (rol_id) REFERENCES roles(id_rol)
);