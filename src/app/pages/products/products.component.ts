import { Component } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];
  error: any;
  loading = true;
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe(
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
}
