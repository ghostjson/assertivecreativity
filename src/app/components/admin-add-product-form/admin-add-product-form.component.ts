import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { FormBuilder, FormArray, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AdminProductService } from "../../services/admin-product.service";
import { Product, ProductForm } from 'src/app/models/Product';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { Tag } from 'src/app/models/Tag';
import { Category } from 'src/app/models/Category';
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: "app-admin-add-product-form",
  templateUrl: "./admin-add-product-form.component.html",
  styleUrls: ["./admin-add-product-form.component.scss"],
})
export class AdminAddProductFormComponent implements OnInit {
  @Input() product: FormGroup;
  @Input() isEdit: boolean;

  @ViewChild('newCustomFormTitle', { static: true }) newCustomFormTitle: ElementRef;

  productForm: FormGroup;
  possibleOptions: Object;
  categories: Category[];
  tags: Tag[];

  tagSub: Subscription;

  colorPicker = {
    cpOutputFormat: "hex",
    cpAlphaChannel: "disabled",
  };

  constructor(
    private _fb: FormBuilder,
    private _productService: AdminProductService,
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

      // temporarily add an image as a placeholder until image upload is fixed
      this.productForm.patchValue({image: '/assets/images/demo-product-images/1.jpg'});
    }

    // intialise categories list
    this._pcService.getCategories()
      .pipe(take(1))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });

    // intialise tags list
    this.getTags(this.productForm.value.category);
  }

  /**
   * Helper function to return price table form array
   */
  priceTable(): FormArray {
    return this.productForm.get('price_table') as FormArray;
  }

  /**
   * Helper function to get custom forms of a product
   */
  customForms(): FormArray {
    return this.productForm.get('custom_forms') as FormArray;
  }

  /**
   * Create a new custom form form group
   * @param formTitle title of the form
   */
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

  /**
   * Add custom form to the form object
   */
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

  /**
   * Return keys of an object
   * @param obj object to get the keys of
   */
  getKeys(obj: Object): Array<string> {
    return Object.keys(obj);
  }

  /**
   * Image upload handler for image upload input
   * @param e Event object
   */
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

  /**
   * Fetch tags of a category
   * @param categoryId category id to fetch the tags of 
   */
  getTags(categoryId: number): void {
    console.log(`event caught: ${categoryId}`);
    // this._pcService.getTagsOf(categoryId)
    //   .subscribe(tags => {
    //     this.tags = tags;
    //     console.log('tags found in admin form: ', this.tags);
    //   });
  }

  /**
   * Submit the form
   */
  onSubmit(): void {
    // construct product from form value 
    let submitValue = new Product(this.productForm.value);

    submitValue.category = submitValue['category']['id'];

    if (this.isEdit) {
      this._productService.editProduct(submitValue)
        .subscribe((res: Product) => {
          this._router.navigate(['/admin/products']);
          console.log("Product added: ", this.productForm.value);
        });
    }
    else {
      this._productService.addProduct(submitValue)
        .subscribe((res: Product) => {
          this._router.navigate(['/admin/products']);
          console.log("Product added: ", this.productForm.value);
        });
    }
  }
}
