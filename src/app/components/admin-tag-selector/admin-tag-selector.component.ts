import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { VendorAdminProductService } from 'src/app/services/vendor-admin-product.service';

@Component({
  selector: 'app-admin-tag-selector',
  templateUrl: './admin-tag-selector.component.html',
  styleUrls: ['./admin-tag-selector.component.scss']
})
export class AdminTagSelectorComponent {
  @Input() formGroup: FormGroup;
  @Input() tags: SelectItem[];

  constructor() { }
}
