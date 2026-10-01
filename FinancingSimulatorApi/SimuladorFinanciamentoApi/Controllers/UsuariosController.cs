using SimuladorFinanciamentoApi.Services;
using SimuladorFinanciamentoApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace SimuladorFinanciamentoApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        public UsuariosController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CriarUsuario(CriarUsuarioDto dto)
        {
            try
            {
                var usuarioCriado = await _usuarioService.CriarUsuario(dto);
                return Ok(ApiResponseDto<UsuarioResponseDto>.Ok(usuarioCriado, "Usuário criado com sucesso."));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponseDto<object>.Fail(ex.Message));
            }
        }

        [HttpGet]
        public async Task<IActionResult> ListarUsuarios()
        {
            var usuarios = await _usuarioService.ListarUsuarios();
            return Ok(ApiResponseDto<List<UsuarioResponseDto>>.Ok(usuarios, "Usuários listados com sucesso."));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterUsuarioPorId(int id)
        {
            var usuario = await _usuarioService.ObterUsuarioPorId(id);
            if (usuario == null)
            {
                return NotFound(ApiResponseDto<object>.Fail("Usuário não encontrado."));
            }
            return Ok(ApiResponseDto<UsuarioResponseDto>.Ok(usuario, "Usuário encontrado com sucesso."));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarUsuario(int id, AtualizarUsuarioDto dto)
        {
            try
            {
                var usuarioAtualizado = await _usuarioService.AtualizarUsuario(id, dto);
                if (usuarioAtualizado == null)
                {
                    return NotFound(ApiResponseDto<object>.Fail("Usuário não encontrado."));
                }
                return Ok(ApiResponseDto<UsuarioResponseDto>.Ok(usuarioAtualizado, "Usuário atualizado com sucesso."));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponseDto<object>.Fail(ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarUsuario(int id)
        {
            var removido = await _usuarioService.DeletarUsuario(id);
            if (!removido)
            {
                return NotFound(ApiResponseDto<object>.Fail("Usuário não encontrado."));
            }
            return Ok(ApiResponseDto<object>.Ok(null!, "Usuário deletado com sucesso."));
        }
    }
}