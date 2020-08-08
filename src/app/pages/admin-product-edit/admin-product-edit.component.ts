import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Product, Form } from 'src/app/models/Product';
import { VendorAdminProductService } from "../../services/vendor-admin-product.service";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.scss']
})
export class AdminProductEditComponent implements OnInit {
  productObj: any;
  product: any;
  possibleOptions: Object;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: VendorAdminProductService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    let id: number = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    this.productObj = this._productService.getProduct(id);
    this.possibleOptions = this._productService.getOptionDefinitions();
    console.info('Product received at edit page: ', this.productObj);
    console.info('Product Form Group Created: ', this.buildProduct().value);
    this.product = this.buildProduct();
  }

  // buildInputs(inputs: any[], type: string, isChained: boolean): FormArray {
  //   let inputsArray: FormArray = this._fb.array([]);

  //   inputs.forEach((input) => {
  //     inputsArray.push(
  //       this._productService.newOptionInput(type, isChained, input)
  //     )
  //   });

  //   return inputsArray;
  // }

  buildOptions(options: any[]): FormArray {
    let optionsArray: FormArray = this._fb.array([]);

    options.forEach((option) => {
      console.log(option.type);

      optionsArray.push(
        this._productService.newOption(
          option.type,
          option.meta.isChained,
          option
        )
      )
    });

    return optionsArray;
  }

  buildCustomForms(): FormArray {
    let customFormsArray: FormArray = this._fb.array([]);

    this.productObj.customForms.forEach((form: any) => {
      customFormsArray.push(
        this._fb.group({
          id: form.id,
          title: form.title,
          parentForm: form.parentForm,
          options: this.buildOptions(form.options)
        })
      );
    });

    return customFormsArray;
  }

  buildProduct(): FormGroup {
    let form: FormGroup = this._fb.group({
      id: [
        this.productObj.id,
        [Validators.required]
      ],
      name: [
        this.productObj.name,
        [Validators.required]
      ],
      serial: [
        this.productObj.serial,
        [Validators.required]
      ],
      description: [
        this.productObj.description,
        [Validators.required]
      ],
      basePrice: [
        this.productObj.basePrice,
        [Validators.required]
      ],
      stock: [
        this.productObj.sales,
        [Validators.required]
      ],
      image: [
        this.productObj.image,
        [Validators.required]
      ],
      category: [
        this.productObj.category,
        [Validators.required]
      ],
      tags: [
        this.productObj.tags,
        [Validators.required]
      ],
      customForms: this.buildCustomForms()
    });

    return form;
  }

  obj = {
    id: 281924903,
    name: 'Shirt Added',
    serial: '55-44-22-11',
    description: 'This is  the description of the product that I am going to use for testing.',
    basePrice: 10.56,
    stock: 10000,
    sales: 0,
    image: null,
    category: 'scarf',
    tags: [
      'full-sleeve',
      'sleeveless',
      'half-sleeve'
    ],
    customForms: [
      {
        id: 0,
        title: '',
        parentForm: null,
        options: [
          {
            type: 'color',
            title: 'Pick a cloth color',
            name: 'Colors',
            meta: {
              isChained: false
            },
            inputs: [
              {
                colorName: 'Maroon',
                colorHex: '#b41421',
                chainedOptions: [],
                selectedChainedOption: null
              },
              {
                colorName: 'Yellowish',
                colorHex: '#d7d414',
                chainedOptions: [],
                selectedChainedOption: null
              },
              {
                colorName: 'Greenish',
                colorHex: '#15a817',
                chainedOptions: [],
                selectedChainedOption: null
              }
            ]
          },
          {
            type: 'radioBtn',
            title: 'Select Sex',
            name: 'Radio Buttons',
            meta: {
              isChained: false
            },
            inputs: [
              {
                choiceText: 'Male',
                choiceValue: 'male',
                chainedOptions: [
                  {
                    type: 'radioBtn',
                    title: 'Pick Age group',
                    name: 'Radio Buttons',
                    meta: {
                      isChained: true
                    },
                    inputs: [
                      {
                        choiceText: 'Adult',
                        choiceValue: 'adult'
                      },
                      {
                        choiceText: 'Kid',
                        choiceValue: 'kid'
                      }
                    ]
                  }
                ],
                selectedChainedOption: 'radioBtn'
              },
              {
                choiceText: 'Female',
                choiceValue: 'female',
                chainedOptions: [
                  {
                    type: 'radioBtn',
                    title: 'Pick an age group',
                    name: 'Radio Buttons',
                    meta: {
                      isChained: true
                    },
                    inputs: [
                      {
                        choiceText: 'Adult',
                        choiceValue: 'adult'
                      },
                      {
                        choiceText: 'Kid',
                        choiceValue: 'kid'
                      }
                    ]
                  }
                ],
                selectedChainedOption: 'radioBtn'
              },
              {
                choiceText: 'LGBTQ',
                choiceValue: 'lgbtq',
                chainedOptions: [
                  {
                    type: 'radioBtn',
                    title: 'Pick an age group',
                    name: 'Radio Buttons',
                    meta: {
                      isChained: true
                    },
                    inputs: [
                      {
                        choiceText: 'Adult',
                        choiceValue: 'adult'
                      },
                      {
                        choiceText: 'Kid',
                        choiceValue: 'kid'
                      }
                    ]
                  }
                ],
                selectedChainedOption: 'radioBtn'
              }
            ]
          }
        ]
      }
    ]
  }

}
