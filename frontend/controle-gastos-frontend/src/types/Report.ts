import type { GeneralTotals } from "./GeneralTotals";
import type { PersonReport } from "./PersonReport";

export interface Report {
    persons: PersonReport[];
    summary: GeneralTotals;
}