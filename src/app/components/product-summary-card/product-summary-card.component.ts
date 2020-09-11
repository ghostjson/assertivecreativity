import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-summary-card',
  templateUrl: './product-summary-card.component.html',
  styleUrls: ['./product-summary-card.component.scss']
})
export class ProductSummaryCardComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() image: string;
  @Input() totalPrice: number;

  constructor() { }

  ngOnInit(): void {
  }

}
