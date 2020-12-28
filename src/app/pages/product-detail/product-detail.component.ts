import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { debounceTime, take } from "rxjs/operators";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormGroup } from "@angular/forms";
import { Product, listAllFeatures, CustomForm, newProduct, ProductResponse } from "../../models/Product";
import { CommonService } from "src/app/common.service";
import { OrderService } from "../../services/order.service";
import { Router } from "@angular/router";
import { IdGeneratorService } from "src/app/services/id-generator.service";
import { CartService } from "src/app/services/cart.service";
import { CartItem } from "src/app/models/Cart";
import { TreeNode } from 'primeng/api';
import { CustomOption } from 'src/app/models/Order';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  image_set: any[];
  responsiveOptions: any[];
  product: ProductResponse;
  possibleFeatures: Object;
  orderForm: FormGroup;
  formSubscription: Subscription;
  priceTotal: number;
  currentUrl: string;
  productId: number;
  formsOverview: TreeNode[];
  selectedNode: TreeNode;
  productDetailsTable: {label: string, value: string}[];


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

  // buildFormsOverview(): void {
  //   this.formsOverview = [];

  //   this.product.custom_forms.forEach((form: CustomForm) => {
  //     console.info('building overview: ', form)
  //     if(form.is_formgroup) {
  //       let node: TreeNode = {
  //         key: String(form.id),
  //         label: form.title,
  //         data: form.title,
  //         expanded: true,
  //         children: []
  //       };

  //       this.formsOverview.push(node);
  //     }
  //     else {
  //       let node: TreeNode = {
  //         key: String(form.id),
  //         label: form.title,
  //         data: form.title
  //       };

  //       if(form.parent_form != null) {
  //         this.addToFormOverviewGroup(node, String(form.parent_form));
  //       }
  //       else {
  //         this.formsOverview.push(node);
  //       }
  //     }
  //   });

  //   console.log('form overview built: ', this.formsOverview)
  // }

  toggleTreeExpand(): void {
    this.selectedNode.expanded = !this.selectedNode.expanded;
  }

  /**
   * Initialisation steps for the order form
   */
  // initialiseForms(): void {
  //   this.updateTotalPrice();
  //   this.formSubscription = this.orderForm.valueChanges
  //     .pipe(debounceTime(500))
  //     .subscribe(() => {
  //       this.updateTotalPrice();
  //     });
  //   console.log("form initiliased");
  // }

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
        console.info("Product Received: ", this.product);

        this.image_set = [
          // {
          //   src: this.product.product.NewPictureURL,
          //   title: "Image 1 title",
          //   alt: "Image alt for testing",
          // },
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

        // this.orderForm = this._orderService.newOrderForm(this.product);
        // console.info("Order Form: ", this.orderForm);

        // this.initialiseForms();
        // this.buildFormsOverview();
        this.productDetailsTable = this.transformToTable(product);
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
  }

  transformToTable(product: ProductResponse): any {
    let productProps: string[] = Object.keys(product.product);
    let table: {label: string, value: string}[] = [];
    let ignore: any = {
      id: true,
      Discontinued: true,
      Cat1Name: true,
      CatYear: true,
      ExpirationDate: true,
      Keywords: true,
      Qty1: true,
      Qty2: true,
      Qty3: true,
      Qty4: true,
      Qty5: true,
      Qty6: true,
      Prc1: true,
      Prc2: true,
      Prc3: true,
      Prc4: true,
      Prc5: true,
      Prc6: true,
      PiecesPerUnit1: true,
      PiecesPerUnit2: true,
      PiecesPerUnit3: true,
      PiecesPerUnit4: true,
      PiecesPerUnit5: true,
      PiecesPerUnit6: true,
      QuoteUponRequest: true,
      InventoryOnHand: true,
      Owner: true,
      created_at: true,
      updated_at: true,
      NewBlankPictureFile: true,
      EraseBlankPicture: true,
      NotPictured: true
    };

    productProps.forEach((prop: string) => {
      if(product.product[prop] != null && !(prop in ignore)) {
        table.push({
          label: prop.replace(/([a-z, 0-9])([A-Z])/g, `$1 $2`)
            .replace(/([a-z])([0-9])/g, `$1 $2`),
          value: product.product[prop]
        });
      }
    });

    console.info('table constructed: ', table);
    return table;
  }
}
