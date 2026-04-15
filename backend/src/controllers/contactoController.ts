import { Request, Response } from "express";
import { Contacto } from "../models/Contacto";
import { Empresa } from "../models/Empresa";
import { FuncionContacto } from "../models/FuncionContacto";

export const createContacto = async (req:Request, res:Response) => {

    try {
        const {
            empresa_id,
            funcion_id,
            nombre_completo,
            puesto,
            telefono_celular,
            correo
        } = req.body;

        if(!empresa_id || isNaN(Number(empresa_id))) {
            return res.status(400).json ({
                message: "El ID de la empresa es obligatorio"
            });
        }

        const empresa = await Empresa.findByPk(empresa_id);

        if(!empresa) {
            return res.status(404).json ({
                message: "Empresa no encontrada"
            });
        }

        if(funcion_id) {
            const id = await FuncionContacto.findByPk(funcion_id)
            if(!id) {
                return res.status(404).json ({
                    message: "Funcion no encontrada"
                })
            }
        }

        const contacto = await Contacto.create ({
            empresa_id,
            funcion_id,
            nombre_completo,
            puesto,
            telefono_celular,
            correo
        });

        return res.status(201).json ({
            message: "Contacto creado correctamente",
            contacto
        });

    } catch(error) {
        return res.status(500).json ({
            message: "Error al crear contacto"
        });
    }
};

export const getContactosByEmpresa = async (req:Request, res:Response) => {

    try {
        const id_empresa = Number(req.params.empresa_id);

        if(isNaN(id_empresa)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const empresa = await Empresa.findByPk(id_empresa);

        if(!empresa) {
            return res.status(404).json ({
                message: "Empresa no encontrada"
            });
        }

        const contactos = await Contacto.findAll ({
            where: { empresa_id : id_empresa},
            include: [
                {
                    model: FuncionContacto,
                    attributes: ["nombre_funcion"]
                }
            ]
        });

        return res.json(contactos);

    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener contactos de la empresa"
        });
    }
};

export const getContactobyId = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const contacto = await Contacto.findByPk(id);
        if(!contacto) {
            return res.status(404).json ({
                message: "Contacto no encontrado"
            });
        }

        return res.json(contacto);

    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener contacto"
        });
    }
};

export const updateContacto = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const contacto = await Contacto.findByPk(id);

        if(!contacto) {
            return res.status(404).json ({
                message: "Contacto no encontrado"
            });
        }

        const allowedFields = [
            "funcion_id",
            "nombre_completo",
            "puesto",
            "telefono_celular",
            "correo"
        ];

        const updates: any = {};

        for (const key of allowedFields) {
            if(req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        await contacto.update(updates);

        return res.json ({
            message: "Contacto actualizado"
        });

    } catch (error) {
        return res.status(500).json ({
            message: "Error al actualziar contacto"
        });
    }
};

export const deleteContacto = async (req:Request, res:Response) => {

    try {

        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const contacto = await Contacto.findByPk(id);

        if(!contacto) {
            return res.status(404).json ({
                message: "Contacto no encontrado"
            });
        }

        await contacto.destroy();

        return res.json ({
            message: "Contacto eliminado correctamente"
        });
    } catch (error) {
        return res.status(500).json ({
            message: "Error al eliminar contacto"
        });
    }
};