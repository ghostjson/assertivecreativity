import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration } from '../../models/ChartConfiguration';

@Component({
  selector: 'app-admin-chart-card',
  templateUrl: './admin-chart-card.component.html',
  styleUrls: ['./admin-chart-card.component.scss']
})
export class AdminChartCardComponent implements OnInit {
  @Input() chart: ChartConfiguration;

  constructor() { }

  ngOnInit(): void {
  }

}
