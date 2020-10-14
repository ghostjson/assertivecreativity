import { CustomFormInput, Order } from './Order';
import { Product } from './Product';

export interface Cart {
  data: CartItem[];
  total_price?: number;
}

export interface CartItem {
  id?: number;
  product_id: number;
  quantity: number;
  total_price?: number;
  product?: Product;
  custom_forms_entry?: CustomFormInput[];
}