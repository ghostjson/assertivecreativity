import { Injectable } from '@angular/core';



interface BannerContent  {
  header: string,
  content: string,
  image: string,
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {



  bannerContents: Array<BannerContent> = [];


  constructor() {
    this.bannerContents = [
      {
        header: "some heading",
        content: "Some Contents for this section",
        image: "https://via.placeholder.com/1366x568.png"
      },
      {
        header: "some other heading",
        content: "Some Other Contents for this section",
        image: "https://via.placeholder.com/1366x569.png"
      },
      {
        header: "some more heading",
        content: "Some More Contents for this section",
        image: "https://via.placeholder.com/1366x570.png"
      }
    ]
  }

}
