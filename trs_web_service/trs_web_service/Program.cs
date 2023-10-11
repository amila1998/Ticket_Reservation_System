using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using Sample.UserManagement.Application;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using trs_web_service.Infrastructure;
using trs_web_service.Models;
using trs_web_service.Services;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Register Configuration
var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json")
    .Build();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

// Add Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            ValidateIssuer = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JwtSettings:SecretKey").Value!))
        };
    });

// Add Authorization
builder.Services.AddAuthorization(options =>
{
    // Define policies for roles
    options.AddPolicy("backoffice", policy => policy.RequireRole("backoffice"));
    options.AddPolicy("travel_agent", policy => policy.RequireRole("travel_agent"));
    options.AddPolicy("traveler", policy => policy.RequireRole("traveler"));
    options.AddPolicy("nottraveler", policy => policy.RequireRole("backoffice", "travel_agent"));
});

// Cloudinary
Account account = new(
    configuration["Cloudinary:CloudName"],
    configuration["Cloudinary:ApiKey"],
    configuration["Cloudinary:ApiSecret"]);

Cloudinary cloudinary = new(account);
builder.Services.AddSingleton(cloudinary);

// Configure MongoDB and your services
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<DatabaseSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});
builder.Services.AddScoped<IMongoDatabase>(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var settings = sp.GetRequiredService<IOptions<DatabaseSettings>>().Value;
    return client.GetDatabase(settings.DatabaseName);
});


builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<TokenGenerator>();
builder.Services.AddScoped<CloudinaryImageUploadService>();
builder.Services.AddScoped<TrainRepository>();
builder.Services.AddScoped<TrainService>();
builder.Services.AddScoped<TrainRoutesRepository>();
builder.Services.AddScoped<TrainRoutesService>();
builder.Services.AddScoped<TrainScheduleRepository>();
builder.Services.AddScoped<TrainScheduleService>();
builder.Services.AddScoped<ReservationRepository>();
builder.Services.AddScoped<ReservationService>();
builder.Services.AddScoped<RequestRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(options => options
    .WithOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:5000", "https://elaborate-starburst-d61897.netlify.app", "https://expressbook.netlify.app") // Add the origins you need
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
);

app.MapControllers();

app.Run();
