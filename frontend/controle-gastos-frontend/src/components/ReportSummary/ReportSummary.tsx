import type { GeneralTotalsResponse } from "../../types/Report";
import { formatCurrency } from "../../utils/formatters";
import "./ReportSummary.css";

type ReportSummaryProps = {
    summary: GeneralTotalsResponse;
};

function ReportSummary({
    summary
}: ReportSummaryProps) {

    return (

        <div className="report-summary">
            <div className="summary-card income">
                <h3>Receitas</h3>
                <span>
                    {formatCurrency(summary.totalIncome)}
                </span>
            </div>

            <div className="summary-card expense">
                <h3>Despesas</h3>
                <span>
                    {formatCurrency(summary.totalExpense)}
                </span>
            </div>

            <div className="summary-card balance">
                <h3>Saldo</h3>
                <span>
                    {formatCurrency(summary.balance)}
                </span>
            </div>
        </div>
    );
}

export default ReportSummary;