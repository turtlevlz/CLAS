import api from ".";
import { AxiosError } from "axios";
import type { FuncionContacto, NewFuncionContactoInput } from "types";

interface FuncionWrapped {
    message         : string;
    funcionContacto : FuncionContacto;
}

export const getAllFuncionesContacto = async (): Promise<FuncionContacto[]> => {
    try {
        const res = await api.get<FuncionContacto[]>("/funciones");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching funciones:", err.message);
        throw err;
    }
};

export const getFuncionContactoById = async (id: number): Promise<FuncionContacto> => {
    try {
        const res = await api.get<FuncionContacto>(`/funciones/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching funcion:", err.message);
        throw err;
    }
};

export const createFuncionContacto = async (
    data: NewFuncionContactoInput
): Promise<FuncionContacto> => {
    try {
        const res = await api.post<FuncionWrapped>("/funciones", data);
        return res.data.funcionContacto;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating funcion:", err.message);
        throw err;
    }
};

export const updateFuncionContacto = async (
    id: number,
    data: NewFuncionContactoInput
): Promise<FuncionContacto> => {
    try {
        const res = await api.patch<FuncionWrapped>(`/funciones/${id}`, data);
        return res.data.funcionContacto;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating funcion:", err.message);
        throw err;
    }
};

export const deleteFuncionContacto = async (id: number): Promise<void> => {
    try {
        await api.delete(`/funciones/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting funcion:", err.message);
        throw err;
    }
};
