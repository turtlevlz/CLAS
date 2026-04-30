import { api } from "./http";
import { AxiosError } from "axios";
import type { Contacto, NewContactoInput } from "types";

interface ContactoWrapped {
    message  : string;
    contacto : Contacto;
}

export const getContactosByEmpresa = async (empresaId: number): Promise<Contacto[]> => {
    try {
        const res = await api.get<Contacto[]>(`/contactos/empresa/${empresaId}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching contactos:", err.message);
        throw err;
    }
};

export const getContactoById = async (id: number): Promise<Contacto> => {
    try {
        const res = await api.get<Contacto>(`/contactos/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching contacto:", err.message);
        throw err;
    }
};

export const createContacto = async (data: NewContactoInput): Promise<Contacto> => {
    try {
        const res = await api.post<ContactoWrapped>("/contactos", data);
        return res.data.contacto;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating contacto:", err.message);
        throw err;
    }
};

export const updateContacto = async (
    id: number,
    data: Partial<NewContactoInput>
): Promise<Contacto> => {
    try {
        const res = await api.patch<ContactoWrapped>(`/contactos/${id}`, data);
        return res.data.contacto;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating contacto:", err.message);
        throw err;
    }
};

export const deleteContacto = async (id: number): Promise<void> => {
    try {
        await api.delete(`/contactos/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting contacto:", err.message);
        throw err;
    }
};
