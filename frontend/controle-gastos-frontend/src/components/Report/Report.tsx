import ReportSummary from "../ReportSummary/ReportSummary";
import type { ReportResponse } from "../../types/Report";

type ReportProps = {
    report: ReportResponse | null;
    loading: boolean;
    error: string | null;
};

function Report({
    report,
    loading,
    error
}: ReportProps) {

    if (loading) {
        return (
            <div className="report">
                <p>Carregando relatório...</p>
            </div>
        );
    }

    if (error) {

        return (

            <div className="report">
                <h2 className="section-title">Relatório Geral</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!report) {

        return (

            <div className="report">
                <h2 className="section-title">Relatório Geral</h2>
                <p>Nenhum dado encontrado.</p>
            </div>
        );
    }

    return (

        <div className="report">

            <h2 className="section-title">Relatório Geral</h2>

            <ReportSummary
                summary={report.summary}
            />

            {/* <PersonReportList
                persons={report.persons}
            /> */}

        </div>
    );
}

export default Report;