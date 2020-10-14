import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { SignupForm } from '../../models/SignupForm';
import { Router } from '@angular/router';
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signup_form: SignupForm = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    profession: ""
  };

  password_confirm: string;
  error: string = "";
  returnUrl: string;

  constructor(private auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.returnUrl = this._router.parseUrl(this._router.url).queryParamMap.get('return');
  }

  submitForm(): void {
    this.error = "";
    if (this.password_confirm === this.signup_form.password) {
      try {
        this.auth.register(this.signup_form)
        .subscribe( _ => this._router.navigate([this.returnUrl]));
      } catch (e) {
        this.error = "Signup failed, try again";
      }
    } else {
      this.error = "Password does not match";
    }
  }
}
