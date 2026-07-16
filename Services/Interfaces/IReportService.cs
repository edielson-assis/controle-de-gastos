using ControleGastos.Api.Dtos.Report;

namespace ControleGastos.Api.Services.Interfaces;

public interface IReportService
{
    Task<ReportResponse> GetTotalsAsync();
}