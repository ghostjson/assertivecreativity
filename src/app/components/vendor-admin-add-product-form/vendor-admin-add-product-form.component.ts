import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { VendorAdminProductService } from "../../services/vendor-admin-product.service";
import { listAllFeatures } from "../../models/Product";
import { Router } from '@angular/router';
import { group } from 'console';

@Component({
  selector: "app-vendor-admin-add-product-form",
  templateUrl: "./vendor-admin-add-product-form.component.html",
  styleUrls: ["./vendor-admin-add-product-form.component.scss"],
})
export class VendorAdminAddProductFormComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit(): void {
    // list of all possible options we can add in custom forms
    this.possibleOptions = this._productService.getOptionDefinitions();
    console.log(this.possibleOptions);

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
      categories: [
        ['none'],
        [Validators.required]
      ],
      customForms: this._fb.array([])
    });
  }

  // Submit the form
  onSubmit(): void {
    console.log("Product added");
    console.log(this.newProductForm.value);
    // this.newProductForm.value["features"] = JSON.stringify(
    //   this.newProductForm.value["features"]
    // );
    // this._productService.addProduct(this.newProductForm.value);
    // this.router.navigate(['/admin/products']);
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
  uploadImages(e: Event): string {
    this.newProductForm.patchValue({
      image: 'www.example.com'
    });

    console.log('image uploaded');
    return 'www.example.com';
  }
}
