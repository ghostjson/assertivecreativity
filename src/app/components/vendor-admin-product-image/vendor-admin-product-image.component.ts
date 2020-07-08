import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vendor-admin-product-image',
  templateUrl: './vendor-admin-product-image.component.html',
  styleUrls: ['./vendor-admin-product-image.component.scss']
})
export class VendorAdminProductImageComponent implements OnInit {
  @Input() product;

  constructor() { }

  ngOnInit(): void {
  }

}
