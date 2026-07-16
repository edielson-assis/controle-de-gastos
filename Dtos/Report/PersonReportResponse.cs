namespace ControleGastos.Api.Dtos.Report;

public class PersonReportResponse
{
    public long PersonId { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal TotalIncome { get; set; }

    public decimal TotalExpense { get; set; }

    public decimal Balance { get; set; }
}