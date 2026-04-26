import { Request, Response } from "express";
import { Empresa } from "../models/Empresa";
import { Membresia } from "../models/Membresia";
import { TipoOrganizacion } from "../models/TipoOrganizacion";
import { Rubro } from "../models/Rubro";
import { Certificacion } from "../models/Certificacion";
import { Contacto } from "../models/Contacto";
import { FuncionContacto } from "../models/FuncionContacto";
import { Op } from "sequelize";

const fs = require("fs");

const deleteFile = (file?: Express.Multer.File) => {
    if (file) {
        fs.unlink("uploads/logos/" + file.filename, () => { });
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
            }

            updates.telefono = telefonoLimpio;
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
            }

            updates.sitio_web = sitioWebLimpio;
        }

        const fields = ["razon_social", "ciudad", "domicilio_completo", "giro"];

        for (const key of fields) {
            if (req.body[key] !== undefined) {
                updates[key] = String(req.body[key]).trim();
            }
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
