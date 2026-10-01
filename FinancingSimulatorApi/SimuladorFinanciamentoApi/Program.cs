using SimuladorFinanciamentoApi.Services;
using Microsoft.EntityFrameworkCore;
using SimuladorFinanciamentoApi.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Adiciona suporte a Controllers
builder.Services.AddControllers();

// Dependency Injection
builder.Services.AddScoped<SimuladorService>();
builder.Services.AddScoped<SimulacaoService>();
builder.Services.AddScoped<SacService>();
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<PriceService>();
builder.Services.AddScoped<LoginService>();
builder.Services.AddScoped<TokenService>();

//DbContext
builder.Services.AddDbContext<AppDbContext> (options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Configuração do Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFront", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:5173"
            )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// HTTPS
app.UseHttpsRedirection();

// Habilita CORS
app.UseCors("PermitirFront");

// Middleware de autenticação
app.UseAuthentication();
app.UseAuthorization();

// Habilita Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Mapeia os controllers
app.MapControllers();

app.Run();