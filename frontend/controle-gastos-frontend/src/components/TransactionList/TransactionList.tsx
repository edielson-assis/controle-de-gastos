import type { TransactionResponse } from "../../types/Transaction";
import "./TransactionList.css";

type TransactionListProps = {
    transactions: TransactionResponse[];
    loading: boolean;
};

function TransactionList({
        transactions,
        loading
    }: TransactionListProps) {

        if (loading) {
        return (
            <div className="transaction-list">
                <p>Carregando transações...</p>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="transaction-list">
                <h2>Transações Cadastradas</h2>
                <p>Nenhuma transações cadastrada.</p>
            </div>
        );
    }

    return (
        <div className="transaction-list">

            <h2>Transações Cadastradas</h2>

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Tipo de Transação</th>
                        <th>ID da pessoa</th>
                    </tr>
                </thead>

                <tbody>

                    {transactions.map(transaction => (

                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.personId}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default TransactionList;