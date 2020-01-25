

INSERT INTO dbo.Company(
	ExternalId
	,TradingName
	,LegalName
	,CompanyType
	,Unused
	,IsForwarder
	,Phone
	,Fax
	,AddressId
	,MailAddressId
	,IsCustomClearance
	,IsActive
	,IsCarrier
	,ChamberOfCommerce
	,ChamberOfCommerceCi
	,CountryVat
	,IsExchangeBroker)
VALUES (
	'ExId1',
	'TrC1',
	'Company1',
	3,
	0,
	0,
	'Phone1',
	'Fax1',
	1,
	1,
	0,
	1,
	0,
	'Chamber1',
	'ChamberCi1',
	'VAT1',
	1
);

Select
*
From dbo.Company