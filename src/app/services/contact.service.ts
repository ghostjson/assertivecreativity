import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }


  fetchData() : object{
    return {
      widgets: [
        {
          component: 'Spacer',
          data: '50'
        },
        {
          component: "ContactForm",
          data: {
            description: "We are here to help you."
          }
        },
        {
          component: 'Spacer',
          data: '100'
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
        },
        {
          component: 'Spacer',
          data: '100'
        },
      ]
    }
  }
}
