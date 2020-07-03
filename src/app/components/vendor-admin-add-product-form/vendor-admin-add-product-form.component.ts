import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { VendorAdminProductService } from '../../services/vendor-admin-product.service';
// import { Product } from '../../models/Product';

@Component({
  selector: 'app-vendor-admin-add-product-form',
  templateUrl: './vendor-admin-add-product-form.component.html',
  styleUrls: ['./vendor-admin-add-product-form.component.scss']
})

export class VendorAdminAddProductFormComponent implements OnInit {
  newProductForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _productService: VendorAdminProductService
  ) { }

  ngOnInit(): void {
    // create a form group for the new product
    this.newProductForm = this._fb.group({
      name: this._fb.control(''),
      description: this._fb.control(''),
      price: this._fb.control(''),
      stock: this._fb.control(0),
      image: this._fb.control(''),
      // features: this._fb.array([])
    });

  }

  // add product to list of products
  addProduct(): void {
    console.log('Product added');
    console.log(this.newProductForm);
  }

}

// export class VendorAdminProductColorChooserComponent implements OnInit, OnDestroy {
//   colorIndex: number = 0;
//   newColorForm: FormGroup;
//   colors: FormArray;

//   colorPicker = {
//     cpOutputFormat: 'hex',
//     cpAlphaChannel: 'disabled'
//   }

//   constructor(private fb: FormBuilder, private _productService: VendorAdminProductService ) {
//     this.newColorForm = this.fb.group({
//       colors: this.fb.array([this.createNewColor()])
//     });

//     console.log(this.newColorForm);

//     this.colors = this.newColorForm.get('colors') as FormArray;
//   }

//   ngOnInit(): void {
//   }

//   ngOnDestroy(): void {
//   }

//   createNewColor(): FormGroup {
//     let newColor = new Color(
//       this.colorIndex,
//       '',
//       '#cc9933'
//     );
//     return this.fb.group(newColor);
//   }

//   addNewColor(): void {
//     this.colors = this.newColorForm.get('colors') as FormArray;
//     this.colors.push(this.createNewColor());

//     // increase color id
//     this.colorIndex += 1;
//     console.log('New color added', this.colors);
//   }

//   removeColor(i: number): void {
//     this.colors.removeAt(i);
//   }

//   get colorControls() {
//     return this.newColorForm.get('colors')['controls'];
//   }

//   saveProductFeature(): void {
//     console.log('Colors array to be added: ', this.newColorForm.value)
//     let feature = new ProductColor(
//       String(this.colorIndex + 100),
//       'color',
//       this.newColorForm.value.colors
//     );
//     // console.log('before: ', this._productService.newProduct.features);

//     console.log(this._productService.addFeature(feature));
//   }
// }
