import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  formMode: boolean = true;

  constructor(private auth: AuthService, private common: CommonService) {
    console.log(this.auth.getUser())
  }

  ngOnInit(): void {
  }

  editProfile() : void{
    this.formMode = this.formMode ? false : true;
  }

}
