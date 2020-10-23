import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Product, PriceGroup } from 'src/app/models/Product';
import { AdminProductService } from "../../services/admin-product.service";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.scss']
})
export class AdminProductEditComponent implements OnInit {
  productObj: Product;
  product: FormGroup;
  possibleOptions: Object;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: AdminProductService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    let id: number = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    this._productService.getProduct(id)
    .subscribe((product: Product) => {
        this.possibleOptions = this._productService.getOptionDefinitions();
        this.productObj = product;
        console.info('Product received at edit page: ', this.productObj);
        this.product = this.buildProduct();
        console.info('Product Form Group Created: ', this.buildProduct().value);
      });
  }

  /**
   * Return a price table form array from a priceGroup array
   */
  buildPriceTable(): FormArray {
    let priceTable: FormArray = this._fb.array([]);
    let parsedPriceTable = this.productObj.price_table;
    parsedPriceTable.forEach((priceGroup: PriceGroup) => {
      priceTable.push(
        this._productService.newPriceGroup(priceGroup)
      )
    });

    return priceTable;
  }

  /**
   * Return form array of options from options array passed 
   * @param options options object array which contains 
   *                the value of the different options the product has
   */
  buildOptions(options: any[]): FormArray {
    let optionsArray: FormArray = this._fb.array([]);

    options.forEach((option) => {
      console.log(option.type);

      optionsArray.push(
        this._productService.newOption(
          option.type,
          option.meta.isChained,
          option
        )
      )
    });

    return optionsArray;
  }


  /**
   * Return forms array from forms value array received
   */
  buildCustomForms(): FormArray {
    let customFormsArray: FormArray = this._fb.array([]);

    this.productObj.custom_forms.forEach((form: any) => {
      customFormsArray.push(
        this._fb.group({
          id: form.id,
          title: form.title,
          is_formgroup: form.is_formgroup,
          parent_form: form.parent_form,
          options: this.buildOptions(form.options)
        })
      );
    });

    return customFormsArray;
  }


  /**
   * Return product form group from product object received
   */
  buildProduct(): FormGroup {
    let form: FormGroup = this._fb.group({
      id: [
        this.productObj.id,
        [Validators.required]
      ],
      name: [
        this.productObj.name,
        [Validators.required]
      ],
      serial: [
        this.productObj.serial,
        [Validators.required]
      ],
      description: [
        this.productObj.description,
        [Validators.required]
      ],
      base_price: [
        this.productObj.base_price,
        [Validators.required]
      ],
      stock: [
        this.productObj.stock,
        [Validators.required]
      ],
      sales: [
        this.productObj.sales,
        [Validators.required]
      ],
      image: [
        this.productObj.image,
        [Validators.required]
      ],
      category: [
        this.productObj.category,
        [Validators.required]
      ],
      category_id: [
        this.productObj.category_id
      ],
      tags: [
        this.productObj.tags,
        [Validators.required]
      ],
      price_table_mode: [
        this.productObj.price_table_mode,
        [Validators.required]
      ],
      price_table: this.productObj.price_table_mode === '1' ? this.buildPriceTable(): null,
      custom_forms: this.buildCustomForms()
    });

    return form;
  }
}
