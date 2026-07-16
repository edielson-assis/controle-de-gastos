using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Repositories;

public class PersonRepository : IPersonRepository
{
    private readonly AppDbContext _context;

    public PersonRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task<Person> SaveAsync(Person person)
    {
        _context.Persons.Add(person);

        await _context.SaveChangesAsync();

        return person;
    }


    public async Task<List<Person>> FindAllAsync()
    {
        return await _context.Persons
            .Include(p => p.Transactions)
            .ToListAsync();
    }


    public async Task<Person?> FindByIdAsync(long id)
    {
        return await _context.Persons
            .Include(p => p.Transactions)
            .FirstOrDefaultAsync(p => p.Id == id);
    }


    public async Task DeleteAsync(Person person)
    {
        _context.Persons.Remove(person);

        await _context.SaveChangesAsync();
    }
}