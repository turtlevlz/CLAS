import { Request, Response } from "express"
import { EmpresaNecesidad } from "../models/EmpresaNecesidad"
import { Empresa } from "../models/Empresa"
import { Necesidad } from "../models/Necesidad"


const canManageEmpresa = (user: any, empresa_id: number): boolean => {
    if (user.rol_id === 1) return true;
    if (user.rol_id === 2 && Number(user.empresa_id) === empresa_id) return true;
    return false;
}

export const addNecesidadToEmpresa = async (req:Request, res:Response) => {

    try {

        const { empresa_id: empresaIdRaw, necesidad_id: necesidadIdRaw } = req.body;

        if (empresaIdRaw === undefined || empresaIdRaw === null || empresaIdRaw === "") {
            return res.status(400).json({
                message: "ID de empresa requerido"
            });
        }

        if (necesidadIdRaw === undefined || necesidadIdRaw === null || necesidadIdRaw === "") {
            return res.status(400).json({
                message: "ID de necesidad requerido"
            });
        }

        const empresa_id = Number(empresaIdRaw);
        const necesidad_id = Number(necesidadIdRaw);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(necesidad_id)) {
            return res.status(400).json({
                message: "ID de necesidad inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para asignar necesidades a esta empresa"
            });
        }

        const empresa = await Empresa.findByPk(empresa_id);
        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        const necesidad = await Necesidad.findByPk(necesidad_id);
        if (!necesidad) {
            return res.status(404).json({
                message: "Necesidad no encontrada"
            });
        }

        const [empresaNecesidad, created] = await EmpresaNecesidad.findOrCreate({
            where: { empresa_id, necesidad_id },
            defaults: { empresa_id, necesidad_id }
        });

        if (!created) {
            return res.status(400).json({
                message: "La necesidad ya ha sido asignada a la empresa"
            });
        }

        return res.status(201).json({
            message: "Necesidad asignada a empresa correctamente",
            data: {
                empresa_id: empresaNecesidad.empresa_id,
                necesidad_id: empresaNecesidad.necesidad_id
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al crear relación entre empresa y necesidad"
        });
    }
}

export const removeNecesidadFromEmpresa = async (req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);
        const necesidad_id = Number(req.params.necesidad_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(necesidad_id)) {
            return res.status(400).json({
                message: "ID de necesidad inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para remover necesidades de esta empresa"
            });
        }

        const relacion = await EmpresaNecesidad.findOne({
            where: { empresa_id, necesidad_id }
        });

        if (!relacion) {
            return res.status(404).json({
                message: "Relación no encontrada"
            });
        }

        await relacion.destroy();

        return res.json({
            message: "Relación removida correctamente entre empresa y necesidad",
            data: { empresa_id, necesidad_id }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al remover la relación entre empresa y necesidad"
        });
    }
}

export const getNecesidadesByEmpresa = async (req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        const empresa = await Empresa.findByPk(empresa_id, {
            attributes: ["id_empresa", "nombre_comercial", "ciudad"],
            include: [
                {
                    model: Necesidad,
                    attributes: ["id_necesidad", "nombre_necesidad"],
                    through: { attributes: [] }
                }
            ]
        });

        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        return res.json({
            message: "Necesidades obtenidas correctamente",
            data: empresa
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener las relaciones"
        });
    }
}

export const getEmpresasByNecesidad = async (req:Request, res:Response) => {

    try {
        const necesidad_id = Number(req.params.necesidad_id);
        if (isNaN(necesidad_id)) {
            return res.status(400).json({
                message: "ID de necesidad inválido"
            });
        }

        const necesidad = await Necesidad.findByPk(necesidad_id, {
            attributes: ["id_necesidad", "nombre_necesidad"],
            include: [
                {
                    model: Empresa,
                    attributes: ["id_empresa", "nombre_comercial", "ciudad"],
                    through: { attributes: [] }
                }
            ]
        });

        if (!necesidad) {
            return res.status(404).json({
                message: "Necesidad no encontrada"
            });
        }

        return res.json({
            message: "Empresas obtenidas correctamente",
            data: necesidad
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener las relaciones"
        });
    }
}
