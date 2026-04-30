import { Request, Response } from "express";
import { Empresa } from "../models/Empresa";
import { Membresia } from "../models/Membresia";
import { TipoOrganizacion } from "../models/TipoOrganizacion";
import { Rubro } from "../models/Rubro";
import { Certificacion } from "../models/Certificacion";
import { Contacto } from "../models/Contacto";
import { FuncionContacto } from "../models/FuncionContacto";
import { Proceso } from "../models/Proceso";
import { Industria } from "../models/Industria";
import { Necesidad } from "../models/Necesidad";
import { ProductoFabricado } from "../models/ProductoFabricado";
import { Op } from "sequelize";

const fs = require("fs");

const deleteFile = (file?: Express.Multer.File) => {
    if (file) {
        fs.unlink("uploads/logos/" + file.filename, () => { });
    }
};

const getLogoUrl = (req: Request, logo?: string | null) => {
    if (!logo) {
        return null;
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    return `${baseUrl}/uploads/logos/${logo}`;
};

const normalizePublicEmpresa = (req: Request, empresa: any) => {
    const emp = empresa.toJSON ? empresa.toJSON() : empresa;
    const membresia = emp.Membresia ?? emp.membresia ?? null;
    const tipoOrganizacion = emp.TipoOrganizacion ?? emp.tipoOrganizacion ?? null;
    const rubros = emp.Rubros ?? emp.rubros ?? [];

    return {
        id_empresa: emp.id_empresa,
        nombre_comercial: emp.nombre_comercial,
        ciudad: emp.ciudad,
        descripcion: emp.descripcion,
        logo: getLogoUrl(req, emp.logo),
        Membresia: membresia
            ? {
                nombre_membresia: membresia.nombre_membresia
            }
            : null,
        TipoOrganizacion: tipoOrganizacion
            ? {
                nombre_tipo: tipoOrganizacion.nombre_tipo
            }
            : null,
        Rubros: rubros.map((rubro: any) => ({
            nombre_rubro: rubro.nombre_rubro
        }))
    };
};

export const getEmpresasPublicas = async (req: Request, res: Response) => {
    try {
        const empresas = await Empresa.findAll({
            attributes: [
                "id_empresa",
                "nombre_comercial",
                "ciudad",
                "descripcion",
                "logo"
            ],
            where: {
                activo: true
            },
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
                }
            ],
            order: [["nombre_comercial", "ASC"]]
        });

        return res.json({
            total: empresas.length,
            data: empresas.map((empresa) => normalizePublicEmpresa(req, empresa))
        });

    } catch (error) {
        console.error("Error al obtener empresas públicas:", error);

        return res.status(500).json({
            message: "Error al obtener empresas públicas"
        });
    }
};

