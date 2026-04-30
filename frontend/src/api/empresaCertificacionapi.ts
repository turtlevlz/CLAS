import api from ".";
import { AxiosError } from "axios";
import type { Empresa, Certificacion, EmpresaCertificacion } from "types";

interface RelacionResponse {
    message : string;
    data    : EmpresaCertificacion;
}

interface EmpresaConCertificaciones {
    message : string;
    data    : Empresa;
}

interface CertificacionConEmpresas {
    message : string;
    data    : Certificacion;
}

export const addCertificacionToEmpresa = async (
    data: EmpresaCertificacion
): Promise<EmpresaCertificacion> => {
    try {
        const res = await api.post<RelacionResponse>("/empresa-certificaciones", data);
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error adding certificacion to empresa:", err.message);
        throw err;
    }
};

export const removeCertificacionFromEmpresa = async (
    empresa_id: number,
    certificacion_id: number
): Promise<void> => {
    try {
        await api.delete(`/empresa-certificaciones/${empresa_id}/${certificacion_id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error removing certificacion from empresa:", err.message);
        throw err;
    }
};

export const getCertificacionesByEmpresa = async (empresa_id: number): Promise<Empresa> => {
    try {
        const res = await api.get<EmpresaConCertificaciones>(
            `/empresa-certificaciones/empresa/${empresa_id}`
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching certificaciones de empresa:", err.message);
        throw err;
    }
};

export const getEmpresasByCertificacion = async (
    certificacion_id: number
): Promise<Certificacion> => {
    try {
        const res = await api.get<CertificacionConEmpresas>(
            `/empresa-certificaciones/certificacion/${certificacion_id}`
        );
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching empresas de certificacion:", err.message);
        throw err;
    }
};
