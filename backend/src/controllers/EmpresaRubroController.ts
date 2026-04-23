import { Request, Response } from "express"
import { EmpresaRubro } from "../models/EmpresaRubro"
import { Empresa } from "../models/Empresa"
import { Rubro } from "../models/Rubro"


export const addRubroToEmpresa = async(req:Request, res:Response) => {

    try {

        const empresa_id = Number(req.body.empresa_id);
        const rubro_id   = Number(req.body.rubro_id);

        if(isNaN(empresa_id)) {
            return res.status(400).json({
                message: "ID de empresa invalido"
            });
        }

        if (isNaN(rubro_id)) {
            return res.status(400).json ({
                message: "ID de rubro invalido"
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

        const exists = await EmpresaRubro.findOne({
            where:
            {
                empresa_id,
                rubro_id
            }
        });

        if (exists) {
            return res.status(400).json ({
                message: "El rubro ya ha sido asignado a la empresa"
            })
        }

        const empresaRubro = await EmpresaRubro.create ({
            empresa_id,
            rubro_id
        });

        return res.status(201).json ({
            message: "Rubro asignado correctamente a una empresa",
            empresaRubro
        });

    } catch(error) {
        return res.status(500).json ({
            message: "Error al crear relacion entre rubro y empresa"
        })
    }
}

export const removeRubroFromEmpresa = async (req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id);
        const rubro_id   = Number(req.params.rubro_id);

        if(isNaN(empresa_id)) {
            return res.status(400).json ({
                message: "ID de empresa invalido"
            });
        }

        if(isNaN(rubro_id)) {
            return res.status(400).json ({
                message: "ID de rubro invalido"
            });
        }

        const relacion = await EmpresaRubro.findOne({
            where:
            {
                empresa_id,
                rubro_id
            }
        });

        if(!relacion) {
            return res.status(404).json({
                message: "relacion no encontrada"
            });
        }

        await relacion.destroy();

        return res.json ({
            message: "Relacion removida correctamente entre empresa y rubro"
        });
    } catch(error) {
        return res.status(500).json ({
            message: "Error al remover la relacion entre empresa y rubro"
        });
    }
}

export const getRubrosByEmpresa = async(req:Request, res:Response) => {

    try {
        const empresa_id = Number(req.params.empresa_id)
        
        if (isNaN(empresa_id)) {
            return res.status(400).json ({
                message: "Id invalido"
            });
        }

        const empresa = await Empresa.findByPk(empresa_id, {
            attributes: ["id_empresa", "nombre_comercial", "ciudad"],
            include: [
                {
                    model: Rubro,
                    attributes: ["id_rubro", "nombre_rubro"],
                    through: { attributes: []}
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
            message: "Error al obtener relaciones"
        });
    }
}

export const getEmpresasByRubro = async (req:Request, res:Response) => {

    try {
        const rubro_id = Number(req.params.rubro_id);
        if (isNaN(rubro_id)) {
            return res.status(400).json({
                message: "ID invalido"
            });
        }

        const rubro = await Rubro.findByPk(rubro_id, {
            attributes : ["id_rubro", "nombre_rubro"],
            include: [
                {
                    model: Empresa,
                    attributes: ["id_empresa", "nombre_comercial", "ciudad"],
                    through: { attributes: []}
                }
            ]
        });

        if (!rubro) {
            return res.status(404).json({
                message: "rubro no encontrado"
            });
        }

        return res.json(rubro);
    } catch(error) {
        return res.status(500).json ({
            message: "Error al obtener las relaciones"
        })
    }
}