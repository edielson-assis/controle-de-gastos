import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import PersonForm from "../components/PersonForm/PersonForm";
import PersonList from "../components/PersonList/PersonList";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import type { PersonResponse } from "../types/Person";
import { findAllPersons } from "../services/PersonService";
import TransactionList from "../components/TransactionList/TransactionList";
import type { TransactionResponse } from "../types/Transaction";
import { findAllTransactions } from "../services/TransactionService";
import { getReport } from "../services/ReportService";
import type { ReportResponse } from "../types/Report";

import "./Home.css";
import Report from "../components/Report/Report";

function Home() {

    const [persons, setPersons] = useState<PersonResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [personError, setPersonError] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [transactionError, setTransactionError] = useState<string | null>(null);
    const [report, setReport] = useState<ReportResponse | null>(null);
    const [loadingReport, setLoadingReport] = useState(false);
    const [reportError, setReportError] = useState<string | null>(null);

    useEffect(() => {
        refreshData();
    }, []);

    async function refreshData() {
        await loadPersons();
        await loadTransactions();
        loadReport()
    }

    async function loadPersons() {
        setLoading(true);
        try {
            const response = await findAllPersons();
            setPersons(response);
            setPersonError(null);
        } catch {
            setPersons([]);
            setPersonError("Não foi possível carregar a lista de pessoas.");
        } finally {
            setLoading(false);
        }
    }

    async function loadTransactions() {
        setLoadingTransactions(true);
        try {
            const response = await findAllTransactions();
            setTransactions(response);
            setTransactionError(null);
        } catch {
            setTransactionError(null);
            setTransactionError("Não foi possível carregar as transações.");
        } finally {
            setLoadingTransactions(false);
        }
    }

    async function loadReport() {
        setLoadingReport(true);
        try {
            const response = await getReport();
            setReport(response);
            setReportError(null);
        } catch {
            setReport(null);
            setReportError("Não foi possível carregar o relatório.");
        } finally {
            setLoadingReport(false);
        }
    }

    return (

        <div className="container">

            <Header />

            <div className="forms">
                <div className="card">
                    <PersonForm
                        onPersonCreated={refreshData}
                    />
                </div>

                <div className="card">
                    <TransactionForm
                        persons={persons}
                        onTransactionCreated={refreshData}
                    />
                </div>
            </div>

            <div className="card">
                <PersonList
                    persons={persons}
                    loading={loading}
                    error={personError}
                    onPersonDeleted={refreshData}
                />
            </div>

            <div className="card">
                <TransactionList
                    transactions={transactions}
                    loading={loadingTransactions}
                    error={transactionError}
                />
            </div>

            <div className="card">
                <Report
                    report={report}
                    loading={loadingReport}
                    error={reportError}
                />
            </div>
        </div>
    );
}

export default Home;