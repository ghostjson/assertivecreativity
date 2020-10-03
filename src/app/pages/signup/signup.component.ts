import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { SignupFormInterface } from './signup_form.interface';
import { Router } from '@angular/router';
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  // signup_form: SignupFormInterface = {
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  //   confirm: "",
  //   companyName: ""
  // };

  signup_form = {
    name: '',
    email: '',
    password: ''
  };

  error: string = "";

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submitForm(): void {
    this.error = "";
    // if (this.signup_form.confirm === this.signup_form.password) {
    //   try {
    //     this.auth.register(this.signup_form)
    //     .subscribe( _ => this.router.navigate(['/']));
    //   } catch (e) {
    //     this.error = "Signup failed, try again";
    //   }
    // } else {
    //   this.error = "Password does not match";
    // }
    this.auth.register(this.signup_form)
        .subscribe( _ => this.router.navigate(['/']));
  }
}
