-- =========================
-- CATÁLOGOS
-- =========================

-- MEMBRESIAS
INSERT INTO membresias (nombre_membresia, precio) VALUES
('Asociado', 0),
('Afiliado', 0),
('Gobierno', 0);

-- TIPOS DE ORGANIZACION
INSERT INTO tipos_organizacion (nombre_tipo) VALUES
('OEM'),
('Tier 1'),
('Tier 2'),
('Tier 3'),
('Servicio');

-- ROLES
INSERT INTO roles (nombre_rol) VALUES
('ADMIN CLUSTER'),
('ADMIN EMPRESA'),
('USUARIO EMPRESA');

-- CERTIFICACIONES
INSERT INTO certificaciones (nombre_certificacion) VALUES
('IATF 16949'),
('ISO 9001'),
('ISO 14001'),
('ISO 27001'),
('IMMEX / Certificado de IVA'),
('Six Sigma');

-- RUBROS
INSERT INTO rubros (nombre_rubro) VALUES
('Ensamble'),
('Estampado'),
('Moldeo por inyección'),
('Robótica y automatización'),
('Logística automotriz');

-- FUNCIONES DE CONTACTO
INSERT INTO funciones_contacto (nombre_funcion) VALUES
('Dirección / Gerencia General'),
('Atracción de Nuevas Inversiones'),
('Compras y Cadena de Suministro'),
('Recursos Humanos'),
('Medio Ambiente y Sustentabilidad'),
('Contacto General');

-- PROCESOS
INSERT INTO procesos (nombre_proceso) VALUES
('Moldeo por inyección de plástico'),
('Estampado de alta velocidad'),
('Soldadura robótica'),
('Ensamble de componentes'),
('Recubrimiento / Galvanizado');

-- INDUSTRIAS
INSERT INTO industrias (nombre_industria) VALUES
('Automotriz'),
('Manufactura avanzada'),
('Movilidad'),
('Electrónica'),
('Logística');

-- NECESIDADES
INSERT INTO necesidades_proveeduria (nombre_necesidad) VALUES
('Componentes metálicos'),
('Servicios de ingeniería'),
('Empaque industrial'),
('Logística secuenciada'),
('Resina plástica'),
('Mantenimiento de equipo');



-- =========================
-- EMPRESA EJEMPLO
-- =========================

INSERT INTO empresas (
    nombre_comercial,
    razon_social,
    rfc,
    correo_electronico,
    telefono,
    sitio_web,
    membresia_id,
    tipo_organizacion_id,
    ciudad,
    domicilio_completo,
    giro,
    descripcion,
    anio_fundacion,
    rango_empleados,
    fabrica_para_automotriz
) VALUES (
    'New Concept Technology',
    'Necontech de Mexico S de RL de CV',
    'NME110429QSA',
    'contacto@necontech.com',
    '6622164162',
    'https://www.newconcepttech.com',
    1,
    3,
    'Hermosillo',
    'El Llano, Hermosillo, Sonora, CP 83299',
    'Fabricación de autopartes de plástico',
    'Empresa especializada en moldeo por inyección y ensamble automotriz.',
    2011,
    '100-500',
    TRUE
);



-- =========================
-- USUARIO ADMIN CLUSTER
-- =========================
-- password: Admin123 (ejemplo hasheado con bcrypt)

INSERT INTO usuarios (
    nombre_usuario,
    contrasena,
    correo_electronico,
    empresa_id,
    rol_id
) VALUES (
    'Admin Cluster',
    '$2b$10$ceYrtWlWqCZrJf7JsyreMOEZzttKkX7CLUaSbfOApzxIi.4TgkknS', -- contrasena: 123456
    'admin@cluster.com',
    NULL,
    1
);



-- =========================
-- CONTACTO
-- =========================

INSERT INTO contactos (
    empresa_id,
    funcion_id,
    nombre_completo,
    puesto,
    telefono_celular,
    correo
) VALUES (
    1,
    1,
    'Juan Carlos Campoy',
    'Director General',
    '6621234567',
    'jcampoy@necontech.com'
);



-- =========================
-- PRODUCTOS
-- =========================

INSERT INTO productos_fabricados (
    empresa_id,
    nombre_producto,
    clientes,
    porcentaje_produccion
) VALUES
(1, 'Partes moldeadas de plástico', 'TE, Sensata, Flex', 85),
(1, 'Conectores ensamblados', 'TE Connectivity', 10);



-- =========================
-- RELACIONES
-- =========================

-- RUBROS
INSERT INTO empresa_rubros VALUES
(1, 3),
(1, 1);

-- CERTIFICACIONES
INSERT INTO empresa_certificaciones VALUES
(1, 1),
(1, 2);

-- PROCESOS
INSERT INTO empresa_procesos VALUES
(1, 1),
(1, 4);

-- INDUSTRIAS
INSERT INTO empresa_industrias VALUES
(1, 1),
(1, 2);

-- NECESIDADES
INSERT INTO empresa_necesidades VALUES
(1, 5),
(1, 2);