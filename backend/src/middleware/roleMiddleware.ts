import { Request, Response, NextFunction } from "express";

export const checkRole = (...roles: number[]) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const user = (req as any).user;

        if (!roles.includes(user.rol_id)) {

            return res.status(403).json({
                message: "No tienes permisos para esta acción"
            });

        }

        next();

    };

};