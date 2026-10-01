using System;
using System.Globalization;
using System.Collections.Generic;

namespace SimuladorFinanciamentoApi.Models
{
    public class Parcela
    {
        public int Numero { get; set; }
        public decimal Valor { get; set; }
        public decimal Juros { get; set; }
        public decimal Amortizacao { get; set; }
        public decimal SaldoDevedor { get; set; }
    }
}