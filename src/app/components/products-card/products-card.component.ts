import { Component, Input } from '@angular/core';
import { Product } from '../../models';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss',
})
export class ProductsCardComponent {
  @Input() product: Product | undefined;
}
