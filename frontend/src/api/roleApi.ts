import api from ".";
import { AxiosError } from "axios";
import type { Role, NewRoleInput } from "types";

interface RoleWrapped {
    message : string;
    role    : Role;
}

export const getAllRoles = async (): Promise<Role[]> => {
    try {
        const res = await api.get<Role[]>("/roles");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching roles:", err.message);
        throw err;
    }
};

export const getRoleById = async (id: number): Promise<Role> => {
    try {
        const res = await api.get<Role>(`/roles/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching role:", err.message);
        throw err;
    }
};

export const createRole = async (data: NewRoleInput): Promise<Role> => {
    try {
        const res = await api.post<RoleWrapped>("/roles", data);
        return res.data.role;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating role:", err.message);
        throw err;
    }
};

export const updateRole = async (
    id: number,
    data: NewRoleInput
): Promise<Role> => {
    try {
        const res = await api.patch<RoleWrapped>(`/roles/${id}`, data);
        return res.data.role;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating role:", err.message);
        throw err;
    }
};

export const deleteRole = async (id: number): Promise<void> => {
    try {
        await api.delete(`/roles/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting role:", err.message);
        throw err;
    }
};
