import { api } from "./http";
import { AxiosError } from "axios";
import type { Empresa, Industria, EmpresaIndustria } from "types";

interface RelacionResponse {
    message : string;
    data    : EmpresaIndustria;
}

interface EmpresaConIndustrias {
    message : string;
    data    : Empresa;
}

interface IndustriaConEmpresas {
    message : string;
    data    : Industria;
}

export const addIndustriaToEmpresa = async (
    data: EmpresaIndustria
): Promise<EmpresaIndustria> => {
    try {
        const res = await api.post<RelacionResponse>("/empresa-industrias", data);
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error adding industria to empresa:", err.message);
        throw err;
    }
};

export const removeIndustriaFromEmpresa = async (
    empresa_id: number,
    industria_id: number
): Promise<void> => {
    try {
        await api.delete(`/empresa-industrias/${empresa_id}/${industria_id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error removing industria from empresa:", err.message);
        throw err;
    }
};

export const getIndustriasByEmpresa = async (empresa_id: number): Promise<Empresa> => {
    try {
        const res = await api.get<EmpresaConIndustrias>(
            `/empresa-industrias/empresa/${empresa_id}`
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching industrias de empresa:", err.message);
        throw err;
    }
};

export const getEmpresasByIndustria = async (industria_id: number): Promise<Industria> => {
    try {
        const res = await api.get<IndustriaConEmpresas>(
            `/empresa-industrias/industria/${industria_id}`
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching empresas de industria:", err.message);
        throw err;
    }
};
