import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/User";
import { Form } from "@angular/forms";
import { MenuItem } from "primeng/api";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  newUser: User;
  password_confirm: string;
  error: string = "";
  returnUrl: string;
  formSteps: MenuItem[];
  currentFormStep: number;

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.newUser = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      email_verified_at: null,
      image: null,
      phone: null,
      profession: null,
      company_details: {
        name: null,
        building_number: null,
        street_name: null,
        building_name: null,
        locality: null,
        province_abbr: null,
        zip: null,
        country: null,
        email: null,
        phone: null,
      },
    };

    this.currentFormStep = 0;
    this.formSteps = [
      { label: "Personal Details" },
      { label: "Company Details" }
    ];
    
    console.log(
      "return url: ",
      this._router.parseUrl(this._router.url).queryParamMap.get("return")
    );
    this.returnUrl = this._router
      .parseUrl(this._router.url)
      .queryParamMap.get("return");

    if (!this.returnUrl) {
      this.returnUrl = "/";
    }
  }

  /**
   * Check if the passwords match
   */
  isPasswordsMatched(): boolean {
    return this.newUser.password === this.password_confirm;
  }

  /**
   * Signup the user
   */
  signup(): void {
    this.error = null;
    if (this.isPasswordsMatched()) {
      try {
        this._auth
          .register(this.newUser)
          .subscribe((_) => this._router.navigate([this.returnUrl]));
      } catch (e) {
        this.error = "Signup failed, try again";
      }
    } else {
      this.error = "Password does not match";
    }
  }
}
