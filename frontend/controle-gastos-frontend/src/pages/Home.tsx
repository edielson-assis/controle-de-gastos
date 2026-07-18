import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import PersonForm from "../components/PersonForm/PersonForm";
import PersonList from "../components/PersonList/PersonList";
import TransactionForm from "../components/TransactionForm/TransactionForm";

import type { PersonResponse } from "../types/Person";
import { findAllPersons } from "../services/PersonService";

import "./Home.css";

function Home() {

    const [persons, setPersons] = useState<PersonResponse[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPersons();
    }, []);

    async function loadPersons() {
        setLoading(true);
        try {
            const response = await findAllPersons();
            setPersons(response);
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="container">

            <Header />

            <div className="forms">
                <div className="card">
                    <PersonForm
                        onPersonCreated={loadPersons}
                    />
                </div>

                <div className="card">
                    <TransactionForm
                        persons={persons}
                        onTransactionCreated={async () => {}}
                    />
                </div>
            </div>

            <div className="card">
                <PersonList
                    persons={persons}
                    loading={loading}
                    onPersonDeleted={loadPersons}
                />
            </div>

            <div className="card">
                <h2>Transações</h2>
                <p>Em desenvolvimento...</p>
            </div>

            <div className="card">
                <h2>Relatório Geral</h2>
                <p>Em desenvolvimento...</p>
            </div>
        </div>
    );
}

export default Home;