export const getEmpresaPublicaById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID inválido"
            });
        }

        const empresa = await Empresa.findOne({
            attributes: [
                "id_empresa",
                "nombre_comercial",
                "ciudad",
                "descripcion",
                "logo"
            ],
            where: {
                id_empresa: id,
                activo: true
            },
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
                }
            ]
        });

        if (!empresa) {
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        return res.json(normalizePublicEmpresa(req, empresa));

    } catch (error) {
        console.error("Error al obtener empresa pública:", error);

        return res.status(500).json({
            message: "Error al obtener empresa pública"
        });
    }
};

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
            giro,
            fabrica_para_automotriz,
            descripcion,
            anio_fundacion,
            rango_empleados
        } = req.body;

        const nombreComercialLimpio = nombre_comercial ? String(nombre_comercial).trim() : "";
        const razonSocialLimpia = razon_social ? String(razon_social).trim() : undefined;
        const rfcLimpio = rfc ? String(rfc).trim().toUpperCase() : "";
        const correoLimpio = correo_electronico ? String(correo_electronico).trim().toLowerCase() : "";
        const telefonoLimpio = telefono ? String(telefono).trim() : undefined;
        const sitioWebLimpio = sitio_web ? String(sitio_web).trim() : undefined;
        const ciudadLimpia = ciudad ? String(ciudad).trim() : undefined;
        const domicilioLimpio = domicilio_completo ? String(domicilio_completo).trim() : undefined;
        const giroLimpio = giro ? String(giro).trim() : undefined;
        const descripcionLimpia = descripcion ? String(descripcion).trim() : undefined;
        const rangoEmpleadosLimpio = rango_empleados ? String(rango_empleados).trim() : undefined;
        const membresiaId = Number(membresia_id);
        const tipoOrganizacionId = Number(tipo_organizacion_id);
        const anioFundacion = anio_fundacion !== undefined && anio_fundacion !== null && anio_fundacion !== "" ? Number(anio_fundacion) : undefined;

        if (!nombreComercialLimpio) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "El nombre comercial es obligatorio"
            });
        }

        if (!rfcLimpio) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "El RFC es obligatorio"
            });
        }

        if (!correoLimpio) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "El correo electronico es obligatorio"
            });
        }

        if (isNaN(membresiaId)) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "La membresia es obligatoria"
            });
        }

        if (isNaN(tipoOrganizacionId)) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "El tipo de organizacion es obligatorio"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correoLimpio)) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "Formato de correo electronico no valido"
            });
        }

        if (telefonoLimpio) {
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(telefonoLimpio)) {
                deleteFile(req.file);
                return res.status(400).json({
                    message: "Telefono invalido (10-15 digitos)"
                });
            }
        }

        const rfcRegex = /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
        if (!rfcRegex.test(rfcLimpio)) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "Formato de RFC no valido"
            });
        }

        if (sitioWebLimpio) {
            const urlRegex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_-]+))*$/;
            if (!urlRegex.test(sitioWebLimpio)) {
                deleteFile(req.file);
                return res.status(400).json({
                    message: "URL de sitio web no valida"
                });
            }
        }

        if (anioFundacion !== undefined && isNaN(anioFundacion)) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "El anio de fundacion no es valido"
            });
        }

        const membresia = await Membresia.findByPk(membresiaId);
        if (!membresia) {
            deleteFile(req.file);
            return res.status(404).json({
                message: "Membresia no encontrada"
            });
        }

        const tipoOrganizacion = await TipoOrganizacion.findByPk(tipoOrganizacionId);
        if (!tipoOrganizacion) {
            deleteFile(req.file);
            return res.status(404).json({
                message: "Tipo de organizacion no encontrado"
            });
        }

        const empresaExistente = await Empresa.findOne({
            where: {
                nombre_comercial: { [Op.iLike]: nombreComercialLimpio }
            }
        });

        if (empresaExistente) {
            deleteFile(req.file);
            return res.status(409).json({
                message: "Ya existe una empresa con ese nombre comercial"
            });
        }

        const rfcExistente = await Empresa.findOne({
            where: { rfc: rfcLimpio }
        });

        if (rfcExistente) {
            deleteFile(req.file);
            return res.status(409).json({
                message: "Ya existe una empresa con ese RFC"
            });
        }

        const correoExistente = await Empresa.findOne({
            where: {
                correo_electronico: { [Op.iLike]: correoLimpio }
            }
        });

        if (correoExistente) {
            deleteFile(req.file);
            return res.status(409).json({
                message: "Ya existe una empresa con ese correo electronico"
            });
        }

        const logo = req.file ? req.file.filename : undefined;

        const empresa = await Empresa.create({
            nombre_comercial: nombreComercialLimpio,
            razon_social: razonSocialLimpia,
            rfc: rfcLimpio,
            correo_electronico: correoLimpio,
            telefono: telefonoLimpio,
            sitio_web: sitioWebLimpio,
            membresia_id: membresiaId,
            tipo_organizacion_id: tipoOrganizacionId,
            ciudad: ciudadLimpia,
            domicilio_completo: domicilioLimpio,
            giro: giroLimpio,
            fabrica_para_automotriz: fabrica_para_automotriz === true || fabrica_para_automotriz === "true",
            descripcion: descripcionLimpia,
            anio_fundacion: anioFundacion,
            rango_empleados: rangoEmpleadosLimpio,
            ...(logo && { logo })
        });

        return res.status(201).json({
            message: "Empresa creada correctamente",
            empresa
        });

    } catch (error) {
        console.error("Error al crear empresa:", error);
        deleteFile(req.file);

        return res.status(500).json({
            message: "Error al crear empresa"
        });
    }
};



