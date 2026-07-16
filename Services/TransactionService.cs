using ControleGastos.Api.Dtos.Transaction;
using ControleGastos.Api.Models;
using ControleGastos.Api.Models.Enums;
using ControleGastos.Api.Repositories.Interfaces;
using ControleGastos.Api.Services.Interfaces;

namespace ControleGastos.Api.Services;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IPersonRepository _personRepository;

    public TransactionService(
        ITransactionRepository transactionRepository,
        IPersonRepository personRepository)
    {
        _transactionRepository = transactionRepository;
        _personRepository = personRepository;
    }

    public async Task<TransactionResponse> CreateAsync(TransactionRequest request)
    {
        var person = await _personRepository.FindByIdAsync(request.PersonId);

        if (person == null)
        {
            throw new Exception("Pessoa não encontrada.");
        }

        // Menores de 18 anos podem cadastrar somente despesas.
        if (person.Age < 18 && request.Type == TransactionType.Income)
        {
            throw new Exception(
                "Menores de idade não podem cadastrar receitas.");
        }

        var transaction = new Transaction
        {
            Description = request.Description,
            Amount = request.Amount,
            Type = request.Type,
            Person = person
        };

        var savedTransaction =
            await _transactionRepository.SaveAsync(transaction);

        return new TransactionResponse
        {
            Id = savedTransaction.Id,
            Description = savedTransaction.Description,
            Amount = savedTransaction.Amount,
            Type = savedTransaction.Type,
            PersonId = savedTransaction.Person.Id
        };
    }

    public async Task<List<TransactionResponse>> FindAllAsync()
    {
        var transactions =
            await _transactionRepository.FindAllAsync();

        return transactions.Select(transaction => new TransactionResponse
        {
            Id = transaction.Id,
            Description = transaction.Description,
            Amount = transaction.Amount,
            Type = transaction.Type,
            PersonId = transaction.Person.Id

        }).ToList();
    }
}