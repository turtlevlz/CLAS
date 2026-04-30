import { api } from "./http";
import { AxiosError } from "axios";
import type { User, NewUserInput, UpdateUserInput } from "types";

interface CreateUserResponse {
    message            : string;
    id_usuario         : string;
    nombre_usuario     : string;
    correo_electronico : string;
    rol_id             : number;
    empresa_id         : number | null;
}

interface MessageResponse {
    message : string;
}

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const res = await api.get<User[]>("/usuarios");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching users:", err.message);
        throw err;
    }
};

export const getUserById = async (id: string): Promise<User> => {
    try {
        const res = await api.get<User>(`/usuarios/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching user:", err.message);
        throw err;
    }
};

export const getUsersByEmpresa = async (empresaId: number): Promise<User[]> => {
    try {
        const res = await api.get<User[]>(`/usuarios/empresa/${empresaId}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching users by empresa:", err.message);
        throw err;
    }
};

export const createUser = async (data: NewUserInput): Promise<CreateUserResponse> => {
    try {
        const res = await api.post<CreateUserResponse>("/usuarios", data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating user:", err.message);
        throw err;
    }
};

export const updateUser = async (
    id: string,
    data: UpdateUserInput
): Promise<MessageResponse> => {
    try {
        const res = await api.patch<MessageResponse>(`/usuarios/${id}`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating user:", err.message);
        throw err;
    }
};

export const deleteUser = async (id: string): Promise<MessageResponse> => {
    try {
        const res = await api.delete<MessageResponse>(`/usuarios/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting user:", err.message);
        throw err;
    }
};
