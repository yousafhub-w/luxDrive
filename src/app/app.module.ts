import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './home/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './home/products/products.component';
import { SwiperComponent } from './home/swiper/swiper.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';



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
    CartComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
