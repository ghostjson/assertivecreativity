import { Injectable } from "@angular/core";
import { Product, listAllFeatures, listCustomOptions } from "../models/Product";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { readSync } from "fs";

import { SelectItem } from 'primeng/api';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: "root",
})
export class VendorAdminProductService {
  host: string;

  possibleOptions: Object;
  // products: Product[] = [
  //   {
  //     id: 385561953,
  //     name: "Super Demo Shirt",
  //     description:
  //       " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt earum natus ut architecto.",
  //     price: 100,
  //     stock: 1000,
  //     sales: 0,
  //     image: "assets/images/demo-product-images/p2.jpg",
  //     features: [
  //       {
  //         type: "color",
  //         title: "Pick a color",
  //         name: "Colors",
  //         inputs: [
  //           {
  //             colorName: "red",
  //             type: "text",
  //             colorHex: "#c40a0a",
  //           },
  //           {
  //             colorName: "blue",
  //             type: "text",
  //             colorHex: "#3d0eda",
  //           },
  //           {
  //             colorName: "green",
  //             type: "text",
  //             colorHex: "#44d015",
  //           },
  //         ],
  //       },
  //       {
  //         type: "radioBtn",
  //         title: "Select a radio button",
  //         name: "Radio Buttons",
  //         inputs: [
  //           {
  //             choiceText: "Red",
  //             type: "text",
  //             choiceValue: "red",
  //           },
  //           {
  //             choiceText: "Blue",
  //             type: "text",
  //             choiceValue: "blue",
  //           },
  //           {
  //             choiceText: "Green",
  //             type: "text",
  //             choiceValue: "green",
  //           },
  //           {
  //             choiceText: "Violet",
  //             type: "text",
  //             choiceValue: "violet",
  //           },
  //         ],
  //       },
  //       {
  //         type: "dropdown",
  //         title: "Select a size",
  //         name: "Dropdown Selection",
  //         inputs: [
  //           {
  //             choiceText: "Large",
  //             type: "text",
  //             choiceValue: "L",
  //           },
  //           {
  //             choiceText: "Medium",
  //             type: "text",
  //             choiceValue: "M",
  //           },
  //           {
  //             choiceText: "Small",
  //             type: "text",
  //             choiceValue: "S",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 385561953,
  //     name: "That product",
  //     description: "assets/images/demo-product-images/p2.jpg",
  //     price: 100,
  //     stock: 1000,
  //     sales: 0,
  //     image: "assets/images/demo-product-images/2.jpg",
  //     features: [
  //       {
  //         type: "color",
  //         title: "Pick a color",
  //         name: "Colors",
  //         inputs: [
  //           {
  //             colorName: "red",
  //             type: "text",
  //             colorHex: "#c40a0a",
  //           },
  //           {
  //             colorName: "blue",
  //             type: "text",
  //             colorHex: "#3d0eda",
  //           },
  //           {
  //             colorName: "green",
  //             type: "text",
  //             colorHex: "#44d015",
  //           },
  //         ],
  //       },
  //       {
  //         type: "radioBtn",
  //         title: "Select a radio button",
  //         name: "Radio Buttons",
  //         inputs: [
  //           {
  //             choiceText: "colorful",
  //             type: "text",
  //             choiceValue: "colorful",
  //           },
  //           {
  //             choiceText: "not coloful",
  //             type: "text",
  //             choiceValue: "not-colorful",
  //           },
  //         ],
  //       },
  //       {
  //         type: "dropdown",
  //         title: "Select a size",
  //         name: "Dropdown Selection",
  //         inputs: [
  //           {
  //             choiceText: "Large",
  //             type: "text",
  //             choiceValue: "L",
  //           },
  //           {
  //             choiceText: "Medium",
  //             type: "text",
  //             choiceValue: "M",
  //           },
  //           {
  //             choiceText: "Small",
  //             type: "text",
  //             choiceValue: "S",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 385561953,
  //     name: "This product",
  //     description: "This is the description of a product. It works good",
  //     price: 100,
  //     stock: 1000,
  //     sales: 0,
  //     image: "assets/images/demo-product-images/2.jpg",
  //     features: [
  //       {
  //         type: "color",
  //         title: "Pick a color",
  //         name: "Colors",
  //         inputs: [
  //           {
  //             colorName: "red",
  //             type: "text",
  //             colorHex: "#c40a0a",
  //           },
  //           {
  //             colorName: "blue",
  //             type: "text",
  //             colorHex: "#3d0eda",
  //           },
  //           {
  //             colorName: "green",
  //             type: "text",
  //             colorHex: "#44d015",
  //           },
  //         ],
  //       },
  //       {
  //         type: "radioBtn",
  //         title: "Select a radio button",
  //         name: "Radio Buttons",
  //         inputs: [
  //           {
  //             choiceText: "colorful",
  //             type: "text",
  //             choiceValue: "colorful",
  //           },
  //           {
  //             choiceText: "not coloful",
  //             type: "text",
  //             choiceValue: "not-colorful",
  //           },
  //         ],
  //       },
  //       {
  //         type: "dropdown",
  //         title: "Select a size",
  //         name: "Dropdown Selection",
  //         inputs: [
  //           {
  //             choiceText: "Large",
  //             type: "text",
  //             choiceValue: "L",
  //           },
  //           {
  //             choiceText: "Medium",
  //             type: "text",
  //             choiceValue: "M",
  //           },
  //           {
  //             choiceText: "Small",
  //             type: "text",
  //             choiceValue: "S",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  constructor(
    private http: HttpClient,
    private _fb: FormBuilder
  ) {
    this.host = environment.apiUrl;

    // initialise the possible options
    this.possibleOptions = listAllFeatures();
  }

  async getProducts(): Promise<any> {
    let products = await this.http.get(this.host + "/products").toPromise();
    return products;
  }

  async addProduct(product: Product): Promise<any> {
    console.log(product);
    let res = await this.http
      .post(this.host + "/products", product)
      .toPromise();
    console.log(res);
    return res;
  }

  async deleteProduct(id: number) {
    let res = await this.http.delete(this.host + `/products/${id}`).toPromise();
  }

  async getProduct(id: number): Promise<any> {
    let res = await this.http.get(this.host + `/products/${id}`).toPromise();

    return new Promise((resolve, reject) => {
      res["data"]["features"] = JSON.parse(res["data"]["features"]);
      resolve(res);
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
   * construct a form group for taking new option's input
   * @param inputType type of the option
   */
  newOptionInput(inputType: string): FormGroup {
    console.log("Creating ", inputType, " Input");

    let newOption: Object = {};
    console.log(inputType);
    this.possibleOptions[inputType].inputs.forEach((input: any) => {
      newOption[input.name] = null;
      newOption['type'] = input.type;
    });

    return this._fb.group(newOption);
  }

  /**
   * add input to the corresponding option
   * @param inputs form array to add the inputs to
   * @param input type of option to insert
   */
  addOptionInput(inputs: FormArray, input: string): void {
    inputs.push(this.newOptionInput(input));
    console.log(
      "Input Added: ",
      inputs
    );
  }

  /**
   * remove the input from an option
   * @param inputs Formarray of inputs
   * @param inputId input index/id in the inputs form array
   */
  removeOptionInput(inputs: FormArray, inputId: number): void {
    // let inputs = options.at(optionId).get('inputs') as FormArray;

    inputs.removeAt(inputId);
  }
}
