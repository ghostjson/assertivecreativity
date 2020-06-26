import { Component, OnInit } from '@angular/core';
import { StatusCard } from '../../models/StatusCard';


@Component({
  selector: 'app-vendor-admin',
  templateUrl: './vendor-admin.component.html',
  styleUrls: ['./vendor-admin.component.scss']
})
export class VendorAdminComponent implements OnInit {
  cards: StatusCard[];

  constructor() { }

  ngOnInit(): void {
    this.cards = [
      {
        title: 'Orders this month',
        value: '100',
        classes: {
          'small-box': true,
          'bg-info': true,
        },
        icon: {
          'null': true
        }
      },
      {
        title: 'Order requests',
        value: '55',
        classes: {
          'small-box': true,
          'bg-success': true,
        },
        icon: {
          'null': true
        }
      },
      {
        title: 'User registrations',
        value: '40',
        classes: {
          'small-box': true,
          'bg-warning': true,
        },
        icon: {
          'null': true
        }
      },
      {
        title: 'Order cancellation',
        value: '20',
        classes: {
          'small-box': true,
          'bg-danger': true,
        },
        icon: {
          'null': true
        }
      }
    ];
  }

}
