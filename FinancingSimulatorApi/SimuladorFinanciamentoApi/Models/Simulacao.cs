namespace SimuladorFinanciamentoApi.Models
{
    public class Simulacao
    {
        public int Id { get; set; }

        public decimal ValorImovel { get; set;}
        public decimal ValorEntrada { get; set; }

        public int PrazoMeses { get; set; }
        public double TaxaJuros { get; set; }

        public string SistemaAmortizacao { get; set; } = null!;

        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;
    }
}