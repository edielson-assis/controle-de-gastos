using ControleGastos.Api.Dtos.Person;
using ControleGastos.Api.Mappers;
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
        var person = PersonMapper.ToEntity(request);
        var savedPerson = await _personRepository.SaveAsync(person);
        return PersonMapper.ToResponse(savedPerson);
    }

    public async Task<List<PersonResponse>> FindAllAsync()
    {
        var persons = await _personRepository.FindAllAsync();
        return PersonMapper.ToResponseList(persons);
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