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
  @Input() product: FormGroup;
  @Input() isEdit: boolean;

  @ViewChild('newCustomFormTitle', { static: true }) newCustomFormTitle: ElementRef;

  productForm: FormGroup;
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
  ) { }

  ngOnInit(): void {
    // list of all possible options we can add in custom forms
    this.possibleOptions = this._productService.getOptionDefinitions();
    console.log(this.possibleOptions);

    // intialise the product form to avoid errors in the template
    this.productForm = null;

    // check if a product form group is passed to the component
    if (this.product) {
      this.productForm = this.product;
    }
    else {
      console.log('product form not found');

      // create a form group for the new product
      this.productForm = this._fb.group({
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
    console.info(this.productForm.value);
    console.group('Product')
    console.table(this.productForm.value);
    console.info('Product Forms');
    this.productForm.value.customForms.forEach(form => {
      console.table(form);
      form.options.forEach(option => {
        console.table(option)
      });
    });
    console.groupEnd();
    // this.productForm.value["features"] = JSON.stringify(
    //   this.productForm.value["features"]
    // );
    if (this.isEdit) {
      this._productService.editProduct(this.productForm.value.id, this.productForm.value)
      console.log('Form Edited');
    }
    else {
      this._productService.addProduct(this.productForm.value);
    }
    this.router.navigate(['/admin/products']);
  }

  // helper function to get custom forms of a product
  customForms(): FormArray {
    return this.productForm.get('customForms') as FormArray;
  }

  // create a new custom form form group
  newCustomForm(formTitle: string = null): FormGroup {
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
    this.productForm.patchValue({
      image: 'www.example.com'
    });

    console.log('image uploaded');

    /**
     * TODO: Use this upload handler only if the prime ng provided one is not sufficient
     *
     * add the return value to the form using this
     *
     * this.productForm.patchValue({
         image: '*********** link goes here *********'
       });
     *
     */
  }
}
