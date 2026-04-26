import { Request, Response } from "express";
import { ForeignKeyConstraintError, Op } from "sequelize";
import { Role } from "../models/Role";

export const createRole = async (req:Request, res:Response) => {

    try {
        const { nombre_rol } = req.body;

        if(!nombre_rol || String(nombre_rol).trim() === "") {
            return res.status(400).json ({
                message: "El nombre del rol es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_rol).trim();

        const exist = await Role.findOne ({
            where: { nombre_rol: { [Op.iLike]: nombreLimpio } }
        });

        if (exist) {
            return res.status(400).json ({
                message: "Ya existe un rol con ese nombre"
            });
        }
        
        const role = await Role.create ({
            nombre_rol: nombreLimpio
        });

        return res.status(201).json ({
            message: "Rol creado correctamente",
            role
        });

    } catch(error) {
        console.error("Error al crear rol:", error);
        return res.status(500).json ({
            message: "Error al crear rol"
        });
    }
};

export const getRoles = async (req:Request, res: Response) => {

    try {
        const role = await Role.findAll ({
            attributes: [
                "id_rol",
                "nombre_rol"
            ],
            order: [["nombre_rol", "ASC"]]
        });

        return res.json(role); 

    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener roles"
        });
    }
};

export const getRoleById = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const role = await Role.findByPk(id);

        if(!role) {
            return res.status(404).json ({
                message: "Rol no encontrado"
            });
        }

        return res.json(role);

    } catch (error) {
        return res.status(500).json ({
            message: "Error al obtener el rol"
        });
    }
};

export const updateRole = async (req:Request, res:Response) => {

    try {

        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const role = await Role.findByPk(id);

        if(!role) {
            return res.status(404).json ({
                message: "Rol no encontrado"
            });
        }

        if (String(role.nombre_rol).trim().toLowerCase() === "admin cluster") {
            return res.status(403).json ({
                message: "No se puede modificar el rol de admin cluster"
            });
        }

        const { nombre_rol } = req.body;

        if(!nombre_rol || String(nombre_rol).trim() === "") {
            return res.status(400).json ({
                message: "El nombre del rol es obligatorio"
            });
        }

        const nombreLimpio = String(nombre_rol).trim();

        const exist = await Role.findOne ({
            where: { 
                nombre_rol: { [Op.iLike]: nombreLimpio },
                id_rol: { [Op.ne]: id}
            }
        });

        if(exist) {
            return res.status(400).json ({
                message: "Ya existe un rol con ese nombre"
            });
        }

        await role.update({ nombre_rol: nombreLimpio });

        return res.json ({
            message: "Rol actualizado",
            role
        });

    } catch (error) {
        console.error("Error al actualizar rol:", error)
        return res.status(500).json ({
            message: "Error al actualizar rol"
        });
    }
};

export const deleteRole = async (req:Request, res:Response) => {

    try {
        const id = Number(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json ({
                message: "ID invalido"
            });
        }

        const role = await Role.findByPk(id);

        if(!role) {
            return res.status(404).json ({
                message: "Rol no encontrado"
            });
        }

        if(String(role.nombre_rol).trim().toLowerCase() === "admin cluster") {
            return res.status(403).json ({
                message: "No se puede eliminar el rol admin cluster"
            });
        }

        await role.destroy();

        return res.json ({
            message: "Rol eliminado correctamente"
        });

    } catch (error) {
        console.error("Error al eliminar rol:", error);

        if (error instanceof ForeignKeyConstraintError) {
            return res.status(400).json({
                message: "No se puede eliminar el rol porque está siendo usado por uno o más usuarios"
            });
        }
        
        return res.status(500).json ({
            message: "Error al eliminar rol"
        });
    }
};

