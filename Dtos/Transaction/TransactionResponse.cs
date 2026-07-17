namespace ControleGastos.Api.Dtos.Transaction;

public class TransactionResponse
{
    public long Id { get; set; }

    public string Description { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public string Type { get; set; } = string.Empty;

    public long PersonId { get; set; }
}