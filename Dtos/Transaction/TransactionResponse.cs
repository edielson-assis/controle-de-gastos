using ControleGastos.Api.Models.Enums;

namespace ControleGastos.Api.Dtos.Transaction;

public class TransactionResponse
{
    public long Id { get; set; }

    public string Description { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public TransactionType Type { get; set; }

    public long PersonId { get; set; }
}