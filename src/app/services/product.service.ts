import { Injectable } from "@angular/core";
import {
  Product,
  listCustomOptions,
  listAllFeatures,
  CustomForm
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
  private productsLink(): string {
    return `${this.API_URL}/products`;
  }

  /**
   * Return link for filtering product based on category
   * @param categoryId Id of the category
   */
  private productsLinkByCategoryId(categoryId: number): string {
    return `${this.productsLink()}/categories/${categoryId}`;
  }

  /**
   * Return link for filtering product based on a list of categories
   */
  private productsLinkByCategoryIdList(): string {
    return `${this.productsLink()}/categories/list`;
  }

  /**
   * Return link to the product details in the api
   * @param id Id of the product
   */
  private productLink(id: number): string {
    return `${this.productsLink()}/${id}`;
  }

  /**
   * Return all products of a particular category
   * @param categoryId category id of the products
   */
  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this._http.get<Product[]>(this.productsLinkByCategoryId(categoryId))
      .pipe(
        take(1),
        map((res: any) => {
          return res.data as Product[];
        })
      );
  }

  /**
   * Return products belonging to a list of category ids
   * @param categoryIds categories id list
   */
  getProductByCategoryIdList(categoryIds: number[]): Observable<Product[]> {
    return this._http.post<Product[]>(this.productsLinkByCategoryIdList(), {
      /**
       * TODO: fix after json_decode expects string error in the backend 
       */
      category_ids: JSON.stringify(categoryIds)
    })
      .pipe(
        take(1),
        map((res: any) => {
          return res.data as Product[];
        })
      );
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.productsLink())
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
    return this._http.get(this.productLink(id))
      .pipe(
        take(1),
        map((product: any) => {
          return product.data;
        })
      );
  }

  /**
   * Search products using a search string
   * @param searchString search string
   */
  searchProducts(searchString: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.productsLink()}/search/${searchString}`)
      .pipe(
        take(1),
        map((res: any) => {
          return res.data;
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
  newForm(form: CustomForm): FormGroup {
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
  addForm(form: CustomForm, formArray: FormArray): void {
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
