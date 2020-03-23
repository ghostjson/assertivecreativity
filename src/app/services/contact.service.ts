import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }


  fetchData() : object{
    return {
      widgets: [
        {
          component: "ContactForm",
          data: {
            description: "We are here to help you."
          }
        }
      ]
    }
  }
}
