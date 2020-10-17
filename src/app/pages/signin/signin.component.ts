import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CommonService } from "src/app/common.service";
import { Token } from 'src/app/models/Token';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  user: { email: string; password: string } = {
    email: "",
    password: "",
  };

  error: string;
  role: string;
  returnUrl: string;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _common: CommonService
  ) {}

  ngOnInit(): void {
    this.returnUrl = '/' + null ? '': this._router.parseUrl(this._router.url).queryParamMap.get('return');

    if (this._auth.isAuthenticated()) {
      this._router.navigate([this.returnUrl]);
    }

    this._common.setLoader(false);
  }

  login() {
    this._common.setLoader(true);

    try {
      this._auth.authenticate(
        this.user.email,
        this.user.password
      )
      .subscribe((token: Token) => {
        localStorage.setItem("Token", token.access_token);
        this._common.setLoader(false);
        this._router.navigate([this.returnUrl]);
      })
    } catch (e) {
      console.log(e);
      this.error = e.error.status;
    } finally {
      this._common.setLoader(false);
    }
  }
}
