import { Request, Response } from "express";
import { User } from "../models/User";
import { Empresa } from "../models/Empresa";
import { Op } from "sequelize";
import bcrypt from "bcrypt";


export const createUser = async (req:Request, res:Response) => {

    try {

        const {
            nombre_usuario,
            contrasena,
            correo_electronico,
            rol_id,
            empresa_id
        } = req.body

        if(!nombre_usuario) {
            return res.status(400).json ({
                message: "El nombre de usuario es obligatorio"
            });
        }

        if(!correo_electronico) {
            return res.status(400).json ({
                message: "El correo electronico es obligatorio"
            });
        }

        if(!contrasena) {
            return res.status(400).json ({
                message: "La contrasena es obligatoria"
            });
        }

        if(!rol_id) {
            return res.status(400).json ({
                message: "El rol es obligatorio"
            })
        }

        const exist = await User.findOne ({
            where: { correo_electronico }
        });

        if(exist) {
            return res.status(400).json ({
                message: "Ya existe un usuario con ese correo electronico"
            });
        }

        if (empresa_id) {
            const empresa = await Empresa.findByPk(empresa_id);
            if(!empresa) {
                return res.status(404).json ({
                    message: "Empresa no encontrada"
                });
            }
        }

        const user_log = (req as any).user;

        if(user_log.rol_id === 2) {
            if(rol_id !== 3) {
                return res.status(403).json ({
                    message: "No autorizado para crear ese tipo de usuario"
                });
            }

            if(empresa_id !== user_log.empresa_id) {
                return res.status(403).json ({
                    message: "No autorizado para crear usuarios en otra empresa"
                });
            }
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        
        const user = await User.create ({
            nombre_usuario,
            correo_electronico,
            contrasena: hashedPassword,
            rol_id,
            empresa_id
        });

        return res.status(201).json ({
            message: "Usuario creado correctamente",
            id_usuario: user.id_usuario,
            nombre_usuario: user.nombre_usuario,
            correo_electronico: user.correo_electronico,
            rol_id: user.rol_id,
            empresa_id: user.empresa_id
        });

    } catch (error) {
        console.error("Error al crear usuario:", error)
        return res.status(500).json ({
            message: "Error al crear usuario"
        });
    }
};

export const getUsers = async(req:Request, res:Response) => {

    try {
        const user = await User.findAll ({
            attributes: [
                "id_usuario",
                "nombre_usuario",
                "correo_electronico",
                "rol_id",
                "empresa_id",
            ],
            order: [["nombre_usuario", "ASC"]]
        });

        return res.json(user);

    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener usuarios"
        });
    }
};

export const getUserById = async (req:Request, res:Response) => {

    try {
        const id = req.params.id;
        if(!id) {
            return res.status(400).json ({
                message: "ID invalido"
            })
        }

        const user = await User.findOne({
            where: { id_usuario: id },
            attributes: [
                "id_usuario",
                "nombre_usuario",
                "correo_electronico",
                "rol_id",
                "empresa_id"
            ]
        });

        if(!user) {
            return res.status(404).json ({
                message: "Usuario no encontrado"
            });
        }

        return res.json(user);

    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener usuario"
        });
    }
};

export const updateUser = async (req:Request, res:Response) => {

    try {
        const idUser = req.params.id;

        const user = await User.findOne ({
            where: { id_usuario : idUser}
        })

        if(!user) {
            return res.status(404).json ({
                message: "Usuario no encontrado"
            });
        }

        const user_log = (req as any).user;
        if(user_log.rol_id === 3) {
            if(user_log.id_usuario !== idUser) {
                return res.status(403).json ({
                    message: "No autorizado"
                });
            }
        } else if (user_log.rol_id === 2) {
            if(user.empresa_id !== user_log.empresa_id) {
                return res.status(403).json ({
                    message: "No autorizado"
                });
            }
        }

        const allowedFields = [
            "nombre_usuario",
            "correo_electronico",
            "contrasena"
        ];

        const updates: any = {};

        for (const key of allowedFields) {
            if(req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        if(updates.contrasena) {
            updates.contrasena = await bcrypt.hash(updates.contrasena, 10);
        }

        if (updates.correo_electronico) {
            const exist = await User.findOne({
                where: { 
                    correo_electronico: updates.correo_electronico,
                    id_usuario: { [Op.ne]: idUser }
                 }
            });
            if(exist) {
                return res.status(400).json({
                    message: "Correo ya en uso"
                })
            }
        }

        await user.update(updates);

        return res.json ({
            message: "Usuario actualizado"
        });

    } catch (error) {
        return res.status(500).json ({
            message: "Error al actualizar usuario"
        });
    }   
};

export const deleteUser = async (req:Request, res: Response) => {

    try {
        const idUser = req.params.id;

        const user = await User.findOne ({
            where: { id_usuario : idUser}
        });

        if(!user) {
            return res.status(404).json ({
                message: "Usuario no encontrado"
            });
        }

        const user_log = (req as any).user;

        if(user_log.rol_id === 2) {
            if(user.empresa_id !== user_log.empresa_id) {
                return res.status(403).json ({
                    message: "No autorizado"
                });
            }
        }

        await user.destroy();

        res.json ({
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {
        return res.status(500).json ({
            message: "Error al eliminar usuario"
        });
    }   
};