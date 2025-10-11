import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AboutComponent } from './features/about/about.component';
import { CartComponent } from './features/cart/cart.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { GuestGuard } from './core/guards/guest.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { InteriorComponent } from './features/products/interior/interior.component';
import { ExteriorComponent } from './features/products/exterior/exterior.component';
import { TechComponent } from './features/products/tech/tech.component';
import { PerformanceComponent } from './features/products/performance/performance.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrdersComponent } from './features/orders/orders.component';


const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'login', component:LoginComponent,canActivate: [GuestGuard]},
  { path: 'register', component:RegisterComponent,canActivate: [GuestGuard]},
  { path: 'about', component:AboutComponent},
  { path: 'cart', component:CartComponent, canActivate: [AuthGuard]},
  { path: 'wishlist', component:WishlistComponent},
  { path: 'interior',component:InteriorComponent},
  { path: 'exterior',component:ExteriorComponent},
  { path: 'tech',component:TechComponent},
  { path: 'performance',component:PerformanceComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'orders', component:OrdersComponent},

  { path: '**', component:NotfoundComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
