import { api } from "./http";
import { AxiosError } from "axios";
import type { Empresa, Necesidad, EmpresaNecesidad } from "types";

interface RelacionResponse {
    message : string;
    data    : EmpresaNecesidad;
}

interface EmpresaConNecesidades {
    message : string;
    data    : Empresa;
}

interface NecesidadConEmpresas {
    message : string;
    data    : Necesidad;
}

export const addNecesidadToEmpresa = async (
    data: EmpresaNecesidad
): Promise<EmpresaNecesidad> => {
    try {
        const res = await api.post<RelacionResponse>("/empresa-necesidades", data);
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error adding necesidad to empresa:", err.message);
        throw err;
    }
};

export const removeNecesidadFromEmpresa = async (
    empresa_id: number,
    necesidad_id: number
): Promise<void> => {
    try {
        await api.delete(`/empresa-necesidades/${empresa_id}/${necesidad_id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error removing necesidad from empresa:", err.message);
        throw err;
    }
};

export const getNecesidadesByEmpresa = async (empresa_id: number): Promise<Empresa> => {
    try {
        const res = await api.get<EmpresaConNecesidades>(
            `/empresa-necesidades/empresa/${empresa_id}`
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching necesidades de empresa:", err.message);
        throw err;
    }
};

export const getEmpresasByNecesidad = async (necesidad_id: number): Promise<Necesidad> => {
    try {
        const res = await api.get<NecesidadConEmpresas>(
            `/empresa-necesidades/necesidad/${necesidad_id}`
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching empresas de necesidad:", err.message);
        throw err;
    }
};
