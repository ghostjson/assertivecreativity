import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CommonService } from "src/app/common.service";
import { Token } from 'src/app/models/Token';
import { MessageService } from "primeng/api";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  providers:[MessageService]
})
export class SigninComponent implements OnInit {
  user: { 
    email: string,
    password: string 
  } = {
    email: "",
    password: "",
  };

  error: string;
  role: string;
  returnUrl: string;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _common: CommonService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this._router.parseUrl(this._router.url).queryParamMap.get('return');

    if(!this.returnUrl) {
      this.returnUrl = '/';
    }

    if (this._auth.isAuthenticated()) {
      this._router.navigate([this.returnUrl]);
    }
  }

  /**
   * Sign in the user
   */
  login() {
    this.error = null;

    this._common.setLoaderFor(
      this._auth.authenticate(
        this.user.email,
        this.user.password
      )
      .subscribe(
        // next callback
        (token: Token) => {
          console.log('Attempting to signin from signin component');
          this._router.navigate([this.returnUrl]);
        },
        // error callback
        (e: any) => {
          console.error('error caught from the login function: ', e);
          this.error = String(e.error.status);
          this._messageService
            .add(
              {
                severity:'error',
                summary:'Login Failed',
                detail:'Something went wrong. Kindly try again'
              }
            );
        }
      )
    );
  }
}
