import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';



const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'home', component:HomeComponent},
  { path: 'about', component:AboutComponent},
  { path: 'cart', component:CartComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
