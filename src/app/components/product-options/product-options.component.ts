import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { CustomOptionForm, CustomOption } from 'src/app/models/Order';
import { Option } from 'src/app/models/Product';
import { info } from 'console';
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
    private _fb: FormBuilder,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    console.info('option received: ', this.option);
    
    if (!this.option.meta.isChained) {
      this.constructChained();
    }
  }

  chainedOptions(): FormArray {
    return this.formGroup.get('chainedOptions') as FormArray;
  }

  constructChained(): void {
    this.option.inputs.forEach((input: any) => {
      this.chainedOptionsRef[input.value] = [];

      if (input.chainedOptions) {
        input.chainedOptions.forEach((option: CustomOption) => {
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

    console.info('chained options cleared: ', this.chainedOptions());

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
