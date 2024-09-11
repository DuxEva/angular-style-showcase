import { Injectable } from '@angular/core';
import { Product } from '../models';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  URL = 'https://fakestoreapi.com/products';
  theme = localStorage.getItem('theme') || 'light-mode';

  constructor(private http: HttpClient) {
    console.log('theme', this.theme);
  }

  getProducts() {
    return this.http.get<Product[]>(this.URL).pipe(
      retry(2),
      catchError((error: Error) => {
        throw error;
      })
    );
  }

  setTheme(theme: string) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }

  getTheme() {
    return this.theme;
  }
}
