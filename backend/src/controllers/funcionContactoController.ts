import { Request, Response } from "express";
import { Op } from "sequelize";
import { FuncionContacto } from "../models/FuncionContacto";

export const createFuncionContacto = async (req:Request, res:Response) => {

    try {
        const { nombre_funcion } = req.body;

        if(!nombre_funcion) {
            return res.status(400).json ({
                message: "El nombre de la funcion es obligatorio"
            });
        }

        const exist = await FuncionContacto.findOne ({
            where: { nombre_funcion: {[Op.iLike]: nombre_funcion }}
        });

        if(exist) {
            return res.status(400).json ({
                message: "Ya existe una funcion con ese nombre"
            });
        }

        const funcionContacto = await FuncionContacto.create ({
            nombre_funcion
        });

        return res.status(201).json ({
            message: "Funcion creada con exito",
            funcionContacto
        });

    } catch (error) {
        return res.status(500).json ({
            message: "Error al crear funcion"
        });
    }
};

export const getFuncionesContacto = async (req:Request, res:Response) => {

    try {
        const funcionContacto = await FuncionContacto.findAll ({
            attributes: [
                "id_funcion",
                "nombre_funcion"
            ],
            order: [["nombre_funcion", "ASC"]]
        });

        return res.json(funcionContacto);
    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener las funciones"
        });
    }
};

export const getFuncionContactoById = async (req:Request, res:Response) => {
    
    try {
        const id = Number(req.params.id);
        
        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const funcionContacto = await FuncionContacto.findByPk(id);

        if(!funcionContacto) {
            return res.status(404).json ({
                message: "Funcion no encontrada"
            });
        }

        return res.json(funcionContacto);
    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener la funcion"
        });
    }
};

export const updateFuncionContacto = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const funcionContacto = await FuncionContacto.findByPk(id);

        if(!funcionContacto) {
            return res.status(404).json ({
                message: "Funcion no encontrada"
            });
        }

        const { nombre_funcion } = req.body;

        if(!nombre_funcion) {
            return res.status(400).json ({
                message: "El nombre de la funcion es obligatorio"
            });
        }

        const exist = await FuncionContacto.findOne ({
            where: { nombre_funcion: {[Op.iLike]: nombre_funcion }}
        });

        if(exist) {
            return res.status(400).json ({
                message: "Ya existe una funcion con ese nombre"
            });
        }

        await funcionContacto.update({nombre_funcion});

        return res.json ({
            message: "Funcion actualizada",
            funcionContacto
        });
    } catch (error) {
        return res.status(500).json ({
            message: "Error al actualizar la funcion"
        });
    }
};

export const deleteFuncionContacto = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const funcionContacto = await FuncionContacto.findByPk(id);

        if(!funcionContacto) {
            return res.status(404).json ({
                message: "Funcion no encontrada"
            });
        }

        await funcionContacto.destroy();
        return res.json ({
            message: "Funcion eliminada correctamente"
        });

    } catch (error) {
        return res.status(500).json ({
            message: "Error al eliminar la funcion"
        });
    }
};