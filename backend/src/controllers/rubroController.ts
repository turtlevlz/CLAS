import { Request, Response } from "express";
import { Rubro } from "../models/Rubro";

export const createRubro = async (req:Request, res:Response) => {

    try {
        const {
            nombre_rubro
        } = req.body;
        if (!nombre_rubro) {
            return res.status(400).json ({
                message: "El nombre del rubro es obligatorio"
            });
        }

        const rubro = await Rubro.create({
            nombre_rubro
        });

        return res.status(201).json ({
            message: "Rubro creado correctamente",
            rubro
        });
    } catch (error) {
        return res.status(500).json ({
            message: "Error al crear el rubro"
        });
    }
};

export const getRubros = async (req: Request, res:Response) => {

    try {
        const rubros = await Rubro.findAll({
            attributes: [
                "id_rubro",
                "nombre_rubro"
            ],
            order: [["nombre_rubro", "ASC"]]
        });

        return res.json(rubros);
    } catch(error) {
        return res.status(500).json ({
            message: "Error al obtener rubros"
        });
    }
};

export const getRubroById = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const rubro = await Rubro.findByPk(id);

        if(!rubro) {
            return res.status(404).json ({
                message: "Rubro no encontrado"
            });
        }

        return res.json(rubro);
    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener rubro"
        });
    }
};

export const updateRubro = async (req:Request, res:Response) => {

    try {
        const idRubro = Number(req.params.id);

        if (isNaN(idRubro)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const rubro = await Rubro.findByPk(idRubro);

        if(!rubro) {
            return res.status(404).json ({
                message: "Rubro no encontrado"
            });
        }

        const { nombre_rubro } = req.body;

        if(!nombre_rubro) {
            return res.status(400).json ({
                message: "El nombre del rubro es obligatorio"
            });
        }

        await rubro.update({nombre_rubro});

        return res.json ({
            message: "Rubro actualizado",
            rubro
        });
    } catch (error) {
        return res.status(500).json ({
            message: "Error al actualizar rubro"
        });
    }
};

export const deleteRubro = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const rubro = await Rubro.findByPk(id);

        if(!rubro) {
            return res.status(404).json ({
                message: "Rubro no encontrado"
            });
        }

        await rubro.destroy();
        return res.json ({
            message: "Rubro eliminado correctamente"
        });
    } catch(error) {
        return res.status(500).json ({
            message: "Error al eliminar rubro"
        });
    }
};