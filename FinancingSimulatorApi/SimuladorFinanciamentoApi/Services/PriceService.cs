using SimuladorFinanciamentoApi.Models;

namespace SimuladorFinanciamentoApi.Services
{
    public class PriceService
    {
        public List<Parcela> CalcularParcelas(
            decimal valorFinanciado,
            double taxaMensal,
            int prazoFinanciamento)
        {
            List<Parcela> parcelas = new List<Parcela>();

            double fatorJurosCompostos = Math.Pow(1 + taxaMensal, prazoFinanciamento);
            decimal parcelaFixa = valorFinanciado * ((decimal)taxaMensal * (decimal)fatorJurosCompostos / (decimal)(fatorJurosCompostos - 1));
            
            for (int mes = 1; mes <= prazoFinanciamento; mes++)
            {
                decimal juros = (decimal)valorFinanciado * (decimal)taxaMensal;
                decimal amortizacao = parcelaFixa - juros;

                Parcela parcela = new Parcela();
                parcela.Numero = mes;
                parcela.SaldoDevedor = valorFinanciado;
                parcela.Juros = juros;
                parcela.Amortizacao = amortizacao;
                parcela.Valor = parcelaFixa;

                parcelas.Add(parcela);
                valorFinanciado -= amortizacao;
            }
            return parcelas;
        }
    }
}