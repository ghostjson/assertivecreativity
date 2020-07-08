import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetailsService } from 'src/app/store/user-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user_role: string;

  constructor(private user: UserDetailsService, public auth: AuthService) { }

  async ngOnInit() {
    this.user_role = this.user.getRole();
  }

}
