namespace SimuladorFinanciamentoApi.DTOs
{
    public class SimulacaoHistoricoDto
    {
        public int Id { get; set; }

        public decimal ValorImovel { get; set; }
        public decimal ValorEntrada { get; set; }

        public int PrazoMeses { get; set; }
        public double TaxaJuros { get; set; }

        public string SistemaAmortizacao { get; set; } = string.Empty;

        public DateTime DataCriacao { get; set; }
    }
}