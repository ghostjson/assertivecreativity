import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { AdminOrdersService } from 'src/app/services/admin-orders.service';
import { UserDetailsService } from 'src/app/store/user-details.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];
  user: User;

  constructor(
    private _orderService: AdminOrdersService,
    private _userDetailsService: UserDetailsService,
    private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.user = this._userDetailsService.getUserLocal();

    this._commonService.setLoaderFor(
      this._orderService.getAllOrders(this.user.role)
      .subscribe((orders: Order[]) => {
        this.orders = orders;
      })
    );
  }

}
