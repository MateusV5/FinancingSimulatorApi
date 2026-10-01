using Microsoft.EntityFrameworkCore;
using SimuladorFinanciamentoApi.Data;
using SimuladorFinanciamentoApi.DTOs;
using SimuladorFinanciamentoApi.Models;

namespace SimuladorFinanciamentoApi.Services
{
    public class SimulacaoService
    {
        private readonly AppDbContext _context;
        private readonly SimuladorService _simuladorService;
        public SimulacaoService(AppDbContext context, SimuladorService simuladorService)
        {
            _context = context;
            _simuladorService = simuladorService;
        }

        public async Task<SimulacaoResponseDto> SimularESalvar(SimulacaoRequestDto request, int usuarioId)
        {
            var respostaSimulacao = _simuladorService.SimularFinanciamento(request);

            var simulacao = new Simulacao
            {
                ValorImovel = request.ValorImovel,
                ValorEntrada = request.ValorEntrada,

                TaxaJuros = request.TaxaJuros,
                PrazoMeses = request.PrazoFinanciamento,

                SistemaAmortizacao = request.TipoFinanciamento.Trim().ToUpper(),

                UsuarioId = usuarioId,
                DataCriacao = DateTime.UtcNow
            };
            
            _context.Simulacoes.Add(simulacao);
            await _context.SaveChangesAsync();

            return respostaSimulacao;
        }

        public async Task<List<SimulacaoHistoricoDto>> ObterHistoricoSimulacoes(int usuarioId)
        {
            return await _context.Simulacoes
                .Where(s => s.UsuarioId == usuarioId)
                .OrderByDescending(s => s.DataCriacao)
                .Select(s => new SimulacaoHistoricoDto
                {
                    Id = s.Id,
                    ValorImovel = s.ValorImovel,
                    ValorEntrada = s.ValorEntrada,
                    PrazoMeses = s.PrazoMeses,
                    TaxaJuros = s.TaxaJuros,
                    SistemaAmortizacao = s.SistemaAmortizacao,
                    DataCriacao = s.DataCriacao
                })
                .ToListAsync();
        }

        public async Task<SimulacaoResponseDto?> ObterDetalhesSimulacao(int simulacaoId, int usuarioId)
        {
            var simulacao = await _context.Simulacoes
                .FirstOrDefaultAsync(s => s.Id == simulacaoId && s.UsuarioId == usuarioId);

            if (simulacao == null)
            {
                return null;
            }

            var request = new SimulacaoRequestDto
            {
                ValorImovel = simulacao.ValorImovel,
                ValorEntrada = simulacao.ValorEntrada,
                PrazoFinanciamento = simulacao.PrazoMeses,
                TaxaJuros = simulacao.TaxaJuros,
                TipoFinanciamento = simulacao.SistemaAmortizacao
            };

            return _simuladorService.SimularFinanciamento(request);
        }

    }
}