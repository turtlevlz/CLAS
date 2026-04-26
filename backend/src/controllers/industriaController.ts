import { Request, Response } from "express";
import { Op } from "sequelize";
import { Industria } from "../models/Industria";
import { Empresa } from "../models/Empresa";

export const createIndustria = async (req:Request, res:Response) => {
    try {

    const { nombre_industria } = req.body;

    if(!nombre_industria || String(nombre_industria).trim() === "") {
        return res.status(400).json ({
            message: "El nombre de la industria es obligatorio"
        });
    }

    const nombreLimpio = String(nombre_industria).trim();

    const exist = await Industria.findOne ({
        where: {nombre_industria: {[Op.iLike]: nombreLimpio}}
    });

    if(exist) {
        return res.status(400).json ({
            message: "Ya existe una industria con ese nombre"
        });
    }

    const industria = await Industria.create ({
        nombre_industria: nombreLimpio
    });

    return res.status(201).json ({
        message: "Industria creada correctamente",
        industria
    });

    } catch(error) {
        console.error("Error al crear industria:", error);
        return res.status(500).json ({
            message: "Error al crear industria"
        });
    }
};

export const getIndustrias = async(req:Request, res:Response) => {
    try {

        const industrias = await Industria.findAll ({
            attributes: [
                "id_industria",
                "nombre_industria"
            ],
            order: [["nombre_industria", "ASC"]]
        });

        return res.json(industrias);

    } catch(error) {
        console.error("Error al obtener industrias:", error);
        return res.status(500).json ({
            message: "Error al obtener industrias"
        });
    }
};

export const getIndustriaById = async(req:Request, res:Response) => {
    try{

        const id = Number(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const industria = await Industria.findByPk(id);
        if(!industria) {
            return res.status(404).json ({
                message: "Industria no encontrada"
            });
        }

        return res.json(industria);

    } catch(error) {
        console.error("Error al obtener industria:", error);
        return res.status(500).json ({
            message: "Error al obtener industria"
        });
    }
};

export const updateIndustria = async(req:Request, res:Response) => {
    try {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const industria = await Industria.findByPk(id);
        if(!industria) {
            return res.status(404).json ({
                message: "Industria no encontrada"
            });
        }

        const { nombre_industria } = req.body;
        if(!nombre_industria || String(nombre_industria).trim() === "") {
            return res.status(400).json ({
                message: "El nombre de la industria es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_industria).trim();

        const exist = await Industria.findOne ({
            where: {
                nombre_industria: {[Op.iLike]: nombreLimpio},
                id_industria: {[Op.ne]: id}
            }
        });

        if(exist) {
            return res.status(400).json ({
                message: "Ya existe una industria con ese nombre"
            });
        }

        await industria.update({nombre_industria: nombreLimpio});

        return res.json ({
            message: "Industria actualizada",
            industria
        });

    } catch(error) {
        console.error("Error al actualizar industria:", error);
        return res.status(500).json ({
            message: "Error al actualizar industria"
        });
    }
};

export const deleteIndustria = async(req:Request, res:Response) => {
    try {

        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const industria = await Industria.findByPk(id);

        if(!industria) {
            return res.status(404).json ({
                message: "Industria no encontrada"
            });
        }

        const assign = await Empresa.count({
            include: [
                {
                    model: Industria,
                    where: { id_industria: id },
                    through: { attributes: [] }
                }
            ]
        });

        if (assign > 0) {
            return res.status(400).json({
                message: "No se puede eliminar esta industria porque actualmente está asignada a una o más empresas"
            });
        }

        await industria.destroy();

        return res.json({
            message: "Industria eliminada correctamente"
        });

    } catch(error) {
        console.error("Error al eliminar industria:", error);
        return res.status(500).json({
            message: "Error al eliminar industria"
        });
    }
};