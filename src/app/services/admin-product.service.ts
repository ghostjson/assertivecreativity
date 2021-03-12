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

import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { IdGeneratorService } from './id-generator.service';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  host: string;
  API_URL: string;

  possibleOptions: Object;

  /**
   * TODO: Remove this once a proper state management solution
   * is implemented
   */
  private state$: BehaviorSubject<any>;

  constructor(
    private _http: HttpClient,
    private _fb: FormBuilder,
    private _idGenService: IdGeneratorService
  ) {
    this.host = environment.apiUrl;
    this.API_URL = environment.apiUrl;

    /**
     * TODO: Remove this once a proper state management solution
     * is implemented
     */
    this.state$ = new BehaviorSubject<any>({
      activeProduct: null,
      activeAttr: null,
      activeChildAttr: null,
    });
  }

  /**
   * TODO: Remove this once a proper state management solution
   * is implemented
   */
  get state(): any {
    return this.state$.getValue();
  }

  getState(): Observable<any> {
    return this.state$.asObservable().pipe(distinctUntilChanged());
  }

  setState(newState: Partial<any>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
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
  addCustomProduct(product: CustomProduct | Product): Observable<Product> {
    /**
     * TODO: fix once the api is updated
     */
    let transformedProduct: Product = {
      name: product.product.name,
      base_price: product.product.base_price,
      image: this.testImageString,
      description: product.product.description,
      price_table: null,
      sales: product.product.sales,
      stock: product.product.stock,
      price_table_mode: false,
      category_id: 0,
      is_stock: false,
      product_key: product.product.product_id,
      custom_forms: product,
      serial: 'random',
    };
    return this._http
      .post<Product>(`${this.customProductsLink()}`, transformedProduct)
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
   * @param required true makes the image src required
   */
  createImgForm(initial?: ImageObj, required: boolean = true): FormGroup {
    let imgFormTemplate = null;
    let validators: ValidatorFn[] = [];

    if (required) {
      validators.push(Validators.required);
    }

    if (initial) {
      imgFormTemplate = {
        id: { value: this._idGenService.getId(), disabled: true },
        src: [initial.src, validators],
        alt_text: initial.alt_text,
        title: initial.title,
      };
    } else {
      imgFormTemplate = {
        id: { value: this._idGenService.getId(), disabled: true },
        src: ['', validators],
        alt_text: '',
        title: '',
      };
    }

    return this._fb.group(imgFormTemplate);
  }

  /**
   * create order prperties form
   * @param initial initial value of the order properties form
   */
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
        id: { value: this._idGenService.getId(), disabled: true },
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
        id: { value: this._idGenService.getId(), disabled: true },
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

  /**
   * create a formgroup for product attribute
   * @param type type of the attribute
   * @param is_attribute_group true if the attribute is parent attribute with children attributes
   * @param initial initial value of the attribute form
   */
  createProductAttrForm(
    is_attribute_group: boolean,
    type: string = 'generic',
    initial?: ProductAttribute
  ): FormGroup {
    let prodAttrFormTemplate = null;

    if (initial) {
      prodAttrFormTemplate = {
        id: { value: this._idGenService.getId(), disabled: true },
        type: [initial.type, [Validators.required]],
        label: [initial.label, [Validators.required]],
        value: initial.value,
        thumbnail: this.createImgForm(initial.thumbnail),
        images: this._fb.array([
          this._fb.group({
            front_view: this.createImgForm(initial.images[0].front_view, false),
            back_view: this.createImgForm(initial.images[0].back_view, false),
          }),
        ]),
        cost: [initial.cost, [Validators.required, Validators.min(0)]],
        price: [initial.price, [Validators.required, Validators.min(0)]],
        stock: [initial.stock, [Validators.required, Validators.min(0)]],
        sales: [initial.sales, [Validators.required, Validators.min(0)]],
        display_in_product: [initial.display_in_product, [Validators.required]],
        is_attribute_group: [initial.is_attribute_group, [Validators.required]],
      };

      // add in the child attributes if the attribute is a group
      if (initial.is_attribute_group) {
        prodAttrFormTemplate.child_attributes = this._fb.array(
          initial.child_attributes.map((childAttr) => {
            return this.createProductAttrForm(
              childAttr.is_attribute_group,
              childAttr.type ? childAttr.type : 'generic',
              childAttr
            );
          })
        );
      }
    } else {
      prodAttrFormTemplate = {
        id: { value: this._idGenService.getId(), disabled: true },
        type: [type, [Validators.required]],
        label: [
          'test label created for testing ' + this._idGenService.getId(),
          [Validators.required],
        ],
        value: '',
        thumbnail: this.createImgForm(null, false),
        images: this._fb.array([
          this._fb.group({
            front_view: this.createImgForm(null, false),
            back_view: this.createImgForm(null, false),
          }),
        ]),
        cost: [0, [Validators.required, Validators.min(0)]],
        price: [0, [Validators.required, Validators.min(0)]],
        stock: [0, [Validators.required, Validators.min(0)]],
        sales: [0, [Validators.required, Validators.min(0)]],
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
              attr.is_attribute_group,
              attr.type ? attr.type : 'generic',
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

  testImageString =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABkAAAARRCAYAAAB+GU6wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iNTBCODE2MDlCOTc4Mjk3RUFDMDhCODA1MzA1QUZGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDcyRDc4OUMyN0FGMTFFOUJCODRBQTZENzZGREExRTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDcyRDc4OUIyN0FGMTFFOUJCODRBQTZENzZGREExRTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNEIyRTZFODI2RkQxMUU5OUQ2MkNBRTcxREE2N0FDNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNEIyRTZFOTI2RkQxMUU5OUQ2MkNBRTcxREE2N0FDNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnyYWikAACeZSURBVHja7MEBAQAAAICQ/q/uCAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDZu/fYOsv7DuDvsX18jo99jq9x4sSOE4ekoeESQriVNtBQVqqwbkC1XqioQFUKozetK201OlSxqq3pjalaq6xMa+nWaW1VrSJQupYWlVIKhUBCSgik5ELu98SJ7eNz2fNiJ5O2SXPAdnzM5yN99Z7z+Lzved73+ee8+vl9HgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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';
}
