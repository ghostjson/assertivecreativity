import { Component, OnInit, Input } from '@angular/core';
import { StatusCard } from '../../models/StatusCard';


@Component({
  selector: 'app-admin-status-card',
  templateUrl: './admin-status-card.component.html',
  styleUrls: ['./admin-status-card.component.scss']
})

export class AdminStatusCardComponent implements OnInit {
  @Input() card: StatusCard;

  constructor() { }

  ngOnInit(): void {
  }

}
