import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ImageObj,
  ProductAttribute,
  ProductImage,
} from 'src/app/models/Product';

type DictEntry = {
  [key: string]: {
    image: ProductImage;
    show: boolean;
  };
};

type SelectedAttr = {
  config: ProductAttribute;
  form: FormGroup;
};
@Component({
  selector: 'app-custom-product-image-preview',
  templateUrl: './custom-product-image-preview.component.html',
  styleUrls: ['./custom-product-image-preview.component.scss'],
})
export class CustomProductImagePreviewComponent implements OnInit, OnChanges {
  @Input() baseImage: string;
  @Input() baseImageAltText: string;
  @Input() viewType: string;
  @Input() styleClass: string;
  @Input() overlayImg: ImageObj;
  @Input() attributes: ProductAttribute[];
  @Input() selectedAttrs: SelectedAttr[];

  attributesDict: DictEntry = {};
  attributeIds: string[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.attributes) {
      this.attributes.forEach((attr) => {
        this.transformToDict(attr);
      });
      this.attributeIds = Object.keys(this.attributesDict);
    }
  }

  ngOnChanges(changes: any): void {
    // listen for changes in selected attributes and update the preview
    if (changes.selectedAttrs) {
      let changedAttrs: SelectedAttr[] = changes.selectedAttrs.currentValue;

      this.refreshActiveAttrs(changedAttrs);
    }
  }

  /**
   * transform the attr array to a dictionary for constant lookup time
   * @param attr attr to add to the dictionary
   */
  transformToDict(attr: ProductAttribute): void {
    if (attr.is_attribute_group) {
      attr.child_attributes.forEach((childAttr) => {
        this.transformToDict(childAttr);
      });
    } else {
      this.attributesDict[attr.id] = {
        image: attr.images[0],
        show: false,
      };
    }
  }

  /**
   * refresh the active attribute list
   * @param activeAttrs active attribute list
   */
  refreshActiveAttrs(activeAttrs: SelectedAttr[]): void {
    for (const id of this.attributeIds) {
      this.attributesDict[id].show = false;
    }

    for (const attr of activeAttrs) {
      this.attributesDict[attr.config.id].show = true;
    }
  }
}
