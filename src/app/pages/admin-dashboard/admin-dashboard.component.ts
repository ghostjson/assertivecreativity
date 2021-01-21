import { Component, OnInit } from '@angular/core';
import { StatusCard } from '../../models/StatusCard';
import { ChartConfiguration } from '../../models/ChartConfiguration';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  charts: ChartConfiguration[];
  cards: StatusCard[];

  constructor(
    private _dashboardService: AdminDashboardService
  ) { }

  ngOnInit(): void {
    this.charts = this._dashboardService.getCharts();

    this.cards = this._dashboardService.getStatusCards();
  }

}
