import { SelectItem } from 'primeng/api';
import { FormArray, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

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
  name: string;
  serial: string;
  description: string;
  category: string;
  tags: string[];
  basePrice: number;
  stock: number;
  stockStatus: string;
  sales: number;
  image: string;
  priceTableMode: boolean;
  priceTable: PriceGroup[];
  features?: Feature[];
  customForms?: Form[];

  constructor(initial: any=null) {
    if (initial) {
      this.id = initial.id;
      this.name = initial.name;
      this.serial = initial.serial;
      this.description = initial.description;
      this.category = initial.category;
      this.tags = initial.tags;
      this.basePrice = initial.basePrice;
      this.stock = initial.stock;
      this.stockStatus = this.availability();
      this.sales = initial.stock;
      this.sales = initial.sales;
      this.image = initial.image;
      this.priceTableMode = initial.priceTableMode;
      this.priceTable = initial.priceTable;
      this.customForms = initial.customForms;
    }
    else {
      this.id = null;
      this.name = null;
      this.serial = null;
      this.description = null;
      this.category = null;
      this.tags = null;
      this.basePrice = null;
      this.stock = null;
      this.stockStatus = this.availability();
      this.sales = null;
      this.sales = null;
      this.image = null;
      this.priceTableMode = false;
      this.priceTable = [new PriceGroup()];
      this.customForms = [new Form()];
    }
  }

  /**
   * Return the availability of the product
   */
  availability(): string {
    let status: string = 'instock';

    if (this.stock < 10) {
      status = 'lowstock';
    }

    if (this.stock <= 0) {
      status = 'outofstock';
    }

    return status;
  }

  /**
   * Update the stock status according to the stock
   */
  updateStockStatus(): string {
    this.stockStatus = this.availability();
    console.log('stock status updated');

    return this.stockStatus;
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
  basePrice: FormControl;
  stock: FormControl;
  stockStatus: FormControl;
  sales: FormControl;
  image: FormControl;
  priceTableMode: FormControl;
  priceTable: FormArray;
  features?: FormArray;
  customForms?: FormArray;

  constructor(initial: ProductForm=null) {
    if (initial) {
      this.id = initial.id;
      this.name = initial.name;
      this.serial = initial.serial;
      this.description = initial.description;
      this.category = initial.category;
      this.tags = initial.tags;
      this.basePrice = initial.basePrice;
      this.stock = initial.stock;
      this.stockStatus = initial.stock;
      this.sales = initial.sales;
      this.image = initial.image;
      this.priceTableMode = initial.priceTableMode;
      this.priceTable = initial.priceTable;
      this.customForms = initial.customForms;
    }
    else {
      this.id = _fb.control(null);
      this.name = _fb.control(null);
      this.serial = _fb.control(null);
      this.description = _fb.control(null);
      this.category = _fb.control(null);
      this.tags = _fb.control(null);
      this.basePrice = _fb.control(null);
      this.stock = _fb.control(null);
      this.stockStatus = _fb.control('outofstock');
      this.sales = _fb.control(null);
      this.sales = _fb.control(null);
      this.image = _fb.control(null);
      this.priceTableMode = _fb.control(false);
      this.priceTable = _fb.array([
        _fb.group(
          new PriceGroup()
        )
      ])
      this.customForms = _fb.array([]);
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
  chainedOptions?: Option[]
}

export class OptionMeta {
  isChained: boolean;
  chainedOpsHidden?: boolean;
}


// model for features
export interface Feature {
  type: string,
  trigger?: string,
  price?: number,
  title: string,
  name: string,
  inputs: Array<any>,
  chainedInputs?: Feature[]
}

// model for customisation form
export class Form {
  id: number;
  title: string;
  parentForm: number;
  options: any[]
}

export class PriceGroup {
  label: string;
  pricePerPiece: number;
  quantity: number;
  relation: string;

  constructor(initial: PriceGroup=null) {
    if (initial) {
      this.label = initial.label;
      this.pricePerPiece = initial.pricePerPiece;
      this.quantity = initial.quantity;
      this.relation = initial.relation;
    }
    else {
      this.label = null;
      this.pricePerPiece = null;
      this.quantity = null;
      this.relation = null;
    }
  }
}

export class PriceTable {
  public priceGroups: PriceGroup[];

  constructor() {
    this.priceGroups = [];

    this.priceGroups.push({
      label: null,
      pricePerPiece: null,
      quantity: null,
      relation: null
    });
  }

  add(initial: PriceGroup=null): void {
    if (initial) {
      this.priceGroups.push(initial);
    }
    else {
      this.priceGroups.push({
        label: null,
        pricePerPiece: null,
        quantity: null,
        relation: null
      });
    }
  }

  // add(priceGroup: PriceGroup): void {
  //   this.priceGroups.push(priceGroup);
  //   console.log('price group added to table', priceGroup);
  // }
}

// return all the possible feature a product can have
export function listAllFeatures(): Object {
  return PRODUCT_FEATURES;
}

// return all possible custom options list
export function listCustomOptions(): SelectItem[] {
  return CUSTOM_OPTIONS;
}
