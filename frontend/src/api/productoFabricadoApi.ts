import api from ".";
import { AxiosError } from "axios";
import type { ProductoFabricado, NewProductoFabricadoInput } from "types";

interface ProductoFabricadoWrapped {
    message            : string;
    productoFabricado  : ProductoFabricado;
}

export const getProductosByEmpresa = async (empresaId: number): Promise<ProductoFabricado[]> => {
    try {
        const res = await api.get<ProductoFabricado[]>(`/productos-fabricados/empresa/${empresaId}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching productos fabricados:", err.message);
        throw err;
    }
};

export const getProductoFabricadoById = async (id: number): Promise<ProductoFabricado> => {
    try {
        const res = await api.get<ProductoFabricado>(`/productos-fabricados/${id}`);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error fetching producto fabricado:", err.message);
        throw err;
    }
};

export const createProductoFabricado = async (
    data: NewProductoFabricadoInput
): Promise<ProductoFabricado> => {
    try {
        const res = await api.post<ProductoFabricadoWrapped>("/productos-fabricados", data);
        return res.data.productoFabricado;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error creating producto fabricado:", err.message);
        throw err;
    }
};

export const updateProductoFabricado = async (
    id: number,
    data: Partial<NewProductoFabricadoInput>
): Promise<ProductoFabricado> => {
    try {
        const res = await api.patch<ProductoFabricadoWrapped>(`/productos-fabricados/${id}`, data);
        return res.data.productoFabricado;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error updating producto fabricado:", err.message);
        throw err;
    }
};

export const deleteProductoFabricado = async (id: number): Promise<void> => {
    try {
        await api.delete(`/productos-fabricados/${id}`);
    } catch (error) {
        const err = error as AxiosError;
        console.error("Error deleting producto fabricado:", err.message);
        throw err;
    }
};
