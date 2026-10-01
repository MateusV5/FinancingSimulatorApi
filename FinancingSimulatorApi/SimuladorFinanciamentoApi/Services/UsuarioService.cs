using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using SimuladorFinanciamentoApi.Data;
using SimuladorFinanciamentoApi.DTOs;
using SimuladorFinanciamentoApi.Models;

namespace SimuladorFinanciamentoApi.Services
{
    public class UsuarioService
    {
        private readonly AppDbContext _context;
        public UsuarioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UsuarioResponseDto> CriarUsuario(CriarUsuarioDto dto)
        {
            // var userExists = _context.Usuarios.Any(x => x.Email == dto.Email);
            // if(userExists)
            //     return //Erro

            var senhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);
            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                SenhaHash = senhaHash
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return new UsuarioResponseDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email
            };
        }

        public async Task<List<UsuarioResponseDto>> ListarUsuarios()
        {
            return await _context.Usuarios
                .Select(u => new UsuarioResponseDto
                {
                    Id = u.Id,
                    Nome = u.Nome,
                    Email = u.Email
                })
                .ToListAsync();
        }

        public async Task<UsuarioResponseDto?> ObterUsuarioPorId(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return null;
            }

            return new UsuarioResponseDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email
            };   
        }

        public async Task<UsuarioResponseDto?> AtualizarUsuario(int id, AtualizarUsuarioDto dto)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if(usuario == null)
            {
                return null;
            }

            usuario.Nome = dto.Nome;
            usuario.Email = dto.Email;

            await _context.SaveChangesAsync();

            return new UsuarioResponseDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email
            };
        }

        public async Task<bool> DeletarUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return false;
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
