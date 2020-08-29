import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { VendorAdminProductService } from "../../services/vendor-admin-product.service";
import { Product, ProductForm } from 'src/app/models/Product';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { Tag } from 'src/app/models/Tag';
import { Category } from 'src/app/models/Category';
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';

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
  categories: Category[];
  tags: Tag[];

  colorPicker = {
    cpOutputFormat: "hex",
    cpAlphaChannel: "disabled",
  };

  constructor(
    private _fb: FormBuilder,
    private _productService: VendorAdminProductService,
    private _router: Router,
    private _idService: IdGeneratorService,
    private _pcService: ProductCategorisationService
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
      this.productForm = this._fb.group(new ProductForm());

      // assign id to the product 
      this.productForm.patchValue({id: this._idService.getId()});

      // temporarily add an image as a placeholder until image upload is fixed
      this.productForm.patchValue({image: '/assets/images/demo-product-images/1.jpg'});
    }

    // intialise categories list
    this.categories = this._pcService.getCategories();

    // intialise tags list
    this.tags = this.getTags(this.productForm.value.category);
    console.info(`tags in product form of ${this.productForm.value.category} : ${this.tags}`);
  }

  /**
   * helper function to return price table form array
   */
  priceTable(): FormArray {
    return this.productForm.get('priceTable') as FormArray;
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

  getTags(category: string): void {
    console.log(`event caught: ${category}`);
    this.tags = this._pcService.getTagsOf(category);
  }

  /**
   * Submit the form
   */
  onSubmit(): void {
    // construct product from form value 
    let submitValue = new Product(this.productForm.value);

    // update the stock status of the product
    submitValue.updateStockStatus();

    if (this.isEdit) {
      this._productService.editProduct(submitValue.id, submitValue)
      console.log('Form Edited');
    }
    else {
      this._productService.addProduct(submitValue);
    }

    console.log("Product added");
    console.info(this.productForm.value);
    
    this._router.navigate(['/admin/products']);
  }
}
