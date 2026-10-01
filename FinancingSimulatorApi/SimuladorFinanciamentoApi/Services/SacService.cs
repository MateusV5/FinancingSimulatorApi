using SimuladorFinanciamentoApi.Models;

namespace SimuladorFinanciamentoApi.Services
{
    public class SacService
    {
        public List<Parcela> CalcularParcelas(
            decimal valorFinanciado,
            double taxaMensal,
            int prazoFinanciamento)
        {
            List<Parcela> parcelas = new List<Parcela>();
            decimal saldoDevedor = valorFinanciado;
            decimal amortizacao = saldoDevedor / prazoFinanciamento;

            for (int mes = 1; mes <= prazoFinanciamento; mes++)
            {
                decimal juros = saldoDevedor * (decimal)taxaMensal;
                decimal valorParcela = amortizacao + juros;

                Parcela parcela = new Parcela();
                parcela.Numero = mes;
                parcela.SaldoDevedor = saldoDevedor;
                parcela.Juros = juros;
                parcela.Amortizacao = amortizacao;
                parcela.Valor = valorParcela;

                parcelas.Add(parcela);
                saldoDevedor -= amortizacao;
            }
            return parcelas;
        }
    }
}