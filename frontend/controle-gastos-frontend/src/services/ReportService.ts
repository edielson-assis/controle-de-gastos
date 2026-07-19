import { api } from "./Api";
import type { ReportResponse } from "../types/Report";

export async function getReport(): Promise<ReportResponse> {

    const response = await api.get<ReportResponse>(
        "/report"
    );
    return response.data;
}