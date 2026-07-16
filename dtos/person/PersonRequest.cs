using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.dtos.person;

public class PersonRequest
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(100, ErrorMessage = "O nome deve possuir no máximo 100 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Range(0, 120, ErrorMessage = "A idade deve estar entre 0 e 120 anos.")]
    public int Age { get; set; }
}