import { Request, Response } from "express";
import { Op } from "sequelize";
import { Certificacion } from "../models/Certificacion";

export const createCertificacion = async (req: Request, res: Response) => {

    try {
        const { nombre_certificacion } = req.body;

        if (!nombre_certificacion || String(nombre_certificacion).trim() === "") {
            return res.status(400).json({
                message: "El nombre de la certificacion es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_certificacion).trim();

        const exist = await Certificacion.findOne({
            where: { nombre_certificacion: { [Op.iLike]: nombreLimpio } }
        });

        if (exist) {
            return res.status(409).json({
                message: "Ya existe una certificacion con ese nombre"
            });
        }

        const certificacion = await Certificacion.create({
            nombre_certificacion: nombreLimpio
        });

        return res.status(201).json({
            message: "Certificacion creada correctamente",
            certificacion
        });
    } catch (error) {
        console.error("Error al crear la certificacion:", error)
        return res.status(500).json({
            message: "Error al crear la certificacion"
        });
    }
}

export const getCertificaciones = async (req: Request, res: Response) => {

    try {
        const certificaciones = await Certificacion.findAll({
            attributes: [
                "id_certificacion",
                "nombre_certificacion"
            ],
            order: [["nombre_certificacion", "ASC"]]
        });

        return res.json(certificaciones);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las certificaciones"
        });
    }
};

export const getCertificacionById = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const certificacion = await Certificacion.findByPk(id);

        if (!certificacion) {
            return res.status(404).json({
                message: "Certificacion no encontrada"
            });
        }

        return res.json(certificacion);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener la certificacion"
        });
    }
};

export const updateCertificacion = async (req: Request, res: Response) => {

    try {
        const idCertificacion = Number(req.params.id);

        if (isNaN(idCertificacion)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const certificacion = await Certificacion.findByPk(idCertificacion);

        if (!certificacion) {
            return res.status(404).json({
                message: "Certificacion no encontrada"
            });
        }

        const { nombre_certificacion } = req.body;

        if (!nombre_certificacion || String(nombre_certificacion).trim() === "") {
            return res.status(400).json({
                message: "El nombre de la certificacion es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_certificacion).trim();

        const exist = await Certificacion.findOne({
            where: {
                nombre_certificacion: { [Op.iLike]: nombreLimpio },
                id_certificacion: { [Op.ne]: idCertificacion }
            }
        });

        if (exist) {
            return res.status(409).json({
                message: "Ya existe una certificacion con ese nombre"
            });
        }

        await certificacion.update({ nombre_certificacion: nombreLimpio });

        return res.json({
            message: "Certificacion actualizada",
            certificacion
        });
    } catch (error) {
        console.error("Error al actualizar la certificacion:", error)
        return res.status(500).json({
            message: "Error al actualizar la certificacion"
        });
    }
};

export const deleteCertificacion = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const certificacion = await Certificacion.findByPk(id);

        if (!certificacion) {
            return res.status(404).json({
                message: "Certificacion no encontrada"
            });
        }

        await certificacion.destroy();
        return res.json({
            message: "Certificacion eliminada correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar certificacion:", error)
        return res.status(500).json({
            message: "Error al eliminar certificacion"
        });
    }
};