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
