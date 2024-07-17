var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles();
app.MapGet("/api", () => "Hello World!");
app.MapFallbackToFile("index.html");

app.Run();

public partial class Program {}