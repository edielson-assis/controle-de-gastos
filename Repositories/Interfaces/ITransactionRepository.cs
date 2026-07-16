using ControleGastos.Api.Models;

namespace ControleGastos.Api.Repositories.Interfaces;

public interface ITransactionRepository
{
    Task<Transaction> SaveAsync(Transaction transaction);

    Task<List<Transaction>> FindAllAsync();

    Task<List<Transaction>> FindByPersonIdAsync(long personId);
}