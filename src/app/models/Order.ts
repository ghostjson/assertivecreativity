import { FormControl, FormGroup, FormArray } from '@angular/forms';

export class CustomOption {
  name: string;
  title: string;
  type: string;
  price: number;
  input: any;
  meta: OptionMeta;
  chainedOptions?: CustomOption[]
}

export class OptionMeta {
  isChained: boolean;
  chainedOpsHidden?: boolean;
}

export class CustomOptionForm extends FormGroup {
  name: FormControl;
  title: FormControl;
  type: FormControl;
  price: FormControl;
  input: FormControl;
  meta: FormGroup;
  chainedOptions?: FormArray
}