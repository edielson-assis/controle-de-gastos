import { useEffect, useState } from "react";

import ReportSummary from "../ReportSummary/ReportSummary";
import type { ReportResponse } from "../../types/Report";
import PersonReportCard from "../PersonReportCard/PersonReportCard";
import "./Report.css";

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

    const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);

    useEffect(() => {
        if (
            report &&
            report.persons.length > 0 &&
            selectedPersonId === null
        ) {
            setSelectedPersonId(
                report.persons[0].personId
            );
        }
    }, [report, selectedPersonId]);

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

    const selectedPerson =
        report.persons.find(
            person =>
                person.personId === selectedPersonId
        );

    return (

        <div className="report">

            <h2 className="section-title">Relatório Geral</h2>

            <ReportSummary
                summary={report.summary}
            />

            <div className="person-report-section">

                <h3>
                    Relatório por Pessoa
                </h3>

                <select

                    value={selectedPersonId ?? ""}

                    onChange={(event) =>
                        setSelectedPersonId(
                            Number(event.target.value)
                        )
                    }
                >
                    {report.persons.map(person => (

                        <option
                            key={person.personId}
                            value={person.personId}
                        >
                            {person.name}
                        </option>
                    ))}
                </select>

                {selectedPerson && (

                    <PersonReportCard
                        report={selectedPerson}
                    />
                )}
            </div>
        </div>
    );
}

export default Report;