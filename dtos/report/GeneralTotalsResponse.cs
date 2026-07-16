namespace ControleGastos.Api.dtos.report;

public class GeneralTotalsResponse
{
    public decimal TotalIncome { get; set; }

    public decimal TotalExpense { get; set; }

    public decimal Balance { get; set; }
}