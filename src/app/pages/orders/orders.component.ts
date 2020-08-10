import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  orders: Object[];
  selectedOrders: Object[];
  statuses: Object[];

  loading: boolean = true;

  @ViewChild('dt') table: Table;

  constructor(
    private _orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orders = this._orderService.getOrders();
    this.loading = false;
    this.selectedOrders = [];


    this.statuses = [
      { label: 'Declined', value: 'declined' },
      { label: 'Accepted', value: 'accepted' },
      { label: 'New', value: 'new' },
      { label: 'Pending', value: 'pending' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];
  }


  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateSelect(value: any, dateType: string) {
    this.table.filter(this.formatDate(value), dateType, 'equals')
  }

  formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }

}
