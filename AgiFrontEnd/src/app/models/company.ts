export class Company {
    id?: number;
    externalId: string;
    tradingName: string;
    legalName: string;
    companyType?: number;
    isBuyer?: string;
    isSeller?: string;
    unused?: boolean;
    isForwarder?: boolean;
    phone: string;
    fax: string;
    addressId?: number;
    mailAddressId?: number;
    isCustomClearance?: boolean;
    isActive?: boolean;
    isCarrier?: boolean;
    chamberOfCommerce?: string;
    chamberOfCommerceCi?: string;
    countryVat?: string;
    isExchangeBroker?: boolean;
  }