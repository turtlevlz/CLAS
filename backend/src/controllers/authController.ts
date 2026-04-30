import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Resend } from "resend"
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

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { correo_electronico } = req.body;
        const user = await User.findOne({
            where: {correo_electronico}
        });

        if (!user) {
            return res.status(200).json({
                message: "Revisa tu correo. Recibiras un correo con instrucciones sobre como recuperar tu contraseña" 
            });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 60 * 60 * 1000);

        await user.update({ reset_token: token, reset_token_expire: expiry });

        const resend = new Resend(process.env.RESEND_API_KEY);

        const resetUrl = `${process.env.FRONT_URL}/reset-contrasena?token=${token}`;

        await resend.emails.send({
            from: `"CLAS" <${process.env.RESEND_USER}>`,
            to: correo_electronico,
            subject: "Recuperacion de contraseña de CLAS",
            html: `
            <p>Estas recibiendo este correo porque solicitaste recuprar tu contraseña.</p>
            <p>Haz clic en el enlace y sigue las instrucciones (valido por una hora):</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>Si no solicitaste esto, puedes ignorar este correo.</p>
            `,
        });

        return res.status(200).json({
            message: "Revisa tu correo. Recibiras un correo con instrucciones sobre como recuperar tu contraseña" 
        })
    }

    catch (error) {
        return res.status(500).json({
            message: "Error al enviar correo.", error
        });
    };
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, nueva_contrasena } = req.body;

        const user = await User.findOne({
            where: { reset_token: token }
        });

        if (!user || !user.reset_token_expire || user.reset_token_expire < new Date()) {
            return res.status(400).json({
                message: "Token invalido o expirado"
            });
        }

        const hashedPassword = await bcrypt.hash(nueva_contrasena, 10);
        
        await user.update({
            contrasena: hashedPassword,
            reset_token: null,
            reset_token_expire: null,
        });

        return res.status(200).json({
            message: "Contraseña actualizada"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error actualizando contraseña", error
        });
    }
};
