import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { StatusCard } from 'src/app/models/StatusCard';
import { AdminDashboardService } from 'src/app/services/admin-dashboard.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  charts: ChartConfiguration[];
  cards: StatusCard[];

  constructor(private _dashboardService: AdminDashboardService) { }

  ngOnInit(): void {
    this.charts = this._dashboardService.getCharts();

    this.cards = this._dashboardService.getStatusCards();
  }
}
