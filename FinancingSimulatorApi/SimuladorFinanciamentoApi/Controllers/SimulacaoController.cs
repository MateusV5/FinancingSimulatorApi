using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimuladorFinanciamentoApi.DTOs;
using SimuladorFinanciamentoApi.Services;
using System.Security.Claims;

namespace SimuladorFinanciamentoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SimulacaoController : ControllerBase
    {
        private readonly SimuladorService _simuladorService;
        private readonly SimulacaoService _simulacaoService;
        public SimulacaoController(SimuladorService simuladorService, SimulacaoService simulacaoService)
        {
            _simuladorService = simuladorService;
            _simulacaoService = simulacaoService;
        }
        [HttpPost]
        public IActionResult Simular(SimulacaoRequestDto request)
        {
            try
            {
                var resultado = _simuladorService.SimularFinanciamento(request);    
                return Ok(ApiResponseDto<SimulacaoResponseDto>.Ok(resultado, "Simulação realizada com sucesso."));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResponseDto<object>.Fail(ex.Message));
            }
        }

        [Authorize]
        [HttpPost("salvar")]
        public async Task<IActionResult> SimularESalvar(SimulacaoRequestDto request)
        {
            try
            {
                var usuarioIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (usuarioIdClaim == null)
                {
                    return Unauthorized(ApiResponseDto<object>.Fail("Usuário não autenticado."));
                }

                var usuarioId = int.Parse(usuarioIdClaim);

                var resultado = await _simulacaoService.SimularESalvar(
                    request,
                    usuarioId
                );

                return Ok(ApiResponseDto<SimulacaoResponseDto>.Ok(resultado, "Simulação realizada e salva com sucesso."));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResponseDto<object>.Fail(ex.Message));
            }
        }

        [Authorize]
        [HttpGet("historico")]
        public async Task<IActionResult> ListarHistorico()
        {
            var usuarioIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (usuarioIdClaim == null)
            {
                return Unauthorized(ApiResponseDto<object>.Fail("Usuário não autenticado."));
            }

            var usuarioId = int.Parse(usuarioIdClaim);

            var historico = await _simulacaoService.ObterHistoricoSimulacoes(usuarioId);
            return Ok(ApiResponseDto<List<SimulacaoHistoricoDto>>.Ok(historico, "Histórico de simulações obtido com sucesso."));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarSimulacao(int id)
        {
            try
            {
                var usuarioIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (usuarioIdClaim == null)
                {
                    return Unauthorized(ApiResponseDto<object>.Fail("Usuário não autenticado."));
                }

                var usuarioId = int.Parse(usuarioIdClaim);

                var detalhes = await _simulacaoService.ObterDetalhesSimulacao(id, usuarioId);
                if (detalhes == null)
                {
                    return NotFound(ApiResponseDto<object>.Fail("Simulação não encontrada."));
                }

                return Ok(ApiResponseDto<SimulacaoResponseDto>.Ok(detalhes, "Detalhes da simulação obtidos com sucesso."));
            } 
            catch (ArgumentException ex)
            {
                return BadRequest(ApiResponseDto<object>.Fail(ex.Message));
            }
        }

         private int? ObterUsuarioId()
        {
            var usuarioIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (usuarioIdClaim == null)
            {
                return null;
            }

            if (!int.TryParse(usuarioIdClaim, out var usuarioId))
            {
                return null;
            }

            return usuarioId;
        }
    }
}