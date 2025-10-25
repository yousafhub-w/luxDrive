import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from '../features/admin/admin.component';
import { SwiperComponent } from '../features/swiper/swiper.component';
import { ProductsComponent } from '../features/products/products.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavbarComponent,SwiperComponent,ProductsComponent],
  imports: [CommonModule,RouterModule],
  exports: [NavbarComponent,SwiperComponent,ProductsComponent,RouterModule] // 👈 make it reusable everywhere
})
export class SharedModule {}
