import { useEffect, useState } from "react";
import { findAllPersons } from "../../services/PersonService";
import type { PersonResponse } from "../../types/Person";
import "./PersonList.css";

function PersonList() {

    const [persons, setPersons] = useState<PersonResponse[]>([]);

    useEffect(() => {
        loadPersons();
    }, []);

    async function loadPersons() {
        const response = await findAllPersons();
        setPersons(response);
    }

    return (
        <div className="person-list">

            <h2>Pessoas Cadastradas</h2>

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                    </tr>
                </thead>

                <tbody>

                    {persons.map(person => (

                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.name}</td>
                            <td>{person.age}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default PersonList;