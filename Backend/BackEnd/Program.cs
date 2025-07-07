using Microsoft.EntityFrameworkCore;
using BackEnd;
using BackEnd.DBContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// ���������� ��������� ���� ������
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// ���������� ������������
builder.Services.AddControllers();

// ��������� CORS 
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAll", policy =>
	{
		policy.AllowAnyOrigin()
			  .AllowAnyMethod()
			  .AllowAnyHeader();
	});
});

var app = builder.Build();

// ��������� middleware
if (app.Environment.IsDevelopment())
{
	app.UseDeveloperExceptionPage();
}

// CORS
app.UseCors("AllowAll");

app.UseRouting();

// ������� � ������� ������������
app.MapControllers();

app.Run();
