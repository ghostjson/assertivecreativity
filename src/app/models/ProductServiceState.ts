import { FormGroup } from '@angular/forms';
import { ProductAttribute } from './Product';

export interface ProductServiceState {
  activeProductId: number;
  activeAttrGrps: FormGroup[];
  selectedAttributes: {
    form: FormGroup;
    config: ProductAttribute;
  }[];
  showSummaryPanel: boolean;
}
