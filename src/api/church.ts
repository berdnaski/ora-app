import { Church, CreateChurchInput } from "../@types/church.type";
import { http } from "./http";

export const churchApi = {
    async create(input: CreateChurchInput): Promise<Church> {
        return http<Church>("/church", {
            method: "POST",
            body: JSON.stringify(input),
        })
    }
}