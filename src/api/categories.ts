import { api } from "./axiosClient";
import type { Category } from "../types/category";

export async function getCategories(limit: number): Promise<Category[]> {
    const res = await api.get("/categories", {
        params: {
            limit,
        },
    });
    return res.data;
}