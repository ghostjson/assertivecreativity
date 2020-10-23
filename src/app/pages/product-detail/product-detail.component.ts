import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { debounceTime, take } from "rxjs/operators";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormGroup } from "@angular/forms";
import { Product, listAllFeatures, CustomForm } from "../../models/Product";
import { CommonService } from "src/app/common.service";
import { OrderService } from "../../services/order.service";
import { Router } from "@angular/router";
import { IdGeneratorService } from "src/app/services/id-generator.service";
import { CartService } from "src/app/services/cart.service";
import { CartItem } from "src/app/models/Cart";
import { TreeNode } from 'primeng/api';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  image_set: any[];
  responsiveOptions: any[];
  product: Product;
  possibleFeatures: Object;
  orderForm: FormGroup;
  formSubscription: Subscription;
  priceTotal: number;
  currentUrl: string;
  productId: number;
  formsOverview: TreeNode[];
  selectedNode: TreeNode;

  constructor(
    public _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _common: CommonService,
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router
  ) {
    this._common.setLoader(true);
    this.productId = Number(this._activatedRoute.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 5,
      },
      {
        breakpoint: "768px",
        numVisible: 3,
        showItemNavigatorsOnHover: true
      },
      {
        breakpoint: "560px",
        numVisible: 3,
        showItemNavigatorsOnHover: true
      },
    ];
    this.currentUrl = this._router.url;

    // get the product from the server
    // and do the intialise everything
    this.initialise();
  }

  ngOnDestroy(): void {
    // unsubscribe to form value changes
    this.formSubscription.unsubscribe();
  }

  addToFormOverviewGroup(node: TreeNode, key: string): void {
    for(let i = 0; i < this.formsOverview.length; ++i) {
      if(this.formsOverview[i].key === key) {
        this.formsOverview[i].children.push(node);
        break;
      }
    }
  }

  buildFormsOverview(): void {
    this.formsOverview = [];

    this.product.custom_forms.forEach((form: CustomForm) => {
      console.info('building overview: ', form)
      if(form.is_formgroup) {
        let node: TreeNode = {
          key: String(form.id),
          label: form.title,
          data: form.title,
          expanded: true,
          children: []
        };

        this.formsOverview.push(node);
      }
      else {
        let node: TreeNode = {
          key: String(form.id),
          label: form.title,
          data: form.title
        };

        if(form.parent_form != null) {
          this.addToFormOverviewGroup(node, String(form.parent_form));
        }
        else {
          this.formsOverview.push(node);
        }
      }
    });

    console.log('form overview built: ', this.formsOverview)
  }

  toggleTreeExpand(): void {
    this.selectedNode.expanded = !this.selectedNode.expanded;
  }

  /**
   * Initialisation steps for the order form
   */
  initialiseForms(): void {
    this.formSubscription = this.orderForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.updateTotalPrice();
      });
    console.log("form initiliased");
  }

  /**
   * Initialise all data on the page
   */
  initialise(): void {
    this.orderForm = null;
    this.product = null;

    // list of all possible feature
    this.possibleFeatures = listAllFeatures();

    // get product details from the product service
    this._productService
      .getProduct(this.productId)
      .pipe(take(1))
      .subscribe((product) => {
        this.product = product;
        /**
         * TODO: Fix for Array to string conversion bug
         */
        this.product.price_table = this.product.price_table;
        console.info("Product Received: ", this.product);

        this.image_set = [
          {
            src: this.product.image,
            title: "Image 1 title",
            alt: "Image alt for testing",
          },
          {
            src: 'https://picsum.photos/id/1/480/640',
            title: "Image 2 title",
            alt: "Image alt for testing",
          },
          {
            src: 'https://picsum.photos/id/2/480/640',
            title: "Image 3 title",
            alt: "Image alt for testing",
          },
        ];

        this.orderForm = this._orderService.newOrderForm(this.product);
        console.info("Order Form: ", this.orderForm);

        this.initialiseForms();
        this.buildFormsOverview();
        this._common.setLoader(false);
      });
  }

  /**
   * Return custom_forms form array
   */
  customForms(): FormArray {
    return this.orderForm.get('custom_forms') as FormArray;
  }

  subforms(customFormIndex: number): FormArray {
    return this.customForms().at(customFormIndex).get('subforms') as FormArray;
  }

  /**
   * Return options of a sub form under a parent form
   * @param formInd Index of the parent form
   * @param subformInd Index of the sub form
   */
  subformOptions(formInd: number, subformInd: number): FormArray {
    return this.subforms(formInd).at(subformInd).get('options') as FormArray;
  }

  options(formInd: number): FormArray {
    return this.customForms().at(formInd).get('options') as FormArray;
  }

  /**
   * update the total price of the order
   */
  updateTotalPrice(): void {
    /**
     * TODO: Implement updating prices
     */
    this.priceTotal = 0;
  }

  /**
   * Removes the empty values from the form value object
   * @param  {any} order dirty order object containing empty values
   * @return {any} order clean order object with no empty values
   */
  cleanForm(order: any): any {
    for (let i = 0; i < order.features.length; ++i) {
      order.features[i].chainedInputs = order.features[i].chainedInputs.filter(
        (chainedInput: any) => {
          if (chainedInput.input) {
            console.log("pass");
            return true;
          }
        }
      );
    }

    return order;
  }

  /**
   * Submit the customisation form
   */
  onSubmit(): void {
    // this.updateTotalPrice();

    let cartItem: CartItem = {
      product_id: this.productId,
      quantity: 1,
      custom_forms_entry: this.orderForm.value,
    };

    // order = this.cleanForm(order);
    cartItem.total_price = this.priceTotal;
    this._cartService.addToCart(cartItem).subscribe((item: CartItem) => {
      this._router.navigate(["/cart"]);
      console.log("added to cart: ", item);
    });
  }
}
