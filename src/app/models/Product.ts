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
    inputs: [],
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
  description: string,
  price: number,
  stock: number,
  sales: number,
  image: string,
  features: Feature[],
  forms?: Form[]
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

// return all the possible feature a product can have
export function listAllFeatures(): Object {
  return PRODUCT_FEATURES;
}

// return all possible custom options list
export function listCustomOptions(): SelectItem[] {
  return CUSTOM_OPTIONS;
}
