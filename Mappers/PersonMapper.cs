using ControleGastos.Api.Dtos.Person;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.Mappers;

public static class PersonMapper
{
    public static Person ToEntity(PersonRequest request)
    {
        return new Person
        {
            Name = request.Name,
            Age = request.Age
        };
    }

    public static PersonResponse ToResponse(Person person)
    {
        return new PersonResponse
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age
        };
    }

    public static List<PersonResponse> ToResponseList(List<Person> persons)
    {
        return persons.Select(ToResponse).ToList();
    }
}