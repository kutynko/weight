using System.Net;

namespace My.Weight.Api.Tests;

public class HelloWorldTests : IClassFixture<TestProgram>
{
    private readonly HttpClient _client;

    public HelloWorldTests(TestProgram factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async void TestApi()
    {
        var response = await _client.GetAsync("/api");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}