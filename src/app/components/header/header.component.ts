import { Component } from '@angular/core';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = this.productSerivce.getTheme() === 'dark-mode';
    this.productSerivce.setTheme(this.isDarkMode ? 'dark-mode' : 'light-mode');
  }

  constructor(private productSerivce: ProductsService) {}

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.productSerivce.setTheme(this.isDarkMode ? 'dark-mode' : 'light-mode');
  }
}
