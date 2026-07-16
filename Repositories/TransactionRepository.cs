using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;

    public TransactionRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task<Transaction> SaveAsync(Transaction transaction)
    {
        _context.Transactions.Add(transaction);

        await _context.SaveChangesAsync();

        return transaction;
    }


    public async Task<List<Transaction>> FindAllAsync()
    {
        return await _context.Transactions
            .Include(t => t.Person)
            .ToListAsync();
    }


    public async Task<List<Transaction>> FindByPersonIdAsync(long personId)
    {
        return await _context.Transactions
            .Where(t => t.PersonId == personId)
            .ToListAsync();
    }
}