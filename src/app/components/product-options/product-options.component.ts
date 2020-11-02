import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { CustomOptionForm, CustomOption } from 'src/app/models/Order';
import { Option } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss']
})
export class ProductOptionsComponent implements OnInit {
  @Input() option: Option;
  @Input() requiredInp: boolean;
  @Input() formGroup: CustomOptionForm;

  chainedOptionsRef: any = {};
  inputValue: any;

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    if (!this.option.meta.isChained) {
      this.constructChained();
    }
  }

  /**
   * Get chanined options in an input
   */
  chainedOptions(): FormArray {
    return this.formGroup.get('chained_options') as FormArray;
  }

  /**
   * Construct a dictionary for fetching chained options of an input
   * during runtime
   */
  constructChained(): void {
    this.option.inputs.forEach((input: any) => {
      this.chainedOptionsRef[input.value] = [];

      if (input.chained_options) {
        input.chained_options.forEach((option: CustomOption) => {
          this.chainedOptionsRef[input.value].push(
            option
          )
        });
      }
    });

    console.info('Chained options dictionary: ', this.chainedOptionsRef);
  }

  renderChained(input: string): void {
    // empty the current options
    this.chainedOptions().clear();

    this.chainedOptionsRef[input].forEach((chainedOption: CustomOption) => {
      this._productService.addFormOption(chainedOption, this.chainedOptions());
    });

    console.info('chained options added: ', this.chainedOptions().value)
  }

  catchValue(event: any) {
    console.info('Value emitted: ', event);
    console.info('chained options of the value: ', this.chainedOptionsRef[event]);
    if (event !== this.inputValue) {
      this.renderChained(event);
    }
    this.inputValue = event;
  }
}
