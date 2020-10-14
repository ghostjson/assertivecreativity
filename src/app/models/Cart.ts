import { CustomFormInput, Order } from './Order';
import { Product } from './Product';

export interface Cart {
  data: CartItem[];
}

export interface CartItem {
  id?: number;
  product_id: number;
  quantity: number;
  total_price?: number;
  product_details?: Product;
  /**
   * TODO: fix after api is fixed with the array to string error.
   * Everything after this is an error
   */
  custom_forms: CustomFormInput[] | string;
  custom_forms_entry?: CustomFormInput[];
}