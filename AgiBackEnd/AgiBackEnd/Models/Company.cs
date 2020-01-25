using System;
using System.ComponentModel.DataAnnotations;

namespace AgiBackEnd.Models
{
    public class Company : IEntity
    {
		public int Id { get; set; }

		[Required]
		[StringLength(50)]
		public string ExternalId { get; set; }

		[Required]
		public string TradingName { get; set; }

		[Required]
		public string LegalName { get; set; }

		[Required]
		//		IsBuyer IsSeller
		// 1 -	  Yes	  Yes
		// 2 -	  Yes	  No
		// 3 -	  No	  Yes
		// 4 -	  No	  No
		public int CompanyType { get; set; }

		[Required]
		public bool Unused { get; set; }

		[Required]
		public bool IsForwarder { get; set; }

		[StringLength(50)]
		public string Phone { get; set; }

		[StringLength(50)]
		public string Fax { get; set; }

		public int AddressId { get; set; }

		public int MailAddressId { get; set; }

		[Required]
		public bool IsCustomClearance { get; set; }

		[Required]
		public bool IsActive { get; set; }

		[Required]
		public bool IsCarrier { get; set; }

		public string ChamberOfCommerce { get; set; }

		public string ChamberOfCommerceCi { get; set; }

		public string CountryVat { get; set; }

		[Required]
		public bool IsExchangeBroker { get; set; }
	}
}
