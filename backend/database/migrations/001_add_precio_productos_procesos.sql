-- 1. Precio en membresías
ALTER TABLE membresias
ADD COLUMN IF NOT EXISTS precio NUMERIC(10,2) NOT NULL DEFAULT 0;

-- 2. Catálogo de procesos
CREATE TABLE IF NOT EXISTS procesos (
    id_proceso SERIAL PRIMARY KEY,
    nombre_proceso VARCHAR(150) NOT NULL
);

-- 3. Relación empresa - procesos
CREATE TABLE IF NOT EXISTS empresa_procesos (
    empresa_id INTEGER,
    proceso_id INTEGER,
    PRIMARY KEY (empresa_id, proceso_id),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id_empresa),
    FOREIGN KEY (proceso_id) REFERENCES procesos(id_proceso)
);

-- 4. Productos fabricados por la empresa
CREATE TABLE IF NOT EXISTS productos_fabricados (
    id_producto SERIAL PRIMARY KEY,
    empresa_id INTEGER NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    nombre_producto TEXT NOT NULL,
    clientes TEXT,
    porcentaje_produccion NUMERIC(5,2) CHECK (porcentaje_produccion BETWEEN 0 AND 100)
);