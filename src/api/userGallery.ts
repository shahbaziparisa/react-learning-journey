import { api } from "./axiosClient";
import type { UserGallery } from "../types/userGallery";

export async function getUserGallery(limit: number): Promise<UserGallery[]> {
    const res = await api.get("/users", {
        params: {
            limit,
        },
    });
    return res.data;
}