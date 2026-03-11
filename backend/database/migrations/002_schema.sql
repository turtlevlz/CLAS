-- PASO 1: LIMPIAR COLUMNAS VIEJAS DE empresas
-- (antes de agregar las nuevas para evitar conflictos)


-- tier_id será reemplazado por membresia_id (mismo dato, nombre correcto)
ALTER TABLE empresas DROP COLUMN IF EXISTS tier_id;

-- datos_generales y nombre_contacto se reemplazan por campos específicos
-- y la tabla contactos
ALTER TABLE empresas DROP COLUMN IF EXISTS datos_generales;
ALTER TABLE empresas DROP COLUMN IF EXISTS nombre_contacto;

-- contacto (teléfono) se renombra a telefono
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'empresas' AND column_name = 'contacto'
    ) THEN
        ALTER TABLE empresas RENAME COLUMN contacto TO telefono;
    END IF;
END $$;

-- nombre se renombra a nombre_comercial para alinearse con el formulario
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'empresas' AND column_name = 'nombre'
    ) THEN
        ALTER TABLE empresas RENAME COLUMN nombre TO nombre_comercial;
    END IF;
END $$;


-- PASO 2: ELIMINAR TABLAS QUE YA NO SE USAN
--         (empresa_servicios y servicios quedan reemplazadas
--          por proveedores_empresa que viene más adelante)


DROP TABLE IF EXISTS empresa_servicios;
DROP TABLE IF EXISTS servicios;

-- Renombrar empresa_rubro por consistencia de nombres
ALTER TABLE IF EXISTS empresa_rubro RENAME TO empresa_rubros;


-- PASO 3: ELIMINAR TABLA tiers Y REEMPLAZAR POR membresias
--         (mismo dato, nombre correcto según el formulario)


DROP TABLE IF EXISTS tiers;

CREATE TABLE IF NOT EXISTS membresias (
    id_membresia   SERIAL PRIMARY KEY,
    nombre_membresia VARCHAR(50) NOT NULL
);

INSERT INTO membresias (nombre_membresia) VALUES
    ('Asociado'),
    ('Afiliado'),
    ('Gobierno');


-- PASO 4: NUEVAS TABLAS DE CATÁLOGOS


