import api from ".";
import { AxiosError } from "axios";
import type { Certificacion, NewCertificacionInput } from "types";

interface CertificacionWrapped {
    message       : string;
    certificacion : Certificacion;
}

export const getAllCertificaciones = async (): Promise<Certificacion[]> => {
    try {
        const res = await api.get<Certificacion[]>("/certificaciones");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching certificaciones:", err.message);
        throw err;
    }
};

export const getCertificacionById = async (id: number): Promise<Certificacion> => {
    try {
        const res = await api.get<Certificacion>(`/certificaciones/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching certificacion:", err.message);
        throw err;
    }
};

export const createCertificacion = async (
    data: NewCertificacionInput
): Promise<Certificacion> => {
    try {
        const res = await api.post<CertificacionWrapped>("/certificaciones", data);
        return res.data.certificacion;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating certificacion:", err.message);
        throw err;
    }
};

export const updateCertificacion = async (
    id: number,
    data: NewCertificacionInput
): Promise<Certificacion> => {
    try {
        const res = await api.patch<CertificacionWrapped>(`/certificaciones/${id}`, data);
        return res.data.certificacion;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating certificacion:", err.message);
        throw err;
    }
};

export const deleteCertificacion = async (id: number): Promise<void> => {
    try {
        await api.delete(`/certificaciones/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting certificacion:", err.message);
        throw err;
    }
};
