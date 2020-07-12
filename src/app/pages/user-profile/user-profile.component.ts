import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { CommonService } from "src/app/common.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  formMode: boolean = true;
  user: any;

  constructor(private auth: AuthService, private common: CommonService) {
    this.common.setLoader(true);
    this.auth.getUser().then((res) => {
      this.user = res.data;
      this.common.setLoader(false);
      console.log(this.user)
    });
  }

  ngOnInit(): void {}

  editProfile(): void {
    this.formMode = this.formMode ? false : true;
  }
}
