import { Request, Response } from "express";
import { Op } from "sequelize";
import { ProductoFabricado } from "../models/ProductoFabricado";
import { Empresa } from "../models/Empresa";

export const createProductoFabricado = async(req:Request, res:Response) => {

    try {
        const {
            empresa_id,
            nombre_producto,
            clientes,
            porcentaje_produccion
        } = req.body;

        const user = (req as any).user;

        const empresaId = user.rol_id === 1
            ? Number(empresa_id)
            : Number(user.empresa_id);

        if (user.rol_id === 3) {
            return res.status(403).json({
                message: "No autorizado para crear productos fabricados"
            });
        }

        if (isNaN(empresaId)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        if (!nombre_producto || String(nombre_producto).trim() === "") {
            return res.status(400).json({
                message: "El nombre del producto es obligatorio"
            });
        }

        const nombreProductoLimpio = String(nombre_producto).trim();
        const clientesLimpio = clientes ? String(clientes).trim() : undefined;

        const porcentaje =
            porcentaje_produccion === undefined ||
            porcentaje_produccion === null ||
            porcentaje_produccion === ""
                ? undefined
                : Number(porcentaje_produccion);

        if (
            porcentaje !== undefined &&
            (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100)
        ) {
            return res.status(400).json({
                message: "El porcentaje de produccion debe estar entre 0 y 100"
            });
        }

        const empresa = await Empresa.findByPk(empresaId);

        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        if (!empresa.activo) {
            return res.status(400).json({
                message: "La empresa esta inactiva"
            });
        }

        const productoFabricado = await ProductoFabricado.create({
            empresa_id: empresaId,
            nombre_producto: nombreProductoLimpio,
            clientes: clientesLimpio,
            porcentaje_produccion: porcentaje
        });

        return res.status(201).json({
            message: "Producto fabricado creado correctamente",
            productoFabricado
        });

    } catch(error) {
        console.error("Error al crear producto fabricado:", error);
        return res.status(500).json({
            message: "Error al crear producto fabricado"
        });
    }
};

export const getProductosByEmpresa = async(req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const empresa = await Empresa.findByPk(empresa_id);

        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        if (!empresa.activo) {
            return res.status(400).json({
                message: "La empresa esta inactiva"
            });
        }

        const user = (req as any).user;

        if (user.rol_id === 3) {
            return res.status(403).json({
                message: "No autorizado para consultar productos fabricados"
            });
        }

        if (user.rol_id === 2 && user.empresa_id !== empresa_id) {
            return res.status(403).json({
                message: "No autorizado para consultar productos de otra empresa"
            });
        }

        const productosFabricados = await ProductoFabricado.findAll({
            where: { empresa_id },
            attributes: [
                "id_producto",
                "empresa_id",
                "nombre_producto",
                "clientes",
                "porcentaje_produccion"
            ],
            order: [["nombre_producto", "ASC"]]
        });

        return res.json(productosFabricados);

    } catch (error) {
        console.error("Error al obtener productos fabricados:", error);
        return res.status(500).json({
            message: "Error al obtener productos fabricados"
        });
    }
};

export const getProductoFabricadoById = async(req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const productoFabricado = await ProductoFabricado.findByPk(id);

        if (!productoFabricado) {
            return res.status(404).json({
                message: "Producto fabricado no encontrado"
            });
        }

        const user = (req as any).user;

        if (user.rol_id === 3) {
            return res.status(403).json({
                message: "No autorizado para consultar productos fabricados"
            });
        }

        if (
            user.rol_id === 2 &&
            productoFabricado.empresa_id !== user.empresa_id
        ) {
            return res.status(403).json({
                message: "No autorizado para consultar productos de otra empresa"
            });
        }

        return res.json(productoFabricado);

    } catch (error) {
        console.error("Error al obtener producto fabricado:", error);
        return res.status(500).json({
            message: "Error al obtener producto fabricado"
        });
    }
};

export const updateProductoFabricado = async(req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const productoFabricado = await ProductoFabricado.findByPk(id);

        if (!productoFabricado) {
            return res.status(404).json({
                message: "Producto fabricado no encontrado"
            });
        }

        const user = (req as any).user;

        if (user.rol_id === 3) {
            return res.status(403).json({
                message: "No autorizado para actualizar productos fabricados"
            });
        }

        if (
            user.rol_id === 2 &&
            productoFabricado.empresa_id !== user.empresa_id
        ) {
            return res.status(403).json({
                message: "No autorizado para actualizar productos de otra empresa"
            });
        }

        const updates: any = {};

        if (req.body.nombre_producto !== undefined) {
            const nombreProductoLimpio = String(req.body.nombre_producto).trim();

            if (nombreProductoLimpio === "") {
                return res.status(400).json({
                    message: "El nombre del producto no puede estar vacio"
                });
            }

            updates.nombre_producto = nombreProductoLimpio;
        }

        if (req.body.clientes !== undefined) {
            const clientesLimpio = String(req.body.clientes).trim();

            if (clientesLimpio === "") {
                return res.status(400).json({
                    message: "El campo clientes no puede estar vacio"
                });
            }

            updates.clientes = clientesLimpio;
        }

        if (req.body.porcentaje_produccion !== undefined) {
            const porcentaje =
                req.body.porcentaje_produccion === null ||
                req.body.porcentaje_produccion === ""
                    ? undefined
                    : Number(req.body.porcentaje_produccion);

            if (
                porcentaje !== undefined &&
                (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100)
            ) {
                return res.status(400).json({
                    message: "El porcentaje de produccion debe estar entre 0 y 100"
                });
            }

            updates.porcentaje_produccion = porcentaje;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No hay datos para actualizar"
            });
        }

        await productoFabricado.update(updates);

        return res.json({
            message: "Producto fabricado actualizado correctamente",
            productoFabricado
        });

    } catch (error) {
        console.error("Error al actualizar producto fabricado:", error);
        return res.status(500).json({
            message: "Error al actualizar producto fabricado"
        });
    }
};

export const deleteProductoFabricado = async(req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const productoFabricado = await ProductoFabricado.findByPk(id);

        if (!productoFabricado) {
            return res.status(404).json({
                message: "Producto fabricado no encontrado"
            });
        }

        const user = (req as any).user;

        if (user.rol_id === 3) {
            return res.status(403).json({
                message: "No autorizado para eliminar productos fabricados"
            });
        }

        if (
            user.rol_id === 2 &&
            productoFabricado.empresa_id !== user.empresa_id
        ) {
            return res.status(403).json({
                message: "No autorizado para eliminar productos de otra empresa"
            });
        }

        await productoFabricado.destroy();

        return res.json({
            message: "Producto fabricado eliminado correctamente"
        });

    } catch (error) {
        console.error("Error al eliminar producto fabricado:", error);
        return res.status(500).json({
            message: "Error al eliminar producto fabricado"
        });
    }
};
