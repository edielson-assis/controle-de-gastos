using ControleGastos.Api.Dtos.Transaction;
using ControleGastos.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionService _transactionService;

    public TransactionController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpPost]
    public async Task<ActionResult<TransactionResponse>> Create(
        TransactionRequest request)
    {
        var response = await _transactionService.CreateAsync(request);

        return StatusCode(StatusCodes.Status201Created, response);
    }

    [HttpGet]
    public async Task<ActionResult<List<TransactionResponse>>> FindAll()
    {
        var response = await _transactionService.FindAllAsync();

        return Ok(response);
    }
}