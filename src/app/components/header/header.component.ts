import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserDetailsService } from "src/app/store/user-details.service";
import { CommonService } from "src/app/common.service";
import { CartService } from 'src/app/services/cart.service';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/User';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {
  user_role: any;
  cartLength: number;
  navItems: MenuItem[];
  logo: string;
  token: string;
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

    this.token = localStorage.getItem('Token');
    if (this.token) {
      this._user.getUser().subscribe((user: User) => {
        this.user = user;
        console.info('User details: ', this.user);
        this._common.setLoader(false);
      })
    }
    else {
      this._common.setLoader(false);
    }

    // this._common.setLoader(true);
    // this._user
    // .getRole()
    // .then((res) => {
    //   this.cartLength = this._cartService.getCartSize();
    //   this.user_role = res;
    //   this._common.setLoader(false);
    // })
    // .catch((e) => {
    //   this._common.setLoader(false);
    // });

    this.navItems = [
      {
        label: 'Home',
        routerLink: '/'
      },
      {
        label: 'Shop',
        routerLink: '/shop/select-type'
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
}
