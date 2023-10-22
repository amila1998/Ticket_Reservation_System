/// Services/UserService.cs


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


        /// <summary>
        /// get all users
        /// </summary>
        /// <param ></param>
        /// <returns>UserDto List</returns>
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
                    UserDto newUser = new(formattedId, user.Name,user.Role,user.NIC,user.ImagePath,user.ContactNo,user.IsActive,user.IsSendActiveStatus,user.Email);
                    users.Add(newUser);
                }

            }
            return users;
        }


        /// <summary>
        /// get all travel agents
        /// </summary>
        /// <param ></param>
        /// <returns>UserDto List</returns>
        public async Task<IEnumerable<UserDto>> GetTravelAgents()
        {
            List<UserDto> users = new();
            var userList = await _repository.GetTravelAgents();
            if (userList != null)
            {
                foreach (var user in userList)
                {
                    // Convert the ObjectId to the desired format
                    string formattedId = user.Id.ToString().Substring(0, 24);
                    UserDto newUser = new(formattedId, user.Name, user.Role, user.NIC, user.ImagePath, user.ContactNo, user.IsActive, user.IsSendActiveStatus, user.Email);
                    users.Add(newUser);
                }

            }
            return users;
        }


        /// <summary>
        /// get all travelers
        /// </summary>
        /// <param ></param>
        /// <returns>UserDto List</returns>
        public async Task<IEnumerable<UserDto>> GetTravelers()
        {
            List<UserDto> users = new();
            var userList = await _repository.GetTravelers();
            if (userList != null)
            {
                foreach (var user in userList)
                {
                    // Convert the ObjectId to the desired format
                    string formattedId = user.Id.ToString().Substring(0, 24);
                    UserDto newUser = new(formattedId, user.Name, user.Role, user.NIC, user.ImagePath, user.ContactNo, user.IsActive, user.IsSendActiveStatus, user.Email);
                    users.Add(newUser);
                }

            }
            return users;
        }


        /// <summary>
        /// get user by nic
        /// </summary>
        /// <param user Nic ></param>
        /// <returns>User</returns>
        public async Task<User> GetUserByNICAsync(string nic)
        {
            return await _repository.GetByNICAsync(nic);
        }


        /// <summary>
        /// get user by Id
        /// </summary>
        /// <param user Id></param>
        /// <returns>UserDto</returns>
        public async Task<UserDto> GetUserByID(string id)
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
                string formattedId = info.Id.ToString().Substring(0, 24);
                UserDto newUser = new(formattedId, info.Name, info.Role, info.NIC, info.ImagePath, info.ContactNo, info.IsActive, info.IsSendActiveStatus, info.Email);
                return newUser;
            }
        }

        /// <summary>
        /// Deactivate user
        /// </summary>
        /// <param NIC></param>
        /// <returns>User</returns>
        public async Task<User> DeactivateUserAsync(string nic)
        {
            if (nic == "00000000V") 
            {
                throw new Exception("can not do any operation for super user");
            }
            var exUser = await _repository.GetByNICAsync(nic);
            return exUser == null ? throw new Exception("Have not an account") : await _repository.DeactivateUserAsync(nic);
        }


        /// <summary>
        /// send a active status
        /// </summary>
        /// <param Nic></param>
        /// <returns>User</returns>
        public async Task<User> SendActiveStatusAsync(string nic)
        {
            if (nic == "00000000V")
            {
                throw new Exception("can not do any operation for super user");
            }
            var exUser = await _repository.GetByNICAsync(nic);
            if(exUser == null)
            {
                throw new Exception("Have not an account");
            }
            if (exUser.IsActive)
            {
                throw new Exception("Account is already activated");
            }
            if (exUser.IsSendActiveStatus)
            {
                throw new Exception("Account activation is already send");
            }
            return await _repository.SendActiveStatusAsync(nic);
        }

        /// <summary>
        /// user update
        /// </summary>
        /// <param UserUpdateDto and user Id></param>
        /// <returns>User</returns>
        public async Task<User> UserUpdateProfile(UserUpdateDto user, string id)
        {

            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }

            var info = await _repository.GetByIdAsync(objectId) ?? throw new Exception("Have not an account");

            if (info.NIC == "00000000V")
            {
                throw new Exception("can not do any operation for super user");
            }
  
            return await _repository.UserUpdateProfile(user, objectId);
        }

        /// <summary>
        /// Reset Password
        /// </summary>
        /// <param password and NIC></param>
        /// <returns>User</returns>
        public async Task<User> ResetPassword(string password, string id)
        {

            if (!ObjectId.TryParse(id, out var objectId))
            {
                throw new Exception("Invalid ID format");
            }

            var info = await _repository.GetByIdAsync(objectId) ?? throw new Exception("Have not an account");

            if (info.NIC == "00000000V")
            {
                throw new Exception("can not do any operation for super user");
            }

            return await _repository.ResetPassword(EncryptPassword(password), objectId);
        }


        /// <summary>
        /// Reset Password
        /// </summary>
        /// <param password and NIC></param>
        /// <returns>User</returns>
        public async Task<User> UpdateUser(UpdateUserDto user)
        {
            var info = await _repository.GetByNICAsync(user.NIC) ?? throw new Exception("Have not an account");

            if (info.NIC == "00000000V")
            {
                throw new Exception("can not do any operation for super user");
            }

            user.Password = EncryptPassword(user.Password);



            return await _repository.UpdateUser(user);
        }


        /// <summary>
        /// Activate Use
        /// </summary>
        /// <param  NIC></param>
        /// <returns>User</returns>
        public async Task<User> ActivateUserAsync(string nic)
        {
            var exUser = await _repository.GetByNICAsync(nic);
            return exUser == null ? throw new Exception("Have not an account") : await _repository.ActivateUserAsync(nic);
        }


        /// <summary>
        /// Activate Use
        /// </summary>
        /// <param  NIC></param>
        /// <returns>User</returns>
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

            User newUser = new()
            {
                NIC = user.NIC,
                Name = user.Name,
                Password = EncryptPassword(user.Password),
                Role = user.Role,
                ImagePath = "https://res.cloudinary.com/amiladevin1998/image/upload/v1642784922/avatar/pic_1171831236_1_axiiom.png",
                ContactNo = user.ContactNo,
                Email = user.Email,
            };
            await _repository.CreateAsync(newUser);
        }


        /// <summary>
        /// create a user
        /// </summary>
        /// <param  UserRegisterDto></param>
        /// <returns></returns>
        public async Task CreateUserAsync(UserRegisterDto user)
        {
            var exUser = await _repository.GetByNICAsync(user.NIC);
            if (exUser != null)
            {
                throw new Exception("Already have account");
            }

            User newUser = new()
            {
                NIC = user.NIC,
                Name = user.Name,
                Password = EncryptPassword(user.Password),
                Role = user.Role,
                ImagePath = "https://res.cloudinary.com/amiladevin1998/image/upload/v1642784922/avatar/pic_1171831236_1_axiiom.png",
                ContactNo = user.ContactNo,
                Email = user.Email,
            };
            await _repository.CreateAsync(newUser);
        }


        /// <summary>
        /// method to encrypt password
        /// </summary>
        /// <param  password></param>
        /// <returns>encrypted password</returns>
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
