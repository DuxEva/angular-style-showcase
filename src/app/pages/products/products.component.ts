import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  productSubscription: Subscription | undefined;
  products: Product[] = [];
  error: Error | null = null;
  loading = true;
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productSubscription = this.productsService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.loading = false;
      },
      (error) => {
        console.error('Error:', error);
        this.error = error;
        this.loading = false;
      },
      () => {
        console.log('Completed');
      }
    );
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
