import { Component } from '@angular/core';
import { UserDetailsService } from './store/user-details.service';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader: any;
  title: string = 'acreativity';

  constructor(private user: UserDetailsService, private common: CommonService) {

  }


  ngOnInit() {
    this.common.loader.subscribe(status => this.loader = status);
  }

  ngAfterContentInit() {
    this.common.setLoader(false);
  }



}
