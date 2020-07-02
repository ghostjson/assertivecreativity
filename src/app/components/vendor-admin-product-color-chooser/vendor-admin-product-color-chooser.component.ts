import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProductColor, Color } from '../../models/Product';
import { VendorAdminProductService } from '../../services/vendor-admin-product.service';

@Component({
  selector: 'app-vendor-admin-product-color-chooser',
  templateUrl: './vendor-admin-product-color-chooser.component.html',
  styleUrls: ['./vendor-admin-product-color-chooser.component.scss']
})
export class VendorAdminProductColorChooserComponent implements OnInit, OnDestroy {
  colorIndex: number = 0;
  newColorForm: FormGroup;
  colors: FormArray;

  colorPicker = {
    cpOutputFormat: 'hex',
    cpAlphaChannel: 'disabled'
  }

  constructor(private fb: FormBuilder, private _productService: VendorAdminProductService ) {
    this.newColorForm = this.fb.group({
      colors: this.fb.array([this.createNewColor()])
    });

    console.log(this.newColorForm);

    this.colors = this.newColorForm.get('colors') as FormArray;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  createNewColor(): FormGroup {
    let newColor = new Color(
      this.colorIndex,
      '',
      '#cc9933'
    );
    return this.fb.group(newColor);
  }

  addNewColor(): void {
    this.colors = this.newColorForm.get('colors') as FormArray;
    this.colors.push(this.createNewColor());

    // increase color id
    this.colorIndex += 1;
    console.log('New color added', this.colors);
  }

  removeColor(i: number): void {
    this.colors.removeAt(i);
  }

  get colorControls() {
    return this.newColorForm.get('colors')['controls'];
  }

  saveProductFeature(): void {
    console.log('Colors array to be added: ', this.newColorForm.value)
    let feature = new ProductColor(
      String(this.colorIndex + 100),
      'color',
      this.newColorForm.value.colors
    );
    // console.log('before: ', this._productService.newProduct.features);

    console.log(this._productService.addFeature(feature));
  }
}
