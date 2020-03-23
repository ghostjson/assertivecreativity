import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor() { }

  fetchData(){
    return {
      widgets: [
        {
          component: 'Heading',
          data: {
            text: 'About Us',
            fontSize: '1em',
            padding: '10px 0px 0px 80px'
          }
        },
        {
          component: 'GraphicContent',
          data: {
            image: './../../../assets/images/undraw_factory_dy0a.svg',
            content: 'Some About content is here, hello world',
            reverse: false
          }
        }
      ]
    }
  }
}
