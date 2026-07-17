using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Dtos.Transaction;

public class TransactionRequest
{
    [Required(ErrorMessage = "A descrição é obrigatória.")]
    [StringLength(200, ErrorMessage = "A descrição deve possuir no máximo 200 caracteres.")]
    public string Description { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
    public decimal Amount { get; set; }

    [Required(ErrorMessage = "O tipo da transação é obrigatório.")]
    public string Type { get; set; } = string.Empty;

    [Range(1, long.MaxValue)]
    [Required(ErrorMessage = "O identificador da pessoa é obrigatório.")]
    public long PersonId { get; set; }
}