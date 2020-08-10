import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CommonService } from "src/app/common.service";

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["/"]);
    }
  }

  async login() {
    this.common.setLoader(true);

    try {
      let res = await this.auth.authentication(
        this.user.email,
        this.user.password
      );
      localStorage.setItem("Token", await res["Token"]);
      this.router.navigate(["/"]);
    } catch (e) {
      console.log(e);
      this.error = e.error.status;
    } finally {
      this.common.setLoader(false);
    }
  }
}
