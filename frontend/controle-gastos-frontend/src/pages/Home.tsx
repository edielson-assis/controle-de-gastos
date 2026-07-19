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

import "./Home.css";

function Home() {

    const [persons, setPersons] = useState<PersonResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);

    useEffect(() => {
        loadPersons();
        loadTransactions();
    }, []);

    async function refreshData() {
        await loadPersons();
        await loadTransactions();
    }

    async function loadPersons() {
        setLoading(true);
        try {
            const response = await findAllPersons();
            setPersons(response);
        } finally {
            setLoading(false);
        }
    }

    async function loadTransactions() {
        setLoadingTransactions(true);
        try {
            const response = await findAllTransactions();
            setTransactions(response);
        } finally {
            setLoadingTransactions(false);
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
                    onPersonDeleted={refreshData}
                />
            </div>

            <div className="card">
                <TransactionList
                    transactions={transactions}
                    loading={loadingTransactions}
                />
            </div>

            <div className="card">
                <h2>Relatório Geral</h2>
                <p>Em desenvolvimento...</p>
            </div>
        </div>
    );
}

export default Home;