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
        type: 'color',
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
        type: 'color',
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
        type: 'color',
        trigger: '*'
      }
    ]
  }
};


// model describing a Product
export interface Product {
  id?: number,
  name: string,
  description: string,
  price: number,
  stock: number,
  sales: number,
  image: string,
  features: Feature[]
}


// model for features
export interface Feature {
  type: string,
  trigger?: string,
  price?: number,
  title: string,
  name: string,
  inputs: Array<Object>,
  chainedInputs?: Feature[]
}

// return all the possible feature a product can have
export function listAllFeatures(): Object {
  return PRODUCT_FEATURES;
}
