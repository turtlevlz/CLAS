import { Request, Response } from "express";
import { Empresa } from "../models/Empresa";
import { Membresia } from "../models/Membresia";
import { TipoOrganizacion } from "../models/TipoOrganizacion";
import { Rubro } from "../models/Rubro";
import { Certificacion } from "../models/Certificacion";
import { Contacto } from "../models/Contacto";
import { FuncionContacto } from "../models/FuncionContacto";

export const createEmpresa = async (req: Request, res: Response) => {

    const fs = require("fs");

    try {

        let {
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

        // NORMALIZAR
        nombre_comercial = nombre_comercial?.trim();
        razon_social = razon_social?.trim();
        correo_electronico = correo_electronico?.trim();
        telefono = telefono?.trim();
        sitio_web = sitio_web?.trim();
        ciudad = ciudad?.trim();
        domicilio_completo = domicilio_completo?.trim();
        giro = giro?.trim();
        rfc = rfc?.trim();

        // Nombre obligatorio
        if (!nombre_comercial) {
            return res.status(400).json({
                message: "El nombre comercial es obligatorio"
            });
        }

        // Email válido
        if (correo_electronico) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo_electronico)) {
                return res.status(400).json({
                    message: "Formato de correo electrónico no válido"
                });
            }
        }

        // Teléfono válido
        if (telefono) {
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(telefono)) {
                return res.status(400).json({
                    message: "Teléfono inválido (10-15 dígitos)"
                });
            }
        }

        // RFC básico (México)
        if (rfc) {
            const rfcRegex = /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
            if (!rfcRegex.test(rfc.toUpperCase())) {
                return res.status(400).json({
                    message: "Formato de RFC no válido"
                });
            }
            rfc = rfc.toUpperCase();
        }

        // URL básica
        if (sitio_web) {
            const urlRegex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_-]+))*$/;
            if (!urlRegex.test(sitio_web)) {
                return res.status(400).json({
                    message: "URL de sitio web no válida"
                });
            }
        }

        // DUPLICADO nombre (case insensitive)
        const empresaExistente = await Empresa.findOne({
            where: {
                nombre_comercial
            }
        });

        if (empresaExistente) {
            return res.status(409).json({
                message: "Ya existe una empresa con ese nombre comercial"
            });
        }

        // DUPLICADO RFC
        if (rfc) {
            const rfcExistente = await Empresa.findOne({
                where: { rfc }
            });

            if (rfcExistente) {
                return res.status(409).json({
                    message: "Ya existe una empresa con ese RFC"
                });
            }
        }

        // IMAGEN
        const logo = req.file ? req.file.filename : undefined;

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
            giro,
            ...(logo && { logo })
        });

        return res.status(201).json({
            message: "Empresa creada correctamente",
            empresa
        });

    } catch (error) {

        console.error(error);

        //limpiar imagen si falla
        if (req.file) {
            fs.unlink("uploads/logos/" + req.file.filename, () => { });
        }

        return res.status(500).json({
            message: "Error al crear empresa"
        });

    }

};


export const getEmpresas = async (req: Request, res: Response) => {

    try {

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const empresas = await Empresa.findAll({
            attributes: [
                "id_empresa",
                "nombre_comercial",
                "telefono",
                "ciudad",
                "logo"
            ],
            include: [
                {
                    model: Membresia,
                    attributes: ["id_membresia", "nombre_membresia"]
                },
                {
                    model: TipoOrganizacion,
                    attributes: ["id_tipo", "nombre_tipo"]
                }
            ],
            order: [["nombre_comercial", "ASC"]]
        });

        const result = empresas.map((e: any) => {
            const emp = e.toJSON();

            return {
                ...emp,
                logo: emp.logo
                    ? `${baseUrl}/uploads/logos/${emp.logo}`
                    : null
            };
        });

        return res.json(result);

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener empresas"
        });

    }

};


