import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  login() : void{
    if(this.auth.authentication(this.user.username, this.user.password)){
      this.router.navigate(['/']);
    }
  }
}
