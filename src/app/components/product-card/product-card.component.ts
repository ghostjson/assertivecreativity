import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() productId: number;
  @Input() name: string;
  @Input() description: string;
  @Input() image: string;
  @Input() price: number;
  @Input() stock: boolean;
  @Input() styleClass: string;

  /**
   * Return a short part of the string
   * @param str string to get the short version of
   */
  summary(str: string): string {
    return str.slice(0, 50);
  }
}
