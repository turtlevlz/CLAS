import { Request, Response } from "express";
import { ForeignKeyConstraintError, Op } from "sequelize";
import { TipoOrganizacion } from "../models/TipoOrganizacion";

export const createTipoOrganizacion = async (req: Request, res: Response) => {

    try {
        const { nombre_tipo } = req.body;

        if (!nombre_tipo || String(nombre_tipo).trim() === "") {
            return res.status(400).json({
                message: "El nombre del tipo de organizacion es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_tipo).trim();

        const exist = await TipoOrganizacion.findOne({
            where: { nombre_tipo: { [Op.iLike]: nombreLimpio } }
        });

        if (exist) {
            return res.status(409).json({
                message: "Ya existe un tipo de organizacion con ese nombre"
            });
        }

        const tipoOrganizacion = await TipoOrganizacion.create({
            nombre_tipo: nombreLimpio
        });

        return res.status(201).json({
            message: "Tipo de organizacion creado correctamente",
            tipoOrganizacion
        });

    } catch (error) {
        console.error("Error al crear el tipo de organizacion:", error)
        return res.status(500).json({
            message: "Error al crear el tipo de organizacion"
        });
    }
};

export const getTipoOrganizaciones = async (req: Request, res: Response) => {

    try {
        const tipoOrganizacion = await TipoOrganizacion.findAll({
            attributes: [
                "id_tipo",
                "nombre_tipo"
            ],
            order: [["nombre_tipo", "ASC"]]
        });

        return res.json(tipoOrganizacion);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el tipo de organizacion"
        });
    }
};

export const getTipoOrganizacionById = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const tipoOrganizacion = await TipoOrganizacion.findByPk(id);
        if (!tipoOrganizacion) {
            return res.status(404).json({
                message: "Tipo de organizacion no encontrado"
            });
        }

        return res.json(tipoOrganizacion);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener el tipo de organizacion"
        });
    }
};

export const updateTipoOrganizacion = async (req: Request, res: Response) => {

    try {
        const idTipoOrganizacion = Number(req.params.id);

        if (isNaN(idTipoOrganizacion)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const tipoOrganizacion = await TipoOrganizacion.findByPk(idTipoOrganizacion);

        if (!tipoOrganizacion) {
            return res.status(404).json({
                message: "Tipo de organizacion no encontrado"
            });
        }

        const { nombre_tipo } = req.body;

        if (!nombre_tipo || String(nombre_tipo).trim() === "") {
            return res.status(400).json({
                message: "El nombre del tipo de organizacion es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_tipo).trim();

        const exist = await TipoOrganizacion.findOne({
            where: {
                nombre_tipo: { [Op.iLike]: nombreLimpio },
                id_tipo: { [Op.ne]: idTipoOrganizacion }
            }
        });

        if (exist) {
            return res.status(409).json({
                message: "Ya existe un tipo de organizacion con ese nombre"
            });
        }

        await tipoOrganizacion.update({ nombre_tipo: nombreLimpio });

        return res.json({
            message: "Tipo de organizacion actualizada",
            tipoOrganizacion
        });

    } catch (error) {
        console.error("Error al actualizar el tipo de organizacion:", error);
        return res.status(500).json({
            message: "Error al actualizar el tipo de organizacion"
        });
    }
};

export const deleteTipoOrganizacion = async (req: Request, res: Response) => {

    try {

        const idTipoOrganizacion = Number(req.params.id);

        if (isNaN(idTipoOrganizacion)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const tipoOrganizacion = await TipoOrganizacion.findByPk(idTipoOrganizacion);

        if (!tipoOrganizacion) {
            return res.status(404).json({
                message: "Tipo de organizacion no encontrado"
            });
        }

        await tipoOrganizacion.destroy();

        return res.json({
            message: "Tipo de organizacion eliminada correctamente"
        });

    } catch (error) {
        console.error("Error al eliminar tipo de organizacion:", error)

        if (error instanceof ForeignKeyConstraintError) {
            return res.status(409).json({
                message: "No se puede eliminar el tipo de organizacion porque está siendo usado por una o más empresas"
            });
        }

        return res.status(500).json({
            message: "Error al eliminar tipo de organizacion"
        });
    }
};