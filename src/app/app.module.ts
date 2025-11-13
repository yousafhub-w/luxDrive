import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './features/auth/login/login.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { UnauthorisedComponent } from './features/unauthorised/unauthorised.component';
import { NgChartsModule } from 'ng2-charts';
import { SampleModalComponent } from './shared/components/sample-modal/sample-modal.component';
import { ConfirmationModalComponent } from './shared/components/confirmation-modal/confirmation-modal.component';
import { AddProductModalComponent } from './shared/components/add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from './shared/components/edit-product-modal/edit-product-modal.component';
import { AdminComponent } from './features/admin/admin.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { UsersComponent } from './features/admin/users/users.component';
import { AdminOrdersComponent } from './features/admin/orders/orders.component';
import { AdminProductsComponent } from './features/admin/products/products.component';
import { LoaderComponent } from './features/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    CheckoutComponent,
    AdminComponent,
    UnauthorisedComponent,
    DashboardComponent,
    UsersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    SampleModalComponent,
    ConfirmationModalComponent,
    AddProductModalComponent,
    EditProductModalComponent,
    LoaderComponent
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
