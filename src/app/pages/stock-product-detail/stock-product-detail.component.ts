import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CommonService } from "src/app/common.service";
import { Order } from "src/app/models/Order";
import { PriceGroup, StockProduct } from "src/app/models/Product";
import { CartService } from "src/app/services/cart.service";
import { IdGeneratorService } from "src/app/services/id-generator.service";
import { OrderService } from "src/app/services/order.service";
import { ProductService } from "src/app/services/product.service";
import { UserDetailsService } from "src/app/store/user-details.service";

@Component({
  selector: "app-stock-product-detail",
  templateUrl: "./stock-product-detail.component.html",
  styleUrls: ["./stock-product-detail.component.scss"],
})
export class StockProductDetailComponent implements OnInit, OnDestroy {
  image_set: any[];
  responsiveOptions: any[];
  product: StockProduct;
  priceTotal: number;
  currentUrl: string;
  productId: number;
  productSpecsTable: { label: string; value: string }[];
  orderDeliveryDate: Date;
  orderMeetingDate: Date;
  orderConfirmationDate: Date;
  minDate: Date;
  orderForm: FormGroup;
  formSub: Subscription;

  constructor(
    public _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _common: CommonService,
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router,
    private _userDetailsService: UserDetailsService,
    private _idGenService: IdGeneratorService
  ) {
    this._common.setLoader(true);
    this.productId = Number(this._activatedRoute.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.orderDeliveryDate = new Date();
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 5,
      },
      {
        breakpoint: "768px",
        numVisible: 3,
        showItemNavigatorsOnHover: true,
      },
      {
        breakpoint: "560px",
        numVisible: 3,
        showItemNavigatorsOnHover: true,
      },
    ];
    this.currentUrl = this._router.url;

    // get the product from the server and do the intialise everything
    this.product = null;

    // get product details from the product service
    this._productService
      .getStockProduct(this.productId)
      .subscribe((product) => {
        this.product = product;
        console.info("Product Received: ", this.product);
        this.orderForm = this._orderService.createStockOrderForm(product);

        this.image_set = [
          {
            src: "http://localhost:8000/storage/mock.jpeg",
            title: "Image 2 title",
            alt: "Image alt for testing",
          },
          {
            src: "assets/images/demo-product-images/2.jpg",
            title: "Image 3 title",
            alt: "Image alt for testing",
          },
          {
            src: "http://localhost:8000/storage/mock.jpeg",
            title: "Image 4 title",
            alt: "Image alt for testing",
          },
          {
            src: "assets/images/demo-product-images/2.jpg",
            title: "Image 5 title",
            alt: "Image alt for testing",
          },
          {
            src: "http://localhost:8000/storage/mock.jpeg",
            title: "Image 6 title",
            alt: "Image alt for testing",
          },
          {
            src: "assets/images/demo-product-images/2.jpg",
            title: "Image 7 title",
            alt: "Image alt for testing",
          },
        ];

        this.productSpecsTable = this.transformToTable(product);

        let tomorrow = new Date(new Date());
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.minDate = tomorrow;

        this.updateTotalPrice();
        // update price on future value changes of the order form
        this.formSub = this.orderForm.valueChanges.subscribe(() => {
          this.updateTotalPrice()
        })
      });
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  /**
   * update the total price of the order
   */
  updateTotalPrice(): void {
    let pricePerPiece: number = this.getPricePerPiece();
    this.priceTotal = Number((this.orderForm.value.data.quantity * pricePerPiece).toFixed(2));
    
    console.log("price updated: ", pricePerPiece, ' | ', this.orderForm.value.data.quantity * pricePerPiece);
  }

  /**
   * return the price per piece for a particular quantity
   * @param quantity quantity of the order
   */
  getPricePerPiece(): number {
    let priceGroups: PriceGroup[] = this.product.attributes.price_table.price_groups,
      pricePerPiece = null;
    
    for(const priceGroup of priceGroups) {
      if(this.orderForm.value.data.quantity <= priceGroup.quantity) {
        pricePerPiece = priceGroup.price_per_piece;
        return pricePerPiece;
      }
    }

    return priceGroups[priceGroups.length - 1].price_per_piece;
  }

  /**
   * Submit the customisation form
   */
  onSubmit(): void {
    // this.updateTotalPrice();

    // let cartItem: CartItem = {
    //   product_id: this.productId,
    //   product: this.product,
    //   quantity: 1,
    //   custom_forms_entry: {
    //     forms_input: this.orderForm.value,
    //     total_price: this.priceTotal
    //   },
    // };

    // console.log('add to cart: ', cartItem);
    // this._cartService.addToCart(cartItem).subscribe((item: any) => {
    //   this._router.navigate(["/cart", item.data.id]);
    //   console.log("added to cart: ", item);
    // });
    console.log("order form value: ", this.orderForm.value);
    this._orderService
      .placeOrder(this.orderForm.value)
      .subscribe((order: Order) => {
        console.log("order placed: ", order);
        this._router.navigate(["/orders/"]);
      });
  }

  /**
   * Transform the product specification into a table object
   * @param product product object
   */
  transformToTable(product: StockProduct): any {
    let productProps: string[] = Object.keys(product.product);
    let table: { label: string; value: string }[] = [];
    let ignore: any = {
      cat_year: true,
      image_url_list: true,
      dimension_list: true,
      dimension_unit_list: true,
      dimension_type_list: true,
      quantities_list: true,
      price_list: true,
      pr_code: true,
      pieces_per_unit_list: true,
      quote_upon_request: true,
      price_include_clr: true,
      price_include_side: true,
      price_include_loc: true,
      setup_chg: true,
      setup_chg_code: true,
      screen_chg: true,
      screen_chg_code: true,
      plate_chg: true,
      plate_chg_code: true,
      die_chg: true,
      die_chg_code: true,
      tooling_chg: true,
      tooling_chg_code: true,
      repeat_chg: true,
      repeat_chg_code: true,
      add_clr_chg: true,
      add_clr_chg_code: true,
      add_clr_run_chg_list: true,
      add_clr_run_chg_code: true,
      is_new_product: true,
      not_suitable: true,
      exclusive: true,
      officially_licensed: true,
      is_food: true,
      is_clothing: true,
      imprint_size_list: true,
      imprint_size_units_list: true,
      imprint_size_type_list: true,
      imprint_loc: true,
      second_imprint_size_list: true,
      second_imprint_units_list: true,
      second_imprint_type_list: true,
      second_imprint_loc: true,
      decoration_method: true,
      no_decoration: true,
      made_in_country: true,
      assembled_in_country: true,
      decorated_in_country: true,
      compliance_list: true,
      warning_lbl: true,
      compliance_memo: true,
      prod_time_lo: true,
      prod_time_hi: true,
      rush_prod_time_lo: true,
      rush_prod_time_hi: true,
      packing: true,
      carton_l: true,
      carton_w: true,
      carton_h: true,
      weight_per_carton: true,
      units_per_carton: true,
      ship_point_country: true,
      ship_point_zip: true,
      comment: true,
      verified: true,
      update_inventory: true,
      inventory_on_hand: true,
      inventory_on_hand_added: true,
      inventory_memo: true,
      owner: true,
      created_at: true,
      updated_at: true,
    };

    productProps.forEach((prop: string) => {
      if (product.product[prop] != null && !(prop in ignore)) {
        table.push({
          label: prop.replace(/[_]/g, ` `),
          value: product.product[prop],
        });
      }
    });

    console.info("table constructed: ", table);
    return table;
  }
}
