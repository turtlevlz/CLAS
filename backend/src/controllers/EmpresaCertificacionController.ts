import { Request, Response } from "express"
import { EmpresaCertificacion } from "../models/EmpresaCertificacion"
import { Empresa } from "../models/Empresa";
import { Certificacion } from "../models/Certificacion";


const canManageEmpresa = (user: any, empresa_id: number): boolean => {
    if (user.rol_id === 1) return true;
    if (user.rol_id === 2 && Number(user.empresa_id) === empresa_id) return true;
    return false;
}

export const addCertificacionToEmpresa = async (req:Request, res:Response) => {

    try {

        const { empresa_id: empresaIdRaw, certificacion_id: certificacionIdRaw } = req.body;

        if (empresaIdRaw === undefined || empresaIdRaw === null || empresaIdRaw === "") {
            return res.status(400).json({
                message: "ID de empresa requerido"
            });
        }

        if (certificacionIdRaw === undefined || certificacionIdRaw === null || certificacionIdRaw === "") {
            return res.status(400).json({
                message: "ID de certificación requerido"
            });
        }

        const empresa_id = Number(empresaIdRaw);
        const certificacion_id = Number(certificacionIdRaw);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(certificacion_id)) {
            return res.status(400).json({
                message: "ID de certificación inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para asignar certificaciones a esta empresa"
            });
        }

        const empresa = await Empresa.findByPk(empresa_id);
        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        const certificacion = await Certificacion.findByPk(certificacion_id);
        if (!certificacion) {
            return res.status(404).json({
                message: "Certificación no encontrada"
            });
        }

        const [empresaCertificacion, created] = await EmpresaCertificacion.findOrCreate({
            where: { empresa_id, certificacion_id },
            defaults: { empresa_id, certificacion_id }
        });

        if (!created) {
            return res.status(400).json({
                message: "La certificación ya ha sido asignada a la empresa"
            });
        }

        return res.status(201).json({
            message: "Certificación asignada a empresa correctamente",
            data: {
                empresa_id: empresaCertificacion.empresa_id,
                certificacion_id: empresaCertificacion.certificacion_id
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al crear relación entre empresa y certificación"
        });
    }
}

export const removeCertificacionFromEmpresa = async (req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);
        const certificacion_id = Number(req.params.certificacion_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa inválido"
            });
        }

        if (isNaN(certificacion_id)) {
            return res.status(400).json({
                message: "ID de certificación inválido"
            });
        }

        const user = (req as any).user;
        if (!canManageEmpresa(user, empresa_id)) {
            return res.status(403).json({
                message: "No tienes permisos para remover certificaciones de esta empresa"
            });
        }

        const relacion = await EmpresaCertificacion.findOne({
            where: { empresa_id, certificacion_id }
        });

        if (!relacion) {
            return res.status(404).json({
                message: "Relación no encontrada"
            });
        }

        await relacion.destroy();

        return res.json({
            message: "Relación removida correctamente entre empresa y certificación",
            data: { empresa_id, certificacion_id }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al remover la relación entre empresa y certificación"
        });
    }
}



export const getEmpresasByCertificacion = async (req:Request, res:Response) => {

    try {
        const certificacion_id = Number(req.params.certificacion_id);
        if (isNaN(certificacion_id)) {
            return res.status(400).json({
                message: "ID de certificación inválido"
            });
        }

        const certificacion = await Certificacion.findByPk(certificacion_id, {
            attributes: ["id_certificacion", "nombre_certificacion"],
            include: [
                {
                    model: Empresa,
                    attributes: ["id_empresa", "nombre_comercial", "ciudad"],
                    through: { attributes: [] }
                }
            ]
        });

        if (!certificacion) {
            return res.status(404).json({
                message: "Certificación no encontrada"
            });
        }

        return res.json({
            message: "Empresas obtenidas correctamente",
            data: certificacion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener las relaciones"
        });
    }
}

export const getCertificacionesByEmpresa = async (req:Request, res:Response) => {

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
                    model: Certificacion,
                    attributes: ["id_certificacion", "nombre_certificacion"],
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
            message: "Certificaciones obtenidas correctamente",
            data: empresa
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al obtener las relaciones"
        });
    }
}
