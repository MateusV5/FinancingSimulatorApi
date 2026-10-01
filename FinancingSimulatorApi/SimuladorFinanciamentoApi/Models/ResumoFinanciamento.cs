using System;
using System.Globalization;

namespace SimuladorFinanciamentoApi.Models
{
    public class ResumoFinanciamento
    {
        public decimal TotalPago { get; set; }
        public decimal TotalJuros { get; set; }
        public decimal TotalAmortizado { get; set; }
    }
}
