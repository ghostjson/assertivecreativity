import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { VendorAdminProductService } from '../../services/vendor-admin-product.service';
import { Feature, listAllFeatures } from '../../models/Product';

@Component({
  selector: 'app-vendor-admin-add-product-form',
  templateUrl: './vendor-admin-add-product-form.component.html',
  styleUrls: ['./vendor-admin-add-product-form.component.scss']
})

export class VendorAdminAddProductFormComponent implements OnInit {
  newProductForm: FormGroup;
  possibleFeatures: Object;
  productFeatures: FormArray;

  colorPicker = {
    cpOutputFormat: 'hex',
    cpAlphaChannel: 'disabled'
  }

  constructor(
    private _fb: FormBuilder,
    private _productService: VendorAdminProductService
  ) {}

  ngOnInit(): void {
    // list of all possible feature
    this.possibleFeatures = listAllFeatures();

    // create a form group for the new product
    this.newProductForm = this._fb.group({
      id: Math.floor(Math.random() * 1000000000),
      name: '',
      description: '',
      price: '',
      stock: 0,
      sales: 0,
      image: '',
      features: this._fb.array([])
    });

    this.productFeatures = this.features();

    console.log(this.possibleFeatures);
  }

  // Submit the form
  onSubmit(): void {
    console.log('Product added');
    console.log(this.newProductForm.value);
    this._productService.addProduct(this.newProductForm.value);
  }

  // helper function to get features of a product
  features(): FormArray {
    return this.newProductForm.get('features') as FormArray;
  }

  // construct a form group for new feature
  newFeature(feature: string): FormGroup {
    console.log('Creating ', feature, ' for the product!!');
    let featureTemplate: Object = {};
    let featureToAdd = this.possibleFeatures[feature];

    if (featureToAdd) {
      console.log(featureToAdd.type, ' feature found :-)');
      featureTemplate['type'] = featureToAdd.type;
      featureTemplate['title'] = null;
      featureTemplate['name'] = featureToAdd.name;
      featureTemplate['inputs'] = this._fb.array([]);

      return this._fb.group(featureTemplate);
    }
    else {
      console.error('Selected feature not found!');
      return null;
    }
  }

  // add feature to the product
  addFeature(feature: string): void {
    let newFeat: FormGroup = this.newFeature(feature);

    if (newFeat != null) {
      this.features().push(newFeat);
    }
  }

  // remove feature from the product
  removeFeature(i: number): void {
    console.log('Product feature: ', this.productFeatures.at(i));
    this.productFeatures.removeAt(i);
  }

  // helper function to get a list of all the inputs
  featureInputs(featureIndex: number): FormArray {
    return this.features().at(featureIndex).get('inputs') as FormArray;
  }

  // construct a form group for taking new feature's input
  newFeatureInput(feature: string): FormGroup {
    console.log('Creating ', feature, ' Input');

    let newInput: Object = {};
    console.log(feature);
    this.possibleFeatures[feature].inputs.forEach((input: any) => {
      newInput[input.name] = null;
      newInput['type'] = input.type;
    });

    return this._fb.group(newInput);
  }

  // add feature input to the corresponding feature
  addFeatureInput(feature: string, featureIndex: number): void {
    this.featureInputs(featureIndex).push(this.newFeatureInput(feature));
    console.log('Input Added: ', this.features().at(0).get('inputs')['controls']);
  }

  // get keys of an object
  getKeys(obj: Object): Array<string> {
    return Object.keys(obj);
  }
}
