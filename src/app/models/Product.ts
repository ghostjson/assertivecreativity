import { SelectItem } from 'primeng/api';
import { FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Category } from './Category';

// features avalilable for products
const PRODUCT_FEATURES: Object = {
  color: {
    type: 'color',
    title: 'title goes here',
    name: 'Colors',
    inputs: [
      {
        type: 'text',
        name: 'label'
      },
      {
        type: 'text',
        name: 'value'
      }
    ]
  },
  radioBtn: {
    type: 'radioBtn',
    title: 'title goes here',
    name: 'Radio Buttons',
    inputs: [
      {
        type: 'text',
        name: 'label'
      },
      {
        type: 'text',
        name: 'value'
      }
    ]
  },
  dropdown: {
    type: 'dropdown',
    title: 'title goes here',
    name: 'Dropdown Selection',
    inputs: [
      {
        type: 'text',
        name: 'label'
      },
      {
        type: 'text',
        name: 'value'
      }
    ]
  },
  text: {
    type: 'text',
    title: 'Text input goes here',
    name: 'Text input',
    inputs: [
      {
        type: 'text',
        name: 'label'
      }
    ]
  }
};

// custom options list for custom form
const CUSTOM_OPTIONS: SelectItem[] = [
  {
    label: 'Colors',
    value: 'color'
  },
  {
    label: 'Radio Buttons',
    value: 'radioBtn'
  },
  {
    label: 'Dropdown Selection',
    value: 'dropdown'
  },
  {
    label: 'Text input',
    value: 'text',
  }
];


let _fb: FormBuilder = new FormBuilder();

// model describing a Product
export class Product {
  id?: number;
  seller_id?: number;
  name: string;
  serial: string;
  description: string;
  category?: Category;
  category_id: number;
  tags: string[];
  base_price: number;
  total_price?: number;
  stock: number;
  sales: number;
  image: string;
  price_table_mode: boolean | string;
  price_table: PriceGroup[];
  custom_forms?: CustomForm[];

  constructor(initial: Product=null) {
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
    }
    else {
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

  constructor(initial: ProductForm=null) {
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
    }
    else {
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
      this.price_table = _fb.array([
        _fb.group(
          new PriceGroup()
        )
      ]);
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
  chained_options?: Option[]
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
  relation: string;

  constructor(initial: PriceGroup=null) {
    if (initial) {
      this.label = initial.label;
      this.price_per_piece = initial.price_per_piece;
      this.quantity = initial.quantity;
      this.relation = initial.relation;
    }
    else {
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

    this.price_groups.push({
      label: null,
      price_per_piece: null,
      quantity: null,
      relation: null
    });
  }

  add(initial: PriceGroup=null): void {
    if (initial) {
      this.price_groups.push(initial);
    }
    else {
      this.price_groups.push({
        label: null,
        price_per_piece: null,
        quantity: null,
        relation: null
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
