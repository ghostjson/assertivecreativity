/**
 * Model for User
 */
export class User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  email_verified_at: string;
  role: string;
  image: string;
  companyDetails: CompanyDetail;
  phone: string;
  profession: string;
}

/**
 * Model for company detail
 */
export class CompanyDetail {
  name: string;
  buildingNumber: string;
  streetName: string;
  buildingName: string;
  locality: string;
  provinceAbbr: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
}