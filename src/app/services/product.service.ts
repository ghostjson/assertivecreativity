import { Injectable } from '@angular/core';
import {
  Product,
  PriceTable,
  StockProduct,
  ProductAttribute,
  CustomProduct,
} from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from '../models/Category';
import { StateService } from '../store/state/state.service';
import { ProductServiceState } from '../models/ProductServiceState';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends StateService<ProductServiceState> {
  private products: Product[];
  private API_URL: string;

  constructor(private _http: HttpClient, private _fb: FormBuilder) {
    super({
      activeProductId: null,
      activeAttrGrps: [],
      selectedAttributes: [],
      showSummaryPanel: false,
    });

    this.API_URL = environment.apiUrl;
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
              display_in_product: true,
              price: 0,
              stock: 0,
              sales: 0,
              is_attribute_group: false,
              type: 'color',
            };
          }
        );

        // map product images string list to the ProductImage list
        productRes.product.images = productRes.product.images.map(
          (url, index) => {
            return {
              front_view: {
                src: <string>url,
                title: 'Product Image ' + index,
                alt_text: 'Product Image',
              },
            };
          }
        );

        productRes.attributes.variant_ids = productRes.attributes.variant_ids.map(
          (id: string) => {
            return {
              label: id,
              value: id,
            };
          }
        );

        productRes.attributes.price_table_mode = true;
        productRes.attributes.price_table = new PriceTable();
        productRes.product.price_list.forEach(
          (price: number, index: number) => {
            if (productRes.product.quantities_list[index] > 0) {
              productRes.attributes.price_table.price_groups.push({
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
      variant_id?: string;
    }
  ): Observable<Product[]> {
    let attributeReq = {
      colors: attributes.color,
      variant_id: attributes.variant_id,
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
            // map product images string list to the ProductImage list
            product.images = product.images.map((url, index) => {
              return {
                front_view: {
                  src: <string>url,
                  title: 'Product Image ' + index,
                  alt_text: 'Product Image',
                },
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
  getCustomProduct(id: number): Observable<CustomProduct> {
    return this._http.get(this.customProductLink(id)).pipe(
      take(1),
      map((product: any) => {
        /**
         * TODO: change after the api is updated
         */
        return product.data.custom_forms;
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
        product_key: '1234124',
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124',
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124',
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124',
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124',
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124',
      },
      {
        id: 1,
        name: "Men's Polyester Satin Shiny Slim Tie",
        image: 'assets/images/demo-product-images/2.jpg',
        base_price: 4.75,
        is_stock: false,
        product_key: '1234124',
      },
    ];
  }

  /**
   * state management
   */

  /**
   * get the active attribure groups from the state
   * @returns active attribute groups
   */
  getActiveProductAttrs() {
    return this.select((state) => {
      return state.activeAttrGrps;
    });
  }

  /**
   * add an attribute group to the active state
   * @param attrFormGroup active formgroup to add to the state
   */
  addActiveAttrGrp(attrFormGroup: FormGroup): void {
    this.setState({
      activeAttrGrps: [...this.state.activeAttrGrps, attrFormGroup],
    });
  }

  /**
   * remove active attribute group from the active attributes state
   * @param removeIndex index of the active attribute to remove
   */
  removeActiveAttrGrp(removeIndex: number): void {
    this.setState({
      activeAttrGrps: this.state.activeAttrGrps.filter((val, index) => {
        return index !== removeIndex;
      }),
    });
  }

  /**
   * get the attributes selected by the user from the state
   * @returns selected attributes by the user
   */
  getSelectedAttrs() {
    return this.select((state) => {
      return state.selectedAttributes;
    });
  }

  /**
   * add selected attribute to the state
   * @param attrConfig config/value of the selected attribute
   * @param attrForm formgroup that the attribute is part of
   */
  addSelectedAttribute(
    attrConfig: ProductAttribute,
    attrForm: FormGroup
  ): void {
    this.removeSelectedAttribute(attrForm?.value?.id);
    this.setState({
      selectedAttributes: [
        ...this.state.selectedAttributes,
        {
          form: attrForm,
          config: attrConfig,
        },
      ],
    });
  }

  /**
   * remove a selected attribute from the state
   * @param id id of the selected attribute to remove
   */
  removeSelectedAttribute(id: number): void {
    this.setState({
      selectedAttributes: this.state.selectedAttributes.filter((val) => {
        return id !== val.form.value.id;
      }),
    });
  }

  setSummaryPanel(visibility: boolean): void {
    this.setState({
      showSummaryPanel: visibility,
    });
  }

  getSummaryPanelState(): Observable<boolean> {
    return this.select((state) => {
      return state.showSummaryPanel;
    });
  }
}
