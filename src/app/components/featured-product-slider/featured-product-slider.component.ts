import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured-product-slider',
  templateUrl: './featured-product-slider.component.html',
  styleUrls: ['./featured-product-slider.component.scss']
})
export class FeaturedProductSliderComponent implements OnInit {
  @Input() featured: any;

  responsiveOptions: any[];

  constructor() { }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "768px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

}
