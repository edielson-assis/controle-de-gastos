import { useEffect, useState } from "react";
// import { findAllPersons } from "../../services/PersonService";
import type { PersonResponse } from "../../types/Person";
import { deletePerson, findAllPersons } from "../../services/PersonService";
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

    async function handleDelete(id: number) {

        const confirmed = window.confirm(
            "Deseja realmente excluir esta pessoa?"
        );

        if (!confirmed) {
            return;
        }

        await deletePerson(id);

        await loadPersons();
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
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>

                    {persons.map(person => (

                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.name}</td>
                            <td>{person.age}</td>

                            <td>

                                <button onClick={() => handleDelete(person.id)}>
                                    Excluir
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default PersonList;