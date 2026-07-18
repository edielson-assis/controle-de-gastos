import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import PersonForm from "../components/PersonForm/PersonForm";
import PersonList from "../components/PersonList/PersonList";

import type { PersonResponse } from "../types/Person";
import { findAllPersons } from "../services/PersonService";

function Home() {

    const [persons, setPersons] = useState<PersonResponse[]>([]);

    useEffect(() => {
        loadPersons();
    }, []);

    async function loadPersons() {
        const response = await findAllPersons();
        setPersons(response);
    }

    return (
        <>
            <Header />

            <PersonForm
                onPersonCreated={loadPersons}
            />

            <PersonList
                persons={persons}
                onPersonDeleted={loadPersons}
            />
        </>
    );
}

export default Home;