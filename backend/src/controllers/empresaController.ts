import { Request, Response } from "express";
import { Empresa } from "../models/Empresa";

export const createEmpresa = async (req: Request, res: Response) => {

    try {

        const {
            nombre_comercial,
            razon_social,
            rfc,
            correo_electronico,
            telefono,
            sitio_web,
            membresia_id,
            tipo_organizacion_id,
            ciudad,
            domicilio_completo,
            giro
        } = req.body;

        if (!nombre_comercial) {
            return res.status(400).json({
                message: "El nombre comercial es obligatorio"
            });
        }

        const empresa = await Empresa.create({
            nombre_comercial,
            razon_social,
            rfc,
            correo_electronico,
            telefono,
            sitio_web,
            membresia_id,
            tipo_organizacion_id,
            ciudad,
            domicilio_completo,
            giro
        });

        return res.status(201).json({
            message: "Empresa creada correctamente",
            empresa
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al crear empresa",
            error
        });

    }

};


export const getEmpresas = async (req: Request, res: Response) => {

    try {

        const empresas = await Empresa.findAll({
            attributes: [
                "id_empresa",
                "nombre_comercial",
                "telefono",
                "ciudad",
                "membresia_id",
                "tipo_organizacion_id",
                "logo"
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

        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID inválido"
            });
        }

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

export const updateEmpresa = async (req: Request, res: Response) => {

    const idEmpresa = Number(req.params.id);
    const user = (req as any).user;

    const empresa = await Empresa.findByPk(idEmpresa);

    if (!empresa) {
        return res.status(404).json({
            message: "Empresa no encontrada"
        });
    }

    if (
        user.rol_id !== 1 &&
        !(user.rol_id === 2 && user.empresa_id === idEmpresa)
    ) {
        return res.status(403).json({
            message: "No autorizado"
        });
    }

    const allowedFields = [
        "nombre_comercial",
        "razon_social",
        "telefono",
        "sitio_web",
        "ciudad",
        "domicilio_completo",
        "giro"
    ];

    const updates: any = {};

    for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    }

    await empresa.update(updates);

    return res.json({
        message: "Empresa actualizada",
        empresa
    });

};

export const deleteEmpresa = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const empresa = await Empresa.findByPk(id);

        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        await empresa.destroy();

        return res.json({
            message: "Empresa eliminada correctamente"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al eliminar empresa",
            error
        });

    }

};