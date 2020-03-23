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
        },
        {
          component: 'ContactSection',
          data: {
            address: 'Some Address, US',
            addressText: 'You can add any text here',
            phone: '81 XXX XXX XXXX',
            phoneText: 'You can add any text here',
            email: 'somefakeemail@fake.mm',
            emailText: 'You can add any text here'
          }
        }
      ]
    }
  }
}
