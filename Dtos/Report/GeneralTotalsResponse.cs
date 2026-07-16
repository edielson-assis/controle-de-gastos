namespace ControleGastos.Api.Dtos.Report;

public class GeneralTotalsResponse
{
    public decimal TotalIncome { get; set; }

    public decimal TotalExpense { get; set; }

    public decimal Balance { get; set; }
}