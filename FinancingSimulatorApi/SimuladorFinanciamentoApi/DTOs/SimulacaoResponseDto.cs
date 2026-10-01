using SimuladorFinanciamentoApi.Models;

namespace SimuladorFinanciamentoApi.DTOs
{
    public class SimulacaoResponseDto
    {
        public decimal TotalPago { get; set; }
        public decimal TotalJuros { get; set; }
        public decimal TotalAmortizado { get; set; }
        public List<Parcela> Parcelas { get; set; } = new List<Parcela>();
    }
}