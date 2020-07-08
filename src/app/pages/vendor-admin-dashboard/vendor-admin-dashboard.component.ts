import { Component, OnInit } from '@angular/core';
import { StatusCard } from '../../models/StatusCard';
import { ChartConfiguration } from '../../models/ChartConfiguration';
import { VendorAdminDashboardService } from '../../services/vendor-admin-dashboard.service';

@Component({
  selector: 'app-vendor-admin-dashboard',
  templateUrl: './vendor-admin-dashboard.component.html',
  styleUrls: ['./vendor-admin-dashboard.component.scss']
})
export class VendorAdminDashboardComponent implements OnInit {
  charts: ChartConfiguration[];
  cards: StatusCard[];

  constructor(private _dashboardService: VendorAdminDashboardService) { }

  ngOnInit(): void {
    this.charts = this._dashboardService.getCharts();

    this.cards = this._dashboardService.getStatusCards();
  }

}
