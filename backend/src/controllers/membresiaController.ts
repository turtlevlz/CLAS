import { Request, Response } from "express";
import { Op } from "sequelize";
import { Membresia } from "../models/Membresia";
import { Empresa } from "../models/Empresa";

export const createMembresia = async (req:Request, res:Response) => {

    try {

        const { nombre_membresia } = req.body;

        if (!nombre_membresia || nombre_membresia.trim() === "") {
            return res.status(400).json ({
                message: "El nombre de la membresia es obligatorio"
            });
        }

        const nombre_limpio = String(nombre_membresia.trim());

        const exist = await Membresia.findOne ({
            where: { nombre_membresia: {[Op.iLike]: nombre_limpio }}
        });

        if(exist) {
            return res.status(400).json ({
                message: "Ya existe una membresia con ese nombre"
            });
        }

        const membresia = await Membresia.create({
            nombre_membresia
        });

        return res.status(201).json ({
            message: "Membresia creada correctamente",
            membresia
        });

    } catch(error) {
        console.error("Error ", error)
        return res.status(500).json ({
            message: "Error al crear membresia"
        });
    }
};

export const getMembresias = async (req:Request, res:Response) => {

    try {
        const membresias = await Membresia.findAll ({
            attributes: [
                "id_membresia",
                "nombre_membresia"
            ],
            order: [["nombre_membresia", "ASC"]]
        });

        return res.json(membresias);
    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener las membresias"
        });
    }
};

export const getMembresiaByID = async (req:Request, res: Response) => {

    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const membresia = await Membresia.findByPk(id);
        if(!membresia) {
            return res.status(404).json ({
                message: "Membresia no encontrada"
            });
        }

        return res.json(membresia);

    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener la membresia"
        });
    }
};

export const updateMembresia = async (req:Request, res:Response) => {

    try {
        const idMembresia = Number(req.params.id);
        if(isNaN(idMembresia)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const membresia = await Membresia.findByPk(idMembresia);

        if(!membresia) {
            return res.status(404).json ({
                message: "Membresia no encontrada"
            });
        }

        const { nombre_membresia } = req.body;

        if(!nombre_membresia || nombre_membresia.trim() === "") {
            return res.status(400).json ({
                message: "El nombre de la membresia es obligatorio"
            });
        }

        const nombre_limpio = String(nombre_membresia.trim());

        const exist = await Membresia.findOne ({
            where: { 
                nombre_membresia: {[Op.iLike]: nombre_limpio },
                id_membresia: { [Op.ne]: idMembresia}
            }
        });

        if(exist) {
            return res.status(400).json ({
                message: "Ya existe una membresia con ese nombre"
            });
        }

        await membresia.update({nombre_membresia: nombre_limpio});

        return res.json ({
            message: "Membresia actualizada",
            membresia
        });

    } catch (error) {
        return res.status(500).json ({
            message: "Error al actualizar membresia"
        });
    }
};

export const deleteMembresia = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const membresia = await Membresia.findByPk(id);
        if(!membresia) {
            return res.status(404).json ({
                message: "Membresia no encontrada"
            });
        }
        
        const assign = await Empresa.count ({
            where: {membresia_id: id}
        });

        if (assign > 0) {
            return res.status(400).json({
                message: "No puedes eliminar esta membresia por que esta asignada a un registro o mas"
            })
        }

        await membresia.destroy();
        return res.json ({
            message: "Membresia eliminada correctamente"
        });

    } catch (error) {
        return res.status(500).json ({
            message: "Error al eliminar membresia"
        });
    }
};