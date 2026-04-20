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

        const user = (req as any ).user;

        const verifyId = (user.rol_id === 1) ? empresa_id : user.empresa_id;

        if(!empresa_id || isNaN(Number(verifyId))) {
            return res.status(400).json ({
                message: "El ID de la empresa es obligatorio"
            });
        }

        if(!nombre_completo || nombre_completo.trim() === "") {
            return res.status(400).json ({
                message: "El nombre del contacto es obligatorio"
            })
        }

        if(!puesto || puesto.trim() === "") {
            return res.status(400).json ({
                message: "El puesto del contacto es olbigatorio"
            })
        }

        if(!telefono_celular || telefono_celular.trim() === "") {
            return res.status(400).json ({
                message: "El telefono del contacto es obligatorio"
            })
        }

        if(correo) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(correo)) {
                return res.status(400).json ({
                    message: "Formato de correo electronico no valido"
                })
            }
        }

        const empresa = await Empresa.findByPk(empresa_id);

        if(!empresa) {
            return res.status(404).json ({
                message: "Empresa no encontrada"
            });
        }

        if(funcion_id) {
            const funcion = await FuncionContacto.findByPk(funcion_id)
            if(!funcion) {
                return res.status(404).json ({
                    message: "Funcion no encontrada"
                })
            }
        }

        const contacto = await Contacto.create ({
            empresa_id: verifyId,
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
                },

                {
                    model: Empresa,
                    attributes: ["nombre_empresa"]
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

        const contacto = await Contacto.findByPk(id, {
            include: [
                {
                    model: FuncionContacto,
                    attributes: ["nombre_funcion"]
                },
                {
                    model: Empresa,
                    attributes: ["nombre_empresa"]
                }
            ]
        });
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
            const value = req.body[key];
            if (value !== undefined) {
                if(value.trim() === "") {
                    return res.status(400).json ({
                        message: "No puedes enviar un campo vacio"
                    });
                }
                updates[key] = value;
            }
        }

        await contacto.update(updates);

        const actualizado = await contacto.reload ({
            include: [{
                model: FuncionContacto,
                attributes: ["nombre_funcion"]
            },
            {
                model: Empresa,
                attributes: ["nombre_empresa"]
            }
            ]
        }
        )
        return res.json ({
            message: "Contacto actualizado",
            contacto: actualizado
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