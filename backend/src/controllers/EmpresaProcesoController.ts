import { Request, Response } from "express"
import { EmpresaProceso } from "../models/EmpresaProceso"
import { Empresa } from "../models/Empresa"
import { Proceso } from "../models/Proceso"


const canManageEmpresa = (user: any, empresa_id: number): boolean => {
    if (user.rol_id === 1) return true;
    if (user.rol_id === 2 && Number(user.empresa_id) === empresa_id) return true;
    return false;
}

export const addProcesoToEmpresa = async (req:Request, res:Response) => {

    try {

        const { empresa_id: empresaIdRaw, proceso_id: procesoIdRaw } = req.body;

        if (empresaIdRaw === undefined || empresaIdRaw === null || empresaIdRaw === "") {
            return res.status(400).json({
                message: "ID de empresa requerido"
            });
        }

        if (procesoIdRaw === undefined || procesoIdRaw === null || procesoIdRaw === "") {
            return res.status(400).json({
                message: "ID de proceso requerido"
            });
        }

        const empresa_id = Number(empresaIdRaw);
        const proceso_id = Number(procesoIdRaw);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(proceso_id)) {
            return res.status(400).json({
                message: "ID de proceso inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para asignar procesos a esta empresa"
            });
        }

        const empresa = await Empresa.findByPk(empresa_id);
        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        const proceso = await Proceso.findByPk(proceso_id);
        if (!proceso) {
            return res.status(404).json({
                message: "Proceso no encontrado"
            });
        }

        const [empresaProceso, created] = await EmpresaProceso.findOrCreate({
            where: { empresa_id, proceso_id },
            defaults: { empresa_id, proceso_id }
        });

        if (!created) {
            return res.status(400).json({
                message: "El proceso ya ha sido asignado a la empresa"
            });
        }

        return res.status(201).json({
            message: "Proceso asignado a empresa correctamente",
            data: {
                empresa_id: empresaProceso.empresa_id,
                proceso_id: empresaProceso.proceso_id
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al crear relación entre empresa y proceso"
        });
    }
}

export const removeProcesoFromEmpresa = async (req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);
        const proceso_id = Number(req.params.proceso_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(proceso_id)) {
            return res.status(400).json({
                message: "ID de proceso inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para remover procesos de esta empresa"
            });
        }

        const relacion = await EmpresaProceso.findOne({
            where: { empresa_id, proceso_id }
        });

        if (!relacion) {
            return res.status(404).json({
                message: "Relación no encontrada"
            });
        }

        await relacion.destroy();

        return res.json({
            message: "Relación removida correctamente entre empresa y proceso",
            data: { empresa_id, proceso_id }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al remover la relación entre empresa y proceso"
        });
    }
}

export const getProcesosByEmpresa = async (req:Request, res:Response) => {

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
                    model: Proceso,
                    attributes: ["id_proceso", "nombre_proceso"],
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
            message: "Procesos obtenidos correctamente",
            data: empresa
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener las relaciones"
        });
    }
}

export const getEmpresasByProceso = async (req:Request, res:Response) => {

    try {
        const proceso_id = Number(req.params.proceso_id);
        if (isNaN(proceso_id)) {
            return res.status(400).json({
                message: "ID de proceso inválido"
            });
        }

        const proceso = await Proceso.findByPk(proceso_id, {
            attributes: ["id_proceso", "nombre_proceso"],
            include: [
                {
                    model: Empresa,
                    attributes: ["id_empresa", "nombre_comercial", "ciudad"],
                    through: { attributes: [] }
                }
            ]
        });

        if (!proceso) {
            return res.status(404).json({
                message: "Proceso no encontrado"
            });
        }

        return res.json({
            message: "Empresas obtenidas correctamente",
            data: proceso
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener las relaciones"
        });
    }
}
