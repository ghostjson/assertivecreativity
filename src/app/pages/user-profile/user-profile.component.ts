import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { CommonService } from "src/app/common.service";
import { UserDetailsService } from 'src/app/store/user-details.service';
import { User } from 'src/app/models/User';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  viewMode: boolean;
  user: User;

  constructor(private _userService: UserDetailsService, private common: CommonService) {
    this.viewMode = true;
    _userService.getUser().subscribe((user: User) => {
      this.user = user;
      this.common.setLoader(false);
      console.log(this.user)
    });
  }

  ngOnInit(): void {}

  editProfile(): void {
    this.viewMode = !this.viewMode;

    if(this.viewMode) {
      this._userService.editUser(this.user)
        .subscribe(() => {
          console.log('User updated: ', this.user);
        });
    }
  }
}
