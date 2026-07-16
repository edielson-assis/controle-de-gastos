using ControleGastos.Api.Dtos.Person;

namespace ControleGastos.Api.Services.Interfaces;

public interface IPersonService
{
    Task<PersonResponse> CreateAsync(PersonRequest request);

    Task<List<PersonResponse>> FindAllAsync();

    Task DeleteAsync(long id);
}