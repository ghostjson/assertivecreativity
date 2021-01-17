import { CustomFormsEntry, OrderAttribute } from './Order';
import { Product } from './Product';

export interface Cart {
  data: CartItem[];
  total_price?: number;
}

export interface CartItem {
  id?: number;
  user_id?: number;
  product_id: number;
  product: Product;
  quantity: number;
  order_data?: CartOrderData;
  total_price: number;
  created_at?: string;
  updated_at?: string;
}

export interface CartOrderData {
  is_stock: boolean;
  forms_input?: CustomFormsEntry[];
  stock_order_attributes?: OrderAttribute[];
  order_price: number;
}