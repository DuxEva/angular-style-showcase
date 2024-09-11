import { Injectable } from '@angular/core';
import { Product } from '../models';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  URL = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.URL).pipe(
      retry(2),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
