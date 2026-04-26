-- TIERS
INSERT INTO tiers (nombre_tier) VALUES
('Asociados'),
('Afiliados'),
('Gobierno');

-- RUBROS
INSERT INTO rubros (nombre_rubro) VALUES
('Taller de maquinado'),
('Soldadura'),
('Inyeccion de plastico'),
('Automatizacion');

-- SERVICIOS
INSERT INTO servicios (nombre_servicio) VALUES 
('Ingenieria inversa'),
('Diseño CAD'),
('Programación CAM'),
('Tratamiento termico'),
('Corte con sierra cinta');

-- ROLES
INSERT INTO roles (nombre_rol) VALUES 
('ADMIN CLUSTER'),--id: 1
('ADMIN EMPRESA'),--id:2
('USUARIO EMPRESA');--id:3