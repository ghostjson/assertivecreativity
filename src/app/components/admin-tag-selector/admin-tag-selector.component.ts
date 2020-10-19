import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { Tag } from 'src/app/models/Tag';

@Component({
  selector: 'app-admin-tag-selector',
  templateUrl: './admin-tag-selector.component.html',
  styleUrls: ['./admin-tag-selector.component.scss']
})
export class AdminTagSelectorComponent {
  @Input() formGroup: FormGroup;
  @Input() tags: Tag[];
  selectedTags: Tag[];

  constructor() { }

  logTags() {
    console.log('tags selected: ', this.selectedTags);
  }
}
