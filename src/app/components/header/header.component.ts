import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserDetailsService } from "src/app/store/user-details.service";
import { CommonService } from "src/app/common.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  user_role: any;

  constructor(
    private user: UserDetailsService,
    public auth: AuthService,
    private common: CommonService
  ) {}

  async ngOnInit() {
    this.common.setLoader(true)
    this.user.getRole().then((res) => {
      this.user_role = res;
      this.common.setLoader(false)
    });
  }
}
