import { Request, Response } from "express";
import { Op } from "sequelize";
import { Necesidad } from "../models/Necesidad";
import { Empresa } from "../models/Empresa";

export const createNecesidad = async(req:Request, res:Response) => {
    try{
        const { nombre_necesidad } = req.body;
        if(!nombre_necesidad || String(nombre_necesidad).trim() === "") {
            return res.status(400).json ({
                message: "El nombre de la necesidad de proveeduria es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_necesidad).trim();
        
        const exist = await Necesidad.findOne ({
            where: { nombre_necesidad: {[Op.iLike]: nombreLimpio}}        
        });

        if(exist) {
            return res.status(400).json ({
                message: "Ya existe una necesidad de proveeduria con ese nombre"
            });
        }

        const necesidad = await Necesidad.create ({
            nombre_necesidad: nombreLimpio
        });

        return res.status(201).json ({
            message: "Necesidad de proveeduria creada correctamente",
            necesidad
        });

    } catch(error) {
        console.error("Error al crear necesidad de proveeduria:", error);
        return res.status(500).json ({
            message: "Error al crear necesidad de proveeduria"
        });
    }
};

export const getNecesidades = async(req:Request, res:Response) => {
    try{
        const necesidades = await Necesidad.findAll({
            attributes: [
                "nombre_necesidad",
                "id_necesidad"
            ],
            order: [["nombre_necesidad", "ASC"]]
        });

        return res.json(necesidades);

    } catch(error) {
        console.error("Error al obtener necesidades de proveeduria:", error);
        return res.status(500).json ({
            message: "Error al obtener necesidades de proveeduria"
        });
    }
};

export const getNecesidadById = async(req:Request, res:Response) => {
    try {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const necesidad = await Necesidad.findByPk(id);
        if(!necesidad) {
            return res.status(404).json ({
                message: "Necesidad de proveeduria no encontrada"
            });
        }

        return res.json(necesidad);

    } catch(error) {
        console.error("Error al obtener la necesidad de proveeduria:", error);
        return res.status(500).json ({
            message: "Error al obtener la necesidad de proveeduria"
        });
    }
};

export const updateNecesidad = async(req:Request, res:Response) => {
    try {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const necesidad = await Necesidad.findByPk(id);
        if(!necesidad) {
            return res.status(404).json ({
                message: "Necesidad de proveeduria no encontrada"
            });
        }

        const {nombre_necesidad} = req.body;
        if(!nombre_necesidad || String(nombre_necesidad).trim() === "") {
            return res.status(400).json ({
                message: "El nombre de la necesidad de proveeduria es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_necesidad).trim();
        const exist = await Necesidad.findOne ({
            where: {
                nombre_necesidad: {[Op.iLike]: nombreLimpio},
                id_necesidad: {[Op.ne]: id}
            }
        });

        if(exist) {
            return res.status(400).json ({
                message: "Ya existe una necesidad de proveeduria con ese nombre"
            });
        }

        await necesidad.update({ nombre_necesidad: nombreLimpio });

        return res.json ({
            message: "Necesidad de proveeduria actualizada",
            necesidad
        });
    } catch(error) {
        console.error("Error al actualizar necesidad de proveeduria:", error);
        return res.status(500).json ({
            message: "Error al actualizar necesidad de proveeduria"
        });
    }
};

export const deleteNecesidad = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const necesidad = await Necesidad.findByPk(id);

        if(!necesidad) {
            return res.status(404).json ({
                message: "Necesidad de proveeduria no encontrada"
            });
        }
        
        const assign = await Empresa.count ({
            include: [
                {
                    model: Necesidad,
                    where: {id_necesidad: id},
                    through: { attributes: []}
                }
            ]
        });

        if (assign > 0) {
            return res.status(400).json({
                message: "No puedes eliminar esta necesidad de proveeduria por que esta asignada a un registro o mas"
            })
        }

        await necesidad.destroy();

        return res.json ({
            message: "Necesidad de proveeduria eliminada correctamente"
        });

    } catch (error) {
        console.error("Error al eliminar necesidad de proveeduria:", error);
        return res.status(500).json ({
            message: "Error al eliminar necesidad de proveeduria"
        });
    }
};