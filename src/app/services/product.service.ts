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
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  products: Product[];
  possibleOptions: Object;
  API_URL: string;

  constructor(
    private _http: HttpClient,
    private _fb: FormBuilder
  ) {
    this.API_URL = environment.apiUrl;

    // initialise the possible options
    this.possibleOptions = listAllFeatures();
  }
  
  /**
   * Return the products link
   */
  productsLink(): string {
    return `${this.API_URL}/products`;
  }

  /**
   * Return link to the product details in the api
   * @param id Id of the product
   */
  productLink(id: number): string {
    return `${this.productsLink()}/${id}`;
  }

  getProducts(filter: any={categories: [], tags: []}): Observable<Product[]> {
    let reqLink: string = `${this.productsLink()}?`;

    // add the categories 
    filter.categories.forEach((category: string) => {
      reqLink += `category=${category}&`;
    });

    // add the tags 
    filter.tags.forEach((tag: string) => {
      reqLink += `tags=${tag}&`;
    });

    console.info('products request link: ', reqLink);
    return this._http.get<Product[]>(reqLink)
      .pipe(
        take(1),
        map((products: any) => {
          return products.data;
        })
      );
  }

  /**
   * Return the product from the server
   * @param id Id of the product
   */
  getProduct(id: number): Observable<any> {
    console.log('product link: ', this.productLink(id));
    return this._http.get(this.productLink(id))
      .pipe(
        take(1),
        map((product: any) => {
          return product.data;
        })
      );
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
  newFormOption(option: any): FormGroup {
    let validators: Validators[] = [];

    let optionTemplate: any = {
      type: [option.type],
      title: [option.title],
      name: [option.name],
      price: [option.price],
      input: [null, validators],
      meta: {
        isChained: option.meta.isChained,
        chained_ops_hidden: true,
      },
    };

    if (!option.meta.isChained) {
      // push the validators
      validators.push(Validators.required);

      // add chained options form array
      optionTemplate.chained_options = this._fb.array([]);
    }

    console.log("option created: ", this._fb.group(optionTemplate).value);

    return this._fb.group(optionTemplate);
  }

  /**
   * Create and add an option to a form
   * @param option Option formGroup to add
   * @param optionsArray Options formArray to add the option to
   */
  addFormOption(option: any, optionsArray: FormArray): void {
    optionsArray.push(this.newFormOption(option));
  }

  /**
   * Create a formGroup for adding to custom form array
   * @param form form object to create formGroup
   */
  newForm(form: Form): FormGroup {
    let formTemplate = {
      id: form.id,
      title: form.title,
      parent_form: form.parent_form,
      options: this._fb.array([]),
    };

    form.options.forEach((option) => {
      formTemplate.options.push(this.newFormOption(option));
    });

    return this._fb.group(formTemplate);
  }

  /**
   * Create and add form to a formArray
   * @param form form object to create formGroup
   * @param formArray formArray to insert the formGroup
   */
  addForm(form: Form, formArray: FormArray): void {
    formArray.push(this.newForm(form));
  }

  /**
   * Return the feature products
   */
  getFeaturedProducts(): any {
    return {
      title: "Today's Offer",
      slides: [
        {
          name: "test featured product 1",
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          name: "test featured product 2",
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          name: "test featured product 3",
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          name: "test featured product 4",
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          name: "test featured product 5",
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          name: "test featured product 6",
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
        {
          name: "test featured product 7",
          image: "https://via.placeholder.com/200x200.png",
          url: "",
        },
      ],
    };
  }
}
