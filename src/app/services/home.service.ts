import { Injectable } from '@angular/core';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _common : CommonService) {
  }


  fetchData(): object{
    return {
      widgets: [
        {
          component: 'MainBanner',
          data: [
                  {
                    header: "some heading",
                    content: "Some Contents for this section",
                    image: "https://via.placeholder.com/1366x568.png"
                  },
                  {
                    header: "some other heading",
                    content: "Some Other Contents for this section",
                    image: "https://via.placeholder.com/1366x568.png"
                  },
                  {
                    header: "some more heading",
                    content: "Some More Contents for this section",
                    image: "https://via.placeholder.com/1366x568.png"
                  }
          ]
        },
        {
          component: 'Spacer',
          data: '30'
        },
        {
          component: 'ProductSlider',
          data: this._common.featuredProduct()
        },
        {
          component: 'Spacer',
          data: '30'
        },
        {
          component: 'FeaturedProduct',
          data: {
            header: "some heading",
            content: "Some Contents for this section",
            image: "https://via.placeholder.com/650x400.png",
            reverse: false
          }
        }
        ,
        {
          component: 'FeaturedProduct',
          data: {
            header: "some heading",
            content: "Some Contents for this section",
            image: "https://via.placeholder.com/650x400.png",
            reverse: true
          }
        }
        ,
        {
          component: 'FeaturedProduct',
          data: {
            header: "some heading",
            content: "Some Contents for this section",
            image: "https://via.placeholder.com/650x400.png",
            reverse: false
          }
        }
      ]
    }
  }
  

}
