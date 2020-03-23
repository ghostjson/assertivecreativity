import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() {
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
          data: {
              title: "Today's Offer",
              slides: [
                {
                  image: 'https://via.placeholder.com/200x200.png',
                  url: ''
                },
                {
                  image: 'https://via.placeholder.com/200x200.png',
                  url: ''
                },
                {
                  image: 'https://via.placeholder.com/200x200.png',
                  url: ''
                },
                {
                  image: 'https://via.placeholder.com/200x200.png',
                  url: ''
                },
                {
                  image: 'https://via.placeholder.com/200x200.png',
                  url: ''
                },
                {
                  image: 'https://via.placeholder.com/200x200.png',
                  url: ''
                },
                {
                  image: 'https://via.placeholder.com/200x200.png',
                  url: ''
                }
              ]
            }
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
