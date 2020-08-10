import { Component, OnInit, Input } from "@angular/core";
import { SelectItem } from "primeng/api";
import { PriceGroup, PriceTable } from 'src/app/models/Product';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';
import { VendorAdminProductService } from 'src/app/services/vendor-admin-product.service';

@Component({
  selector: "app-admin-price-table-input",
  templateUrl: "./admin-price-table-input.component.html",
  styleUrls: ["./admin-price-table-input.component.scss"],
})
export class AdminPriceTableInputComponent implements OnInit {
  @Input() formGroup: FormGroup;

  // priceTable = new PriceTable();
  relations: SelectItem[];

  constructor(
    private _fb: FormBuilder,
    private _productService: VendorAdminProductService
  ) {}

  ngOnInit() {
    // console.info(this.priceTable);
    
    // this.cars1 = [
    //   {
    //     brand: "VW",
    //     year: 2012,
    //     color: "Orange",
    //     vin: "dsad231ff",
    //   },
    //   {
    //     brand: "Audi",
    //     year: 2011,
    //     color: "Black",
    //     vin: "gwregre345",
    //   },
    //   {
    //     brand: "Renault",
    //     year: 2005,
    //     color: "Gray",
    //     vin: "h354htr",
    //   },
    //   {
    //     brand: "BMW",
    //     year: 2003,
    //     color: "Blue",
    //     vin: "j6w54qgh",
    //   },
    //   {
    //     brand: "Mercedes",
    //     year: 1995,
    //     color: "Orange",
    //     vin: "hrtwy34",
    //   },
    //   {
    //     brand: "Volvo",
    //     year: 2005,
    //     color: "Black",
    //     vin: "jejtyj",
    //   },
    //   {
    //     brand: "Honda",
    //     year: 2012,
    //     color: "Yellow",
    //     vin: "g43gr",
    //   },
    //   {
    //     brand: "Jaguar",
    //     year: 2013,
    //     color: "Orange",
    //     vin: "greg34",
    //   },
    //   {
    //     brand: "Ford",
    //     year: 2000,
    //     color: "Black",
    //     vin: "h54hw5",
    //   },
    //   {
    //     brand: "Fiat",
    //     year: 2013,
    //     color: "Red",
    //     vin: "245t2s",
    //   },
    // ];

    this.relations = [
      { label: "Select a relation", value: null },
      { label: "Less than or equal", value: "lte" },
      { label: "More than or equal", value: "mte" }
    ];
  }

  /**
   * Tracking function for primeng editable table
   * @param index index of the row
   * @param row row data
   */
  trackByFn(index: number, row: PriceGroup): number {
    return index;
  }

  /**
   * get the pricing table form array
   */
  priceTable(): FormArray {
    return this.formGroup.get('priceTable') as FormArray;
  }

  /**
   * Add price group to the pricing table
   */
  addPriceGroup(): void {
    this._productService.addPriceGroup(this.priceTable());
    console.log('new price group added');
  }
}
