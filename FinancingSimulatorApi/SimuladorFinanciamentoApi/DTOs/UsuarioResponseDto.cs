namespace SimuladorFinanciamentoApi.DTOs
{
    public class UsuarioResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}