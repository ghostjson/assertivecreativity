import { Injectable } from "@angular/core";
import {
  Product,
  listCustomOptions,
  listAllFeatures,
  Form
} from "../models/Product";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { log } from 'util';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  host: string;
  products: Product[];
  possibleOptions: Object;

  constructor(private http: HttpClient, private _fb: FormBuilder) {
    this.host = environment.apiUrl;

    // initialise the possible options
    this.possibleOptions = listAllFeatures();

    // intialise the product list
    this.initialiseProducts();
  }

  getProducts(): Product[] {
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
        id: 1,
        name: "Shirt",
        serial: "ss-ff-12",
        description: "This is the description for the product",
        category: "shirt",
        tags: ["sleeveless", "full-sleeve", "half-sleeve"],
        basePrice: null,
        stock: 10000,
        stockStatus: "instock",
        sales: null,
        image: null,
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
                    colorName: "Reddish",
                    colorHex: "#b61414",
                    chainedOptions: [],
                    selectedChainedOption: null,
                  },
                  {
                    colorName: "Violet",
                    colorHex: "#bc26c7",
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
                    choiceText: "Large",
                    choiceValue: "large",
                    chainedOptions: [],
                    selectedChainedOption: null,
                  },
                  {
                    choiceText: "Small",
                    choiceValue: "small",
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
                            choiceText: "Female",
                            choiceValue: "female",
                          },
                          {
                            choiceText: "Male",
                            choiceValue: "male",
                          },
                          {
                            choiceText: "Other",
                            choiceValue: "other",
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
                    choiceText: "Male",
                    choiceValue: "male",
                  },
                  {
                    choiceText: "Female",
                    choiceValue: "female",
                  },
                  {
                    choiceText: "Other",
                    choiceValue: "other",
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
                    placeholder: "Contact Number",
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
                            choiceText: "Home",
                            choiceValue: "home",
                          },
                          {
                            choiceText: "Office",
                            choiceValue: "office",
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
        id: 2,
        name: "Shirt",
        serial: "ss-ff-12",
        description: "This is the description for the product",
        category: "shirt",
        tags: ["sleeveless", "full-sleeve", "half-sleeve"],
        basePrice: null,
        stock: 10000,
        stockStatus: "instock",
        sales: null,
        image: null,
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
                price: 13,
                inputs: [
                  {
                    colorName: "Reddish",
                    colorHex: "#b61414",
                    chainedOptions: [],
                    selectedChainedOption: null,
                  },
                  {
                    colorName: "Violet",
                    colorHex: "#bc26c7",
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
                inputs: [
                  {
                    choiceText: "Large",
                    choiceValue: "large",
                    chainedOptions: [
                      {
                        type: "radioBtn",
                        title: "Pick a gender",
                        name: "Radio Buttons",
                        meta: {
                          isChained: true,
                        },
                        price: 0,
                        inputs: [
                          {
                            choiceText: "Male",
                            choiceValue: "male",
                          },
                          {
                            choiceText: "Female",
                            choiceValue: "female",
                          },
                          {
                            choiceText: "Other",
                            choiceValue: "other",
                          },
                        ],
                      },
                    ],
                    selectedChainedOption: null,
                  },
                  {
                    choiceText: "Small",
                    choiceValue: "small",
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
                            choiceText: "Female",
                            choiceValue: "female",
                          },
                          {
                            choiceText: "Male",
                            choiceValue: "male",
                          },
                          {
                            choiceText: "Other",
                            choiceValue: "other",
                          },
                        ],
                      },
                    ],
                    selectedChainedOption: null,
                  },
                ],
              },
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
                price: 11,
                inputs: [
                  {
                    placeholder: "Contact Number",
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
                            choiceText: "Home",
                            choiceValue: "home",
                          },
                          {
                            choiceText: "Office",
                            choiceValue: "office",
                          },
                        ],
                      },
                    ],
                    selectedChainedOption: null,
                  },
                ],
              },
            ],
          },
        ],
      }),
      new Product({
        id: 3,
        name: "Shirt",
        serial: "ss-ff-12",
        description: "This is the description for the product",
        category: "shirt",
        tags: ["sleeveless", "full-sleeve", "half-sleeve"],
        basePrice: null,
        stock: 10000,
        stockStatus: "instock",
        sales: null,
        image: null,
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
                price: 45,
                inputs: [
                  {
                    colorName: "Reddish",
                    colorHex: "#b61414",
                    chainedOptions: [],
                    selectedChainedOption: null,
                  },
                  {
                    colorName: "Violet",
                    colorHex: "#bc26c7",
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
                price: 6,
                inputs: [
                  {
                    choiceText: "Large",
                    choiceValue: "large",
                    chainedOptions: [
                      {
                        type: "radioBtn",
                        title: "Pick a gender",
                        name: "Radio Buttons",
                        meta: {
                          isChained: true,
                        },
                        price: 0,
                        inputs: [
                          {
                            choiceText: "Male",
                            choiceValue: "male",
                          },
                          {
                            choiceText: "Female",
                            choiceValue: "female",
                          },
                          {
                            choiceText: "Other",
                            choiceValue: "other",
                          },
                        ],
                      },
                    ],
                    selectedChainedOption: null,
                  },
                  {
                    choiceText: "Small",
                    choiceValue: "small",
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
                            choiceText: "Female",
                            choiceValue: "female",
                          },
                          {
                            choiceText: "Male",
                            choiceValue: "male",
                          },
                          {
                            choiceText: "Other",
                            choiceValue: "other",
                          },
                        ],
                      },
                    ],
                    selectedChainedOption: null,
                  },
                ],
              },
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
                    placeholder: "Contact Number",
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
                            choiceText: "Home",
                            choiceValue: "home",
                          },
                          {
                            choiceText: "Office",
                            choiceValue: "office",
                          },
                        ],
                      },
                    ],
                    selectedChainedOption: null,
                  },
                  {
                    placeholder: null,
                    chainedOptions: [],
                    selectedChainedOption: null,
                  },
                ],
              },
            ],
          },
        ],
      }),
    ];
  }
}
