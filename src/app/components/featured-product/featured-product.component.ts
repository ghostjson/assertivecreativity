import { Component, OnInit, Input } from '@angular/core';
import { Feature } from 'src/app/services/home.service';



@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent implements OnInit {

  @Input('content') content: Feature;
  @Input('index') index : number;



  constructor() { }

  ngOnInit(): void {
  }

}
