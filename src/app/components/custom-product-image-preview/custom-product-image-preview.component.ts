import { Component, Input, OnInit } from '@angular/core';
import { ImageObj } from 'src/app/models/Product';

@Component({
  selector: 'app-custom-product-image-preview',
  templateUrl: './custom-product-image-preview.component.html',
  styleUrls: ['./custom-product-image-preview.component.scss'],
})
export class CustomProductImagePreviewComponent implements OnInit {
  @Input() baseImage: string;
  @Input() baseImageAltText: string;
  @Input() viewType: string;
  @Input() styleClass: string;
  @Input() overlayImg: ImageObj;

  constructor() {}

  ngOnInit(): void {}
}
