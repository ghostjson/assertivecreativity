import { CustomFormsEntry } from './Order';
import { Product } from './Product';

export interface Cart {
  data: CartItem[];
  total_price?: number;
}

export interface CartItem {
  id?: number;
  user_id?: number;
  product_id: number;
  product?: Product;
  quantity: number;
  custom_forms_entry?: CartCustomFormsEntry;
  created_at?: string;
  updated_at?: string;
}

export interface CartCustomFormsEntry {
  forms_input: {
    custom_forms: CustomFormsEntry[];
  };
  total_price: number;
}