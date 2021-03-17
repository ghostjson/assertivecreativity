import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderAttribute } from 'src/app/models/Order';
import { CustomProduct, ProductAttribute } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-custom-product-detail-attr-form',
  templateUrl: './custom-product-detail-attr-form.component.html',
  styleUrls: ['./custom-product-detail-attr-form.component.scss'],
})
export class CustomProductDetailAttrFormComponent implements OnInit {
  @Input() styleClass: string;
  @Input() prevAttr: FormGroup;
  @Input() stateIndex: number;
  @Input() attrForm: FormGroup;
  @Input() product: CustomProduct;

  childAttrsVisible: boolean = false;
  componentDestroy: Subject<void>;

  constructor(private _productService: ProductService) {
    this.componentDestroy = new Subject<void>();
  }

  ngOnInit(): void {
    // update the selected attribute in the state when an input is selected
    this.attrForm.valueChanges
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((change: OrderAttribute) => {
        console.log('changes: ', change);
        if (change.input.is_attribute_group) {
          this._productService.removeSelectedAttribute(change.id);
        } else {
          this._productService.addSelectedAttribute(
            change.input,
            this.attrForm
          );
        }
      });
  }

  /**
   * get the child attributes formarray
   * @returns child_attributes formarray
   */
  childAttributes(): FormArray {
    return <FormArray>this.attrForm.get('child_attributes');
  }

  /**
   * add an active attribute group to the state
   * @param index index of the active attribute group to add
   */
  addActiveAttrGrp(index: number): void {
    let attr = <FormGroup>this.childAttributes().at(index);
    this._productService.addActiveAttrGrp(attr);
  }

  /**
   * close the form panel
   */
  closeForm(): void {
    this._productService.removeActiveAttrGrp(this.stateIndex);
  }

  showSummaryPanel(): void {
    this._productService.setSummaryPanel(true);
  }
}
