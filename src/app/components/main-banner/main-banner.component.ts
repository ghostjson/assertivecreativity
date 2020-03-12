import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {

  @ViewChild('banner') bannerElem: ElementRef;

  heading: string = '';
  contents: string = '';
  image: string = '';
  number: number = 0;
  total: number = 0;

  animation: { content: string, image: string } = {
    content: 'fadeInLeft',
    image: 'fadeIn',
  }


  constructor(private _homeContents: HomeService) { }

  ngOnInit(): void {

    this.total = this._homeContents.bannerContents.length;
    this.image = this._homeContents.bannerContents[this.number].image;

    this.update();

    setInterval(()=>{
      this.bannerRight();
    }, 8000);


  }

  ngAfterViewInit(): void {
  }

  update(): void {
    this.heading = this._homeContents.bannerContents[this.number].header;
    this.contents = this._homeContents.bannerContents[this.number].content;
    this.image = this._homeContents.bannerContents[this.number].image;
  }


  bannerLeft(): void {

    this.animation.content = "fadeOutLeft";
    this.animation.image = "fadeOut";

    setTimeout(() => {
      this.number--;
      if (this.number >= 0) {
        this.update();
      } else {
        this.number = this.total-1;
        this.update();
      }
      this.animation.image = "fadeIn";
      this.animation.content = "fadeInLeft";
    }, 1000);

  }

  bannerRight(): void {

    this.animation.content = "fadeOutLeft";

    this.animation.image = "fadeOut";

    setTimeout(() => {
      this.number++;
      if (this.number < this.total) {
        this.update();
      } else {
        this.number = 0;
        this.update();
      }

      this.animation.image = "fadeIn";
      this.animation.content = "fadeInLeft";
    }, 1000);
  }

}
