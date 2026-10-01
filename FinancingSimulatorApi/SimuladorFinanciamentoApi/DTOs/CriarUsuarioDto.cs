using System.ComponentModel.DataAnnotations;

namespace SimuladorFinanciamentoApi.DTOs
{
    public class CriarUsuarioDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Nome {get; set;} = null!; 
        [Required]
        [EmailAddress]
        public string Email {get; set;} = null!;
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Senha {get; set;} = null!;
    }
}