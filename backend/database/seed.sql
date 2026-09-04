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
),
(
    'Altiva Manufactura',
    'Altiva Manufactura de Mexico S.A. de C.V.',
    'BDH100137B1D',
    'contacto@altivamanufactura-demo.com',
    '6625550321',
    'https://www.altivamanufactura-demo.com',
    1,
    3,
    'Hermosillo',
    'Parque Industrial Solidaridad, Hermosillo, Sonora, CP 83107',
    'Estampado metálico',
    'Empresa dedicada a estampado metálico para la cadena de suministro automotriz.',
    2007,
    '500-1000',
    TRUE
),
(
    'Cobalto Sistemas',
    'Cobalto Sistemas de Mexico S.A. de C.V.',
    'CGQ100274C2E',
    'contacto@cobaltosistemas-demo.com',
    '6625550324',
    'https://www.cobaltosistemas-demo.com',
    2,
    3,
    'Hermosillo',
    'Parque Industrial Norte, Hermosillo, Sonora, CP 83108',
    'Robótica y automatización industrial',
    'Empresa dedicada a robótica y automatización industrial para la cadena de suministro automotriz.',
    2013,
    '50-100',
    TRUE
),
(
    'Nortex Componentes',
    'Nortex Componentes de Mexico S.A. de C.V.',
    'DKY100411D3F',
    'contacto@nortexcomponentes-demo.com',
    '6625550327',
    'https://www.nortexcomponentes-demo.com',
    3,
    4,
    'Hermosillo',
    'Parque Industrial Sur, Hermosillo, Sonora, CP 83109',
    'Ensamble de componentes automotrices',
    'Empresa dedicada a ensamble de componentes automotrices para la cadena de suministro automotriz.',
    2016,
    '100-500',
    TRUE
),
(
    'Zafiro Estructuras',
    'Zafiro Estructuras de Mexico S.A. de C.V.',
    'ENF100548E4G',
    'contacto@zafiroestructuras-demo.com',
    '6625550330',
    'https://www.zafiroestructuras-demo.com',
    1,
    2,
    'Hermosillo',
    'Parque Industrial Colosio, Hermosillo, Sonora, CP 83110',
    'Estampado metálico',
    'Empresa dedicada a estampado metálico para la cadena de suministro automotriz.',
    1995,
    '500-1000',
    TRUE
),
(
    'Bravia Ensambles',
    'Bravia Ensambles de Mexico S.A. de C.V.',
    'FRN100685A5A',
    'contacto@braviaensambles-demo.com',
    '6625550333',
    'https://www.braviaensambles-demo.com',
    2,
    3,
    'Hermosillo',
    'Parque Industrial Nainari, Hermosillo, Sonora, CP 83111',
    'Ensamble de componentes automotrices',
    'Empresa dedicada a ensamble de componentes automotrices para la cadena de suministro automotriz.',
    2009,
    '100-500',
    TRUE
),
(
    'Cronos Automatización',
    'Cronos Automatizacion de Mexico S.A. de C.V.',
    'GVW100822B6B',
    'contacto@cronosautomatizacion-demo.com',
    '6625550336',
    'https://www.cronosautomatizacion-demo.com',
    3,
    2,
    'Hermosillo',
    'Parque Industrial Progreso, Hermosillo, Sonora, CP 83112',
    'Robótica y automatización industrial',
    'Empresa dedicada a robótica y automatización industrial para la cadena de suministro automotriz.',
    2011,
    '50-100',
    TRUE
),
(
    'Delfin Plásticos',
    'Delfin Plasticos de Mexico S.A. de C.V.',
    'HYD100959C7C',
    'contacto@delfinplasticos-demo.com',
    '6625550339',
    'https://www.delfinplasticos-demo.com',
    1,
    3,
    'Hermosillo',
    'Parque Industrial Cajeme, Hermosillo, Sonora, CP 83113',
    'Inyección de plástico',
    'Empresa dedicada a inyección de plástico para la cadena de suministro automotriz.',
    2014,
    '100-500',
    TRUE
),
(
    'Elipse Manufactura',
    'Elipse Manufactura de Mexico S.A. de C.V.',
    'JBL101096D8D',
    'contacto@elipsemanufactura-demo.com',
    '6625550342',
    'https://www.elipsemanufactura-demo.com',
    2,
    4,
    'Hermosillo',
    'Parque Industrial Bachoco, Hermosillo, Sonora, CP 83114',
    'Ensamble de componentes automotrices',
    'Empresa dedicada a ensamble de componentes automotrices para la cadena de suministro automotriz.',
    2018,
    '50-100',
    TRUE
),
(
    'Fenix Componentes',
    'Fenix Componentes de Mexico S.A. de C.V.',
    'KET101233E9E',
    'contacto@fenixcomponentes-demo.com',
    '6625550345',
    'https://www.fenixcomponentes-demo.com',
    3,
    1,
    'Hermosillo',
    'Parque Industrial Solidaridad, Hermosillo, Sonora, CP 83115',
    'Estampado metálico',
    'Empresa dedicada a estampado metálico para la cadena de suministro automotriz.',
    1988,
    '1000+',
    TRUE
),
(
    'Galeón Logística',
    'Galeon Logistica de Mexico S.A. de C.V.',
    'LHB101370A0F',
    'contacto@galeonlogistica-demo.com',
    '6625550348',
    'https://www.galeonlogistica-demo.com',
    1,
    5,
    'Hermosillo',
    'Parque Industrial Norte, Hermosillo, Sonora, CP 83116',
    'Logística y transporte automotriz',
    'Empresa dedicada a logística y transporte automotriz para la cadena de suministro automotriz.',
    2003,
    '100-500',
    FALSE
),
(
    'Halcón Robótica',
    'Halcon Robotica de Mexico S.A. de C.V.',
    'MLJ101507B1G',
    'contacto@halconrobotica-demo.com',
    '6625550351',
    'https://www.halconrobotica-demo.com',
    2,
    2,
    'Hermosillo',
    'Parque Industrial Sur, Hermosillo, Sonora, CP 83117',
    'Robótica y automatización industrial',
    'Empresa dedicada a robótica y automatización industrial para la cadena de suministro automotriz.',
    2015,
    '50-100',
    TRUE
),
(
    'Ibis Estampados',
    'Ibis Estampados de Mexico S.A. de C.V.',
    'NPR101644C2A',
    'contacto@ibisestampados-demo.com',
    '6625550354',
    'https://www.ibisestampados-demo.com',
    3,
    3,
    'Hermosillo',
    'Parque Industrial Colosio, Hermosillo, Sonora, CP 83118',
    'Estampado metálico',
    'Empresa dedicada a estampado metálico para la cadena de suministro automotriz.',
    2000,
    '500-1000',
    TRUE
),
(
    'Jaspe Industrial',
    'Jaspe Industrial de Mexico S.A. de C.V.',
    'PSZ101781D3B',
    'contacto@jaspeindustrial-demo.com',
    '6625550357',
    'https://www.jaspeindustrial-demo.com',
    1,
    4,
    'Hermosillo',
    'Parque Industrial Nainari, Hermosillo, Sonora, CP 83119',
    'Ensamble de componentes automotrices',
    'Empresa dedicada a ensamble de componentes automotrices para la cadena de suministro automotriz.',
    2017,
    '100-500',
    TRUE
),
(
    'Kraken Moldeo',
    'Kraken Moldeo de Mexico S.A. de C.V.',
    'QWG101918E4C',
    'contacto@krakenmoldeo-demo.com',
    '6625550360',
    'https://www.krakenmoldeo-demo.com',
    2,
    2,
    'Hermosillo',
    'Parque Industrial Progreso, Hermosillo, Sonora, CP 83120',
    'Inyección de plástico',
    'Empresa dedicada a inyección de plástico para la cadena de suministro automotriz.',
    2012,
    '100-500',
    TRUE
),
(
    'Meru Ensambles',
    'Meru Ensambles de Mexico S.A. de C.V.',
    'RZP102055A5D',
    'contacto@meruensambles-demo.com',
    '6625550363',
    'https://www.meruensambles-demo.com',
    3,
    3,
    'Hermosillo',
    'Parque Industrial Cajeme, Hermosillo, Sonora, CP 83121',
    'Ensamble de componentes automotrices',
    'Empresa dedicada a ensamble de componentes automotrices para la cadena de suministro automotriz.',
    2008,
    '500-1000',
    TRUE
),
(
    'Nébula Plásticos',
    'Nebula Plasticos de Mexico S.A. de C.V.',
    'SCX102192B6E',
    'contacto@nebulaplasticos-demo.com',
    '6625550366',
    'https://www.nebulaplasticos-demo.com',
    1,
    2,
    'Hermosillo',
    'Parque Industrial Bachoco, Hermosillo, Sonora, CP 83122',
    'Inyección de plástico',
    'Empresa dedicada a inyección de plástico para la cadena de suministro automotriz.',
    2010,
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
(6, 6, 'Renata Ibarra Solis', 'Contacto General', '6625550246', 'renata.ibarra@velozlogistica-demo.com'),
(7, 1, 'Ana Vega Ortiz', 'Director General', '6625550321', 'ana.vega@altivamanufactura-demo.com'),
(8, 2, 'Luis Reyna Cota', 'Gerente de Nuevas Inversiones', '6625550324', 'luis.reyna@cobaltosistemas-demo.com'),
(9, 3, 'Carla Salcido Peña', 'Gerente de Compras', '6625550327', 'carla.salcido@nortexcomponentes-demo.com'),
(10, 4, 'Miguel Moreno Islas', 'Gerente de RH', '6625550330', 'miguel.moreno@zafiroestructuras-demo.com'),
(11, 5, 'Diana Beltran Ruiz', 'Gerente de Sustentabilidad', '6625550333', 'diana.beltran@braviaensambles-demo.com'),
(12, 6, 'Oscar Cardenas Leon', 'Contacto General', '6625550336', 'oscar.cardenas@cronosautomatizacion-demo.com'),
(13, 1, 'Paula Guerrero Diaz', 'Director General', '6625550339', 'paula.guerrero@delfinplasticos-demo.com'),
(14, 2, 'Ivan Fimbres Cota', 'Gerente de Nuevas Inversiones', '6625550342', 'ivan.fimbres@elipsemanufactura-demo.com'),
(15, 3, 'Teresa Palacios Ruiz', 'Gerente de Compras', '6625550345', 'teresa.palacios@fenixcomponentes-demo.com'),
(16, 4, 'Ricardo Otero Vidal', 'Gerente de RH', '6625550348', 'ricardo.otero@galeonlogistica-demo.com'),
(17, 5, 'Monica Camarena Soto', 'Gerente de Sustentabilidad', '6625550351', 'monica.camarena@halconrobotica-demo.com'),
(18, 6, 'Felipe Espinoza Paz', 'Contacto General', '6625550354', 'felipe.espinoza@ibisestampados-demo.com'),
(19, 1, 'Andrea Robles Tapia', 'Director General', '6625550357', 'andrea.robles@jaspeindustrial-demo.com'),
(20, 2, 'Sergio Aguayo Leyva', 'Gerente de Nuevas Inversiones', '6625550360', 'sergio.aguayo@krakenmoldeo-demo.com'),
(21, 3, 'Laura Valenzuela Bojorquez', 'Gerente de Compras', '6625550363', 'laura.valenzuela@meruensambles-demo.com'),
(22, 4, 'Julian Encinas Duarte', 'Gerente de RH', '6625550366', 'julian.encinas@nebulaplasticos-demo.com');



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
(6, 'Servicios de logística secuenciada', 'Meridian Motors, Rowan Industrial, Plastia Forma', 100),
(7, 'Piezas estampadas', 'Meridian Motors, Horizonte Componentes Industriales', 70),
(8, 'Celdas de automatización', 'Rowan Industrial, Grupo Aster', 80),
(9, 'Componentes ensamblados', 'Plastia Forma, Vantex Motors', 90),
(10, 'Piezas estampadas', 'Horizonte Componentes Industriales, Corvex Sensores', 70),
(11, 'Componentes ensamblados', 'Grupo Aster, Aurelia Flex', 80),
(12, 'Celdas de automatización', 'Vantex Motors, Meridian Motors', 90),
(13, 'Piezas plásticas inyectadas', 'Corvex Sensores, Rowan Industrial', 70),
(14, 'Componentes ensamblados', 'Aurelia Flex, Plastia Forma', 80),
(15, 'Piezas estampadas', 'Meridian Motors, Horizonte Componentes Industriales', 90),
(16, 'Servicios logísticos', 'Rowan Industrial, Grupo Aster', 70),
(17, 'Celdas de automatización', 'Plastia Forma, Vantex Motors', 80),
(18, 'Piezas estampadas', 'Horizonte Componentes Industriales, Corvex Sensores', 90),
(19, 'Componentes ensamblados', 'Grupo Aster, Aurelia Flex', 70),
(20, 'Piezas plásticas inyectadas', 'Vantex Motors, Meridian Motors', 80),
(21, 'Componentes ensamblados', 'Corvex Sensores, Rowan Industrial', 90),
(22, 'Piezas plásticas inyectadas', 'Aurelia Flex, Plastia Forma', 70);



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
(6, 5),
(7, 2),
(8, 4),
(9, 1),
(10, 2),
(11, 1),
(12, 4),
(13, 3),
(14, 1),
(15, 2),
(16, 5),
(17, 4),
(18, 2),
(19, 1),
(20, 3),
(21, 1),
(22, 3);

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
(6, 2),
(7, 1),
(8, 2),
(9, 3),
(10, 1),
(11, 2),
(12, 4),
(13, 1),
(14, 6),
(15, 1),
(16, 2),
(17, 4),
(18, 1),
(19, 2),
(20, 1),
(21, 3),
(22, 1);

-- PROCESOS
INSERT INTO empresa_procesos VALUES
(1, 1),
(1, 4),
(2, 2),
(2, 3),
(3, 3),
(4, 2),
(4, 4),
(5, 1),
(7, 4),
(8, 3),
(9, 4),
(10, 2),
(11, 4),
(12, 3),
(13, 1),
(14, 4),
(15, 2),
(17, 3),
(18, 2),
(19, 4),
(20, 1),
(21, 4),
(22, 1);

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
(6, 5),
(7, 2),
(8, 4),
(9, 1),
(10, 1),
(11, 2),
(12, 3),
(13, 1),
(14, 2),
(15, 1),
(16, 5),
(17, 4),
(18, 1),
(19, 2),
(20, 1),
(21, 1),
(22, 1);

-- NECESIDADES
INSERT INTO empresa_necesidades VALUES
(1, 5),
(1, 2),
(2, 1),
(2, 6),
(3, 2),
(4, 1),
(5, 5),
(6, 4),
(7, 1),
(8, 2),
(9, 1),
(10, 1),
(11, 3),
(12, 2),
(13, 5),
(14, 6),
(15, 1),
(16, 4),
(17, 2),
(18, 1),
(19, 6),
(20, 5),
(21, 1),
(22, 5);