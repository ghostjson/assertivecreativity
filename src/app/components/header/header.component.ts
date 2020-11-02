import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserDetailsService } from "src/app/store/user-details.service";
import { CommonService } from "src/app/common.service";
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/User';
import { MenuItem } from 'primeng/api';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {
  @Output() onSearchStringEmit: EventEmitter<string> = new EventEmitter<string>();

  user_role: any;
  cartLength: number;
  navStartItems: MenuItem[];
  navEndItems: MenuItem[];
  logo: string;
  user: User;

  constructor(
    private _user: UserDetailsService,
    public _auth: AuthService,
    private _common: CommonService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this._common.setLoader(true);
    this.logo = './../../../assets/images/logo.png';
    this.cartLength = 0;

    let token = localStorage.getItem('Token');
    if (token) {
      this._user.getUser().subscribe((user: User) => {
        this.user = user;
        console.info('User details: ', this.user);
        this._common.setLoader(false);
      })
    }
    else {
      this.user = null;
      this._common.setLoader(false);
    }

    this.navStartItems = [
      {
        label: 'Shop',
        items: [
          {
            label: 'Stock Items',
            routerLink: '/shop/stock'
          },
          {
            label: 'Customize',
            routerLink: ''
          }
        ]
      },
      {
        label: 'About Us',
        routerLink: '/about'
      },
      {
        label: 'Contact Us',
        routerLink: '/contact'
      }
    ];
  }

  emitSearchString(event: any): void {
    this.onSearchStringEmit.emit(event);
  }
}
