import api from ".";
import { AxiosError } from "axios";
import type { Necesidad, NewNecesidadInput } from "types";

interface NecesidadWrapped {
    message   : string;
    necesidad : Necesidad;
}

export const getAllNecesidades = async (): Promise<Necesidad[]> => {
    try {
        const res = await api.get<Necesidad[]>("/necesidades");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching necesidades:", err.message);
        throw err;
    }
};

export const getNecesidadById = async (id: number): Promise<Necesidad> => {
    try {
        const res = await api.get<Necesidad>(`/necesidades/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching necesidad:", err.message);
        throw err;
    }
};

export const createNecesidad = async (data: NewNecesidadInput): Promise<Necesidad> => {
    try {
        const res = await api.post<NecesidadWrapped>("/necesidades", data);
        return res.data.necesidad;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating necesidad:", err.message);
        throw err;
    }
};

export const updateNecesidad = async (
    id: number,
    data: NewNecesidadInput
): Promise<Necesidad> => {
    try {
        const res = await api.patch<NecesidadWrapped>(`/necesidades/${id}`, data);
        return res.data.necesidad;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating necesidad:", err.message);
        throw err;
    }
};

export const deleteNecesidad = async (id: number): Promise<void> => {
    try {
        await api.delete(`/necesidades/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting necesidad:", err.message);
        throw err;
    }
};
