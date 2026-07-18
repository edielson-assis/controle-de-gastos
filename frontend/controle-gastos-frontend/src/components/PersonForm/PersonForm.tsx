import { useState } from "react";
import { createPerson } from "../../services/PersonService";
import type { PersonRequest } from "../../types/Person";
import "./PersonForm.css";

type PersonFormProps = {
    onPersonCreated: () => Promise<void>;
};

function PersonForm({ onPersonCreated }: PersonFormProps) {

    const [name, setName] = useState("");
    const [age, setAge] = useState<number>(0);
    const [errors, setErrors] = useState({name: ""});

    function validateForm(): boolean {

        const newErrors = {name: ""};

        if (!name.trim()) {
            newErrors.name = "Informe um nome.";
        }

        setErrors(newErrors);

        return !(
            newErrors.name
        );
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const request: PersonRequest = {
            name,
            age
        };

        await createPerson(request);
        await onPersonCreated();

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
                required
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
            />

            {errors.name && (

                <span className="error">
                    {errors.name}
                </span>
            )}

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