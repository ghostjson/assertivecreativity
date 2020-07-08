import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["/"]);
    }
  }

  login(): void {
    if (this.auth.authentication(this.user.email, this.user.password)) {
      this.router.navigate(["/"]);
    }
  }
}
