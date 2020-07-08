import { Component, OnInit, Input } from '@angular/core';
import { StatusCard } from '../../models/StatusCard';


@Component({
  selector: 'app-vendor-admin-status-card',
  templateUrl: './vendor-admin-status-card.component.html',
  styleUrls: ['./vendor-admin-status-card.component.scss']
})

export class VendorAdminStatusCardComponent implements OnInit {
  @Input() card: StatusCard;

  constructor() { }

  ngOnInit(): void {
  }

}
