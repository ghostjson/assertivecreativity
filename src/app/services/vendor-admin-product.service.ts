import { Injectable } from "@angular/core";
import { Product, listAllFeatures, listCustomOptions } from "../models/Product";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { readSync } from "fs";

import { SelectItem } from 'primeng/api';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { table } from 'console';

@Injectable({
  providedIn: "root",
})
export class VendorAdminProductService {
  host: string;

  possibleOptions: Object;
  products: Product[] = [

  ];

  constructor(
    private http: HttpClient,
    private _fb: FormBuilder
  ) {
    this.host = environment.apiUrl;

    // initialise the possible options
    this.possibleOptions = listAllFeatures();
  }

  // async getProducts(): Promise<any> {
  //   let products = await this.http.get(this.host + "/products").toPromise();
  //   return products;
  // }

  getProducts(): Product[] {
    return this.products;
  }

  // async addProduct(product: Product): Promise<any> {
  addProduct(product: Product): void {
    // console.log(product);
    // let res = await this.http
    //   .post(this.host + "/products", product)
    //   .toPromise();
    // console.log(res);
    // return res;

    this.products.push(product);
    console.log('Product Added to vendor admin product service');
    console.info(this.products);
  }

  // async deleteProduct(id: number) {
  deleteProduct(id: number): void {
    // let res = await this.http.delete(this.host + `/products/${id}`).toPromise();
    this.products.splice(
      this.products.findIndex((product) => {
        return product.id === id;
      }),
      1
    )
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
   * @param optionType specify the option to insert
   * @param isChained specify the if the option is chained
   */
  newOption(optionType: string, isChained: boolean=false): FormGroup {
    console.log("Creating ", optionType, " for the product!!");
    let optionTemplate: Object = {};
    let optionToAdd = this.possibleOptions[optionType];

    if (optionToAdd) {
      console.log(optionToAdd.type, " feature found :-)");
      optionTemplate = {
        type: [
          optionToAdd.type,
          [Validators.required]
        ],
        title: [
          null,
          [Validators.required]
        ],
        name: [
          optionToAdd.name,
          [Validators.required]
        ],
        meta: this._fb.group({
          isChained: isChained
        }),
        inputs: this._fb.array([])
      };

      // if (isChained) {
      //   optionTemplate['index'] = index;
      // }

      return this._fb.group(optionTemplate);
    }
    else {
      console.error("Selected feature not found!");
      return null;
    }
  }

  /**
   * add option to an options form array
   * @param options form array to add the option
   * @param optionType type of the option to add
   */
  addOption(optionType: string, options: FormArray, isChained: boolean=false): void {
    let newOption: FormGroup = this.newOption(optionType, isChained);

    if (newOption != null) {
      // add the new option to options form array of the form
      options.push(newOption);
    }
    else {
      console.error('option could not be created!!');
    }
  }

  // remove option from the custom form
  removeOption(optionId: number, options: FormArray): void {
    console.log("Product feature: ", options.at(optionId));
    options.removeAt(optionId);
  }

  /**
   * construct a form group for taking new option's input
   * @param inputType type of the option
   */
  newOptionInput(inputType: string, isChained: boolean=false): FormGroup {
    console.log("Creating ", inputType, " Input");

    let newOption: Object = {};
    console.log(inputType);
    this.possibleOptions[inputType].inputs.forEach((input: any) => {
      newOption[input.name] = null;
    });

    // add a form array for chained options if the option is not chained
    if (!isChained) {
      // add a form array for storing the chained options
      newOption['chainedOptions'] = this._fb.array([]);

      // form control for specifying the chained option to insert during runtime
      newOption['selectedChainedOption'] = null;

      console.log('chained options form array added');
    }


    console.info('new option input created: ', newOption);
    return this._fb.group(newOption);
  }

  /**
   * add input to the corresponding option
   * @param inputs form array to add the inputs to
   * @param input type of option to insert
   */
  addOptionInput(inputType: string, inputs: FormArray, formGroup: FormGroup): void {
    console.info('isCHained value: ',formGroup.value.meta.isChained);

    inputs.push(this.newOptionInput(inputType, formGroup.value.meta.isChained));
    console.log("Input Added: ");
    console.table(inputs);
  }

  /**
   * remove the input from an option
   * @param inputs Formarray of inputs
   * @param inputId input index/id in the inputs form array
   */
  removeOptionInput(inputId: number, inputs: FormArray): void {
    inputs.removeAt(inputId);
  }

  /**
   * Generate an array of demo products for testing
   */
  seedProducts(): Product[] {
    let products: Product[] = [];

    // for (let index = 0; index < 10; index++) {
    //   products.push({

    //   })
    // }

    return products;
  }
}
