import { Injectable } from '@angular/core';
import {
  Product,
  listCustomOptions,
  listAllFeatures,
  CustomForm,
  PriceTable,
  StockProduct,
  ProductAttribute,
} from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
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

  /**
   * Return the stock products link
   */
  private stockProductsLink(): string {
    return `${this.productsLink()}/stock`;
  }

  /**
   * Return stock product with id
   * @param id id of the product
   */
  private stockProductLink(id: number): string {
    return `${this.stockProductsLink()}/${id}`;
  }

  /**
   * stock products categories link
   */
  private stockProductsByCategoriesLink(): string {
    return `${this.stockProductsLink()}/categories`;
  }

  /**
   * get stock products
   */
  getStockProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.stockProductsLink()).pipe(
      take(1),
      map((products: Product[]): Product[] => {
        return products.map(
          (product: Product): Product => {
            product.is_stock = true;
            return product;
          }
        );
      })
    );
  }

  /**
   * get stock products by category list
   * @param categories category list to filter products
   */
  getStockProductsByCategoryList(
    categories: Category[]
  ): Observable<Product[]> {
    let categoryNames: string[] = categories.map((category: Category) => {
      return category.value as string;
    });

    return this._http
      .post<any>(this.stockProductsByCategoriesLink(), {
        categories: categoryNames,
      })
      .pipe(
        take(1),
        /**
         * TODO: fix after api bug fix
         */
        map((res: any[]) => {
          let products: Product[] = [];
          console.log('filter response: ', res);

          res.forEach((list: Product[]) => {
            products.push(...list);
            // list.forEach((product: Product) => {
            //   products.push(...list);
            // })
          });

          return products;
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
        productRes.attributes.colors = productRes.attributes.colors.map(
          (color: string): ProductAttribute => {
            return {
              label: color,
              value: color,
              show: true,
              price: 0,
              type: 'color'
            };
          }
        );

        // map product image url list to the object list
        productRes.product.images = <any>productRes.product.images.map(
          (url, index) => {
            return {
              src: url,
              title: 'Product Image ' + index,
              alt_text: 'Product Image',
            };
          }
        );

        productRes.attributes.variant_ids = productRes.attributes.variant_ids.map((id: string) => {
          return {
            label: id,
            value: id
          };
        });

        productRes.attributes.price_table_mode = true;
        productRes.attributes.price_table = new PriceTable();
        productRes.product.price_list.forEach(
          (price: number, index: number) => {
            if (productRes.product.quantities_list[index] > 0) {
              productRes.attributes.price_table.price_groups.push({
                label: `Price ${index + 1}`,
                price_per_piece: price,
                quantity: productRes.product.quantities_list[index],
              });
            }
          }
        );

        return productRes;
      })
    );
  }

  getUpdatedStockProduct(
    product: Product,
    attributes: {
      color?: string;
      variant_id?: string
    }
  ): Observable<Product[]> {
    let attributeReq = {
      colors: attributes.color,
      variant_id: attributes.variant_id
    };

    return this._http
      .post<Product[]>(
        `${this.stockProductsLink()}/${product.product_key}/updated`,
        attributeReq
      )
      .pipe(
        take(1),
        map((products) => {
          return products.map((product) => {
            // map product image url list to the object list
            product.images = <any>product.images.map((url, index) => {
              return {
                src: url,
                title: 'Product Image ' + index,
                alt_text: 'Product Image',
              };
            });

            return product;
          });
        })
      );
  }

  /**
   * Return link for custom products
   */
  private customProductsLink(): string {
    return `${this.productsLink()}/custom`;
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
    console.log('categories post: ', categoryIds);
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

  /**
   * get custom products
   */
  getCustomProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.customProductsLink()).pipe(
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
  getCustomProduct(id: number): Observable<Product> {
    return this._http.get(this.customProductLink(id)).pipe(
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
  searchProducts(
    searchString: string,
    is_stock: boolean
  ): Observable<Product[]> {
    searchString = searchString ? searchString : '';
    if (is_stock) {
      return this._http
        .post<Product[]>(`${this.stockProductsLink()}/search`, {
          query: searchString,
        })
        .pipe(take(1));
    } else {
      return this._http
        .get<Product[]>(`${this.customProductsLink()}/search/${searchString}`)
        .pipe(
          take(1),
          map((res: any) => {
            return res.data;
          })
        );
    }
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
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124'
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124'
      },
    ];
  }
}
