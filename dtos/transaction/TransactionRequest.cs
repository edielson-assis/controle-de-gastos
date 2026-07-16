using System.ComponentModel.DataAnnotations;
using ControleGastos.Api.models.enums;

namespace ControleGastos.Api.dtos.transaction;

public class TransactionRequest
{
    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(200, ErrorMessage = "A descrição deve possuir no máximo 200 caracteres.")]
    public string Description { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
    public decimal Amount { get; set; }

    [Required(ErrorMessage = "O tipo da transação é obrigatório.")]
    public TransactionType Type { get; set; }

    [Required(ErrorMessage = "O identificador da pessoa é obrigatório.")]
    public long PersonId { get; set; }
}