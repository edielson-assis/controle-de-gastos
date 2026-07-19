import type { PersonResponse } from "../../types/Person";
import { deletePerson } from "../../services/PersonService";
import Button from "../Button/Button";
import "./PersonList.css";

type PersonListProps = {
    persons: PersonResponse[];
    loading: boolean;
    error: string | null;
    onPersonDeleted: () => Promise<void>;
};

function PersonList({
        persons,
        loading,
        error,
        onPersonDeleted
    }: PersonListProps) {

    async function handleDelete(id: number) {

        const confirmed = window.confirm(
            "Deseja realmente excluir esta pessoa?"
        );

        if (!confirmed) {
            return;
        }

        await deletePerson(id);
        await onPersonDeleted();;
    }

    if (loading) {
        return (
            <div className="person-list">
                <p>Carregando pessoas...</p>
            </div>
        );
    }

    if (error) {

        return (

            <div className="report">
                <h2 className="section-title">Pessoas Cadastradas</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (persons.length === 0) {
        return (
            <div className="person-list">
                <h2 className="section-title">Pessoas Cadastradas</h2>
                <p>Nenhuma pessoa cadastrada.</p>
            </div>
        );
    }

    return (
        <div className="person-list">

            <h2 className="section-title">Pessoas Cadastradas</h2>

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

                                <Button variant="danger" onClick={() => handleDelete(person.id)}>
                                    Excluir
                                </Button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default PersonList;