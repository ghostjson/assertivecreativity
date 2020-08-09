import { SelectItem } from 'primeng/api';

// features avalilable for products
const PRODUCT_FEATURES: Object = {
  color: {
    type: 'color',
    title: 'title goes here',
    name: 'Colors',
    inputs: [
      {
        type: 'text',
        name: 'colorName'
      },
      {
        type: 'text',
        name: 'colorHex'
      }
    ],
    chainedInputs: [
      {
        type: 'any',
        trigger: '*'
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
        name: 'choiceText'
      },
      {
        type: 'text',
        name: 'choiceValue'
      }
    ],
    chainedInputs: [
      {
        type: 'any',
        trigger: '*'
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
        name: 'choiceText'
      },
      {
        type: 'text',
        name: 'choiceValue'
      }
    ],
    chainedInputs: [
      {
        type: 'any',
        trigger: '*'
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
        name: 'placeholder'
      }
    ],
    chainedInputs: [
      {
        type: 'any',
        trigger: '*'
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


// model describing a Product
export interface Product {
  id?: number,
  name: string,
  serial: string,
  description: string,
  category: string,
  tags: string[],
  basePrice: number,
  stock: number,
  sales: number,
  image: string,
  priceTableMode: boolean,
  priceTable: PriceGroup[],
  features: Feature[],
  customForms?: Form[]
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
export interface Form {

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
