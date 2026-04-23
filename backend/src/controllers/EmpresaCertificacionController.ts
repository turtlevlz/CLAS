import { Request, Response } from "express"
import { EmpresaCertificacion } from "../models/EmpresaCertificacion"
import { Empresa } from "../models/Empresa";
import { Certificacion } from "../models/Certificacion";


export const addCertificacionToEmpresa = async (req:Request, res:Response) => {


    try {

        const empresa_id = Number(req.body.empresa_id);
        const certificacion_id = Number(req.body.certificacion_id);
        if (isNaN(empresa_id)) {
            return res.status(400).json ({
                message: "ID de empresa invalido"
            });
        }

        if (isNaN(certificacion_id)) {
            return res.status(400).json({
                message: "ID de certificacion invalido"
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
                message: "Certificacion no encontrada"
            });
        }

        const exist = await EmpresaCertificacion.findOne ({
            where:
            {
                empresa_id,
                certificacion_id
            }
        });

        if (exist) {
            return res.status(400).json ({
                message: "La certificacion ya ha sido asignada a la empresa"
            })
        }

        const empresaCertificacion = await EmpresaCertificacion.create ({
            empresa_id,
            certificacion_id
        });

        return res.status(201).json ({
            message: "Certificacion asignada a empresa correctamente",
            empresaCertificacion
        });

    } catch (error) {
        return res.status(500).json ({
            message: "Error al crear relacion entre empresa y certificacion"
        });
    }
}

export const removeCertificacionFromEmpresa = async (req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);
        const certificacion_id = Number(req.params.certificacion_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json ({
                message: "ID de empresa invalido"
            });
        }

        if (isNaN(certificacion_id)) {
            return res.status(400).json ({
                message: "ID de certificacion invalido"
            });


        const relacion = await EmpresaCertificacion.findOne({
            where:
            {
                empresa_id,
                certificacion_id
            }
        });

        if (!relacion) {
            return res.status(404).json({
                message: "relacion no encontrada"
            });
        }

        await relacion.destroy();

        return res.json ({
            message: "Relacion removida correctamente entre empresa y certificaciones"
        });
        
    } catch (error) {
        return res.status(500).json ({
            message: "Error al remover la relacion entre empresa y certificacion"
        });
    }
}



export const getEmpresasByCertificacion = async (req:Request, res:Response) => {

    try {
        const certificacion_id  = Number(req.params.certificacion_id);
        if (isNaN(certificacion_id)) {
            return res.status(400).json ({
                message: "ID de certificacion invalido"
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
                message: "Certificacion no encontrada"
            });
        }

        return res.json(certificacion);
    } catch(error) {
        return res.status(500).json ({
            message: "Error al obtener las relaciones"
        })
    }
}

export const getCertificacionesByEmpresa = async (req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);

        if (isNaN(empresa_id)) {
            return res.status(400).json ({
                message: "ID invalido"
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

        return res.json(empresa);
    } catch(error) {
        return res.status(500).json ({
            message: "Error al obtener las relaciones"
        })
    }
}