export const getEmpresas = async (req: Request, res: Response) => {
    try {

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        // página (default 1)
        const page = Number(req.query.page) || 1;

        // límite fijo en 12
        const limit = 12;
        const offset = (page - 1) * limit;

        const { count, rows } = await Empresa.findAndCountAll({
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
            order: [["nombre_comercial", "ASC"]],
            limit,
            offset
        });

        const result = rows.map((e: any) => {
            const emp = e.toJSON();

            return {
                ...emp,
                logo: emp.logo
                    ? `${baseUrl}/uploads/logos/${emp.logo}`
                    : null
            };
        });

        return res.json({
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            limit,
            data: result
        });

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
                    attributes: ["id_membresia", "nombre_membresia"]
                },
                {
                    model: TipoOrganizacion,
                    attributes: ["id_tipo", "nombre_tipo"]
                },
                {
                    model: Rubro,
                    attributes: ["id_rubro", "nombre_rubro"],
                    through: { attributes: [] }
                },
                {
                    model: Certificacion,
                    attributes: ["id_certificacion", "nombre_certificacion"],
                    through: { attributes: [] }
                },
                {
                    model: Proceso,
                    attributes: ["id_proceso", "nombre_proceso"],
                    through: { attributes: [] }
                },
                {
                    model: Industria,
                    attributes: ["id_industria", "nombre_industria"],
                    through: { attributes: [] }
                },
                {
                    model: Necesidad,
                    attributes: ["id_necesidad", "nombre_necesidad"],
                    through: { attributes: [] }
                },
                {
                    model: ProductoFabricado,
                    attributes: [
                        "id_producto",
                        "nombre_producto",
                        "clientes",
                        "porcentaje_produccion"
                    ]
                },
                {
                    model: Contacto,
                    attributes: [
                        "id_contacto",
                        "nombre_completo",
                        "puesto",
                        "telefono_celular",
                        "correo",
                        "funcion_id"
                    ],
                    include: [
                        {
                            model: FuncionContacto,
                            attributes: ["id_funcion", "nombre_funcion"]
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

    try {

        const idEmpresa = Number(req.params.id);
        const user = (req as any).user;

        if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "ID inválido"
            });
        }

        const empresa = await Empresa.findByPk(idEmpresa);

        if (!empresa) {
            deleteFile(req.file);
            return res.status(404).json({
                message: "Empresa no encontrada"
            });
        }

        if (
            user.rol_id !== 1 &&
            !(user.rol_id === 2 && user.empresa_id === idEmpresa)
        ) {
            deleteFile(req.file);
            return res.status(403).json({
                message: "No autorizado"
            });
        }

        const updates: any = {};

        if (req.body.nombre_comercial !== undefined) {
            const nombreComercialLimpio = String(req.body.nombre_comercial).trim();

            if (!nombreComercialLimpio) {
                deleteFile(req.file);
                return res.status(400).json({
                    message: "El nombre comercial no puede estar vacío"
                });
            }

            const existente = await Empresa.findOne({
                where: {
                    nombre_comercial: { [Op.iLike]: nombreComercialLimpio },
                    id_empresa: { [Op.ne]: idEmpresa }
                }
            });

            if (existente) {
                deleteFile(req.file);
                return res.status(409).json({
                    message: "Ya existe una empresa con ese nombre comercial"
                });
            }

            updates.nombre_comercial = nombreComercialLimpio;
        }

        if (req.body.correo_electronico !== undefined) {
            const correoLimpio = String(req.body.correo_electronico).trim();

            if (!correoLimpio) {
                deleteFile(req.file);
                return res.status(400).json({
                    message: "El correo electrónico no puede estar vacío"
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correoLimpio)) {
                deleteFile(req.file);
                return res.status(400).json({
                    message: "Correo inválido"
                });
            }

            const correoExistente = await Empresa.findOne({
                where: {
                    correo_electronico: { [Op.iLike]: correoLimpio },
                    id_empresa: { [Op.ne]: idEmpresa }
                }
            });

            if (correoExistente) {
                deleteFile(req.file);
                return res.status(409).json({
                    message: "Ya existe una empresa con ese correo electrónico"
                });
            }

            updates.correo_electronico = correoLimpio;
        }

        if (req.body.telefono !== undefined) {
            const telefonoLimpio = String(req.body.telefono).trim();

            if (telefonoLimpio) {
                const phoneRegex = /^[0-9]{10,15}$/;
                if (!phoneRegex.test(telefonoLimpio)) {
                    deleteFile(req.file);
                    return res.status(400).json({
                        message: "Teléfono inválido"
                    });
                }
                updates.telefono = telefonoLimpio;
            } else {
                updates.telefono = null;
            }
        }

        if (req.body.sitio_web !== undefined) {
            const sitioWebLimpio = String(req.body.sitio_web).trim();

            if (sitioWebLimpio) {
                const urlRegex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_-]+))*$/;
                if (!urlRegex.test(sitioWebLimpio)) {
                    deleteFile(req.file);
                    return res.status(400).json({
                        message: "URL de sitio web no válida"
                    });
                }
                updates.sitio_web = sitioWebLimpio;
            } else {
                updates.sitio_web = null;
            }
        }

        const fields = [
            "razon_social",
            "rfc",
            "ciudad",
            "domicilio_completo",
            "giro",
            "descripcion",
            "rango_empleados"
        ];

        for (const key of fields) {
            if (req.body[key] !== undefined) {
                updates[key] = String(req.body[key]).trim();
            }
        }

        if (req.body.anio_fundacion !== undefined) {
            const anioFundacion = Number(req.body.anio_fundacion);

            if (!Number.isInteger(anioFundacion) || anioFundacion < 1800) {
                deleteFile(req.file);
                return res.status(400).json({
                    message: "Año de fundación inválido"
                });
            }

            updates.anio_fundacion = anioFundacion;
        }

        if (req.body.fabrica_para_automotriz !== undefined) {
            updates.fabrica_para_automotriz =
                req.body.fabrica_para_automotriz === true ||
                req.body.fabrica_para_automotriz === "true";
        }

        const oldLogo = empresa.logo;

        if (req.file) {
            updates.logo = req.file.filename;
        }

        if (Object.keys(updates).length === 0) {
            deleteFile(req.file);
            return res.status(400).json({
                message: "No hay datos para actualizar"
            });
        }

        await empresa.update(updates);

        if (req.file && oldLogo && oldLogo !== "default_logo.png") {
            fs.unlink("uploads/logos/" + oldLogo, () => { });
        }

        return res.json({
            message: "Empresa actualizada",
            empresa
        });

    } catch (error) {

        console.error("Error al actualizar empresa:", error);

        deleteFile(req.file);

        return res.status(500).json({
            message: "Error al actualizar empresa"
        });

    }
};


export const deleteEmpresa = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);
        const user = (req as any).user;

        if (!Number.isInteger(id) || id <= 0) {
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

        if (user.rol_id !== 1) {
            return res.status(403).json({
                message: "No autorizado para eliminar empresas"
            });
        }

        const logo = empresa.logo;

        await empresa.destroy();

        if (logo && logo !== "default_logo.png") {
            fs.unlink("uploads/logos/" + logo, (err: any) => {
                if (err) {
                    console.error("Error al borrar archivo:", err);
                }
            });
        }

        return res.json({
            message: "Empresa eliminada correctamente"
        });

    } catch (error) {

        console.error("Error al eliminar empresa:", error);

        return res.status(500).json({
            message: "Error al eliminar empresa"
        });

    }

};
