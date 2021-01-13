import { Injectable } from "@angular/core";
import {
  Product,
  listCustomOptions,
  listAllFeatures,
  CustomForm,
  PriceTable,
  ColorAttribute,
  StockProduct,
  StockProductAttributes,
  ProductAttribute,
  StockProductData,
} from "../models/Product";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  products: Product[];
  possibleOptions: Object;
  API_URL: string;

  constructor(private _http: HttpClient, private _fb: FormBuilder) {
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

  private customProductsLink(): string {
    return `${this.productsLink()}/custom`;
  }

  /**
   * Return the stock products link
   */
  private stockProductsLink(): string {
    return `${this.productsLink()}/stock`;
  }

  /**
   * Return link for filtering product based on category
   * @param categoryId Id of the category
   */
  private customProductsLinkByCategoryId(categoryId: number): string {
    return `${this.customProductsLink()}/categories/${categoryId}`;
  }

  /**
   * Return link for filtering product based on a list of categories
   */
  private customProductsLinkByCategoryIdList(): string {
    return `${this.customProductsLink()}/categories/list`;
  }

  /**
   * Return link to the product details in the api
   * @param id Id of the product
   */
  private customProductLink(id: number): string {
    return `${this.customProductsLink()}/${id}`;
  }

  /**
   * Return stock product with id
   * @param id id of the product
   */
  private stockProductLink(id: number): string {
    return `${this.stockProductsLink()}/${id}`;
  }

  /**
   * Return all products of a particular category
   * @param categoryId category id of the products
   */
  getCustomProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this._http
      .get<Product[]>(this.customProductsLinkByCategoryId(categoryId))
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
  getCustomProductsByCategoryIdList(
    categoryIds: number[]
  ): Observable<Product[]> {
    console.log("categories post: ", categoryIds);
    return this._http
      .post<Product[]>(this.customProductsLinkByCategoryIdList(), {
        category_ids: categoryIds,
      })
      .pipe(
        take(1),
        map((res: any) => {
          return res.data as Product[];
        })
      );
  }

  getCustomProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.customProductsLink()).pipe(
      take(1),
      map((products: any) => {
        return products.data;
      })
    );
  }

  getStockProducts(): Observable<Product[]> {
    return this._http
      .get<Product[]>(this.stockProductsLink())
      .pipe(take(1));
  }

  /**
   * Return the product from the server
   * @param id Id of the product
   */
  getCustomProduct(id: number): Observable<Product> {
    return this._http.get(this.customProductLink(id)).pipe(
      take(1),
      map((product: any) => {
        return product.data;
      })
    );
  }

  /**
   * get stock product
   * @param id id of the product
   */
  getStockProduct(id: number): Observable<any> {
    return this._http.get(this.stockProductLink(id)).pipe(
      take(1),
      map((productRes: StockProduct) => {
        productRes.attributes.Colors = productRes.attributes.Colors.map(
          (color: string): ColorAttribute => {
            return {
              label: color,
              value: color,
            };
          }
        );

        productRes.attributes.price_table_mode = true;
        productRes.attributes.price_table = new PriceTable();
        productRes.attributes.price_table.price_groups[0] = {
          label: "Price 1",
          price_per_piece: Number(productRes.product.Prc1),
          quantity: Number(productRes.product.Qty1),
          relation: "lte",
        };

        productRes.attributes.price_table.price_groups.push({
          label: "Price 2",
          price_per_piece: Number(productRes.product.Prc2),
          quantity: Number(productRes.product.Qty2),
          relation: "lte",
        });

        productRes.attributes.price_table.price_groups.push({
          label: "Price 3",
          price_per_piece: Number(productRes.product.Prc3),
          quantity: Number(productRes.product.Qty3),
          relation: "lte",
        });

        productRes.attributes.price_table.price_groups.push({
          label: "Price 4",
          price_per_piece: Number(productRes.product.Prc4),
          quantity: Number(productRes.product.Qty4),
          relation: "lte",
        });

        productRes.attributes.price_table.price_groups.push({
          label: "Price 5",
          price_per_piece: Number(productRes.product.Prc5),
          quantity: Number(productRes.product.Qty5),
          relation: "lte",
        });

        productRes.attributes.price_table.price_groups.push({
          label: "Price 6",
          price_per_piece: Number(productRes.product.Prc6),
          quantity: Number(productRes.product.Qty6),
          relation: "lte",
        });

        return productRes;
      })
    );
  }

  /**
   * Search products using a search string
   * @param searchString search string
   */
  searchProducts(searchString: string): Observable<Product[]> {
    return this._http
      .get<Product[]>(`${this.productsLink()}/search/${searchString}`)
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
  getFeaturedProducts(): Product[] {
    return [
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: "assets/images/demo-product-images/2.jpg",
        base_price: 4.75,
        ItemNum: 'gh-45-xy'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: "assets/images/demo-product-images/2.jpg",
        base_price: 4.75,
        ItemNum: 'gh-45-xy'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: "assets/images/demo-product-images/2.jpg",
        base_price: 4.75,
        ItemNum: 'gh-45-xy'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: "assets/images/demo-product-images/2.jpg",
        base_price: 4.75,
        ItemNum: 'gh-45-xy'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: "assets/images/demo-product-images/2.jpg",
        base_price: 4.75,
        ItemNum: 'gh-45-xy'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: "assets/images/demo-product-images/2.jpg",
        base_price: 4.75,
        ItemNum: 'gh-45-xy'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: "assets/images/demo-product-images/2.jpg",
        base_price: 4.75,
        ItemNum: 'gh-45-xy'
      },
    ];
  }
}
