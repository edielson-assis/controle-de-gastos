using ControleGastos.Api.Dtos.Person;
using ControleGastos.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/persons")]
public class PersonController : ControllerBase
{
    private readonly IPersonService _personService;

    public PersonController(IPersonService personService)
    {
        _personService = personService;
    }

    [HttpPost]
    public async Task<ActionResult<PersonResponse>> Create(
        PersonRequest request)
    {
        var response = await _personService.CreateAsync(request);

        return CreatedAtAction(
            nameof(FindAll),
            new { id = response.Id },
            response);
    }

    [HttpGet]
    public async Task<ActionResult<List<PersonResponse>>> FindAll()
    {
        var response = await _personService.FindAllAsync();

        return Ok(response);
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        await _personService.DeleteAsync(id);

        return NoContent();
    }
}
