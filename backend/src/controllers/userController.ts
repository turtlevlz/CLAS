import { Request, Response } from "express";
import { User } from "../models/User";
import { Empresa } from "../models/Empresa";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { Role } from "../models/Role";


export const createUser = async (req:Request, res:Response) => {

    try {

        const {
            nombre_usuario,
            contrasena,
            correo_electronico,
            rol_id,
            empresa_id
        } = req.body

        if(!nombre_usuario || nombre_usuario.trim() === "") {
            return res.status(400).json ({
                message: "El nombre de usuario es obligatorio"
            });
        }

        if(!correo_electronico || correo_electronico.trim() === "") {
            return res.status(400).json ({
                message: "El correo electronico es obligatorio"
            });
        }

        if(!contrasena || contrasena.trim() === "") {
            return res.status(400).json ({
                message: "La contrasena es obligatoria"
            });
        }

        if(!rol_id || isNaN(Number(rol_id))) {
            return res.status(400).json ({
                message: "El rol es obligatorio"
            })
        }

        const nombreLimpio = String(nombre_usuario).trim();
        const correoLimpio = String(correo_electronico).trim();
        const contrasenaLimpia = String(contrasena).trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correoLimpio)) {
            return res.status(400).json({ message: "Formato de correo electrónico no válido" });
        }

        const rolExist = await Role.findByPk(rol_id);
        if (!rolExist) {
            return res.status(404).json({ message: "El rol especificado no existe" });
        }

        if (Number(rol_id) === 2 || Number(rol_id) === 3) {
            if (!empresa_id || isNaN(Number(empresa_id))) {
                return res.status(400).json({ 
                    message: "El ID de la empresa es obligatorio para usuarios y admins de empresa" 
                });
            }
        }

        const exist = await User.findOne ({
            where: { correo_electronico: correoLimpio }
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

        if (user_log.rol_id === 3) {
            return res.status(403).json({ message: "No autorizado para crear usuarios" });
        }

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

        const hashedPassword = await bcrypt.hash(contrasenaLimpia, 10);
        
        const user = await User.create ({
            nombre_usuario: nombreLimpio,
            correo_electronico: correoLimpio,
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
        const id = Number(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            })
        }

        const user = await User.findByPk(id, {
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

        const user_log = (req as any).user;

        if (user_log.rol_id === 3) {
            if (user_log.id_usuario !== user.id_usuario) {
                return res.status(403).json({
                    message: "No autorizado. Solo puedes ver tu propio perfil."
                });
            }
        } else if (user_log.rol_id === 2) {
            if (user_log.empresa_id !== user.empresa_id) {
                return res.status(403).json({
                    message: "No autorizado. Este usuario pertenece a otra empresa."
                });
            }
        }

        return res.json(user);

    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener usuario"
        });
    }
};

export const getUsersByEmpresa = async (req: Request, res: Response) => {
    try {
        const empresa_id = Number(req.params.empresa_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        const user_log = (req as any).user;

        if (user_log.rol_id === 3) {
            return res.status(403).json({
                message: "No autorizado."
            });
        } else if (user_log.rol_id === 2) {
            if (user_log.empresa_id !== empresa_id) {
                return res.status(403).json({
                    message: "No autorizado para consultar usuarios de otra empresa."
                });
            }
        }

        const users = await User.findAll({
            where: { empresa_id },
            attributes: [
                "id_usuario",
                "nombre_usuario",
                "correo_electronico",
                "rol_id",
                "empresa_id"
            ],
            order: [["nombre_usuario", "ASC"]]
        });

        return res.json(users);

    } catch (error) {
        console.error("Error en getUsersByEmpresa: ", error);
        return res.status(500).json({
            message: "Error al obtener los usuarios de la empresa"
        });
    }
};

export const updateUser = async (req:Request, res:Response) => {

    try {
        const idUser = Number(req.params.id);

        if(isNaN(idUser)) {
            return res.status(400).json ({
        message: "ID invalido"
            });
        }

        const user = await User.findByPk(idUser);

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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        for (const key of allowedFields) {
            const value = req.body[key];

            if (value !== undefined) {
                const valueLimpio = String(value).trim();

                if (valueLimpio === "") {
                    return res.status(400).json({
                        message: "El campo no puede estar vacio"
                    });
                }

                if (key === "correo_electronico" && !emailRegex.test(valueLimpio)) {
                    return res.status(400).json({
                        message: "Formato de correo electrónico no válido"
                    });
                }
                updates[key] = valueLimpio;
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
            message: "Usuario actualizado correctamente"
        });

    } catch (error) {
        return res.status(500).json ({
            message: "Error al actualizar usuario"
        });
    }   
};

export const deleteUser = async (req:Request, res: Response) => {

    try {
        const idUser = Number(req.params.id);

        if (isNaN(idUser)) {
            return res.status(400).json({
                message: "ID inválido"
            });
        }

        const user = await User.findByPk(idUser);

        if(!user) {
            return res.status(404).json ({
                message: "Usuario no encontrado"
            });
        }

        const user_log = (req as any).user;

        if (user_log.rol_id === 3) {
            if (user_log.id_usuario !== idUser) {
                return res.status(403).json({
                    message: "No autorizado para eliminar a otro usuario"
                });
            }
        } else if (user_log.rol_id === 2) {
            if (user.empresa_id !== user_log.empresa_id) {
                return res.status(403).json({
                    message: "No autorizado para eliminar usuarios de otra empresa"
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