import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  featured: any;

  constructor(private common: CommonService) { }

  ngOnInit(){
    this.featured = this.common.featuredProduct();
    console.log(this.featured)
  }

  ngAfterViewInit(): void {
    
  }




}
