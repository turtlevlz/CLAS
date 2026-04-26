import { Request, Response } from "express"
import { EmpresaRubro } from "../models/EmpresaRubro"
import { Empresa } from "../models/Empresa"
import { Rubro } from "../models/Rubro"


const canManageEmpresa = (user: any, empresa_id: number): boolean => {
    if (user.rol_id === 1) return true;
    if (user.rol_id === 2 && Number(user.empresa_id) === empresa_id) return true;
    return false;
}

export const addRubroToEmpresa = async (req:Request, res:Response) => {

    try {

        const { empresa_id: empresaIdRaw, rubro_id: rubroIdRaw } = req.body;

        if (empresaIdRaw === undefined || empresaIdRaw === null || empresaIdRaw === "") {
            return res.status(400).json({
                message: "ID de empresa requerido"
            });
        }

        if (rubroIdRaw === undefined || rubroIdRaw === null || rubroIdRaw === "") {
            return res.status(400).json({
                message: "ID de rubro requerido"
            });
        }

        const empresa_id = Number(empresaIdRaw);
        const rubro_id = Number(rubroIdRaw);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(rubro_id)) {
            return res.status(400).json({
                message: "ID de rubro inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para asignar rubros a esta empresa"
            });
        }

        const empresa = await Empresa.findByPk(empresa_id);
        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        const rubro = await Rubro.findByPk(rubro_id);
        if (!rubro) {
            return res.status(404).json({
                message: "Rubro no encontrado"
            });
        }

        const [empresaRubro, created] = await EmpresaRubro.findOrCreate({
            where: { empresa_id, rubro_id },
            defaults: { empresa_id, rubro_id }
        });

        if (!created) {
            return res.status(400).json({
                message: "El rubro ya ha sido asignado a la empresa"
            });
        }

        return res.status(201).json({
            message: "Rubro asignado correctamente a la empresa",
            data: {
                empresa_id: empresaRubro.empresa_id,
                rubro_id: empresaRubro.rubro_id
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al crear relación entre empresa y rubro"
        });
    }
}

export const removeRubroFromEmpresa = async (req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);
        const rubro_id = Number(req.params.rubro_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(rubro_id)) {
            return res.status(400).json({
                message: "ID de rubro inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para remover rubros de esta empresa"
            });
        }

        const relacion = await EmpresaRubro.findOne({
            where: { empresa_id, rubro_id }
        });

        if (!relacion) {
            return res.status(404).json({
                message: "Relación no encontrada"
            });
        }

        await relacion.destroy();

        return res.json({
            message: "Relación removida correctamente entre empresa y rubro",
            data: { empresa_id, rubro_id }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al remover la relación entre empresa y rubro"
        });
    }
}

export const getRubrosByEmpresa = async (req:Request, res:Response) => {

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
                    model: Rubro,
                    attributes: ["id_rubro", "nombre_rubro"],
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
            message: "Rubros obtenidos correctamente",
            data: empresa
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener relaciones"
        });
    }
}

export const getEmpresasByRubro = async (req:Request, res:Response) => {

    try {
        const rubro_id = Number(req.params.rubro_id);
        if (isNaN(rubro_id)) {
            return res.status(400).json({
                message: "ID de rubro inválido"
            });
        }

        const rubro = await Rubro.findByPk(rubro_id, {
            attributes: ["id_rubro", "nombre_rubro"],
            include: [
                {
                    model: Empresa,
                    attributes: ["id_empresa", "nombre_comercial", "ciudad"],
                    through: { attributes: [] }
                }
            ]
        });

        if (!rubro) {
            return res.status(404).json({
                message: "Rubro no encontrado"
            });
        }

        return res.json({
            message: "Empresas obtenidas correctamente",
            data: rubro
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener las relaciones"
        });
    }
}
