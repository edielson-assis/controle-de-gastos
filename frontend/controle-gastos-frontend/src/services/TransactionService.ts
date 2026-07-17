import { api } from "./Api";
import type { TransactionRequest, TransactionResponse } from "../types/Transaction";

export async function findAllTransactions(): Promise<TransactionResponse[]> {

    const response = await api.get<TransactionResponse[]>("/transactions");

    return response.data;
}

export async function createTransaction(request: TransactionRequest): Promise<TransactionResponse> {

    const response = await api.post<TransactionResponse>( "/transactions", request);

    return response.data;
}