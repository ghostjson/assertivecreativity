import { FormArray, FormGroup } from '@angular/forms';
import { Category } from './Category';

// model describing a Product
export class Product {
  id?: number;
  seller_id?: number;
  name?: string;
  description?: string;
  category?: Category;
  category_id?: number;
  tags?: string[];
  base_cost?: number;
  base_price?: number;
  total_price?: number;
  stock?: number;
  sales?: number;
  image?: string;
  images?: ProductImage[];
  price_table_mode?: boolean | string;
  price_table?: PriceGroup[];
  custom_forms?: any;
  order_props?: OrderProps;
  /**
   * TODO: remove once products/custom api is updated
   */
  serial?: string;
  // stock product
  is_stock: boolean;
  product?: Product;
  product_id?: string;
  product_key: string;
  variant_id?: string;
  cat_year?: string;
  expiration_date?: string;
  discontinued?: string;
  tag?: string;
  keywords?: string;
  colors?: string;
  themes?: string;
  dimension_list?: string;
  dimension_unit_list?: number[];
  dimension_type_list?: number[];
  quantities_list?: number[];
  price_list?: number[];
  pr_code?: string;
  pieces_per_unit_list?: number[];
  quote_upon_request?: string;
  price_include_clr?: string;
  price_include_side?: string;
  price_include_loc?: string;
  setup_chg?: string;
  setup_chg_code?: string;
  screen_chg?: string;
  screen_chg_code?: string;
  plate_chg?: string;
  plate_chg_code?: string;
  die_chg?: string;
  die_chg_code?: string;
  tooling_chg?: string;
  tooling_chg_code?: string;
  repeat_chg?: string;
  repeat_chg_code?: string;
  add_clr_chg?: string;
  add_clr_chg_code?: string;
  add_clr_run_chg_list?: number[];
  add_clr_run_chg_code?: string;
  is_recyclable?: string;
  is_environmentally_friendly?: string;
  is_new_product?: string;
  not_suitable?: string;
  exclusive?: string;
  hazardous?: string;
  officially_licensed?: string;
  is_food?: string;
  is_clothing?: string;
  imprint_size_list?: number[];
  imprint_size_units_list?: number[];
  imprint_size_type_list?: number[];
  imprint_loc?: string;
  second_imprint_size_list?: number[];
  second_imprint_units_list?: number[];
  second_imprint_type_list?: number[];
  second_imprint_loc?: string;
  decoration_method?: string;
  no_decoration?: string;
  made_in_country?: string;
  assembled_in_country?: string;
  decorated_in_country?: string;
  compliance_list?: string;
  warning_lbl?: string;
  compliance_memo?: string;
  prod_time_lo?: string;
  prod_time_hi?: string;
  rush_prod_time_lo?: string;
  rush_prod_time_hi?: string;
  packing?: string;
  carton_l?: string;
  carton_w?: string;
  carton_h?: string;
  weight_per_carton?: string;
  units_per_carton?: string;
  ship_point_country?: string;
  ship_point_zip?: string;
  comment?: string;
  verified?: string;
  update_inventory?: string;
  inventory_on_hand?: string;
  inventory_on_hand_added?: string;
  inventory_memo?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PriceGroup {
  id?: number;
  cost_per_piece?: number;
  price_per_piece: number;
  quantity: number;
}

export class PriceTable {
  public price_groups: PriceGroup[];

