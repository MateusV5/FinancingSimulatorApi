using Microsoft.EntityFrameworkCore;
using SimuladorFinanciamentoApi.Data;
using SimuladorFinanciamentoApi.DTOs;
using SimuladorFinanciamentoApi.Models;

namespace SimuladorFinanciamentoApi.Services
{
    public class LoginService
    {
        private readonly AppDbContext _context;
        public LoginService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario?> Login(LoginUsuarioDto dto)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (usuario == null) 
                return null;

            bool senhaValida = BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.SenhaHash);
            if (!senhaValida)
                return null;

            return usuario;
        }
    }
}