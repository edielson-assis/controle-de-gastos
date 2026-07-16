using ControleGastos.Api.Dtos.Transaction;

namespace ControleGastos.Api.Services.Interfaces;

public interface ITransactionService
{
    Task<TransactionResponse> CreateAsync(TransactionRequest request);

    Task<List<TransactionResponse>> FindAllAsync();
}