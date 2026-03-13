-- Se eliminan tablas que no se usaran ya 

DROP TABLE IF EXISTS empresa_servicios;
DROP TABLE IF EXISTS servicios;

-- Se renombran tablas 

ALTER TABLE IF EXISTS empresa_rubro RENAME TO empresa_rubros;

-- Se reemplaza tiers por membresias 

DROP TABLE IF EXISTS tiers;

CREATE TABLE IF NOT EXISTS membresias (
    id_membresia SERIAL PRIMARY KEY,
    nombre_membresia VARCHAR(50) NOT NULL
);

INSERT INTO membresias (nombre_membresia) VALUES
    ('Asociado'),
    ('Afiliado'),
    ('Gobierno');

-- Nuevas tablas de catalogos 

CREATE TABLE IF NOT EXISTS tipos_organizacion (
    id_tipo      SERIAL PRIMARY KEY,
    nombre_tipo  VARCHAR(100) NOT NULL
);

INSERT INTO tipos_organizacion (nombre_tipo) VALUES
    ('OEM'),
    ('T1'),
    ('T2'),
    ('T3'),
    ('Gobierno'),
    ('Otra');

CREATE TABLE IF NOT EXISTS certificaciones (
    id_certificacion     SERIAL PRIMARY KEY,
    nombre_certificacion VARCHAR(100) NOT NULL
);

INSERT INTO certificaciones (nombre_certificacion) VALUES
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
    ('BASC');

CREATE TABLE IF NOT EXISTS funciones_contacto (
    id_funcion     SERIAL PRIMARY KEY,
    nombre_funcion VARCHAR(100) NOT NULL
);

INSERT INTO funciones_contacto (nombre_funcion) VALUES
    ('Contacto Principal'),
    ('Contacto Secundario'),
    ('Dirección / Gerencia General'),
    ('Compras / Cadena de Suministro'),
    ('Recursos Humanos');


-- MODIFICACION DE TABLA EMPRESAS 
-- Eliminar columnas que ya no se usan
ALTER TABLE empresas DROP COLUMN IF EXISTS datos_generales;
ALTER TABLE empresas DROP COLUMN IF EXISTS nombre_contacto;
ALTER TABLE empresas DROP COLUMN IF EXISTS tier_id;

-- Renombrar columnas
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'empresas' AND column_name = 'nombre'
    ) THEN
        ALTER TABLE empresas RENAME COLUMN nombre TO nombre_comercial;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'empresas' AND column_name = 'contacto'
    ) THEN
        ALTER TABLE empresas RENAME COLUMN contacto TO telefono;
    END IF;
END $$;

-- Agregar columnas nuevas
ALTER TABLE empresas
    ADD COLUMN IF NOT EXISTS razon_social         VARCHAR(200),
    ADD COLUMN IF NOT EXISTS rfc                  VARCHAR(13),
    ADD COLUMN IF NOT EXISTS sitio_web            VARCHAR(250),
    ADD COLUMN IF NOT EXISTS membresia_id         INTEGER REFERENCES membresias(id_membresia),
    ADD COLUMN IF NOT EXISTS tipo_organizacion_id INTEGER REFERENCES tipos_organizacion(id_tipo),
    ADD COLUMN IF NOT EXISTS ciudad               VARCHAR(100),
    ADD COLUMN IF NOT EXISTS domicilio_completo   TEXT,
    ADD COLUMN IF NOT EXISTS giro                 VARCHAR(150),
    ADD COLUMN IF NOT EXISTS fabrica_para_automotriz BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS activo               BOOLEAN DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS fecha_registro       TIMESTAMPTZ DEFAULT NOW();

--Nuevas tablas de datos

CREATE TABLE IF NOT EXISTS contactos (
    id_contacto      SERIAL PRIMARY KEY,
    empresa_id       INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    funcion_id       INTEGER REFERENCES funciones_contacto(id_funcion),
    nombre_completo  VARCHAR(150),
    puesto           VARCHAR(150),
    telefono_celular VARCHAR(20),
    correo           VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS empresa_certificaciones (
    empresa_id       INTEGER REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    certificacion_id INTEGER REFERENCES certificaciones(id_certificacion),
    PRIMARY KEY (empresa_id, certificacion_id)
);

--Se completa el catalogo de rubros

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
