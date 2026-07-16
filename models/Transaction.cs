using System.ComponentModel.DataAnnotations.Schema;
using ControleGastos.Api.models.enums;

namespace ControleGastos.Api.models;

[Table("Transactions")]
public class Transaction
{
    public long Id { get; set; }

    public string Description { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public TransactionType Type { get; set; }

    public long PersonId { get; set; }

    public Person? Person { get; set; }
}