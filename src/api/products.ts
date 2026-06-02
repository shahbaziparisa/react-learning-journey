import { api } from "./axiosClient";
import type { Product } from "../types/products";

export async function getProducts(limit = 20): Promise<Product[]> {
    const res = await api.get("/products", {
        params: {
            offset: 0,
            limit,
        },
    });
    return res.data;
}