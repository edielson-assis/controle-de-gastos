using ControleGastos.Api.Dtos.Report;
using ControleGastos.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/report")]
public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet]
    public async Task<ActionResult<ReportResponse>> GetTotals()
    {
        var response = await _reportService.GetTotalsAsync();

        return Ok(response);
    }
}