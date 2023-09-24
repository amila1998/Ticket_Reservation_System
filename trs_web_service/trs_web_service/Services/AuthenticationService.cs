using trs_web_service.Infrastructure;
using trs_web_service.Models.Domains;

namespace trs_web_service.Services
{
    public class AuthenticationService
    {
        private readonly UserRepository _userRepository;
        private readonly TokenGenerator _tokenGenerator;

        public AuthenticationService(UserRepository userRepository, TokenGenerator tokenGenerator)
        {
            _userRepository = userRepository;
            _tokenGenerator = tokenGenerator;
        }

        public string Authenticate(string nic, string password)
        {
            var user = _userRepository.GetByNICAsync(nic);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Result.Password))
            {
                throw new Exception("Invalid email or password.");
            }

            var token = _tokenGenerator.GenerateToken(user.Result.NIC,user.Result.Role);

            return token;
        }
    }
}
