import { api } from "./http";
import { AxiosError } from "axios";
import type { Proceso, NewProcesoInput } from "types";

interface ProcesoWrapped {
    message : string;
    proceso : Proceso;
}

export const getAllProcesos = async (): Promise<Proceso[]> => {
    try {
        const res = await api.get<Proceso[]>("/procesos");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching procesos:", err.message);
        throw err;
    }
};

export const getProcesoById = async (id: number): Promise<Proceso> => {
    try {
        const res = await api.get<Proceso>(`/procesos/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching proceso:", err.message);
        throw err;
    }
};

export const createProceso = async (data: NewProcesoInput): Promise<Proceso> => {
    try {
        const res = await api.post<ProcesoWrapped>("/procesos", data);
        return res.data.proceso;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating proceso:", err.message);
        throw err;
    }
};

export const updateProceso = async (
    id: number,
    data: NewProcesoInput
): Promise<Proceso> => {
    try {
        const res = await api.patch<ProcesoWrapped>(`/procesos/${id}`, data);
        return res.data.proceso;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating proceso:", err.message);
        throw err;
    }
};

export const deleteProceso = async (id: number): Promise<void> => {
    try {
        await api.delete(`/procesos/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting proceso:", err.message);
        throw err;
    }
};
