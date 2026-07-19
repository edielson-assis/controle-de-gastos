import type { TransactionResponse } from "../../types/Transaction";
import { formatCurrency } from "../../utils/formatters";
import "./TransactionList.css";

type TransactionListProps = {
    transactions: TransactionResponse[];
    loading: boolean;
    error: string | null;
};

function TransactionList({
    transactions,
    loading,
    error
}: TransactionListProps) {

    if (loading) {
        return (
            <div className="transaction-list">
                <p>Carregando transações...</p>
            </div>
        );
    }

    if (error) {

        return (

            <div className="report">
                <h2 className="section-title">Transações Cadastradas</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="transaction-list">
                <h2 className="section-title">Transações Cadastradas</h2>
                <p>Nenhuma transações cadastrada.</p>
            </div>
        );
    }

    function getTransactionTypeLabel(
        transactionType: string
    ): string {

        switch (transactionType) {
            case "Income":
                return "Receita";
            case "Expense":
                return "Despesa";
            default:
                return transactionType;
        }
    }

    return (
        <div className="transaction-list">

            <h2 className="section-title">Transações Cadastradas</h2>

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
                            <td>{formatCurrency(transaction.amount)}</td>
                            <td>{getTransactionTypeLabel(transaction.type)}</td>
                            <td>{transaction.personId}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default TransactionList;