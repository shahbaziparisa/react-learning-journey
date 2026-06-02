import { api } from "./axiosClient";
import type { Products } from "../types/products";

export async function getProducts(limit = 20): Promise<Products[]> {
    const res = await api.get("/products", {
        params: {
            offset: 0,
            limit,
        },
    });
    return res.data;
}