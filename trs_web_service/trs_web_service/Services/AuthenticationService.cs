/// Services/AuthenticationService.cs

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

        /// <summary>
        /// Authenticate a user based on NIC and password and generate an authentication token.
        /// </summary>
        public string Authenticate(string nic, string password)
        {
            var user = _userRepository.GetByNICAsync(nic);
            if (user.Result == null || !BCrypt.Net.BCrypt.Verify(password, user.Result.Password))
            {
                throw new Exception("Invalid email or password.");
            }

            // Convert the ObjectId to the desired format
            string formattedId = user.Result.Id.ToString().Substring(0, 24);
            var token = _tokenGenerator.GenerateToken(formattedId, user.Result.Role);

            return token;
        }

        /// <summary>
        /// Generate a token for resetting a user's forgotten password.
        /// </summary>
        public string ForgotPassword(string nic, string email)
        {
            var user = _userRepository.GetByNICAsync(nic);

            // Convert the ObjectId to the desired format
            string formattedId = user.Result.Id.ToString().Substring(0, 24);
            var token = _tokenGenerator.GenerateTokenForForgotPassword(formattedId, user.Result.Role);

            return token;
        }
    }
}