using ControleGastos.Api.Dtos.Report;
using ControleGastos.Api.Models;
using ControleGastos.Api.Models.Enums;
using ControleGastos.Api.Repositories.Interfaces;
using ControleGastos.Api.Services.Interfaces;

namespace ControleGastos.Api.Services;

public class ReportService : IReportService
{
    private readonly IPersonRepository _personRepository;

    public ReportService(IPersonRepository personRepository)
    {
        _personRepository = personRepository;
    }

    public async Task<ReportResponse> GetTotalsAsync()
    {
        var persons = await _personRepository.FindAllAsync();

        var report = new ReportResponse
        {
            Persons = new List<PersonReportResponse>()
        };

        decimal totalRevenue = 0;
        decimal totalExpense = 0;

        foreach (var person in persons)
        {
            decimal revenue = CalculateRevenue(person);
            decimal expense = CalculateExpense(person);

            report.Persons.Add(new PersonReportResponse
            {
                PersonId = person.Id,
                Name = person.Name,
                TotalIncome = revenue,
                TotalExpense = expense,
                Balance = CalculateBalance(revenue, expense)
            });

            totalRevenue += revenue;
            totalExpense += expense;
        }

        report.Summary = new GeneralTotalsResponse
        {
            TotalIncome = totalRevenue,
            TotalExpense = totalExpense,
            Balance = CalculateBalance(totalRevenue, totalExpense)
        };

        return report;
    }

    private decimal CalculateRevenue(Person person)
    {
        return person.Transactions
            .Where(transaction => transaction.Type == TransactionType.Income)
            .Sum(transaction => transaction.Amount);
    }

    private decimal CalculateExpense(Person person)
    {
        return person.Transactions
            .Where(transaction => transaction.Type == TransactionType.Expense)
            .Sum(transaction => transaction.Amount);
    }

    private decimal CalculateBalance(decimal revenue, decimal expense)
    {
        return revenue - expense;
    }
}