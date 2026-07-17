using ControleGastos.Api.Dtos.Error;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Exceptions;

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var response = new ErrorResponse
        {
            Timestamp = DateTime.UtcNow,
            Path = httpContext.Request.Path,
            Message = exception.Message
        };

        switch (exception)
        {
            case ResourceNotFoundException:
                response.Status = StatusCodes.Status404NotFound;
                response.Error = "Resource Not Found";
                break;

            case BusinessException:
                response.Status = StatusCodes.Status400BadRequest;
                response.Error = "Business Rule Violation";
                break;

            default:
                response.Status = StatusCodes.Status500InternalServerError;
                response.Error = "Internal Server Error";
                response.Message = "Ocorreu um erro interno na aplicação.";
                break;
        }

        httpContext.Response.StatusCode = response.Status;

        var problem = new ObjectResult(response)
        {
            StatusCode = response.Status
        };

        await problem.ExecuteResultAsync(new ActionContext
        {
            HttpContext = httpContext
        });

        return true;
    }
}