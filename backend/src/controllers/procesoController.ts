import { Request, Response } from "express";
import { Op } from "sequelize";
import { Proceso } from "../models/Proceso";
import { Empresa } from "../models/Empresa";

export const createProceso = async (req: Request, res: Response) => {
    try {
        const { nombre_proceso } = req.body;

        if (!nombre_proceso || String(nombre_proceso).trim() === "") {
            return res.status(400).json({
                message: "El nombre del proceso es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_proceso).trim();

        const exist = await Proceso.findOne({
            where: { nombre_proceso: { [Op.iLike]: nombreLimpio } }
        });

        if (exist) {
            return res.status(409).json({
                message: "Ya existe un proceso con ese nombre"
            });
        }

        const proceso = await Proceso.create({
            nombre_proceso: nombreLimpio
        });

        return res.status(201).json({
            message: "Proceso creado correctamente",
            proceso
        });

    } catch (error) {
        console.error("Error al crear proceso:", error);
        return res.status(500).json({
            message: "Error al crear proceso"
        });
    }
};

export const getProcesos = async (req: Request, res: Response) => {
    try {
        const procesos = await Proceso.findAll({
            attributes: [
                "id_proceso",
                "nombre_proceso"
            ],
            order: [["nombre_proceso", "ASC"]]
        });

        return res.json(procesos);

    } catch (error) {
        console.error("Error al obtener procesos:", error);
        return res.status(500).json({
            message: "Error al obtener procesos"
        });
    }
};

export const getProcesoById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const proceso = await Proceso.findByPk(id);

        if (!proceso) {
            return res.status(404).json({
                message: "Proceso no encontrado"
            });
        }

        return res.json(proceso);

    } catch (error) {
        console.error("Error al obtener proceso:", error);
        return res.status(500).json({
            message: "Error al obtener proceso"
        });
    }
};

export const updateProceso = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const proceso = await Proceso.findByPk(id);

        if (!proceso) {
            return res.status(404).json({
                message: "Proceso no encontrado"
            });
        }

        const { nombre_proceso } = req.body;

        if (!nombre_proceso || String(nombre_proceso).trim() === "") {
            return res.status(400).json({
                message: "El nombre del proceso es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_proceso).trim();

        const exist = await Proceso.findOne({
            where: {
                nombre_proceso: { [Op.iLike]: nombreLimpio },
                id_proceso: { [Op.ne]: id }
            }
        });

        if (exist) {
            return res.status(409).json({
                message: "Ya existe un proceso con ese nombre"
            });
        }

        await proceso.update({ nombre_proceso: nombreLimpio });

        return res.json({
            message: "Proceso actualizado",
            proceso
        });

    } catch (error) {
        console.error("Error al actualizar proceso:", error);
        return res.status(500).json({
            message: "Error al actualizar proceso"
        });
    }
};

export const deleteProceso = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const proceso = await Proceso.findByPk(id);

        if (!proceso) {
            return res.status(404).json({
                message: "Proceso no encontrado"
            });
        }

        const assign = await Empresa.count({
            include: [
                {
                    model: Proceso,
                    where: { id_proceso: id },
                    through: { attributes: [] }
                }
            ]
        });

        if (assign > 0) {
            return res.status(409).json({
                message: "No se puede eliminar este proceso porque actualmente está asignado a una o más empresas"
            });
        }

        await proceso.destroy();

        return res.json({
            message: "Proceso eliminado correctamente"
        });

    } catch (error) {
        console.error("Error al eliminar proceso:", error);
        return res.status(500).json({
            message: "Error al eliminar proceso"
        });
    }
};
