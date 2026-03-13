
-- LIMPIEZA DE ESTRUCTURA ANTERIOR

-- eliminar FK que dependía de tiers
ALTER TABLE IF EXISTS empresas
DROP CONSTRAINT IF EXISTS empresas_tier_id_fkey;

-- eliminar columna tier_id
ALTER TABLE IF EXISTS empresas
DROP COLUMN IF EXISTS tier_id;

-- eliminar tabla tiers
DROP TABLE IF EXISTS tiers;

-- eliminar tablas que ya no se usarán
DROP TABLE IF EXISTS empresa_servicios;
DROP TABLE IF EXISTS servicios;


-- RENOMBRAR TABLAS

ALTER TABLE IF EXISTS empresa_rubro
RENAME TO empresa_rubros;


-- NUEVA TABLA MEMBRESIAS

CREATE TABLE IF NOT EXISTS membresias (
    id_membresia SERIAL PRIMARY KEY,
    nombre_membresia VARCHAR(50) NOT NULL
);

INSERT INTO membresias (nombre_membresia)
SELECT v.nombre FROM (VALUES
    ('Asociado'),
    ('Afiliado'),
    ('Gobierno')
) AS v(nombre)
WHERE NOT EXISTS (
    SELECT 1 FROM membresias WHERE nombre_membresia = v.nombre
);


-- CATALOGOS NUEVOS

CREATE TABLE IF NOT EXISTS tipos_organizacion (
    id_tipo SERIAL PRIMARY KEY,
    nombre_tipo VARCHAR(100) NOT NULL
);

INSERT INTO tipos_organizacion (nombre_tipo)
SELECT v.nombre FROM (VALUES
    ('OEM'),
    ('T1'),
    ('T2'),
    ('T3'),
    ('Gobierno'),
    ('Otra')
) AS v(nombre)
WHERE NOT EXISTS (
    SELECT 1 FROM tipos_organizacion WHERE nombre_tipo = v.nombre
);


CREATE TABLE IF NOT EXISTS certificaciones (
    id_certificacion SERIAL PRIMARY KEY,
    nombre_certificacion VARCHAR(100) NOT NULL
);

INSERT INTO certificaciones (nombre_certificacion)
SELECT v.nombre FROM (VALUES
    ('IATF 16949'),
    ('ISO 9001'),
    ('ISO 14001'),
    ('ISO 27001'),
    ('ISO 45001'),
    ('CTPAT'),
    ('OEA'),
    ('IMMEX'),
    ('Certificado IVA/IEPS'),
    ('Empresa Limpia'),
    ('BASC')
) AS v(nombre)
WHERE NOT EXISTS (
    SELECT 1 FROM certificaciones WHERE nombre_certificacion = v.nombre
);


CREATE TABLE IF NOT EXISTS funciones_contacto (
    id_funcion SERIAL PRIMARY KEY,
    nombre_funcion VARCHAR(100) NOT NULL
);

INSERT INTO funciones_contacto (nombre_funcion)
SELECT v.nombre FROM (VALUES
    ('Contacto Principal'),
    ('Contacto Secundario'),
    ('Dirección / Gerencia General'),
    ('Compras / Cadena de Suministro'),
    ('Recursos Humanos')
) AS v(nombre)
WHERE NOT EXISTS (
    SELECT 1 FROM funciones_contacto WHERE nombre_funcion = v.nombre
);


-- MODIFICACION DE TABLA EMPRESAS

-- eliminar columnas viejas
ALTER TABLE IF EXISTS empresas DROP COLUMN IF EXISTS datos_generales;
ALTER TABLE IF EXISTS empresas DROP COLUMN IF EXISTS nombre_contacto;

-- renombrar columnas si existen
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name='empresas'
        AND column_name='nombre'
    ) THEN
        ALTER TABLE empresas RENAME COLUMN nombre TO nombre_comercial;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name='empresas'
        AND column_name='contacto'
    ) THEN
        ALTER TABLE empresas RENAME COLUMN contacto TO telefono;
    END IF;
END $$;


-- agregar nuevas columnas
ALTER TABLE empresas
ADD COLUMN IF NOT EXISTS razon_social VARCHAR(200),
ADD COLUMN IF NOT EXISTS rfc VARCHAR(13),
ADD COLUMN IF NOT EXISTS sitio_web VARCHAR(250),
ADD COLUMN IF NOT EXISTS membresia_id INTEGER REFERENCES membresias(id_membresia),
ADD COLUMN IF NOT EXISTS tipo_organizacion_id INTEGER REFERENCES tipos_organizacion(id_tipo),
ADD COLUMN IF NOT EXISTS ciudad VARCHAR(100),
ADD COLUMN IF NOT EXISTS domicilio_completo TEXT,
ADD COLUMN IF NOT EXISTS giro VARCHAR(150),
ADD COLUMN IF NOT EXISTS fabrica_para_automotriz BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS fecha_registro TIMESTAMPTZ DEFAULT NOW();


-- NUEVAS TABLAS DE DATOS

CREATE TABLE IF NOT EXISTS contactos (
    id_contacto SERIAL PRIMARY KEY,
    empresa_id INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    funcion_id INTEGER REFERENCES funciones_contacto(id_funcion),
    nombre_completo VARCHAR(150),
    puesto VARCHAR(150),
    telefono_celular VARCHAR(20),
    correo VARCHAR(150)
);


CREATE TABLE IF NOT EXISTS empresa_certificaciones (
    empresa_id INTEGER REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    certificacion_id INTEGER REFERENCES certificaciones(id_certificacion),
    PRIMARY KEY (empresa_id, certificacion_id)
);


-- COMPLETAR CATALOGO DE RUBROS

INSERT INTO rubros (nombre_rubro)
SELECT v.nombre FROM (VALUES
    ('Estampado'),
    ('Tratamiento de superficies'),
    ('Ensamble'),
    ('Logística')
) AS v(nombre)
WHERE NOT EXISTS (
    SELECT 1 FROM rubros WHERE nombre_rubro = v.nombre
);