/**
 * Model for User
 */
export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: string;
  role: string;
  image: string;
  company_details?: CompanyDetail;
  phone: string;
  profession: string;
}

/**
 * Model for company detail
 */
export interface CompanyDetail {
  name: string;
  building_number: string;
  street_name: string;
  building_name: string;
  locality: string;
  province_abbr: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
}