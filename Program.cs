using ControleGastos.Api.Data;
using ControleGastos.Api.Exceptions;
using ControleGastos.Api.Repositories;
using ControleGastos.Api.Repositories.Interfaces;
using ControleGastos.Api.Services;
using ControleGastos.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Banco de dados
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositórios
builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();

// Serviços
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IReportService, ReportService>();

// CORS para o frontend em desenvolvimento
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Controllers
builder.Services.AddControllers();

// GlobalExceptionHandler
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Cria a aplicação
var app = builder.Build();

// Cria o banco caso não exista
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();
}

app.UseExceptionHandler();
// Pipeline HTTP
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("FrontendPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();