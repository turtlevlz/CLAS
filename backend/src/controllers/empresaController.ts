import { Request, Response } from "express";
import { Empresa } from "../models/Empresa";

export const createEmpresa = async (req: Request, res: Response) => {

    try {

        const { nombre, datos_generales, correo_electronico, contacto, nombre_contacto, tier_id } = req.body;

        if (!nombre) {
            return res.status(400).json({
                message: "Nombre es requerido"
            });
        }

        if (!tier_id) {
            return res.status(400).json({
                message: "Tier es requerido"
            });
        }

        const empresa = await Empresa.create({
            nombre,
            datos_generales,
            correo_electronico,
            contacto,
            nombre_contacto,
            tier_id
        });

        return res.status(201).json({
            message: "Empresa creada",
            empresa
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error creando empresa",
            error
        });

    }

};


export const getEmpresas = async (req: Request, res: Response) => {

    try {

        const empresas = await Empresa.findAll({
            attributes: [
                "id_empresa",
                "nombre",
                "logo",
                "tier_id"
            ]
        });

        return res.json(empresas);

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener empresas",
            error
        });

    }

};

export const getEmpresaById = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const empresa = await Empresa.findByPk(id);

        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        return res.json(empresa);

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener empresa",
            error
        });

    }

};