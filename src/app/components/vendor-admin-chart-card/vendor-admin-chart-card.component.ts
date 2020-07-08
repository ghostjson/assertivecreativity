import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration } from '../../models/ChartConfiguration';

@Component({
  selector: 'app-vendor-admin-chart-card',
  templateUrl: './vendor-admin-chart-card.component.html',
  styleUrls: ['./vendor-admin-chart-card.component.scss']
})
export class VendorAdminChartCardComponent implements OnInit {
  @Input() chart: ChartConfiguration;

  constructor() { }

  ngOnInit(): void {
  }

}
