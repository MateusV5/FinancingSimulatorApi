using SimuladorFinanciamentoApi.DTOs;
using SimuladorFinanciamentoApi.Models;

namespace SimuladorFinanciamentoApi.Services
{
    public class SimuladorService
    {
        private readonly SacService _sacService;
        private readonly PriceService _priceService;
        public SimuladorService(SacService sacService, PriceService priceService)
        {
            _sacService = sacService;
            _priceService = priceService;
        }

        private void ValidarRequest(SimulacaoRequestDto request)
        {
            if (request.ValorEntrada >= request.ValorImovel)
            {
                throw new ArgumentException("O valor de entrada deve ser menor que o valor do imóvel.");
            }

            string tipo = request.TipoFinanciamento.Trim().ToUpper();
            
            if (tipo != "SAC" && tipo != "PRICE")
            {
                throw new ArgumentException("Tipo de financiamento deve ser 'SAC' ou 'PRICE'.");
            }
        }

       public SimulacaoResponseDto SimularFinanciamento(SimulacaoRequestDto request)
        {
            ValidarRequest(request);

            var financiamento = new Financiamento();

            financiamento.ValorImovel =  request.ValorImovel;
            financiamento.ValorEntrada = request.ValorEntrada;
            financiamento.TaxaJuros = request.TaxaJuros;
            financiamento.PrazoFinanciamento = request.PrazoFinanciamento;
            financiamento.TipoFinanciamento = request.TipoFinanciamento.Trim().ToUpper();

            decimal valorFinanciado = financiamento.CalcularValorFinanciado();
            double taxaMensal = financiamento.ConverterTaxa();
            
            List<Parcela> parcelas;

            if (financiamento.TipoFinanciamento == "SAC")
            {
                parcelas = _sacService.CalcularParcelas(valorFinanciado, taxaMensal, financiamento.PrazoFinanciamento);
            }
            else
            {
                parcelas = _priceService.CalcularParcelas(valorFinanciado, taxaMensal, financiamento.PrazoFinanciamento);
            }

            var resumo = financiamento.CalcularTotais(parcelas);

            var response = new SimulacaoResponseDto
            {
                TotalPago = resumo.TotalPago,
                TotalJuros = resumo.TotalJuros,
                TotalAmortizado = resumo.TotalAmortizado,
                Parcelas = parcelas
            };

            return response;
        }
    }
}
