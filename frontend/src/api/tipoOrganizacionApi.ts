import api from ".";
import { AxiosError } from "axios";
import type { TipoOrganizacion, NewTipoOrganizacionInput } from "types";

interface TipoOrganizacionWrapped {
    message          : string;
    tipoOrganizacion : TipoOrganizacion;
}

export const getAllTipoOrganizaciones = async (): Promise<TipoOrganizacion[]> => {
    try {
        const res = await api.get<TipoOrganizacion[]>("/tipos-organizacion");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching tipos de organizacion:", err.message);
        throw err;
    }
};

export const getTipoOrganizacionById = async (id: number): Promise<TipoOrganizacion> => {
    try {
        const res = await api.get<TipoOrganizacion>(`/tipos-organizacion/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching tipo de organizacion:", err.message);
        throw err;
    }
};

export const createTipoOrganizacion = async (
    data: NewTipoOrganizacionInput
): Promise<TipoOrganizacion> => {
    try {
        const res = await api.post<TipoOrganizacionWrapped>("/tipos-organizacion", data);
        return res.data.tipoOrganizacion;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating tipo de organizacion:", err.message);
        throw err;
    }
};

export const updateTipoOrganizacion = async (
    id: number,
    data: NewTipoOrganizacionInput
): Promise<TipoOrganizacion> => {
    try {
        const res = await api.patch<TipoOrganizacionWrapped>(`/tipos-organizacion/${id}`, data);
        return res.data.tipoOrganizacion;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating tipo de organizacion:", err.message);
        throw err;
    }
};

export const deleteTipoOrganizacion = async (id: number): Promise<void> => {
    try {
        await api.delete(`/tipos-organizacion/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting tipo de organizacion:", err.message);
        throw err;
    }
};
