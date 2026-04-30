import api from ".";
import { AxiosError } from "axios";
import type { Industria, NewIndustriaInput } from "types";

interface IndustriaWrapped {
    message   : string;
    industria : Industria;
}

export const getAllIndustrias = async (): Promise<Industria[]> => {
    try {
        const res = await api.get<Industria[]>("/industrias");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching industrias:", err.message);
        throw err;
    }
};

export const getIndustriaById = async (id: number): Promise<Industria> => {
    try {
        const res = await api.get<Industria>(`/industrias/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching industria:", err.message);
        throw err;
    }
};

export const createIndustria = async (data: NewIndustriaInput): Promise<Industria> => {
    try {
        const res = await api.post<IndustriaWrapped>("/industrias", data);
        return res.data.industria;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating industria:", err.message);
        throw err;
    }
};

export const updateIndustria = async (
    id: number,
    data: NewIndustriaInput
): Promise<Industria> => {
    try {
        const res = await api.patch<IndustriaWrapped>(`/industrias/${id}`, data);
        return res.data.industria;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating industria:", err.message);
        throw err;
    }
};

export const deleteIndustria = async (id: number): Promise<void> => {
    try {
        await api.delete(`/industrias/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting industria:", err.message);
        throw err;
    }
};