export const getEmpresaById = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID inválido"
            });
        }

        const empresa = await Empresa.findByPk(id, {
            include: [
                {
                    model: Membresia,
                    attributes: ["nombre_membresia"]
                },
                {
                    model: TipoOrganizacion,
                    attributes: ["nombre_tipo"]
                },
                {
                    model: Rubro,
                    attributes: ["nombre_rubro"],
                    through: { attributes: [] }
                },
                {
                    model: Certificacion,
                    attributes: ["nombre_certificacion"],
                    through: { attributes: [] }
                },
                {
                    model: Contacto,
                    attributes: [
                        "id_contacto",
                        "nombre_completo",
                        "puesto",
                        "telefono_celular",
                        "correo"
                    ],
                    include: [
                        {
                            model: FuncionContacto,
                            attributes: ["nombre_funcion"]
                        }
                    ]
                }
            ]
        });

        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const emp = empresa.toJSON();

        return res.json({
            ...emp,
            logo: emp.logo
                ? `${baseUrl}/uploads/logos/${emp.logo}`
                : null
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener empresa"
        });

    }

};



export const updateEmpresa = async (req: Request, res: Response) => {

    const fs = require("fs");

    try {

        const idEmpresa = Number(req.params.id);
        const user = (req as any).user;

        if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
            return res.status(400).json({
                message: "ID inválido"
            });
        }

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

            // borrar archivo si no autorizado
            if (req.file) {
                fs.unlink("uploads/logos/" + req.file.filename, () => { });
            }

            return res.status(403).json({
                message: "No autorizado"
            });
        }

        const updates: any = {};

        // nombre
        if (req.body.nombre_comercial !== undefined) {
            if (!req.body.nombre_comercial.trim()) {
                return res.status(400).json({
                    message: "El nombre comercial no puede estar vacío"
                });
            }

            const existente = await Empresa.findOne({
                where: { nombre_comercial: req.body.nombre_comercial }
            });

            if (existente && existente.id_empresa !== idEmpresa) {
                return res.status(409).json({
                    message: "Ya existe una empresa con ese nombre comercial"
                });
            }

            updates.nombre_comercial = req.body.nombre_comercial.trim();
        }

        // email
        if (req.body.correo_electronico !== undefined) {
            if (req.body.correo_electronico) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(req.body.correo_electronico)) {
                    return res.status(400).json({
                        message: "Correo inválido"
                    });
                }
            }
            updates.correo_electronico = req.body.correo_electronico;
        }

        // teléfono
        if (req.body.telefono !== undefined) {
            if (req.body.telefono) {
                const phoneRegex = /^[0-9]{10,15}$/;
                if (!phoneRegex.test(req.body.telefono)) {
                    return res.status(400).json({
                        message: "Teléfono inválido"
                    });
                }
            }
            updates.telefono = req.body.telefono;
        }

        // otros campos
        const fields = ["razon_social", "sitio_web", "ciudad", "domicilio_completo", "giro"];

        for (const key of fields) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        // imagen nueva
        let oldLogo = empresa.logo;

        if (req.file) {
            updates.logo = req.file.filename;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No hay datos para actualizar"
            });
        }

        await empresa.update(updates);

        //borrar logo viejo
        if (req.file && oldLogo && oldLogo !== "default_logo.png") {
            fs.unlink("uploads/logos/" + oldLogo, () => { });
        }

        return res.json({
            message: "Empresa actualizada",
            empresa
        });

    } catch (error) {

        console.error(error);

        //limpiar archivo si falla
        if (req.file) {
            fs.unlink("uploads/logos/" + req.file.filename, () => { });
        }

        return res.status(500).json({
            message: "Error al actualizar empresa"
        });

    }

};


export const deleteEmpresa = async (req: Request, res: Response) => {

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

        await empresa.destroy();

        return res.json({
            message: "Empresa eliminada correctamente"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al eliminar empresa"
        });

    }

};