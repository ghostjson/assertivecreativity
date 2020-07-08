import { Component } from '@angular/core';
import { UserDetailsService } from './store/user-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'acreativity';

  constructor(private user: UserDetailsService) {

  }
}
