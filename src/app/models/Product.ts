import { SelectItem } from 'primeng/api';
import { FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Category } from './Category';
import { StringifyOptions } from 'querystring';

// features avalilable for products
const PRODUCT_FEATURES: Object = {
  color: {
    type: 'color',
    title: 'title goes here',
    name: 'Colors',
    inputs: [
      {
        type: 'text',
        name: 'label',
      },
      {
        type: 'text',
        name: 'value',
      },
    ],
  },
  radioBtn: {
    type: 'radioBtn',
    title: 'title goes here',
    name: 'Radio Buttons',
    inputs: [
      {
        type: 'text',
        name: 'label',
      },
      {
        type: 'text',
        name: 'value',
      },
    ],
  },
  dropdown: {
    type: 'dropdown',
    title: 'title goes here',
    name: 'Dropdown Selection',
    inputs: [
      {
        type: 'text',
        name: 'label',
      },
      {
        type: 'text',
        name: 'value',
      },
    ],
  },
  text: {
    type: 'text',
    title: 'Text input goes here',
    name: 'Text input',
    inputs: [
      {
        type: 'text',
        name: 'label',
      },
    ],
  },
};

// custom options list for custom form
const CUSTOM_OPTIONS: SelectItem[] = [
  {
    label: 'Colors',
    value: 'color',
  },
  {
    label: 'Radio Buttons',
    value: 'radioBtn',
  },
  {
    label: 'Dropdown Selection',
    value: 'dropdown',
  },
  {
    label: 'Text input',
    value: 'text',
  },
];

let _fb: FormBuilder = new FormBuilder();

// model describing a Product
export class Product {
  id?: number;
  seller_id?: number;
  name?: string;
  serial?: string;
  description?: string;
  category?: Category;
  category_id?: number;
  tags?: string[];
  base_price?: number;
  total_price?: number;
  stock?: number;
  sales?: number;
  image?: string;
  price_table_mode?: boolean | string;
  price_table?: PriceGroup[];
  custom_forms?: CustomForm[];

  // stock product
  is_stock: boolean;
  product?: Product;
  product_id?: string;
  variant_id?: string;
  cat_year?: string;
  expiration_date?: string;
  discontinued?: string;
  images?: Array<{
    src: string;
    title: string;
    alt: string;
  }>;
  image_url_list?: string[];
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

  constructor(initial: Product = null) {
    if (initial) {
      this.id = initial.id;
      this.name = initial.name;
      this.serial = initial.serial;
      this.description = initial.description;
      this.category_id = initial.category_id;
      this.category = initial.category;
      this.tags = initial.tags;
      this.base_price = initial.base_price;
      this.stock = initial.stock;
      this.sales = initial.stock;
      this.sales = initial.sales;
      this.image = initial.image;
      this.price_table_mode = initial.price_table_mode;
      this.price_table = initial.price_table;
      this.custom_forms = initial.custom_forms;
    } else {
      this.name = '';
      this.serial = '';
      this.description = '';
      this.category_id = 0;
      this.category = null;
      this.tags = [];
      this.base_price = 0;
      this.stock = 0;
      this.sales = 0;
      this.image = '';
      this.price_table_mode = false;
      this.price_table = [new PriceGroup()];
      this.custom_forms = [new CustomForm()];
    }
  }
}

/**
 * Model for product forms
 */
export class ProductForm {
  id?: FormControl;
  name: FormControl;
  serial: FormControl;
  description: FormControl;
  category: FormControl;
  tags: FormControl;
  base_price: FormControl;
  stock: FormControl;
  stock_status: FormControl;
  sales: FormControl;
  image: FormControl;
  price_table_mode: FormControl;
  price_table: FormArray;
  features?: FormArray;
  custom_forms?: FormArray;

  constructor(initial: ProductForm = null) {
    if (initial) {
      this.id = initial.id;
      this.name = initial.name;
      this.serial = initial.serial;
      this.description = initial.description;
      this.category = initial.category;
      this.tags = initial.tags;
      this.base_price = initial.base_price;
      this.stock = initial.stock;
      this.stock_status = initial.stock_status;
      this.sales = initial.sales;
      this.image = initial.image;
      this.price_table_mode = initial.price_table_mode;
      this.price_table = initial.price_table;
      this.custom_forms = initial.custom_forms;
    } else {
      this.name = _fb.control(null);
      this.serial = _fb.control(null);
      this.description = _fb.control(null);
      this.category = _fb.control('none');
      this.tags = _fb.control([]);
      this.base_price = _fb.control(0);
      this.stock = _fb.control(0);
      this.stock_status = _fb.control('outofstock');
      this.sales = _fb.control(0);
      this.image = _fb.control(null);
      this.price_table_mode = _fb.control(false);
      this.price_table = _fb.array([_fb.group(new PriceGroup())]);
      this.custom_forms = _fb.array([]);
    }
  }
}

export class Option {
  name: string;
  title: string;
  type: string;
  price: number;
  inputs: any[];
  meta: OptionMeta;
}

export class OptionMeta {
  isChained: boolean;
  chained_ops_hidden?: boolean;
}

// model for customisation form
export class CustomForm {
  id: number;
  title: string;
  is_formgroup: boolean;
  parent_form: number;
  options: any[];
  custom_forms?: CustomForm[];
}

export class PriceGroup {
  label: string;
  price_per_piece: number;
  quantity: number;
  relation?: string;

  constructor(initial: PriceGroup = null) {
    if (initial) {
      this.label = initial.label;
      this.price_per_piece = initial.price_per_piece;
      this.quantity = initial.quantity;
      this.relation = initial.relation;
    } else {
      this.label = null;
      this.price_per_piece = null;
      this.quantity = null;
      this.relation = null;
    }
  }
}

export class PriceTable {
  public price_groups: PriceGroup[];

  constructor() {
    this.price_groups = [];
  }

  add(initial: PriceGroup = null): void {
    if (initial) {
      this.price_groups.push(initial);
    } else {
      this.price_groups.push({
        label: null,
        price_per_piece: null,
        quantity: null,
        relation: null,
      });
    }
  }
}

// return all the possible feature a product can have
export function listAllFeatures(): Object {
  return PRODUCT_FEATURES;
}

// return all possible custom options list
export function listCustomOptions(): SelectItem[] {
  return CUSTOM_OPTIONS;
}

export interface StockProduct {
  product: Product;
  attributes: StockProductAttributes;
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
  label: string;
  value: any;
}

export class ColorAttribute extends ProductAttribute {}
