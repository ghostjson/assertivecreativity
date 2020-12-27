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
import { CommonService } from 'src/app/common.service';
import { UserDetailsService } from 'src/app/store/user-details.service';
import { User } from 'src/app/models/User';

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
  newProductImage: string | ArrayBuffer;
  currentProductImage: string | ArrayBuffer;
  user: User;

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
    private _pcService: ProductCategorisationService,
    private _userDetailsService: UserDetailsService,
    private _common: CommonService
  ) { }

  ngOnInit(): void {
    this.user = this._userDetailsService.getUserLocal();
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
      console.log('new product form created: ', this.productForm.value);
    }

    // intialise categories list
    this._pcService.getCategories()
      .pipe(take(1))
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categories.unshift({
          name: 'Select a category',
          id: null
        });
      });
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
      is_formgroup: false,
      parent_form: null,
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
   * @param event Event object
   */
  uploadImages(event: any): void {
    let reader: FileReader = new FileReader();
    reader.readAsDataURL(event.files[0]);
    reader.onloadend = () => {
      this.newProductImage = reader.result;
    };
  }

  /**
   * Fetch tags of a category
   * @param categoryId category id to fetch the tags of 
   */
  getTags(categoryId: number): void {
    console.log(`event caught: ${categoryId}`);
    this._pcService.getTagsOfCategory(categoryId)
      .subscribe(tags => {
        this.tags = tags;
        console.log('tags found in admin form: ', this.tags);
      });
  }

  /**
   * Submit the form
   */
  onSubmit(): void {
    this._common.setLoader(true);

    if(this.newProductImage) {
      this.productForm.patchValue({
        image: this.newProductImage
      });
    }
    else {
      console.log('image field is being remove as there is no change');
      this.productForm.removeControl('image');
    }

    
    // construct product from form value 
    let submitValue = new Product(this.productForm.value);   
    
    submitValue.category_id = submitValue.category.id;
    
    console.info('product object: ', submitValue);

    if(submitValue.price_table_mode) {
      submitValue.base_price = submitValue.price_table[0].price_per_piece;
    }

    
    console.log('Sending product object: ', submitValue);

    if (this.isEdit) {
      this._productService.editProduct(submitValue)
        .subscribe((res: Product) => {
          this._router.navigate([`/${this.user.role}/products`]);
          console.log("Product added: ", submitValue);
        });
    }
    else {
      this._productService.addProduct(submitValue)
        .subscribe((res: Product) => {
          this._router.navigate([`/${this.user.role}/products`]);
          console.log("Product added: ", submitValue);
        });
    }
  }

  /**
   * Cancel creating/editing the product
   */
  cancelProduct(): void {
    this._router.navigate([`/${this.user.role}/products`]);
  }
}
