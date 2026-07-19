import type { PersonReportResponse } from "../../types/Report";
import { formatCurrency } from "../../utils/formatters";
import "./PersonReportCard.css";

type PersonReportCardProps = {
    report: PersonReportResponse;
};

function PersonReportCard({
    report
}: PersonReportCardProps) {

    return (

        <div className="person-report-card">
            <h3>
                {report.name}
            </h3>

            <div className="person-report-values">
                <p>
                    <strong>Receitas:</strong>{" "}
                    {formatCurrency(report.totalIncome)}
                </p>

                <p>
                    <strong>Despesas:</strong>{" "}
                    {formatCurrency(report.totalExpense)}
                </p>

                <p>
                    <strong>Saldo:</strong>{" "}
                    {formatCurrency(report.balance)}
                </p>
            </div>
        </div>
    );
}

export default PersonReportCard;