import { useState } from "react";
import { createPerson } from "../../services/PersonService";
import type { PersonRequest } from "../../types/Person";
import Message from "../Message/Message";
import "./PersonForm.css";

type PersonFormProps = {
    onPersonCreated: () => Promise<void>;
};

function PersonForm({ onPersonCreated }: PersonFormProps) {

    const [name, setName] = useState("");
    const [age, setAge] = useState<number>(0);
    const [errors, setErrors] = useState({ name: "" });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function validateForm(): boolean {

        const newErrors = { name: "" };

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

        try {
            await createPerson(request);
            await onPersonCreated();

            setSuccessMessage("Pessoa cadastrada com sucesso!");
            setErrorMessage("");
            setName("");
            setAge(0);
        } catch {
            setSuccessMessage("");
            setErrorMessage("Não foi possível cadastrar a pessoa.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="person-form">

            <h2 className="section-title">Cadastro de Pessoa</h2>

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

            {successMessage && (
                <Message
                    type="success"
                    text={successMessage}
                />
            )}

            {errorMessage && (
                <Message
                    type="error"
                    text={errorMessage}
                />
            )}

        </form>
    );
}

export default PersonForm;