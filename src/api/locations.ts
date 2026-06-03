import { api } from "./axiosClient";
import type { Location } from "../types/location";

export async function getLocations(limit: number): Promise<Location[]> {
    const res = await api.get("/locations", {
        params: {
            limit,
        },
    });
    return res.data;
}