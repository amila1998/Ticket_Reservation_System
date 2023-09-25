﻿using MongoDB.Bson;
using trs_web_service.Infrastructure;
using trs_web_service.Models.Domains;
using trs_web_service.Models.Dtos;

namespace trs_web_service.Services
{
    public class UserService
    {
        private readonly UserRepository _repository;

        public UserService(UserRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<User> GetTravelerByNICAsync(string nic)
        {
            return await _repository.GetByNICAsync(nic);
        }

        public async Task CreateTravelerAsync(UserRegisterDto user)
        {
            User newUser = new User();
            newUser.NIC = user.NIC;
            newUser.Name = user.Name;
            newUser.Password = EncryptPassword(user.Password);
            newUser.Role = user.Role;

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