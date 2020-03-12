import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Feature } from './../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  featured: Array<Feature> = [];

  constructor(private _homeService : HomeService) { }

  ngOnInit(): void {
    this.featured = this._homeService.featured;
  }

}
