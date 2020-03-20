import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ProductSlider } from '../../services/home.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],

})
export class ProductSliderComponent implements OnInit {

  @ViewChild('wrapper') wrapper: ElementRef;
  @Input('title') title: string;
  @Input('slides') slides: Array<ProductSlider>;

  constructor() { }

  ngOnInit(): void {
  }

  scrollRight(): void{
    this.wrapper.nativeElement.scrollLeft += 210;
  }

  scrollLeft(): void{
    this.wrapper.nativeElement.scrollLeft -= 210;
  }

}
