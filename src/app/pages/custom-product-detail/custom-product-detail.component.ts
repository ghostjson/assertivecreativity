import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, take, takeUntil } from "rxjs/operators";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormGroup } from "@angular/forms";
import { Product, listAllFeatures, CustomForm } from "../../models/Product";
import { CommonService } from "src/app/common.service";
import { OrderService } from "../../services/order.service";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { CartItem } from "src/app/models/Cart";
import { TreeNode } from 'primeng/api';
import { CustomFormsEntry, CustomOption } from 'src/app/models/Order';
import { UserDetailsService } from "src/app/store/user-details.service";

@Component({
  selector: "app-custom-product-detail",
  templateUrl: "./custom-product-detail.component.html",
  styleUrls: ["./custom-product-detail.component.scss"],
})
export class CustomProductDetailComponent implements OnInit, OnDestroy {
  image_set: any[];
  responsiveOptions: any[];
  product: Product;
  possibleFeatures: Object;
  orderForm: FormGroup;
  componentDestroy: Subject<void>;
  priceTotal: number;
  currentUrl: string;
  productId: number;
  formsOverview: TreeNode[];
  formExpandControls: any;
  selectedNode: TreeNode;
  orderDeliveryDate: Date;
  orderMeetingDate: Date;
  orderConfirmationDate: Date;
  minDate: Date;
  orderQuantity: number;
  selectedColor: string;

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _common: CommonService,
    private _orderService: OrderService,
    private _cartService: CartService,
    private _router: Router,
    private _userDetailsService: UserDetailsService
  ) {
    this.productId = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    this.componentDestroy = new Subject<void>();
  }

  ngOnInit(): void {
    this._common.setLoader(true);
    /**
     * TODO: Remove once images is finalized
     */
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
      }
    ];

    this.orderQuantity = 1;
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

    this.formExpandControls = {};

    this.orderForm = null;
    this.product = null;

    // list of all possible feature
    this.possibleFeatures = listAllFeatures();

    // get product details from the product service
    this._productService
      .getCustomProduct(this.productId)
      .pipe(take(1))
      .subscribe((product) => {
        this.product = product;
        console.info("Product Received: ", this.product);

        this.orderForm = this._orderService.newOrderForm(this.product);
        console.info("Order Form: ", this.orderForm);

        this.initialiseForms();
        this._common.setLoader(false);
      });

      let tomorrow = new Date(new Date());
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.minDate = tomorrow;
  }

  ngOnDestroy(): void {
    // unsubscribe to form value changes
    this.componentDestroy.next();
    this.componentDestroy.complete()
  }

  /**
   * Add a child node to parent node in the overview
   * @param node child node to add
   * @param key key of the parent node
   */
  addToFormOverviewGroup(node: TreeNode, key: string): void {
    for(let i = 0; i < this.formsOverview.length; ++i) {
      if(this.formsOverview[i].key === key) {
        this.formsOverview[i].children.push(node);
        break;
      }
    }
  }

  /**
   * Construct treenode objects required for forms overview component
   */
  buildFormsOverview(): void {
    this.formsOverview = [];

    this.product.custom_forms.forEach((form: CustomForm) => {
      console.info('building overview: ', form)
      this.formExpandControls[form.id] = true;
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
          data: form.title,
          type: 'form'
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

  /**
   * Expand selected treenode
   */
  toggleTreeExpand(): void {
    this.formExpandControls[this.selectedNode.key] = true;
    this.selectedNode.expanded = !this.selectedNode.expanded;
  }

  /**
   * Initialisation steps for the order form
   */
  initialiseForms(): void {
    this.buildFormsOverview();
    this.updateTotalPrice();
    this.orderForm.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.componentDestroy)
      )
      .subscribe(() => {
        this.updateTotalPrice();
      });
    console.log("form initiliased");
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
    this.priceTotal = Number(this.orderForm.value.base_price);

    this.orderForm.value.custom_forms.forEach((customForm: any) => {
      if(customForm.is_formgroup) {
        customForm.subforms.forEach((subForm: any) => {
          subForm.options.forEach((option: CustomOption) => {
            if(option.input) {
              this.priceTotal += option.price;
            }
            
            if(!option.meta.isChained) {
              option.chained_options.forEach((chainedOption: CustomOption) => {
                if(chainedOption.input) {
                  this.priceTotal += chainedOption.price;
                }
              });
            }
          });
        });
      }
      else {
        customForm.options.forEach((option: CustomOption) => {
          if(option.input) {
            this.priceTotal += option.price;
          }
          
          if(!option.meta.isChained) {
            option.chained_options.forEach((chainedOption: CustomOption) => {
              if(chainedOption.input) {
                this.priceTotal += chainedOption.price;
              }
            });
          }
        });
      }
    });

    console.log('price updated: ', this.priceTotal);
  }

  /**
   * Submit the customisation form
   */
  onSubmit(): void {
    this._common.setLoader(true);
    this.updateTotalPrice();

    let cartItem: CartItem = {
      product_id: this.productId,
      product: this.product,
      quantity: 1,
      order_data: {
        is_stock: false,
        forms_input: this.orderForm.value.custom_forms as CustomFormsEntry[],
        order_price: this.priceTotal
      },
      total_price: this.priceTotal
    };

    this._cartService.addToCustomCart(cartItem).subscribe((item: any) => {
      this._router.navigate(["/cart/custom", item.data.id]);
      console.log("added to cart: ", item);
    });
  }
}
