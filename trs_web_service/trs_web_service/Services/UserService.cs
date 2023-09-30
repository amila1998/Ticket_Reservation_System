using MongoDB.Bson;
using trs_web_service.Infrastructure;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;
using static System.Net.WebRequestMethods;

namespace trs_web_service.Services
{
    public class UserService
    {
        private readonly UserRepository _repository;

        public UserService(UserRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            List<UserDto> users = new();
            var userList = await _repository.GetAllAsync();
            if(userList != null)
            {
                foreach(var user in userList)
                {
                    // Convert the ObjectId to the desired format
                    string formattedId = user.Id.ToString().Substring(0, 24);
                    UserDto newUser = new(formattedId, user.Name,user.Role,user.NIC,user.ImagePath,user.ContactNo,user.IsActive,user.IsSendActiveStatus);
                    users.Add(newUser);
                }

            }
            return users;
        }

        public async Task<User> GetUserByNICAsync(string nic)
        {
            return await _repository.GetByNICAsync(nic);
        }

        public async Task<User> GetUserByID(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }

            var info = await _repository.GetByIdAsync(objectId);

            if (info == null)
            {
                throw new Exception("There is no user under the requested id");
            }
            else
            {
                return info;
            }
        }

        public async Task<User> DeactivateUserAsync(string nic)
        {
            if (nic == "00000000V") 
            {
                throw new Exception("Have not an account");
            }
            var exUser = await _repository.GetByNICAsync(nic);
            return exUser == null ? throw new Exception("Have not an account") : await _repository.DeactivateUserAsync(nic);
        }

        public async Task<User> ActivateUserAsync(string nic)
        {
            var exUser = await _repository.GetByNICAsync(nic);
            return exUser == null ? throw new Exception("Have not an account") : await _repository.ActivateUserAsync(nic);
        }

        public async Task CreateTravelerAsync(UserRegisterDto user)
        {
            var exUser = await _repository.GetByNICAsync(user.NIC);
            if (exUser != null) 
            {
                throw new Exception("Already have account");
            }

            if (user.Role != "traveler")
            {
                throw new Exception("You can not create another role");
            }

            User newUser = new User();
            newUser.NIC = user.NIC;
            newUser.Name = user.Name;
            newUser.Password = EncryptPassword(user.Password);
            newUser.Role = user.Role;
            newUser.ImagePath = "https://res.cloudinary.com/amiladevin1998/image/upload/v1642784922/avatar/pic_1171831236_1_axiiom.png";
            newUser.ContactNo = user.ContactNo;
            await _repository.CreateAsync(newUser);
        }

        public async Task CreateUserAsync(UserRegisterDto user)
        {
            var exUser = await _repository.GetByNICAsync(user.NIC);
            if (exUser != null)
            {
                throw new Exception("Already have account");
            }

            User newUser = new User();
            newUser.NIC = user.NIC;
            newUser.Name = user.Name;
            newUser.Password = EncryptPassword(user.Password);
            newUser.Role = user.Role;
            newUser.ImagePath = "https://res.cloudinary.com/amiladevin1998/image/upload/v1642784922/avatar/pic_1171831236_1_axiiom.png";
            newUser.ContactNo = user.ContactNo;
            await _repository.CreateAsync(newUser);
        }

        private static string EncryptPassword(string password)
        {
            // Generate a salt for the password hash
            string salt = BCrypt.Net.BCrypt.GenerateSalt();

            // Hash the password using the salt and bcrypt algorithm
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hashedPassword;
        }

    }
}
