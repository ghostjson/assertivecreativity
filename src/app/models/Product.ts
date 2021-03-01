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
  custom_forms?: any[];

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
  label: string;
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

export class StockProductAttributes {
  colors?: any[];
  variant_ids?: any[];
  dimensions?: number[];
  price_table_mode?: boolean;
  price_table?: PriceTable;
}

export class ProductAttribute {
  id?: number;
  type: string;
  label: string;
  value: any;
  attribute_thumbnail?: ImageDetails;
  image?: ProductImage;
  cost?: number;
  price: number;
  show: boolean;
  is_attribute_group: boolean;
  child_attributes?: ProductAttribute[];

  constructor(id: number) {
    this.id = id;
  }
}

export interface ProductImage {
  front_view?: ImageDetails;
  back_view?: ImageDetails;
  left_view?: ImageDetails;
  right_view?: ImageDetails;
}

export class ImageDetails {
  id?: number;
  src: string;
  alt_text?: string;
  title?: string;
}
