using ControleGastos.Api.Models;

namespace ControleGastos.Api.Repositories.Interfaces;

public interface IPersonRepository
{
    Task<Person> SaveAsync(Person person);

    Task<List<Person>> FindAllAsync();

    Task<Person?> FindByIdAsync(long id);

    Task DeleteAsync(Person person);
}