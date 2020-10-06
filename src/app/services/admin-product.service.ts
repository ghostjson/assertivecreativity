import { Injectable } from "@angular/core";
import { Product, listAllFeatures, listCustomOptions, PriceGroup } from "../models/Product";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

import { SelectItem } from 'primeng/api';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AdminProductService {
  host: string;
  API_URL: string;

  possibleOptions: Object;
  products: Product[] = [

  ];

  constructor(
    private _http: HttpClient,
    private _fb: FormBuilder
  ) {
    this.host = environment.apiUrl;

    this.API_URL = environment.apiUrl;

    // initialise the possible options
    this.possibleOptions = listAllFeatures();
  }

  /**
   * Return the products API link
   */
  getProductsLink(): string {
    return `${this.API_URL}/products`
  }

  /**
   * Return the product link
   * @param id id of the product
   */
  getProductLinkById(id: number): string {
    return `${this.getProductsLink()}/${id}`
  }

  /**
   * Fetch Product by ID from the API
   * @param id id of the product
   */
  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.getProductLinkById(id)}`)
      .pipe(
        take(1),
        map((product: any) => {
          return product.data;
        })
      );
  }

  /**
   * Fetch products from API
   */
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.getProductsLink()}`)
      .pipe(
        take(1),
        map((products: any) => {
          return products.data;
        })
      );
  }

  /**
   * Add product to server
   * @param product product object to add
   */
  addProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(`${this.getProductsLink()}`, product)
      .pipe(take(1));
  }

  /**
   * Edit product
   * @param editedProduct edited product object
   */
  editProduct(editedProduct: Product): Observable<Product> {
    return this._http.patch<Product>(`${this.getProductLinkById(editedProduct.id)}`, editedProduct)
      .pipe(take(1));
  }

  /**
   * Delete Product
   * @param id id of the product
   */
  deleteProduct(id: number): Observable<Product> {
    return this._http.delete<Product>(`${this.getProductLinkById(id)}`)
      .pipe(take(1));
  }

  /**
   * Delete a list of products
   * @param ids array of product ids to be removed
   */
  deleteProductsBatch(ids: number[]): void {
    this.products = this.products.filter((product: Product) => {
      return !ids.includes(product.id);
    });

    console.log(`delete products ${ids}`);
    console.log('Products left:', this.products);
    
  }

  /**
   * Create a price group for adding to a price table
   */
  newPriceGroup(initial: PriceGroup=null): FormGroup {
    let priceGroup: FormGroup = null;

    if (initial) {
      priceGroup = this._fb.group({
        label: [
          initial.label,
          [Validators.required]
        ],
        pricePerPiece: [
          initial.price_per_piece,
          [Validators.required]
        ],
        quantity: [
          initial.quantity,
          [Validators.required]
        ],
        relation: [
          initial.relation,
          [Validators.required]
        ]
      });   
    }
    else {
      priceGroup = this._fb.group(new PriceGroup());
    }

    return priceGroup;
  }

  /**
   * Add price group to a price table
   * @param priceTable Form array representing a price table
   */
  addPriceGroup(priceTable: FormArray): void {
    priceTable.push(this.newPriceGroup());
    console.log('new price group added');
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
  newOption(
    optionType: string,
    isChained: boolean=false,
    initialValue: any=null
  ): FormGroup {
    console.log("Creating ", optionType, " for the product!!");
    let optionTemplate: any = {};
    let optionToAdd = this.possibleOptions[optionType];

    if (optionToAdd) {
      console.log(optionToAdd.type, " feature found :-)");

      if (initialValue) {
        optionTemplate = {
          type: [
            optionToAdd.type,
            [Validators.required]
          ],
          title: [
            initialValue.title,
            [Validators.required]
          ],
          name: [
            initialValue.name,
            [Validators.required]
          ],
          meta: this._fb.group({
            isChained: initialValue.meta.isChained
          }),
          inputs: this._fb.array([])
        };

        initialValue.inputs.forEach((input) => {
          optionTemplate.inputs.push(
            this.newOptionInput(
              initialValue.type,
              initialValue.meta.isChained,
              input
            )
          );
        });
      }
      else {
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
      }

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
   * @param isChained true if the input is chained
   */
  newOptionInput(
    inputType: string,
    isChained: boolean=false,
    initialValue: any=null
  ): FormGroup {
    console.log("Creating ", inputType, " Input");

    console.log(inputType);

    // create the input formgroup
    let newInput: Object = {};

    if (initialValue) {
      this.possibleOptions[inputType].inputs.forEach((input: any) => {
        newInput[input.name] = initialValue[input.name];
      });
    }
    else {
      this.possibleOptions[inputType].inputs.forEach((input: any) => {
        newInput[input.name] = null;
      });
    }

    // add a form array for chained options if the option is not chained
    if (!isChained) {
      // add a form array for storing the chained options
      newInput['chainedOptions'] = this._fb.array([]) as FormArray;
      if (initialValue) {
        initialValue.chainedOptions.forEach((chainedOption: any) => {
          newInput['chainedOptions'].push(
            this.newOption(chainedOption.type, true, chainedOption)
          )
        });
      }

      // form control for specifying the chained option to insert during runtime
      newInput['selectedChainedOption'] = null;

      console.log('chained options form array added');
    }

    console.info('new option input created: ', newInput);
    return this._fb.group(newInput);
  }

  /**
   * add input to the corresponding option
   * @param inputType type of option to insert
   * @param inputs form array to add the inputs
   * @param formGroup form group of the inputs form array
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
}
