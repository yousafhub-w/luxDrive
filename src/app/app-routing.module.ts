import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { GuestGuard } from './core/guards/guest.guard';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { UnauthorisedComponent } from './features/unauthorised/unauthorised.component';
import { AdminGuard } from './core/guards/admin.guard';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { UsersComponent } from './features/admin/users/users.component';
import { AdminProductsComponent } from './features/admin/products/products.component';
import { AdminOrdersComponent } from './features/admin/orders/orders.component';

const routes: Routes = [
  
  { path: 'admin',component:DashboardComponent,canActivate: [AdminGuard]},
  { path: 'admin/users', component:UsersComponent},
  { path: 'admin/products', component:AdminProductsComponent},
  { path: 'admin/orders', component:AdminOrdersComponent},
  { path: 'login', component:LoginComponent,canActivate: [GuestGuard]},
  { path: 'register', component:RegisterComponent,canActivate: [GuestGuard]},
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
  { path: 'checkout', component:CheckoutComponent},
  { path: 'unauthorised', component:UnauthorisedComponent},
  { path: '**', component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
