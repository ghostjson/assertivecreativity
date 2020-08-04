import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { group } from 'console';
import { HttpClient } from "@angular/common/http";

import { VendorAdminProductService } from "../../services/vendor-admin-product.service";
import { Product } from 'src/app/models/Product';

@Component({
  selector: "app-vendor-admin-add-product-form",
  templateUrl: "./vendor-admin-add-product-form.component.html",
  styleUrls: ["./vendor-admin-add-product-form.component.scss"],
})
export class VendorAdminAddProductFormComponent implements OnInit {
  @Input() product: any;

  @ViewChild('newCustomFormTitle', { static: true }) newCustomFormTitle: ElementRef;

  newProductForm: FormGroup;
  possibleOptions: Object;

  colorPicker = {
    cpOutputFormat: "hex",
    cpAlphaChannel: "disabled",
  };

  constructor(
    private _fb: FormBuilder,
    private _productService: VendorAdminProductService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // list of all possible options we can add in custom forms
    this.possibleOptions = this._productService.getOptionDefinitions();
    console.log(this.possibleOptions);

    if (this.product) {
      console.info('Product received in form: ', this.product);
      // create a form group for the new product
      this.newProductForm = this._fb.group({
        id: this.product.id,
        name: [
          this.product.name,
          [Validators.required]
        ],
        serial: [
          this.product.serial,
          [Validators.required]
        ],
        description: [
          this.product.description,
          [Validators.required]
        ],
        basePrice: [
          this.product.basePrice,
          [Validators.required]
        ],
        stock: [
          this.product.stock,
          [Validators.required]
        ],
        sales: [
          this.product.sales,
          [Validators.required]
        ],
        image: [
          this.product.image,
          [Validators.required]
        ],
        tags: [
          this.product.tags,
          [Validators.required]
        ],
        customForms: this._fb.array(this.product.customForms)
      });
    }
    else {
      // create a form group for the new product
      this.newProductForm = this._fb.group({
        id: Math.floor(Math.random() * 1000000000),
        name: [
          null,
          [Validators.required]
        ],
        serial: [
          null,
          [Validators.required]
        ],
        description: [
          null,
          [Validators.required]
        ],
        basePrice: [
          0,
          [Validators.required]
        ],
        stock: [
          0,
          [Validators.required]
        ],
        sales: [
          0,
          [Validators.required]
        ],
        image: [
          null,
          [Validators.required]
        ],
        category: [
          null,
          [Validators.required]
        ],
        tags: [
          [],
          [Validators.required]
        ],
        customForms: this._fb.array([])
      });
    }
  }

  // Submit the form
  onSubmit(): void {
    console.log("Product added");
    console.info(this.newProductForm.value);
    console.group('Product')
    console.table(this.newProductForm.value);
    console.info('Product Forms');
    this.newProductForm.value.customForms.forEach(form => {
      console.table(form);
      form.options.forEach(option => {
        console.table(option)
      });
    });
    console.groupEnd();
    // this.newProductForm.value["features"] = JSON.stringify(
    //   this.newProductForm.value["features"]
    // );
    this._productService.addProduct(this.newProductForm.value);
    this.router.navigate(['/admin/products']);
  }

  // helper function to get custom forms of a product
  customForms(): FormArray {
    return this.newProductForm.get('customForms') as FormArray;
  }

  // create a new custom form form group
  newCustomForm(formTitle: string=null): FormGroup {
    let newFormTemplate: Object = {
      id: [this.customForms().length],
      title: [
        formTitle,
        [Validators.required]
      ],
      parentForm: null,
      options: this._fb.array([])
    };

    return this._fb.group(newFormTemplate);
  }

  // add custom form to the form object
  addCustomForm(): void {
    console.log('add new custom form with title', this.newCustomFormTitle.nativeElement.value);

    // add the custom form to the form array
    this.customForms().push(this.newCustomForm(
      // create the form group for adding to the form array
      this.newCustomFormTitle.nativeElement.value
    ));

    // clear the input in the custom title form title
    this.newCustomFormTitle.nativeElement.value = null;
  }

  // get keys of an object
  getKeys(obj: Object): Array<string> {
    return Object.keys(obj);
  }

  // image upload handler for image upload input
  uploadImages(e: Event): void {
    this.newProductForm.patchValue({
      image: 'www.example.com'
    });

    console.log('image uploaded');

    /**
     * TODO: Use this upload handler only if the prime ng provided one is not sufficient
     *
     * add the return value to the form using this
     *
     * this.newProductForm.patchValue({
         image: '*********** link goes here *********'
       });
     *
     */
  }
}
