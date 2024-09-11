import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsCardComponent } from '../../components/products-card/products-card.component';

@NgModule({
  declarations: [ProductsComponent, ProductsCardComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
