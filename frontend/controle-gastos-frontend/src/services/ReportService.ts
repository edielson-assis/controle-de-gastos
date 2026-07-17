import { api } from "./Api";
import type { Report } from "../types/Report";

export async function generateReport(): Promise<Report> {

    const response = await api.get<Report>("/report");

    return response.data;
}