  constructor() {
    this.price_groups = [];
  }
}

export interface StockProduct {
  product: Product;
  attributes: StockProductAttributes;
}

export interface CustomProduct {
  product: Product;
  attributes: ProductAttribute[];
}

export interface ProductAttribute {
  id?: number;
  type: string;
  label: string;
  value: any;
  thumbnail?: ImageObj;
  images?: ProductImage[];
  cost?: number;
  price: number;
  stock: number;
  sales: number;
  display_in_product: boolean;
  is_attribute_group: boolean;
  child_attributes?: ProductAttribute[];
}

export class StockProductAttributes {
  colors?: any[];
  variant_ids?: any[];
  dimensions?: number[];
  price_table_mode?: boolean;
  price_table?: PriceTable;
}

export interface ProductVariant {
  variant_id?: number;
  product_id: number;
  variant_group: boolean;
  type: string;
  label: string;
  value: any;
  stock: number;
  sales: number;
  thumbnail?: ImageObj;
  images?: ProductImage[];
  base_cost?: number;
  base_price: number;
  price_table_mode: boolean;
  price_table: PriceGroup[];
  variant_status: 'draft' | 'published' | 'hidden';
  config: JSON;
  attrs: JSON;
  order_config: OrderProps;
}

export interface ProductImage {
  front_view?: ImageObj;
  back_view?: ImageObj;
  left_view?: ImageObj;
  right_view?: ImageObj;
}

export class ImageObj {
  id?: number;
  src: string | number;
  alt_text?: string;
  title?: string;
}

export interface PriceGroup {
  id?: number;
  price_code?: string;
  cost_per_piece?: number;
  price_per_piece: number;
  quantity: number;
}

export interface OrderProps {
  min_order_quantity: number;
  max_order_quantity: number;
  order_quantity_step: number;
}

export class NewProduct {
  id?: number;
  seller_id?: number;
  name?: string;
  description?: string;
  category?: Category;
  category_id?: number;
  tags?: string[];
  base_cost?: number;
  base_price?: number;
  total_price?: number;
  stock?: number;
  sales?: number;
  thumbnail: ImageObj;
  images?: ProductImage[];
  price_table_mode?: boolean | string;
  price_table?: PriceGroup[];
  order_config?: OrderProps;
  serial?: string;
  // NOTE: These are also in ProductVariant, because I am not sure where it will be needed
  config: JSON;
  attrs: JSON;

  /**
   * stock product starts
   */
  is_stock: boolean;
  product_id?: string;
  product_key: string;
  variant_id?: string;
  cat_year?: string;
  expiration_date?: string;
  discontinued?: string;
  tag?: string;
  keywords?: string;
  // colors?: string; NOTE: should be included as variants
  themes?: string;
  dimension_list?: string;
  dimension_unit_list?: number[];
  dimension_type_list?: number[];

  // NOTE: This is largely replaced by PriceGroup Interface.
  // A field called price_code is provided there
  quantities_list?: number[];
  price_list?: number[];
  pr_code?: string;
  pieces_per_unit_list?: number[];

  quote_upon_request?: string;
  price_include_clr?: string;
  price_include_side?: string;
  price_include_loc?: string;
  setup_chg?: string;
  setup_chg_code?: string;
  screen_chg?: string;
  screen_chg_code?: string;
  plate_chg?: string;
  plate_chg_code?: string;
  die_chg?: string;
  die_chg_code?: string;
  tooling_chg?: string;
  tooling_chg_code?: string;
  repeat_chg?: string;
  repeat_chg_code?: string;
  add_clr_chg?: string;
  add_clr_chg_code?: string;
  add_clr_run_chg_list?: number[];
  add_clr_run_chg_code?: string;
  is_recyclable?: string;
  is_environmentally_friendly?: string;
  is_new_product?: string;
  not_suitable?: string;
  exclusive?: string;
  hazardous?: string;
  officially_licensed?: string;
  is_food?: string;
  is_clothing?: string;
  imprint_size_list?: number[];
  imprint_size_units_list?: number[];
  imprint_size_type_list?: number[];
  imprint_loc?: string;
  second_imprint_size_list?: number[];
  second_imprint_units_list?: number[];
  second_imprint_type_list?: number[];
  second_imprint_loc?: string;
  decoration_method?: string;
  no_decoration?: string;
  made_in_country?: string;
  assembled_in_country?: string;
  decorated_in_country?: string;
  compliance_list?: string;
  warning_lbl?: string;
  compliance_memo?: string;
  prod_time_lo?: string;
  prod_time_hi?: string;
  rush_prod_time_lo?: string;
  rush_prod_time_hi?: string;
  packing?: string;
  carton_l?: string;
  carton_w?: string;
  carton_h?: string;
  weight_per_carton?: string;
  units_per_carton?: string;
  ship_point_country?: string;
  ship_point_zip?: string;
  comment?: string;
  verified?: string;
  update_inventory?: string;
  inventory_on_hand?: string;
  inventory_on_hand_added?: string;
  inventory_memo?: string;
  owner?: string;
  /**
   * stock product ends
   */

  created_at?: string;
  updated_at?: string;

  variants: ProductVariant[];
}
