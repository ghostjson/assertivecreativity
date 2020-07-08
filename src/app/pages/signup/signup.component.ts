import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { SignupFormInterface } from './signup_form.interface';
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signup_form: SignupFormInterface = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  };

  error: string = "";

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  submitForm(): void {
    this.error = "";
    if (this.signup_form.confirm === this.signup_form.password) {
      try {
        this.auth.register(this.signup_form);
      } catch (e) {
        this.error = "Signup failed, try again";
      }
    } else {
      this.error = "Password does not match";
    }
  }
}
