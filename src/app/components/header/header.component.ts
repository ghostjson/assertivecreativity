import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserDetailsService } from "src/app/store/user-details.service";
import { CommonService } from "src/app/common.service";
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {
  user_role: any;
  cartLength: number;

  constructor(
    private _user: UserDetailsService,
    public _auth: AuthService,
    private _common: CommonService,
    private _cartService: CartService
  ) {}

  async ngOnInit() {
    this.cartLength = this._cartService.getCartSize();
    this._common.setLoader(true);
    this._user
      .getRole()
      .then((res) => {
        this.user_role = res;
        this._common.setLoader(false);
      })
      .catch((e) => {
        this._common.setLoader(false);
      });
  }
}
