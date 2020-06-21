import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-admin-product',
  templateUrl: './vendor-admin-product.component.html',
  styleUrls: ['./vendor-admin-product.component.scss']
})
export class VendorAdminProductComponent implements OnInit {
  product: {name: string, image: string};

  constructor() { }

  ngOnInit(): void {
    this.product = {
        name: 'Random product',
        image: '../../../assets/images/demo-product-images/4.jpg'
    };
  }
}
