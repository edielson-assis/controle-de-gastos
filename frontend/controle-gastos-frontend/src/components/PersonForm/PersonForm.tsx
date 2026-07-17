import { useState } from "react";
import { createPerson } from "../../services/PersonService";
import type { PersonRequest } from "../../types/Person";
import "./PersonForm.css";

function PersonForm() {

    const [name, setName] = useState("");
    const [age, setAge] = useState<number>(0);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        const request: PersonRequest = {
            name,
            age
        };

        await createPerson(request);

        setName("");
        setAge(0);

        alert("Pessoa cadastrada com sucesso!");
    }

    return (
        <form onSubmit={handleSubmit} className="person-form">

            <h2>Cadastro de Pessoa</h2>

            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Idade"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
            />

            <button type="submit">
                Cadastrar
            </button>

        </form>
    );
}

export default PersonForm;