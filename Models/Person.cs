using System.ComponentModel.DataAnnotations.Schema;

namespace ControleGastos.Api.Models;

[Table("People")]
public class Person
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Age { get; set; }

    public ICollection<Transaction> Transactions { get; set; }
        = new List<Transaction>();
}