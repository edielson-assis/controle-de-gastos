using ControleGastos.Api.Dtos.Transaction;
using ControleGastos.Api.Exceptions;
using ControleGastos.Api.Mappers;
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
            throw new ResourceNotFoundException($"Pessoa com id {request.PersonId} não encontrada.");
        }

        if (!Enum.TryParse<TransactionType>(
            request.Type,
            true,
            out var transactionType))
        {
            throw new BusinessException("Tipo de transação inválido.");
        }
        // Menores de 18 anos podem cadastrar somente despesas.
        if (person.Age < 18 && transactionType == TransactionType.Income)
        {
            throw new BusinessException("Menores de idade não podem cadastrar receitas.");
        }
        var transaction = TransactionMapper.ToEntity(request, person, transactionType);
        var savedTransaction = await _transactionRepository.SaveAsync(transaction);
        return TransactionMapper.ToResponse(savedTransaction);
    }

    public async Task<List<TransactionResponse>> FindAllAsync()
    {
        var transactions = await _transactionRepository.FindAllAsync();
        return TransactionMapper.ToResponseList(transactions);
    }
}