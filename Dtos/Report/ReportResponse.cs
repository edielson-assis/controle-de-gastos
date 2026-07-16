namespace ControleGastos.Api.Dtos.Report;

public class ReportResponse
{
    public List<PersonReportResponse> Persons { get; set; }
        = new List<PersonReportResponse>();

    public GeneralTotalsResponse Summary { get; set; }
        = new GeneralTotalsResponse();
}