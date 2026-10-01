using System.ComponentModel.DataAnnotations;

namespace SimuladorFinanciamentoApi.DTOs
{
    public class AtualizarUsuarioDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Nome { get; set; } = null!;
        [EmailAddress]
        public string Email { get; set; } = null!;
    }
}