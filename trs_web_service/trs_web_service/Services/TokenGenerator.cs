﻿///// Services/TokenGenerator.cs

//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using trs_web_service.Models.Domains;

namespace trs_web_service.Services
{
    public class TokenGenerator
    {
        private readonly IConfiguration _configuration;
        public TokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        /// <summary>
        /// Create a JWT Token for login
        /// </summary>
        /// <param user ID and Role></param>
        /// <returns>token</returns>
        public string GenerateToken(string id, string role)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, id),
                new Claim(ClaimTypes.Role, role)
              };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("JwtSettings:SecretKey").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }


        /// <summary>
        /// Create a JWT Token for Forgot password
        /// </summary>
        /// <param user ID and Role></param>
        /// <returns>token</returns>
        public string GenerateTokenForForgotPassword(string id, string role)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, id),
                new Claim(ClaimTypes.Role, role)
              };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("JwtSettings:SecretKey").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
