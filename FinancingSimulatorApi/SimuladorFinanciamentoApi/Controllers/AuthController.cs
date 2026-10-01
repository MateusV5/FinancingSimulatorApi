using Microsoft.AspNetCore.Mvc;
using SimuladorFinanciamentoApi.DTOs;
using SimuladorFinanciamentoApi.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace SimuladorFinanciamentoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AuthController : ControllerBase
    {
        private readonly LoginService _loginService;
        private readonly TokenService _tokenService;

        public AuthController(LoginService loginService, TokenService tokenService)
        {
            _loginService = loginService;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUsuarioDto dto)
        {
            var usuario = await _loginService.Login(dto);
            if (usuario == null)
                return Unauthorized(ApiResponseDto<object>.Fail("Credenciais inválidas."));

            var token = _tokenService.GerarToken(usuario);
            return Ok(ApiResponseDto<object>.Ok(new { token }, "Login realizado com sucesso."));
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userName = User.FindFirstValue(ClaimTypes.Name);
            var userEmail = User.FindFirstValue(ClaimTypes.Email);

            return Ok(ApiResponseDto<object>.Ok(new { userId, userName, userEmail }, "Informações do usuário obtidas com sucesso."));
        }

    }
}