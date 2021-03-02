import { Injectable } from '@angular/core';
import {
  Product,
  PriceGroup,
  StockProduct,
  CustomProduct,
  ProductAttribute,
  ImageObj,
  OrderProps,
} from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { SelectItem } from 'primeng/api';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IdGeneratorService } from './id-generator.service';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  host: string;
  API_URL: string;

  possibleOptions: Object;

  constructor(
    private _http: HttpClient,
    private _fb: FormBuilder,
    private _idGenService: IdGeneratorService
  ) {
    this.host = environment.apiUrl;

    this.API_URL = environment.apiUrl;
  }

  /**
   * Return the products API link
   */
  private productsLink(): string {
    return `${this.API_URL}/products`;
  }

  private customProductsLink(): string {
    return `${this.productsLink()}/custom`;
  }

  private stockProductsLink(): string {
    return `${this.productsLink()}/stock`;
  }

  /**
   * Return the products API link for vendor
   */
  private vendorCustomProductsLink(): string {
    return `${this.customProductsLink()}/vendor`;
  }

  private vendorStockProductsLink(): string {
    return `${this.stockProductsLink()}/vendor`;
  }

  /**
   * Return the product link
   * @param id id of the product
   */
  private customProductLinkById(id: number): string {
    return `${this.customProductsLink()}/${id}`;
  }

  private stockProductLinkById(id: number): string {
    return `${this.stockProductsLink()}/${id}`;
  }

  private stockProductLinkByProductKey(productKey: string): string {
    return `${this.stockProductsLink()}/${productKey}`;
  }

  /**
   * Fetch products from API
   */
  getCustomProducts(userRole: string): Observable<Product[]> {
    if (userRole === 'vendor') {
      return this._http
        .get<Product[]>(`${this.vendorCustomProductsLink()}`)
        .pipe(
          take(1),
          map((products: any) => {
            return products.data as Product[];
          })
        );
    } else {
      return this._http.get<Product[]>(`${this.customProductsLink()}`).pipe(
        take(1),
        map((products: any) => {
          return products.data as Product[];
        })
      );
    }
  }

  /**
   * Fetch the stock products
   * @param userRole role of the user
   */
  getStockProducts(userRole: string): Observable<Product[]> {
    if (userRole === 'vendor') {
      return this._http
        .get<Product[]>(`${this.vendorStockProductsLink()}`)
        .pipe(take(1));
    } else {
      return this._http
        .get<Product[]>(`${this.stockProductsLink()}`)
        .pipe(take(1));
    }
  }

  /**
   * Fetch Product by ID from the API
   * @param id id of the product
   */
  getStockProduct(id: number): Observable<StockProduct> {
    return this._http
      .get<StockProduct>(`${this.stockProductLinkById(id)}`)
      .pipe(take(1));
  }

  /**
   * Delete stock product by product key
   * @param productKey product key of the stock product
   */
  deleteStockProduct(productKey: string): Observable<any> {
    return this._http
      .delete(`${this.stockProductLinkByProductKey(productKey)}`)
      .pipe(take(1));
  }

  /**
   * get custom product
   * @param id id of the product
   */
  getCustomProduct(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.customProductLinkById(id)}`).pipe(
      take(1),
      map((product: any) => {
        return product.data;
      })
    );
  }

  /**
   * Add product to server
   * @param product product object to add
   */
  addCustomProduct(product: Product): Observable<Product> {
    return this._http
      .post<Product>(`${this.customProductsLink()}`, product)
      .pipe(take(1));
  }

  /**
   * Edit product
   * @param editedProduct edited product object
   */
  editCustomProduct(editedProduct: Product): Observable<Product> {
    return this._http
      .post<Product>(
        `${this.customProductLinkById(editedProduct.id)}`,
        editedProduct
      )
      .pipe(take(1));
  }

  /**
   * Delete Product
   * @param id id of the product
   */
  deleteCustomProduct(id: number): Observable<Product> {
    return this._http
      .delete<Product>(`${this.customProductLinkById(id)}`)
      .pipe(take(1));
  }

  /********************** PRODUCT CREATION FUNCTIONS ***********************/

  /**
   * create formgroup for picking images
   * @param initial initial state of the image form
   */
  createImgForm(initial?: ImageObj): FormGroup {
    let imgFormTemplate = null;

    if (initial) {
      imgFormTemplate = {
        id: [this._idGenService.getId(), [Validators.required]],
        src: [initial.src, [Validators.required]],
        alt_text: [initial.alt_text, [Validators.required]],
        title: initial.title,
      };
    } else {
      imgFormTemplate = {
        id: [this._idGenService.getId(), [Validators.required]],
        src: ['', [Validators.required]],
        alt_text: ['', [Validators.required]],
        title: '',
      };
    }

    return this._fb.group(imgFormTemplate);
  }

  createOrderPropsForm(initial?: OrderProps): FormGroup {
    let orderPropsFormTemplate = null;

    if (initial) {
      orderPropsFormTemplate = {
        min_order_quantity: [
          initial.min_order_quantity,
          [Validators.required, Validators.min(1)],
        ],
        max_order_quantity: [initial.max_order_quantity, [Validators.required]],
        order_quantity_step: [
          initial.order_quantity_step,
          [Validators.required, Validators.min(1)],
        ],
      };
    } else {
      orderPropsFormTemplate = {
        min_order_quantity: [1, [Validators.required, Validators.min(1)]],
        max_order_quantity: [0, [Validators.required, Validators.min(0)]],
        order_quantity_step: [1, [Validators.required, Validators.min(1)]],
      };
    }

    return this._fb.group(orderPropsFormTemplate);
  }

  /**
   * create formgroup for base details of the custom product form
   * @param initial initial state of the product base form
   */
  createCustomProductBaseForm(initial?: Product): FormGroup {
    let baseFormTemplate = null;

    if (initial) {
      baseFormTemplate = {
        id: [this._idGenService.getId(), Validators.required],
        name: [initial.name, [Validators.required]],
        product_id: [initial.product_id, [Validators.required]],
        description: [initial.description, [Validators.required]],
        category: [initial.category, [Validators.required]],
        category_id: [initial.category_id, [Validators.required]],
        base_cost: [initial.base_cost, [Validators.required]],
        base_price: [initial.base_price, [Validators.required]],
        stock: [initial.stock, [Validators.required]],
        sales: [initial.sales, [Validators.required]],
        images: this._fb.array([
          this._fb.group({
            front_view: this.createImgForm(initial.images[0].front_view),
            back_view: this.createImgForm(initial.images[0].back_view),
          }),
        ]),
        price_table_mode: [initial.price_table_mode, [Validators.required]],
        price_table: this._fb.array([
          initial.price_table.map((priceGroupConfig) => {
            return this.newPriceGroupForm(priceGroupConfig);
          }),
        ]),
        is_stock: [false, [Validators.required]],
        order_props: this.createOrderPropsForm(initial.order_props),
      };
    } else {
      baseFormTemplate = {
        id: [this._idGenService.getId(), Validators.required],
        name: ['', [Validators.required]],
        product_id: ['', [Validators.required]],
        description: ['', [Validators.required]],
        category: [null, [Validators.required]],
        category_id: [null, [Validators.required]],
        base_cost: [0, [Validators.required, Validators.min(0)]],
        base_price: [0, [Validators.required, Validators.min(0)]],
        stock: [0, [Validators.required]],
        sales: [0, [Validators.required]],
        images: this._fb.array([
          this._fb.group({
            front_view: this.createImgForm(),
            back_view: this.createImgForm(),
          }),
        ]),
        price_table_mode: [false, [Validators.required]],
        price_table: this._fb.array([this.newPriceGroupForm()]),
        is_stock: [false, [Validators.required]],
        order_props: this.createOrderPropsForm(),
      };
    }

    return this._fb.group(baseFormTemplate);
  }

  createProductAttrForm(
    type: string,
    is_attribute_group: boolean,
    initial?: ProductAttribute
  ): FormGroup {
    let prodAttrFormTemplate = null;

    if (initial) {
      prodAttrFormTemplate = {
        id: [this._idGenService.getId(), [Validators.required]],
        type: [initial.type, [Validators.required]],
        label: [initial.label, [Validators.required]],
        value: initial.value,
        thumbnail: initial.thumbnail,
        images: this._fb.array([
          this._fb.group({
            front_view: this.createImgForm(initial.images[0].front_view),
            back_view: this.createImgForm(initial.images[0].back_view),
          }),
        ]),
        cost: [initial.cost, [Validators.required, Validators.min(0)]],
        price: [initial.price, [Validators.required, Validators.min(0)]],
        display_in_product: [initial.display_in_product, [Validators.required]],
        is_attribute_group: [initial.is_attribute_group, [Validators.required]],
      };

      // add in the child attributes if the attribute is a group
      if (initial.is_attribute_group) {
        prodAttrFormTemplate.child_attributes = this._fb.array(
          initial.child_attributes.map((childAttr) => {
            return this.createProductAttrForm(
              childAttr.type,
              childAttr.is_attribute_group,
              childAttr
            );
          })
        );
      }
    } else {
      prodAttrFormTemplate = {
        id: [this._idGenService.getId(), [Validators.required]],
        type: [type, [Validators.required]],
        label: [
          'test label created for testing' + this._idGenService.getId(),
          [Validators.required],
        ],
        value: '',
        thumbnail: '',
        images: this._fb.array([
          this._fb.group({
            front_view: this.createImgForm(),
            back_view: this.createImgForm(),
          }),
        ]),
        cost: [0, [Validators.required, Validators.min(0)]],
        price: [0, [Validators.required, Validators.min(0)]],
        display_in_product: [true, [Validators.required]],
        is_attribute_group: [is_attribute_group, [Validators.required]],
        child_attributes: this._fb.array([]),
      };
    }

    return this._fb.group(prodAttrFormTemplate);
  }

  /**
   * create a formgroup for the new custom product form
   * @param initial initial state of the product form
   */
  createCustomProductForm(initial?: CustomProduct): FormGroup {
    let newProductFormTemplate = null;

    if (initial) {
      newProductFormTemplate = {
        product: this.createCustomProductBaseForm(initial.product),
        attributes: this._fb.array(
          initial.attributes.map((attr) => {
            return this.createProductAttrForm(
              attr.type,
              attr.is_attribute_group,
              attr
            );
          })
        ),
      };
    } else {
      newProductFormTemplate = {
        product: this.createCustomProductBaseForm(),
        attributes: this._fb.array([]),
      };
    }

    return this._fb.group(newProductFormTemplate);
  }

  /**
   * Create a price group for adding to a price table
   */
  newPriceGroupForm(initial: PriceGroup = null): FormGroup {
    let priceGroup: FormGroup = null;

    if (initial) {
      priceGroup = this._fb.group({
        id: this._idGenService.getId(),
        cost_per_piece: [
          initial.cost_per_piece,
          [Validators.required, Validators.min(0)],
        ],
        price_per_piece: [
          initial.price_per_piece,
          [Validators.required, Validators.min(0)],
        ],
        quantity: [initial.quantity, [Validators.required, Validators.min(0)]],
      });
    } else {
      priceGroup = this._fb.group({
        id: this._idGenService.getId(),
        cost_per_piece: [0, [Validators.required, Validators.min(0)]],
        price_per_piece: [0, [Validators.required, Validators.min(0)]],
        quantity: [0, [Validators.required, Validators.min(0)]],
      });
    }

    return priceGroup;
  }

  /**
   * Add price group to a price table
   * @param priceTable Form array representing a price table
   */
  addPriceGroup(priceTable: FormArray): void {
    priceTable.push(this.newPriceGroupForm());
  }

  /**
   * Upload products from excel file
   * @param file excel file with product list
   */
  uploadProductsExcel(file: File) {
    let newFormData = new FormData();
    newFormData.append('sheet', file);

    return this._http
      .post(`${this.stockProductsLink()}/excel`, newFormData)
      .pipe(take(1));
  }
}
