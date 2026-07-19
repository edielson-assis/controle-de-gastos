export interface GeneralTotalsResponse {
    summary: GeneralTotalsResponse;
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export interface PersonReportResponse {
    personId: number;
    name: string;
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export interface ReportResponse {
    persons: PersonReportResponse[];
    summary: GeneralTotalsResponse;
}