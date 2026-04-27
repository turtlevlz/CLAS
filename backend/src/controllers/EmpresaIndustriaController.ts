import { Request, Response } from "express"
import { EmpresaIndustria } from "../models/EmpresaIndustria"
import { Empresa } from "../models/Empresa"
import { Industria } from "../models/Industria"


const canManageEmpresa = (user: any, empresa_id: number): boolean => {
    if (user.rol_id === 1) return true;
    if (user.rol_id === 2 && Number(user.empresa_id) === empresa_id) return true;
    return false;
}

export const addIndustriaToEmpresa = async (req:Request, res:Response) => {

    try {

        const { empresa_id: empresaIdRaw, industria_id: industriaIdRaw } = req.body;

        if (empresaIdRaw === undefined || empresaIdRaw === null || empresaIdRaw === "") {
            return res.status(400).json({
                message: "ID de empresa requerido"
            });
        }

        if (industriaIdRaw === undefined || industriaIdRaw === null || industriaIdRaw === "") {
            return res.status(400).json({
                message: "ID de industria requerido"
            });
        }

        const empresa_id = Number(empresaIdRaw);
        const industria_id = Number(industriaIdRaw);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(industria_id)) {
            return res.status(400).json({
                message: "ID de industria inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para asignar industrias a esta empresa"
            });
        }

        const empresa = await Empresa.findByPk(empresa_id);
        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        const industria = await Industria.findByPk(industria_id);
        if (!industria) {
            return res.status(404).json({
                message: "Industria no encontrada"
            });
        }

        const [empresaIndustria, created] = await EmpresaIndustria.findOrCreate({
            where: { empresa_id, industria_id },
            defaults: { empresa_id, industria_id }
        });

        if (!created) {
            return res.status(400).json({
                message: "La industria ya ha sido asignada a la empresa"
            });
        }

        return res.status(201).json({
            message: "Industria asignada a empresa correctamente",
            data: {
                empresa_id: empresaIndustria.empresa_id,
                industria_id: empresaIndustria.industria_id
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al crear relación entre empresa e industria"
        });
    }
}

export const removeIndustriaFromEmpresa = async (req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);
        const industria_id = Number(req.params.industria_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(industria_id)) {
            return res.status(400).json({
                message: "ID de industria inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para remover industrias de esta empresa"
            });
        }

        const relacion = await EmpresaIndustria.findOne({
            where: { empresa_id, industria_id }
        });

        if (!relacion) {
            return res.status(404).json({
                message: "Relación no encontrada"
            });
        }

        await relacion.destroy();

        return res.json({
            message: "Relación removida correctamente entre empresa e industria",
            data: { empresa_id, industria_id }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al remover la relación entre empresa e industria"
        });
    }
}

export const getIndustriasByEmpresa = async (req:Request, res:Response) => {

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
                    model: Industria,
                    attributes: ["id_industria", "nombre_industria"],
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
            message: "Industrias obtenidas correctamente",
            data: empresa
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener las relaciones"
        });
    }
}

export const getEmpresasByIndustria = async (req:Request, res:Response) => {

    try {
        const industria_id = Number(req.params.industria_id);
        if (isNaN(industria_id)) {
            return res.status(400).json({
                message: "ID de industria inválido"
            });
        }

        const industria = await Industria.findByPk(industria_id, {
            attributes: ["id_industria", "nombre_industria"],
            include: [
                {
                    model: Empresa,
                    attributes: ["id_empresa", "nombre_comercial", "ciudad"],
                    through: { attributes: [] }
                }
            ]
        });

        if (!industria) {
            return res.status(404).json({
                message: "Industria no encontrada"
            });
        }

        return res.json({
            message: "Empresas obtenidas correctamente",
            data: industria
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener las relaciones"
        });
    }
}
