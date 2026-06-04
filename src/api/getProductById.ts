import { api } from "./axiosClient";
import type { Products } from "../types/products";

export async function getProductById(id: number): Promise<Products> {
    const res = await api.get(`/products/${id}`);
    return res.data;
}