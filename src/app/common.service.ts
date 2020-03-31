import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {}

  featuredProduct(): any {
    return {
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
  }

}
