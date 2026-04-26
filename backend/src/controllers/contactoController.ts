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

        const empresaId = user.rol_id === 1 ? Number(empresa_id) : Number(user.empresa_id);

        const funcionId = Number(funcion_id);

        if(isNaN(empresaId)) {
            return res.status(400).json ({
                message: "El ID de la empresa es obligatorio"
            });
        }

        if (isNaN(funcionId)) {
            return res.status(400).json ({
                message: "La funcion del contacto es obligatoria"
            });
        }

        if(!nombre_completo || String(nombre_completo).trim() === "") {
            return res.status(400).json ({
                message: "El nombre del contacto es obligatorio"
            })
        }

        if(!puesto || String(puesto).trim() === "") {
            return res.status(400).json ({
                message: "El puesto del contacto es obligatorio"
            })
        }

        if(!telefono_celular || String(telefono_celular).trim() === "") {
            return res.status(400).json ({
                message: "El telefono del contacto es obligatorio"
            })
        }

        const nombreLimpio = String(nombre_completo).trim();
        const puestoLimpio = String(puesto).trim();
        const telefonoLimpio = String(telefono_celular).trim();
        const correoLimpio = correo ? String(correo).trim() : null;

        if(correoLimpio) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(correoLimpio)) {
                return res.status(400).json ({
                    message: "Formato de correo electronico no valido"
                });
            }
        }

        const empresa = await Empresa.findByPk(empresaId);

        if(!empresa) {
            return res.status(404).json ({
                message: "Empresa no encontrada"
            });
        }

        if(!empresa.activo) {
            return res.status(400).json ({
                message: "La empresa esta inactiva"
            });
        }

        const funcion = await FuncionContacto.findByPk(funcionId);

        if(!funcion) {
            return res.status(404).json ({
                message: "Funcion no encontrada"
            });
        }

        const contacto = await Contacto.create ({
            empresa_id: empresaId,
            funcion_id: funcionId,
            nombre_completo: nombreLimpio,
            puesto: puestoLimpio,
            telefono_celular: telefonoLimpio,
            correo: correoLimpio
        });

        return res.status(201).json ({
            message: "Contacto creado correctamente",
            contacto
        });

    } catch(error) {
        console.error("Error al crear contacto:", error)
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

        const user = (req as any).user;

        if(user.rol_id === 3) {
            return res.status(403).json ({
                message: "No autorizado para actualizar contactos"
            });
        }  

        if (user.rol_id === 2 && contacto.empresa_id !== user.empresa_id) {
            return res.status(403).json ({
                message: "No autorizado para modificar contacto de otra empresa"
            });
        }

        const updates: any = {};

        if (req.body.funcion_id !== undefined) {
            const funcionId = Number(req.body.funcion_id);

            if(isNaN(funcionId)) {
                return res.status(400).json ({
                    message: "La funcion del contacto no es valida"
                });
            }

            const funcion = await FuncionContacto.findByPk(funcionId);

            if(!funcion) {
                return res.status(404).json ({
                    message: "Funcion no encontrada"
                });
            }

            updates.funcion_id = funcionId;
        }

        if(req.body.nombre_completo !== undefined) {
            if(String(req.body.nombre_completo).trim() === "") {
                return res.status(400).json ({
                    message: "No puedes enviar un nombre vacio"
                });
            }

            updates.nombre_completo = String(req.body.nombre_completo).trim();
        }

        if (req.body.puesto !== undefined) {
            if(String(req.body.puesto).trim() === "" ){
                return res.status(400).json ({
                    message: "No puedes enviar un puesto vacio"
                });
            }

            updates.puesto = String(req.body.puesto).trim();
        }

        if(req.body.telefono_celular !== undefined) {
            if(String(req.body.telefono_celular).trim() === "") {
                return res.status(400).json ({
                    message: "No puedes enviar un telefono vacio"
                });
            }

            updates.telefono_celular = String(req.body.telefono_celular).trim();
        }

        if(req.body.correo !== undefined) {
            const correoLimpio = String(req.body.correo).trim();
            if(correoLimpio === "") {
                return res.status(400).json ({
                    message: "No puedes enviar un correo vacio"
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correoLimpio)) {
                return res.status(400).json ({
                    message: "Formato de correo electronico no valido"
                });
            } 

            updates.correo = correoLimpio;
        }

        await contacto.update(updates);

        const actualizado = await contacto.reload ({
            include: [
                {
                    model: FuncionContacto,
                    attributes: ["nombre_funcion"]
                },
                {
                    model: Empresa,
                    attributes: ["nombre_comercial"]
                }
            ]
        });

        return res.json ({
            message: "Contacto actualizado",
            contacto: actualizado
        });

    } catch (error) {
        console.error("Error al actualizar contacto:", error);
        return res.status(500).json ({
            message: "Error al actualizar contacto"
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

        const user = (req as any).user;

        if(user.rol_id === 3) {
            return res.status(403).json ({
                message: "No autorizado para eliminar contactos"
            });
        }

        if(user.rol_id === 2 && contacto.empresa_id !== user.empresa_id) {
            return res.status(403).json ({
                message: "No autorizado para eliminar contactos de otra empresa"
            });
        }

        await contacto.destroy();

        return res.json ({
            message: "Contacto eliminado correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar contacto:", error)
        return res.status(500).json ({
            message: "Error al eliminar contacto"
        });
    }
};