import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import PersonForm from "../components/PersonForm/PersonForm";
import PersonList from "../components/PersonList/PersonList";
import TransactionForm from "../components/TransactionForm/TransactionForm";

import type { PersonResponse } from "../types/Person";
import { findAllPersons } from "../services/PersonService";

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
        <>
            <Header />

            <PersonForm
                onPersonCreated={loadPersons}
            />

            <PersonList
                persons={persons}
                loading={loading}
                onPersonDeleted={loadPersons}
            />

            <TransactionForm
                persons={persons}
                onTransactionCreated={async () => {}}
            />
        </>
    );
}

export default Home;