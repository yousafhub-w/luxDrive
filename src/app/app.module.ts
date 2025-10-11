import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './features/auth/login/login.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SwiperComponent } from './features/swiper/swiper.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { CartComponent } from './features/cart/cart.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { ProductsComponent } from './features/products/products.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { InteriorComponent } from './features/products/interior/interior.component';
import { ExteriorComponent } from './features/products/exterior/exterior.component';
import { TechComponent } from './features/products/tech/tech.component';
import { PerformanceComponent } from './features/products/performance/performance.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrdersComponent } from './features/orders/orders.component';
import { SearchBarComponent } from './shared/components/navbar/search-bar/search-bar.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    SwiperComponent,
    AboutComponent,
    CartComponent,
    WishlistComponent,
    NotfoundComponent,
    InteriorComponent,
    ExteriorComponent,
    TechComponent,
    PerformanceComponent,
    CheckoutComponent,
    OrdersComponent,
    SearchBarComponent
 
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
