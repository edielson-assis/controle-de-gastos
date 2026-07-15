using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ControleGastos.Api.models.enums;

namespace ControleGastos.Api.models;

[Table("Transactions")]
public class Transaction
{
    [Key]
    public long Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public decimal Amount { get; set; }

    [Required]
    public TransactionType Type { get; set; }

    [ForeignKey(nameof(Person))]
    public long PersonId { get; set; }

    public Person? Person { get; set; }
}