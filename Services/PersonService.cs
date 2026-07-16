using ControleGastos.Api.Dtos.Person;
using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories.Interfaces;
using ControleGastos.Api.Services.Interfaces;

namespace ControleGastos.Api.Services;

public class PersonService : IPersonService
{
    private readonly IPersonRepository _personRepository;

    public PersonService(IPersonRepository personRepository)
    {
        _personRepository = personRepository;
    }

    public async Task<PersonResponse> CreateAsync(PersonRequest request)
    {
        var person = new Person
        {
            Name = request.Name,
            Age = request.Age
        };

        var savedPerson = await _personRepository.SaveAsync(person);

        return new PersonResponse
        {
            Id = savedPerson.Id,
            Name = savedPerson.Name,
            Age = savedPerson.Age
        };
    }

    public async Task<List<PersonResponse>> FindAllAsync()
    {
        var persons = await _personRepository.FindAllAsync();

        return persons.Select(person => new PersonResponse
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age

        }).ToList();
    }

    public async Task DeleteAsync(long id)
    {
        var person = await _personRepository.FindByIdAsync(id);

        if (person == null)
        {
            throw new Exception("Pessoa não encontrada.");
        }

        await _personRepository.DeleteAsync(person);
    }
}