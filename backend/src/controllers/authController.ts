import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const login = async (req: Request, res: Response) => {

    try {

        const { correo_electronico, contrasena } = req.body;

        const user = await User.findOne({
            where: { correo_electronico }
        });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const passwordValid = await bcrypt.compare(
            contrasena,
            user.contrasena
        );

        if (!passwordValid) {
            return res.status(401).json({
                message: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                rol_id: user.rol_id,
                empresa_id: user.empresa_id
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "8h" }
        );

        return res.json({
            message: "Login exitoso",
            token
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error en login",
            error
        });

    }

};

export const register = async (req: Request, res: Response) => {

    try {

        const {
            nombre_usuario,
            correo_electronico,
            contrasena,
            rol_id,
            empresa_id
        } = req.body;

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const user = await User.create({
            nombre_usuario,
            correo_electronico,
            contrasena: hashedPassword,
            rol_id,
            empresa_id
        });

        return res.status(201).json({
            message: "Usuario creado",
            user
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error creando usuario",
            error
        });

    }

};