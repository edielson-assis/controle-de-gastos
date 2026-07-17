using ControleGastos.Api.Dtos.Transaction;
using ControleGastos.Api.Models;
using ControleGastos.Api.Models.Enums;

namespace ControleGastos.Api.Mappers;

public static class TransactionMapper
{
    public static Transaction ToEntity(
        TransactionRequest request,
        Person person,
        TransactionType transactionType)
    {
        return new Transaction
        {
            Description = request.Description,
            Amount = request.Amount,
            Type = transactionType,
            Person = person
        };
    }

    public static TransactionResponse ToResponse(Transaction transaction)
    {
        return new TransactionResponse
        {
            Id = transaction.Id,
            Description = transaction.Description,
            Amount = transaction.Amount,
            Type = transaction.Type.ToString(),
            PersonId = transaction.Person.Id
        };
    }

    public static List<TransactionResponse> ToResponseList(
        List<Transaction> transactions)
    {
        return transactions.Select(ToResponse).ToList();
    }
}