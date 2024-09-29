using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using My.Weight.Api.Models;

namespace My.Weight.Api.Controllers;

[ApiController]
[Route("api/metrics")]
public class MetricsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Metrics>>> Get([FromQuery] DateTime? from, [FromQuery] DateTime? to, int? top)
    {
        var result = await db.Metrics
            .Where(m => (from == null || from <= m.Date) && (to == null || m.Date <= to))
            .OrderByDescending(m => m.Date)
            .Take((top.HasValue ? Math.Min(top.Value, 100) : 100) + 1)
            .ToArrayAsync();

        for (int i = 0; i < result.Length - 1; i++)
        {
            result[i].Diff = result[i].Weight - result[i + 1].Weight;
        }

        return result.SkipLast(1).ToArray();
    }

    [HttpGet("{id:int}", Name = "GetMetric")]
    public async Task<ActionResult<Metrics>> Get(int id)
    {
        var metrics = await db.Metrics.FirstOrDefaultAsync(m => m.Id == id);
        if (metrics == null) return NotFound();
        return metrics;
    }

    [HttpPost]
    public async Task<ActionResult> Send([FromBody] Metrics body)
    {
        var newMetric = new Metrics
        {
            Date = DateTime.UtcNow,
            Weight = body.Weight,
            Fat = body.Fat,
            VesicularFat = body.VesicularFat
        };

        db.Metrics.Add(newMetric);
        await db.SaveChangesAsync();
        return CreatedAtRoute("GetMetric", new { id = newMetric.Id }, newMetric);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Metrics>> Update(int id, Metrics body)
    {
        var metrics = await db.Metrics.FirstOrDefaultAsync(m => m.Id == id);
        if (metrics == null) return NotFound();

        metrics.Weight = body.Weight;
        metrics.Fat = body.Fat;
        metrics.VesicularFat = body.VesicularFat;
        await db.SaveChangesAsync();
        return metrics;
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var deletedCount = await db.Metrics.Where(m => m.Id == id).ExecuteDeleteAsync();
        if (deletedCount == 0) return NotFound();
        return NoContent();
    }
}