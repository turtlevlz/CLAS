import { api } from "./http";
import { AxiosError } from "axios";
import type { Rubro, NewRubroInput } from "types";

interface RubroWrapped {
    message : string;
    rubro   : Rubro;
}

export const getAllRubros = async (): Promise<Rubro[]> => {
    try {
        const res = await api.get<Rubro[]>("/rubros");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching rubros:", err.message);
        throw err;
    }
};

export const getRubroById = async (id: number): Promise<Rubro> => {
    try {
        const res = await api.get<Rubro>(`/rubros/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching rubro:", err.message);
        throw err;
    }
};

export const createRubro = async (data: NewRubroInput): Promise<Rubro> => {
    try {
        const res = await api.post<RubroWrapped>("/rubros", data);
        return res.data.rubro;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating rubro:", err.message);
        throw err;
    }
};

export const updateRubro = async (
    id: number,
    data: NewRubroInput
): Promise<Rubro> => {
    try {
        const res = await api.patch<RubroWrapped>(`/rubros/${id}`, data);
        return res.data.rubro;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating rubro:", err.message);
        throw err;
    }
};

export const deleteRubro = async (id: number): Promise<void> => {
    try {
        await api.delete(`/rubros/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting rubro:", err.message);
        throw err;
    }
};
