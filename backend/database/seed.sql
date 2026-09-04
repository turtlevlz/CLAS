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
-- EMPRESAS EJEMPLO
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
) VALUES
(
    'Horizonte Componentes Industriales',
    'Horizonte Componentes Industriales de Mexico S de RL de CV',
    'HCI150312AB9',
    'contacto@horizonteci-demo.com',
    '6625550123',
    'https://www.horizonteci-demo.com',
    1,
    3,
    'Hermosillo',
    'Parque Industrial Sonora, Hermosillo, Sonora, CP 83100',
    'Fabricación de autopartes de plástico',
    'Empresa especializada en moldeo por inyección y ensamble automotriz.',
    2012,
    '100-500',
    TRUE
),
(
    'Meridian Motors',
    'Meridian Motors de Mexico S.A. de C.V.',
    'MMX980512XY4',
    'contacto@meridianmotors-demo.com',
    '6625550201',
    'https://www.meridianmotors-demo.com',
    1,
    1,
    'Hermosillo',
    'Parque Industrial del Norte, Hermosillo, Sonora, CP 83105',
    'Ensamble de vehículos ligeros',
    'Planta de ensamble final de vehículos ligeros con procesos de estampado y soldadura robótica.',
    1986,
    '1000+',
    TRUE
),
(
    'Grupo Aster',
    'Grupo Aster Industrial S de RL de CV',
    'GAI120815MN2',
    'contacto@grupoaster-demo.com',
    '6625550212',
    'https://www.grupoaster-demo.com',
    1,
    2,
    'Hermosillo',
    'Parque Industrial Sonora Sur, Hermosillo, Sonora, CP 83140',
    'Automatización y robótica industrial',
    'Integrador de soluciones de robótica y automatización para líneas de manufactura automotriz.',
    2005,
    '50-100',
    TRUE
),
(
    'Rowan Industrial',
    'Rowan Industrial de Mexico S.A. de C.V.',
    'RIM090723LK7',
    'contacto@rowanindustrial-demo.com',
    '6625550223',
    'https://www.rowanindustrial-demo.com',
    2,
    2,
    'Hermosillo',
    'Parque Industrial Colosio, Hermosillo, Sonora, CP 83170',
    'Estructuras metálicas ligeras',
    'Fabricación de estructuras y componentes metálicos ligeros para la industria automotriz.',
    1998,
    '500-1000',
    TRUE
),
(
    'Plastia Forma',
    'Plastia Forma Manufactura S de RL de CV',
    'PFM140228QW1',
    'contacto@plastiaforma-demo.com',
    '6625550234',
    'https://www.plastiaforma-demo.com',
    2,
    2,
    'Hermosillo',
    'Parque Industrial Nainari, Hermosillo, Sonora, CP 83190',
    'Inyección de plástico',
    'Fabricación de componentes plásticos inyectados para interiores y exteriores automotrices.',
    2010,
    '100-500',
    TRUE
),
(
    'Veloz Logística',
    'Veloz Logistica de Mexico S.A. de C.V.',
    'VLM160604TR8',
    'contacto@velozlogistica-demo.com',
    '6625550245',
    'https://www.velozlogistica-demo.com',
    2,
    5,
    'Hermosillo',
    'Parque Logístico Sonora, Hermosillo, Sonora, CP 83250',
    'Logística y transporte automotriz',
    'Servicios de logística secuenciada y transporte para la cadena de suministro automotriz.',
    2001,
    '100-500',
    FALSE
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
-- CONTACTOS
-- =========================

INSERT INTO contactos (
    empresa_id,
    funcion_id,
    nombre_completo,
    puesto,
    telefono_celular,
    correo
) VALUES
(1, 1, 'Roberto Ivan Duarte', 'Director General', '6625550187', 'roberto.duarte@horizonteci-demo.com'),
(2, 3, 'Sofia Elena Marquez', 'Gerente de Compras', '6625550202', 'sofia.marquez@meridianmotors-demo.com'),
(3, 1, 'Hector Manuel Rios', 'Director General', '6625550213', 'hector.rios@grupoaster-demo.com'),
(4, 2, 'Karla Patricia Nunez', 'Gerente de Nuevas Inversiones', '6625550224', 'karla.nunez@rowanindustrial-demo.com'),
(5, 5, 'Gustavo Adolfo Lira', 'Gerente de Sustentabilidad', '6625550235', 'gustavo.lira@plastiaforma-demo.com'),
(6, 6, 'Renata Ibarra Solis', 'Contacto General', '6625550246', 'renata.ibarra@velozlogistica-demo.com');



-- =========================
-- PRODUCTOS
-- =========================

INSERT INTO productos_fabricados (
    empresa_id,
    nombre_producto,
    clientes,
    porcentaje_produccion
) VALUES
(1, 'Partes moldeadas de plástico', 'Vantex Motors, Corvex Sensores, Aurelia Flex', 85),
(1, 'Conectores ensamblados', 'Vantex Connect', 10),
(2, 'Vehículos ligeros ensamblados', 'Distribución propia', 100),
(3, 'Celdas robóticas de soldadura', 'Meridian Motors, Rowan Industrial', 70),
(4, 'Estructuras metálicas ligeras', 'Meridian Motors, Corvex Sensores', 90),
(5, 'Componentes plásticos inyectados', 'Meridian Motors, Vantex Motors', 95),
(6, 'Servicios de logística secuenciada', 'Meridian Motors, Rowan Industrial, Plastia Forma', 100);



-- =========================
-- RELACIONES
-- =========================

-- RUBROS
INSERT INTO empresa_rubros VALUES
(1, 3),
(1, 1),
(2, 1),
(2, 2),
(3, 4),
(4, 1),
(4, 2),
(5, 3),
(6, 5);

-- CERTIFICACIONES
INSERT INTO empresa_certificaciones VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(3, 4),
(4, 1),
(5, 1),
(5, 3),
(6, 2);

-- PROCESOS
INSERT INTO empresa_procesos VALUES
(1, 1),
(1, 4),
(2, 2),
(2, 3),
(3, 3),
(4, 2),
(4, 4),
(5, 1);

-- INDUSTRIAS
INSERT INTO empresa_industrias VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(3, 4),
(4, 1),
(5, 1),
(6, 5);

-- NECESIDADES
INSERT INTO empresa_necesidades VALUES
(1, 5),
(1, 2),
(2, 1),
(2, 6),
(3, 2),
(4, 1),
(5, 5),
(6, 4);