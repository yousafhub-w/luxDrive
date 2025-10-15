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
import { ContactComponent } from './features/contact/contact.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { UnauthorisedComponent } from './features/unauthorised/unauthorised.component';
import { AdminGuard } from './core/guards/admin.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminProductsComponent } from './admin/products/products.component';
import { AdminOrdersComponent } from './admin/orders/orders.component';



const routes: Routes = [
  { 
    path: 'admin',
    component:AdminComponent,
    canActivate: [AdminGuard],
    children:[
      { path: 'dashboard', component:DashboardComponent},
      { path: 'users', component:UsersComponent},
      { path: 'products', component:AdminProductsComponent},
      { path: 'orders', component:AdminOrdersComponent}
    ],
  },
    
  { path: '', component:HomeComponent},
  { path: 'login', component:LoginComponent,canActivate: [GuestGuard]},
  { path: 'register', component:RegisterComponent},
  { path: 'about', component:AboutComponent},
  { path: 'cart', component:CartComponent, },
  { path: 'wishlist', component:WishlistComponent},
  { path: 'interior',component:InteriorComponent},
  { path: 'exterior',component:ExteriorComponent},
  { path: 'tech',component:TechComponent},
  { path: 'performance',component:PerformanceComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'orders', component:OrdersComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'profile', component:ProfileComponent},
  { path: 'unauthorised', component:UnauthorisedComponent},

  { path: '**', component:NotfoundComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
