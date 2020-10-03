import { CompanyDetail } from './User';

export interface SignupForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  profession: string;
  company_details?: CompanyDetail;
}
