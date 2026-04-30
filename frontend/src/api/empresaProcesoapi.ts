<<<<<<< HEAD
import api from ".";
=======
import { api } from "./http";
>>>>>>> origin
import { AxiosError } from "axios";
import type { Empresa, Proceso, EmpresaProceso } from "types";

interface RelacionResponse {
    message : string;
    data    : EmpresaProceso;
}

interface EmpresaConProcesos {
    message : string;
    data    : Empresa;
}

interface ProcesoConEmpresas {
    message : string;
    data    : Proceso;
}

export const addProcesoToEmpresa = async (
    data: EmpresaProceso
): Promise<EmpresaProceso> => {
    try {
        const res = await api.post<RelacionResponse>("/empresa-procesos", data);
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error adding proceso to empresa:", err.message);
        throw err;
    }
};

export const removeProcesoFromEmpresa = async (
    empresa_id: number,
    proceso_id: number
): Promise<void> => {
    try {
        await api.delete(`/empresa-procesos/${empresa_id}/${proceso_id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error removing proceso from empresa:", err.message);
        throw err;
    }
};

export const getProcesosByEmpresa = async (empresa_id: number): Promise<Empresa> => {
    try {
        const res = await api.get<EmpresaConProcesos>(
            `/empresa-procesos/empresa/${empresa_id}`
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching procesos de empresa:", err.message);
        throw err;
    }
};

export const getEmpresasByProceso = async (proceso_id: number): Promise<Proceso> => {
    try {
        const res = await api.get<ProcesoConEmpresas>(
            `/empresa-procesos/proceso/${proceso_id}`
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching empresas de proceso:", err.message);
        throw err;
    }
};
