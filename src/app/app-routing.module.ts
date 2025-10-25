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
// import { AdminComponent } from './admin/admin.component';
import { UnauthorisedComponent } from './features/unauthorised/unauthorised.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AdminComponent } from './features/admin/admin.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { UsersComponent } from './features/admin/users/users.component';
import { AdminProductsComponent } from './features/admin/products/products.component';
import { AdminOrdersComponent } from './features/admin/orders/orders.component';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
// import { UsersComponent } from './admin/users/users.component';
// import { AdminProductsComponent } from './admin/products/products.component';
// import { AdminOrdersComponent } from './admin/orders/orders.component';



const routes: Routes = [
  
  { path: 'admin',component:DashboardComponent,canActivate: [AdminGuard]},
  { path: 'admin/users', component:UsersComponent},
  { path: 'admin/products', component:AdminProductsComponent},
  { path: 'admin/orders', component:AdminOrdersComponent},
    
  
  // { path: '', component:HomeComponent},
  { path: 'login', component:LoginComponent,canActivate: [GuestGuard]},
  { path: 'register', component:RegisterComponent},

  { path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)},
  { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)},
  { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule)},
  { path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule)},
  { path: 'exterior', loadChildren: () => import('./features/products/exterior/exterior.module').then(m => m.ExteriorModule)},
  { path: 'interior', loadChildren: () => import('./features/products/interior/interior.module').then(m => m.InteriorModule)},
  { path: 'performance', loadChildren: () => import('./features/products/performance/performance.module').then(m => m.PerformanceModule)},
  { path: 'tech', loadChildren: () => import('./features/products/tech/tech.module').then(m => m.TechModule)},
  { path: 'profile', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)},
  { path: 'wishlist', loadChildren: () => import('./features/wishlist/wishlist.module').then(m => m.WishlistModule)},
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},


  // { path: 'cart', component:CartComponent},

  // { path: 'wishlist', component:WishlistComponent},
  // { path: 'interior',component:InteriorComponent},
  // { path: 'exterior',component:ExteriorComponent},
  // { path: 'tech',component:TechComponent},
  // { path: 'performance',component:PerformanceComponent},
  { path: 'checkout', component:CheckoutComponent},
  // { path: 'orders', component:OrdersComponent},
  // { path: 'contact', component:ContactComponent},
  // { path: 'profile', component:ProfileComponent},
  { path: 'unauthorised', component:UnauthorisedComponent},

  { path: '**', component:NotfoundComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
