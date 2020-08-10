import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],

})
export class ProductSliderComponent implements OnInit {

  @ViewChild('wrapper') wrapper: ElementRef;
  title: string;
  slides: object[];

  @Input('data') data: any;

  constructor() { }

  ngOnInit(): void {
    
    this.title = this.data.title;
    this.slides = this.data.slides;

  }

  scrollRight(): void{
    this.wrapper.nativeElement.scrollLeft += 210;
  }

  scrollLeft(): void{
    this.wrapper.nativeElement.scrollLeft -= 210;
  }

}
