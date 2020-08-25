import { Injectable } from "@angular/core";
import {
  Product,
  listCustomOptions,
  listAllFeatures,
  Form,
  ProductForm
} from "../models/Product";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { VendorAdminProductService } from '../services/vendor-admin-product.service'
import { log } from 'console';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  host: string;
  products: Product[];
  possibleOptions: Object;

  constructor(
    private http: HttpClient, 
    private _fb: FormBuilder,
    private _vendorProdService: VendorAdminProductService
  ) {
    this.host = environment.apiUrl;

    // initialise the possible options
    this.possibleOptions = listAllFeatures();

    // intialise the product list
    this.initialiseProducts();
  }

  getProducts(): Product[] {
    let adminProducts = this._vendorProdService.getProducts();
    console.log('Products from ', adminProducts);    

    adminProducts.forEach((product) => {
      this.products.push(
        new Product(product)
      )
    });

    console.log('Products received: ', this.products);
    return this.products;
  }

  // async getProduct(id: number): Promise<any> {
  getProduct(id: number): Product {
    // let res = await this.http.get(this.host + `/products/${id}`).toPromise();

    // return new Promise((resolve, reject) => {
    //   res["data"]["features"] = JSON.parse(res["data"]["features"]);
    //   resolve(res);
    // });

    return this.products.find((product) => {
      return product.id === id;
    });
  }

  /**
   * return the list of the custom options possible
   */
  getCustomOptions(): SelectItem[] {
    return listCustomOptions();
  }

  /**
   * return the form template objects for inputs in options
   */
  getOptionDefinitions(): Object {
    return this.possibleOptions;
  }


  /**
   * Create an option to insert to the custom form
   * @param option option to insert
   */
  newFormOption(
    option: any
  ): FormGroup {
    let validators: Validators[] = [];

    let optionTemplate: any = {
      type: [option.type],
      title: [option.title],
      name: [option.name],
      price: [option.price],
      input: [null, validators],
      meta: {
        isChained: option.meta.isChained,
        chainedOpsHidden: true,
      }
    };
    
    if (!option.meta.isChained) {
      // push the validators 
      validators.push(
        Validators.required
      );

      // add chained options form array
      optionTemplate.chainedOptions = this._fb.array([]);
      
    }

    console.log('option created: ', this._fb.group(optionTemplate).value);

    return this._fb.group(optionTemplate);
  }

  /**
   * Create and add an option to a form
   * @param option Option formGroup to add
   * @param optionsArray Options formArray to add the option to
   */
  addFormOption(option: any, optionsArray: FormArray): void {
    optionsArray.push(
      this.newFormOption(option)
    );
  }

  /**
   * Create a formGroup for adding to custom form array
   * @param form form object to create formGroup
   */
  newForm(form: Form): FormGroup {
    let formTemplate = {
      id: form.id,
      title: form.title,
      parentForm: form.parentForm,
      options: this._fb.array([])
    };

    form.options.forEach((option) => {
      formTemplate.options.push(
        this.newFormOption(option)
      );
    });

    return this._fb.group(formTemplate);
  }

  /**
   * Create and add form to a formArray
   * @param form form object to create formGroup
   * @param formArray formArray to insert the formGroup
   */
  addForm(form: Form, formArray: FormArray): void {
    formArray.push(this.newForm(form))
  }
  
  /**
   * Return tags available
   */
  getAllTags(): SelectItem[] {
    let tags = [
      { label: "None", value: "none" },
      { label: "Sleeveless", value: "sleeveless" },
      { label: "Full Sleeve", value: "full-sleeve" },
      { label: "Half Sleeve", value: "half-sleeve" },
    ];

    return tags;
  }


  /**
   * Return all the categories
   */
  getAllCategories(): SelectItem[] {
    let categories = [
      { label: "None", value: "none" },
      { label: "Cloth", value: "cloth" },
      { label: "Scarf", value: "scarf" },
      { label: "Shorts", value: "shorts" },
      { label: "Socks", value: "socks" },
      { label: "Kashmiri Scarf", value: "kashmiriscarf" },
      { label: "Caps", value: "caps" },
      { label: "Underwear", value: "underwear" },
      { label: "T-Shirt", value: "tshirt" },
      { label: "Shirt", value: "shirt" },
    ];

    return categories;
  }

  initialiseProducts(): void {
    this.products = [
      new Product({
        id: 2384298374,
        name: "Shirt",
        serial: "ss-ff-12",
        description: "This is the description for the product",
        category: "shirt",
        tags: ["sleeveless", "full-sleeve", "half-sleeve"],
        basePrice: null,
        stock: 10000,
        stockStatus: "instock",
        sales: null,
        image: '/assets/images/demo-product-images/1.jpg',
        priceTableMode: true,
        priceTable: [
          {
            label: "base",
            pricePerPiece: 12,
            quantity: 100,
            relation: "lte",
          },
          {
            label: "wholesale",
            pricePerPiece: 5,
            quantity: 100,
            relation: "mte",
          },
        ],
        customForms: [
          {
            id: 0,
            title: "Custom Form 1",
            parentForm: null,
            options: [
              {
                type: "color",
                title: "Pick a color",
                name: "Colors",
                meta: {
                  isChained: false,
                },
                price: 10,
                inputs: [
                  {
                    label: "Reddish",
                    value: "#b61414",
                    chainedOptions: [],
                    selectedChainedOption: null,
                  },
                  {
                    label: "Violet",
                    value: "#bc26c7",
                    chainedOptions: [],
                    selectedChainedOption: null,
                  },
                ],
              },
              {
                type: "dropdown",
                title: "Pick a size",
                name: "Dropdown Selection",
                meta: {
                  isChained: false,
                },
                price: 20,
                inputs: [
                  {
                    label: "Large",
                    value: "large",
                    chainedOptions: [],
                    selectedChainedOption: null,
                  },
                  {
                    label: "Small",
                    value: "small",
                    chainedOptions: [
                      {
                        type: "radioBtn",
                        title: "Gender",
                        name: "Radio Buttons",
                        meta: {
                          isChained: true,
                        },
                        price: 0,
                        inputs: [
                          {
                            label: "Female",
                            value: "female",
                          },
                          {
                            label: "Male",
                            value: "male",
                          },
                          {
                            label: "Other",
                            value: "other",
                          },
                        ],
                      },
                    ],
                    selectedChainedOption: null,
                  },
                ],
              },
              {
                type: "radioBtn",
                title: "Pick a gender",
                name: "Radio Buttons",
                meta: {
                  isChained: false,
                },

                price: 0,
                inputs: [
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                  {
                    label: "Other",
                    value: "other",
                  },
                ],
              }
            ],
          },
          {
            id: 1,
            title: "Custom Form 2",
            parentForm: 0,
            options: [
              {
                type: "text",
                title: "Enter Contact number",
                name: "Text input",
                meta: {
                  isChained: false,
                },
                price: 0,
                inputs: [
                  {
                    label: "Contact Number",
                    chainedOptions: [
                      {
                        type: "radioBtn",
                        title: "Type of Number",
                        name: "Radio Buttons",
                        meta: {
                          isChained: true,
                        },
                        price: 0,
                        inputs: [
                          {
                            label: "Home",
                            value: "home",
                          },
                          {
                            label: "Office",
                            value: "office",
                          },
                        ],
                      },
                    ],
                    selectedChainedOption: null,
                  }
                ],
              },
            ],
          },
        ],
      }),
      new Product({
        id: 8374927,
        name: 'Shorts',
        serial: 'ss-hh-ii-rr-tt',
        description: 'This is the product description for the shirt now',
        category: 'shorts',
        tags: [
          'half-sleeve',
          'full-sleeve'
        ],
        basePrice: null,
        stock: 1000,
        stockStatus: 'outofstock',
        sales: null,
        image: '/assets/images/demo-product-images/1.jpg',
        priceTableMode: true,
        priceTable: [
          {
            label: 'base',
            pricePerPiece: 12,
            quantity: 100,
            relation: 'lte'
          },
          {
            label: 'wholesale',
            pricePerPiece: 5,
            quantity: 100,
            relation: 'mte'
          }
        ],
        customForms: [
          {
            id: 0,
            title: 'Order Specifications',
            parentForm: null,
            options: [
              {
                type: 'color',
                title: 'Pick a color',
                name: 'Colors',
                meta: {
                  isChained: false
                },
                inputs: [
                  {
                    label: 'Red',
                    value: '#9c102e',
                    chainedOptions: [
                      {
                        type: 'dropdown',
                        title: 'Pick pattern',
                        name: 'Dropdown Selection',
                        meta: {
                          isChained: true
                        },
                        inputs: [
                          {
                            label: 'checkered',
                            value: 'checkered'
                          },
                          {
                            label: 'plain',
                            value: 'plain'
                          }
                        ]
                      }
                    ],
                    selectedChainedOption: 'dropdown'
                  },
                  {
                    label: 'Blue',
                    value: null,
                    chainedOptions: [],
                    selectedChainedOption: null
                  }
                ]
              },
              {
                type: 'text',
                title: 'Enter any additional details for the order',
                name: 'Text input',
                meta: {
                  isChained: false
                },
                inputs: [
                  {
                    label: 'Enter details',
                    chainedOptions: [],
                    selectedChainedOption: null
                  }
                ]
              }
            ]
          },
          {
            id: 1,
            title: 'Enter Delivery Instructions',
            parentForm: null,
            options: [
              {
                type: 'radioBtn',
                title: 'Type of address',
                name: 'Radio Buttons',
                meta: {
                  isChained: false
                },
                inputs: [
                  {
                    label: 'Home (9 AM to 9 PM delivery)',
                    value: 'home-(9-am-to-9-pm-delivery)',
                    chainedOptions: [],
                    selectedChainedOption: null
                  },
                  {
                    label: 'Work  (9 AM to 5 PM delivery)',
                    value: 'work--(9-am-to-5-pm-delivery)',
                    chainedOptions: [],
                    selectedChainedOption: null
                  }
                ]
              }
            ]
          }
        ]
      }),
      new Product({
        id: 2763498236,
        name: 'Cloth',
        serial: 'ss-hh-ii-rr-tt',
        description: 'This is the product description for the shirt now',
        category: 'scarf',
        tags: [
          'sleeveless',
          'full-sleeve'
        ],
        basePrice: null,
        stock: 1000,
        stockStatus: 'outofstock',
        sales: null,
        image: '/assets/images/demo-product-images/1.jpg',
        priceTableMode: true,
        priceTable: [
          {
            label: 'base',
            pricePerPiece: 12,
            quantity: 100,
            relation: 'lte'
          },
          {
            label: 'wholesale',
            pricePerPiece: 5,
            quantity: 100,
            relation: 'mte'
          }
        ],
        customForms: [
          {
            id: 0,
            title: 'Order Specifications',
            parentForm: null,
            options: [
              {
                type: 'color',
                title: 'Pick a color',
                name: 'Colors',
                meta: {
                  isChained: false
                },
                inputs: [
                  {
                    label: 'Violet',
                    value: '#670a2e',
                    chainedOptions: [
                      {
                        type: 'dropdown',
                        title: 'Select a patter',
                        name: 'Dropdown Selection',
                        meta: {
                          isChained: true
                        },
                        inputs: [
                          {
                            label: 'checkered',
                            value: 'checkered'
                          },
                          {
                            label: 'plain',
                            value: 'plain'
                          }
                        ]
                      }
                    ],
                    selectedChainedOption: 'dropdown'
                  },
                  {
                    label: 'Blue',
                    value: '#0e2794',
                    chainedOptions: [
                      {
                        type: 'dropdown',
                        title: 'Select a pattern',
                        name: 'Dropdown Selection',
                        meta: {
                          isChained: true
                        },
                        inputs: [
                          {
                            label: 'checkered',
                            value: 'checkered'
                          },
                          {
                            label: 'plain',
                            value: 'plain'
                          }
                        ]
                      }
                    ],
                    selectedChainedOption: 'dropdown'
                  }
                ]
              },
              {
                type: 'text',
                title: 'Order Quantity',
                name: 'Text input',
                meta: {
                  isChained: false
                },
                inputs: [
                  {
                    label: 'Enter quantity in numbers',
                    chainedOptions: [],
                    selectedChainedOption: null
                  }
                ]
              }
            ]
          },
          {
            id: 1,
            title: 'Enter Delivery Instructions',
            parentForm: null,
            options: [
              {
                type: 'radioBtn',
                title: 'Type of Address',
                name: 'Radio Buttons',
                meta: {
                  isChained: false
                },
                inputs: [
                  {
                    label: 'Home (9 AM to 9 PM delivery)',
                    value: 'home-(9-am-to-9-pm-delivery)',
                    chainedOptions: [],
                    selectedChainedOption: null
                  },
                  {
                    label: 'Work (9 AM to 5 PM delivery)',
                    value: 'work-(9-am-to-5-pm-delivery)',
                    chainedOptions: [],
                    selectedChainedOption: null
                  }
                ]
              }
            ]
          }
        ]
      }),
    ];
  }
}
