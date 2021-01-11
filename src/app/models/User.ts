/**
 * Model for User
 */
export class User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  email_verified_at?: string;
  role_id?: string;
  role?: string;
  image: string;
  phone: string;
  profession: string;
  created_at?: string;
  updated_at?: string;
  company_details?: CompanyDetail;
}

/**
 * Model for company detail
 */
export class CompanyDetail {
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