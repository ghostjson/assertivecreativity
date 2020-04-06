import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: {username: string, password: string} = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }


  login() : void{
    this.auth.authentication(this.user.username, this.user.password);
  }

}
