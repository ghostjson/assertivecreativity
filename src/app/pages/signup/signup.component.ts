import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/User";
import { MenuItem, MessageService } from "primeng/api";
import { CommonService } from "src/app/common.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  newUser: User;
  password_confirm: string;
  error: string = "";
  returnUrl: string;
  formSteps: MenuItem[];
  currentFormStep: number;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _messageService: MessageService,
    private _common: CommonService
  ) {}

  ngOnInit(): void {
    this.newUser = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
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
      { label: "Company Details" },
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
    console.log("Account Created: ", this.newUser);
    if (this.isPasswordsMatched()) {
      this._common.setLoaderFor(
        this._auth.register(this.newUser).subscribe(
          () => {
            this._router.navigate([this.returnUrl]);
          },
          () => {
            this.error = "Signup failed, try again";
            this._messageService.add({
              severity: "error",
              summary: this.error,
              detail: "Something went wrong. Try Again",
            });
          }
        )
      );
    } 
    else {
      this.error = "Password does not match";
      this._messageService.add({
        severity: "error",
        summary: this.error,
        detail: "Kindly check the passwords and try again",
      });
    }
  }
}
