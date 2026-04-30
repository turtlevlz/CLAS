import api from ".";
import { AxiosError } from "axios";
import type { Membresia, NewMembresiaInput } from "types";

interface MembresiaWrapped {
    message   : string;
    membresia : Membresia;
}

export const getAllMembresias = async (): Promise<Membresia[]> => {
    try {
        const res = await api.get<Membresia[]>("/membresias");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching membresias:", err.message);
        throw err;
    }
};

export const getMembresiaById = async (id: number): Promise<Membresia> => {
    try {
        const res = await api.get<Membresia>(`/membresias/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching membresia:", err.message);
        throw err;
    }
};

export const createMembresia = async (data: NewMembresiaInput): Promise<Membresia> => {
    try {
        const res = await api.post<MembresiaWrapped>("/membresias", data);
        return res.data.membresia;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating membresia:", err.message);
        throw err;
    }
};

export const updateMembresia = async (
    id: number,
    data: NewMembresiaInput
): Promise<Membresia> => {
    try {
        const res = await api.patch<MembresiaWrapped>(`/membresias/${id}`, data);
        return res.data.membresia;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating membresia:", err.message);
        throw err;
    }
};

export const deleteMembresia = async (id: number): Promise<void> => {
    try {
        await api.delete(`/membresias/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting membresia:", err.message);
        throw err;
    }
};
