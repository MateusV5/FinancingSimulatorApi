using Microsoft.EntityFrameworkCore;
using SimuladorFinanciamentoApi.Models;

namespace SimuladorFinanciamentoApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Simulacao> Simulacoes { get; set; }
    }
}