import { api } from "./http";
import { AxiosError } from "axios";
import type { Empresa, NewEmpresaInput } from "types";

interface PaginatedEmpresas {
    total      : number;
    page       : number;
    totalPages : number;
    limit      : number;
    data       : Empresa[];
}

interface EmpresaWrapped {
    message : string;
    empresa : Empresa;
}

export const getAllEmpresas = async (page: number = 1): Promise<PaginatedEmpresas> => {
    try {
        const res = await api.get<PaginatedEmpresas>(`/empresas?page=${page}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching empresas:", err.message);
        throw err;
    }
};

export const getEmpresaById = async (id: number): Promise<Empresa> => {
    try {
        const res = await api.get<Empresa>(`/empresas/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching empresa:", err.message);
        throw err;
    }
};

export const createEmpresa = async (data: NewEmpresaInput): Promise<Empresa> => {
    try {
        const res = await api.post<EmpresaWrapped>("/empresas", data);
        return res.data.empresa;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating empresa:", err.message);
        throw err;
    }
};

export const updateEmpresa = async (
    id: number,
    data: Partial<NewEmpresaInput>
): Promise<Empresa> => {
    try {
        const res = await api.patch<EmpresaWrapped>(`/empresas/${id}`, data);
        return res.data.empresa;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating empresa:", err.message);
        throw err;
    }
};

export const deleteEmpresa = async (id: number): Promise<void> => {
    try {
        await api.delete(`/empresas/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting empresa:", err.message);
        throw err;
    }
};