-- Tipo de organización en la cadena de suministro (campo #12 del formulario)
-- OEM, T1, T2, T3, Gobierno, etc.
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
    ('Cámara / Asociación'),
    ('Institución Educativa'),
    ('Otra');

-- Ciudades de Sonora (campo #14 del formulario)
CREATE TABLE IF NOT EXISTS ciudades (
    id_ciudad     SERIAL PRIMARY KEY,
    nombre_ciudad VARCHAR(100) NOT NULL,
    estado        VARCHAR(100) DEFAULT 'Sonora'
);

INSERT INTO ciudades (nombre_ciudad) VALUES
    ('Hermosillo'),
    ('Nogales'),
    ('Guaymas / Empalme'),
    ('Ciudad Obregón'),
    ('Agua Prieta'),
    ('San Luis Río Colorado'),
    ('Otra');

-- Giros de empresa (campo #18 del formulario)
CREATE TABLE IF NOT EXISTS giros (
    id_giro      SERIAL PRIMARY KEY,
    nombre_giro  VARCHAR(150) NOT NULL
);

INSERT INTO giros (nombre_giro) VALUES
    ('Fabricación de autopartes de plástico'),
    ('Fabricación de autopartes metálicas'),
    ('Ensamble de componentes'),
    ('Maquinado CNC'),
    ('Soldadura'),
    ('Estampado'),
    ('Logística y transporte'),
    ('Servicios de ingeniería'),
    ('Automatización industrial'),
    ('Tratamiento de superficies'),
    ('Otro');

-- Certificaciones (campo #60 del formulario)
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

-- Funciones de contacto (campos #19-#46 del formulario)
CREATE TABLE IF NOT EXISTS funciones_contacto (
    id_funcion     SERIAL PRIMARY KEY,
    nombre_funcion VARCHAR(100) NOT NULL
);

INSERT INTO funciones_contacto (nombre_funcion) VALUES
    ('Contacto Principal'),
    ('Contacto Secundario'),
    ('Dirección / Gerencia General'),
    ('Atracción de Inversiones y Proyectos'),
    ('Compras / Cadena de Suministro'),
    ('Recursos Humanos'),
    ('Medio Ambiente y Sustentabilidad');

-- Tipos de insumo para proveedores (Producto | Servicio)
CREATE TABLE IF NOT EXISTS tipos_insumo (
    id_tipo_insumo SERIAL PRIMARY KEY,
    nombre         VARCHAR(20) NOT NULL
);

INSERT INTO tipos_insumo (nombre) VALUES
    ('Producto'),
    ('Servicio');


-- PASO 5: AGREGAR COLUMNAS NUEVAS A empresas


ALTER TABLE empresas
    ADD COLUMN IF NOT EXISTS razon_social            VARCHAR(200),
    ADD COLUMN IF NOT EXISTS rfc                     VARCHAR(13),
    ADD COLUMN IF NOT EXISTS sitio_web               VARCHAR(250),
    ADD COLUMN IF NOT EXISTS membresia_id            INTEGER REFERENCES membresias(id_membresia),
    ADD COLUMN IF NOT EXISTS tipo_organizacion_id    INTEGER REFERENCES tipos_organizacion(id_tipo),
    ADD COLUMN IF NOT EXISTS tipo_organizacion_otro  VARCHAR(150),
    ADD COLUMN IF NOT EXISTS giro_id                 INTEGER REFERENCES giros(id_giro),
    ADD COLUMN IF NOT EXISTS ciudad_id               INTEGER REFERENCES ciudades(id_ciudad),
    ADD COLUMN IF NOT EXISTS ciudad_otra             VARCHAR(150),
    ADD COLUMN IF NOT EXISTS domicilio_completo      TEXT,
    ADD COLUMN IF NOT EXISTS fabrica_para_automotriz BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS constancia_fiscal       VARCHAR(250),
    ADD COLUMN IF NOT EXISTS poder_representante     VARCHAR(250),
    ADD COLUMN IF NOT EXISTS ine_representante       VARCHAR(250),
    ADD COLUMN IF NOT EXISTS comprobante_domicilio   VARCHAR(250),
    ADD COLUMN IF NOT EXISTS activo                  BOOLEAN DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS fecha_registro          TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS fecha_actualizacion     TIMESTAMPTZ DEFAULT NOW();


-- PASO 6: NUEVAS TABLAS RELACIONADAS A empresas


-- Contactos por empresa (campos #19-#46 del formulario)
CREATE TABLE IF NOT EXISTS contactos (
    id_contacto      SERIAL PRIMARY KEY,
    empresa_id       INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    funcion_id       INTEGER REFERENCES funciones_contacto(id_funcion),
    nombre_completo  VARCHAR(150),
    puesto           VARCHAR(150),
    telefono_celular VARCHAR(20),
    correo           VARCHAR(150),
    es_principal     BOOLEAN DEFAULT FALSE
);

-- Productos que fabrica la empresa (campos #47-#55 del formulario)
CREATE TABLE IF NOT EXISTS productos_empresa (
    id_producto           SERIAL PRIMARY KEY,
    empresa_id            INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    nombre_producto       VARCHAR(200) NOT NULL,
    clientes              TEXT,
    porcentaje_produccion NUMERIC(5,2),
    orden                 SMALLINT DEFAULT 1
);

-- Procesos productivos de la empresa (campos #56-#58 del formulario)
CREATE TABLE IF NOT EXISTS procesos_empresa (
    id_proceso     SERIAL PRIMARY KEY,
    empresa_id     INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    nombre_proceso VARCHAR(200) NOT NULL,
    orden          SMALLINT DEFAULT 1
);

-- Relación empresa - certificaciones (campo #60 del formulario)
CREATE TABLE IF NOT EXISTS empresa_certificaciones (
    empresa_id       INTEGER REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    certificacion_id INTEGER REFERENCES certificaciones(id_certificacion),
    PRIMARY KEY (empresa_id, certificacion_id)
);

-- Proveedores que usa la empresa (campos #61-#90 del formulario)
-- Cubre tanto productos (5) como servicios (5) con tipo_insumo_id
CREATE TABLE IF NOT EXISTS proveedores_empresa (
    id_proveedor_empresa SERIAL PRIMARY KEY,
    empresa_id           INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    tipo_insumo_id       INTEGER REFERENCES tipos_insumo(id_tipo_insumo),
    nombre_insumo        VARCHAR(200),
    nombre_proveedor     VARCHAR(200),
    ciudad_pais          VARCHAR(150),
    orden                SMALLINT DEFAULT 1
);

-- Procesos que requiere de sus proveedores (campo #91 del formulario)
CREATE TABLE IF NOT EXISTS procesos_requeridos (
    id_proceso_req SERIAL PRIMARY KEY,
    empresa_id     INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    descripcion    TEXT NOT NULL
);

-- PASO 7: COMPLETAR CATÁLOGO DE rubros


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

-- FIN DE MIGRACIÓN