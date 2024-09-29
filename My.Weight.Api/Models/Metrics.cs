using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace My.Weight.Api.Models;

public class Metrics {
	public int Id { get; set; }
	[Required]
	public int Weight { get; set; }
	public decimal Fat { get; set; }
	public int VesicularFat { get; set; }
	public DateTime Date { get; set; }
	[NotMapped]
	public int Diff { get; set; }
}