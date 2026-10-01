using System.ComponentModel.DataAnnotations;

namespace SimuladorFinanciamentoApi.DTOs
{
    public class SimulacaoRequestDto
    {
        [Required(ErrorMessage = "O valor do imóvel é obrigatório.")]
        [Range(typeof(decimal), "1", "79228162514264337593543950335", ErrorMessage = "O valor do imóvel deve ser maior que zero.")]
        public decimal ValorImovel { get; set; }

        [Required(ErrorMessage = "O valor de entrada é obrigatório.")]
        [Range(typeof(decimal), "0", "79228162514264337593543950335", ErrorMessage = "O valor de entrada deve ser um número positivo.")]
        public decimal ValorEntrada { get; set; }

        [Required(ErrorMessage = "A taxa de juros é obrigatória.")]
        [Range(0.01, 15, ErrorMessage = "A taxa de juros deve ser um número positivo.")]
        public double TaxaJuros { get; set; }

        [Required(ErrorMessage = "O prazo do financiamento é obrigatório.")]
        [Range(1, 420, ErrorMessage = "O prazo do financiamento deve ser um número positivo.")]
        public int PrazoFinanciamento { get; set; }

        [Required(ErrorMessage = "O tipo de financiamento é obrigatório.")]
        public string TipoFinanciamento { get; set; } = string.Empty;
    }
}