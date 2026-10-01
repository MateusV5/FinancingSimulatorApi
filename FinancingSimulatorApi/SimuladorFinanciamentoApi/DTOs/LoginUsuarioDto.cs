using System.ComponentModel.DataAnnotations;

namespace SimuladorFinanciamentoApi.DTOs
{
    public class LoginUsuarioDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Senha { get; set; } = null!;
    }
}