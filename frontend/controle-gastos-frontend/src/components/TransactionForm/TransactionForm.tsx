import { useState } from "react";
import { createTransaction } from "../../services/TransactionService";
import type { PersonResponse } from "../../types/Person";
import type { TransactionRequest } from "../../types/Transaction";
import "./TransactionForm.css";

type TransactionFormProps = {
    persons: PersonResponse[];
    onTransactionCreated: () => Promise<void>;
};

function TransactionForm({
    persons,
    onTransactionCreated
}: TransactionFormProps) {

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [type, setTransactionType] = useState("Income");
    const [personId, setPersonId] = useState("");
    const [errors, setErrors] = useState({
        description: "",
        amount: "",
        personId: ""
    });

    function validateForm(): boolean {

        const newErrors = {
            description: "",
            amount: "",
            personId: ""
        };

        if (!description.trim()) {
            newErrors.description = "Informe uma descrição.";
        }

        if (amount <= 0) {
            newErrors.amount = "Informe um valor maior que zero.";
        }

        if (!personId) {
            newErrors.personId = "Selecione uma pessoa.";
        }

        setErrors(newErrors);

        return !(
            newErrors.description ||
            newErrors.amount ||
            newErrors.personId
        );
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const request: TransactionRequest = {
            description,
            amount,
            type,
            personId: Number(personId)
        };

        await createTransaction(request);

        await onTransactionCreated();

        setDescription("");
        setAmount(0);
        setTransactionType("Income");
        setPersonId("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="transaction-form"
        >

            <h2>Cadastro de Transação</h2>

            <input
                type="text"
                placeholder="Descrição"
                value={description}
                required
                maxLength={100}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            {errors.description && (

                <span className="error">
                    {errors.description}
                </span>
            )}

            <input
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="Valor"
                value={amount}
                onChange={(e) =>
                    setAmount(Number(e.target.value))
                }
            />

            {errors.amount && (

                <span className="error">
                    {errors.amount}
                </span>
            )}

            <select
                value={type}
                onChange={(e) =>
                    setTransactionType(e.target.value)
                }
            >

                <option value="Income">
                    Receita
                </option>

                <option value="Expense">
                    Despesa
                </option>

            </select>

            <select
                required
                value={personId}
                onChange={(e) =>
                    setPersonId(e.target.value)
                }
            >

                <option value="">
                    Selecione uma pessoa
                </option>

                {persons.map(person => (

                    <option
                        key={person.id}
                        value={person.id}
                    >
                        {person.name}
                    </option>

                ))}

            </select>

            {errors.personId && (

                <span className="error">
                    {errors.personId}
                </span>
            )}

            <button type="submit">
                Cadastrar
            </button>

        </form>
    );
}

export default TransactionForm;