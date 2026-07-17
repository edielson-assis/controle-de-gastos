export interface TransactionRequest {
    description: string;
    amount: number;
    type: string;
    personId: number;
}

export interface TransactionResponse {
    id: number;
    description: string;
    amount: number;
    type: string;
    personId: number;
}