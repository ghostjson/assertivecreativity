import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProductColor, Color } from '../../models/Product';

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

  constructor(private fb: FormBuilder) {
    this.newColorForm = this.fb.group({
      colors: this.fb.array([this.createNewColor()])
    });

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
}
