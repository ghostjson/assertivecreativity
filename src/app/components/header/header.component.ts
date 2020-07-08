import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user_role: string;

  constructor(public auth: AuthService) { }

  async ngOnInit() {
    this.auth.getRole().then(res => {
      this.user_role = res
    })
  }

}
