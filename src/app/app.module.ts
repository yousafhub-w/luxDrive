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
import { ContactComponent } from './features/contact/contact.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { UnauthorisedComponent } from './features/unauthorised/unauthorised.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminOrdersComponent } from './admin/orders/orders.component';
import { AdminProductsComponent } from './admin/products/products.component';
import { NgChartsModule } from 'ng2-charts';
 




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
    SearchBarComponent,
    ContactComponent,
    ProfileComponent,
    AdminComponent,
    UnauthorisedComponent,
    DashboardComponent,
    UsersComponent,
    AdminOrdersComponent,
    AdminProductsComponent
 
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
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
