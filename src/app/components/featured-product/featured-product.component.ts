import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent implements OnInit {

  @Input('data') data: any;


  constructor() { }

  ngOnInit(): void {
  }

}
